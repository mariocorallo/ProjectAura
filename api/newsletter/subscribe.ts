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
    return res.status(500).json({ error: "Servizio newsletter non configurato. Assicurati di aver aggiunto BREVO_API_KEY nelle Environment Variables di Vercel." });
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

    const data = await response.json();

    if (!response.ok) {
      console.error("Brevo API Error:", data);
      return res.status(response.status).json({ error: "Errore durante l'iscrizione", details: data });
    }

    return res.status(200).json({ success: true, data });
  } catch (err) {
    console.error("Brevo Exception:", err);
    return res.status(500).json({ error: "Errore interno del server" });
  }
}
