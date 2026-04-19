import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email obbligatoria" });
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error("BREVO_API_KEY non configurata");
    return res.status(500).json({ error: "Servizio newsletter non configurato nelle Environment Variables di Vercel." });
  }

  try {
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        updateEnabled: true
      })
    });

    // Brevo returns 204 No Content for successful updates when updateEnabled is true
    // fetching .json() on a 204 response causes "Unexpected end of JSON input"
    if (response.status === 204 || response.status === 201) {
      return res.status(200).json({ success: true });
    }

    const text = await response.text();
    let data;
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      data = { message: text };
    }

    if (!response.ok) {
      console.error("Brevo API Error:", data);
      
      // Specifically handle "already exists" if it's not handled by 204
      if (text.includes('already_exists')) {
          return res.status(200).json({ success: true, message: "Contatto già esistente" });
      }

      return res.status(response.status).json({ error: "Errore durante l'iscrizione", details: data });
    }

    return res.status(200).json({ success: true, data });
  } catch (err) {
    console.error("Brevo Exception:", err);
    // Explicitly returning the error message to help the user debug on Vercel
    return res.status(500).json({ 
      error: "Errore interno del server", 
      message: err instanceof Error ? err.message : String(err) 
    });
  }
}
