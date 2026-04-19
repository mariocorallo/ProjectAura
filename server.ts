import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

let resendClient: Resend | null = null;

function getResendClient(): Resend {
  if (!resendClient) {
    const key = process.env.RESEND_API_KEY;
    if (!key) {
      throw new Error('RESEND_API_KEY non configurata negli Environment Variables');
    }
    resendClient = new Resend(key);
  }
  return resendClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Suggestions/Contact
  app.post("/api/suggestions", async (req, res) => {
    const { type, message, email, website } = req.body;

    if (website) {
      return res.json({ success: true, filteredByHoneypot: true });
    }

    if (!message) {
      return res.status(400).json({ error: "Messaggio obbligatorio" });
    }

    try {
      console.log("Tentativo invio email con Resend...");
      const resend = getResendClient();
      const subject = type === 'bug' 
        ? "Aura Bug Report / Problema" 
        : "Aura Nuova Pratica / Suggerimento";

      const { data, error } = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: ['mariocorallo@gmail.com'],
        subject: subject,
        html: `
          <h3>Nuovo messaggio da Aura</h3>
          <p><strong>Tipo:</strong> ${type === 'bug' ? 'Segnalazione Bug' : 'Richiesta Pratica'}</p>
          <p><strong>Messaggio:</strong> ${message}</p>
          <p><strong>Email utente:</strong> ${email || 'Non fornita'}</p>
        `,
      });

      if (error) {
        console.error("Resend API Error:", error);
        return res.status(400).json({ error: error.message, details: error });
      }

      console.log("Email inviata con successo:", data);
      res.json({ success: true, data });
    } catch (err) {
      console.error("Server Exception:", err);
      const errorMessage = err instanceof Error ? err.message : "Errore sconosciuto";
      res.status(500).json({ error: "Errore interno del server", message: errorMessage });
    }
  });

  // API Route for Newsletter (Brevo)
  app.post("/api/newsletter/subscribe", async (req, res) => {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email obbligatoria" });
    }

    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      console.error("BREVO_API_KEY non configurata");
      return res.status(500).json({ error: "Servizio newsletter non configurato" });
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
          updateEnabled: true,
          // Puoi aggiungere qui l'ID della lista se vuoi (listIds: [2])
        })
      });

      if (response.status === 204 || response.status === 201) {
        return res.json({ success: true });
      }

      const text = await response.text();
      let data = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        data = { message: text };
      }

      if (!response.ok) {
        console.error("Brevo API Error:", data);
        return res.status(response.status).json({ error: "Errore durante l'iscrizione", details: data });
      }

      res.json({ success: true, data });
    } catch (err) {
      console.error("Brevo Server Exception:", err);
      res.status(500).json({ error: "Errore interno del server" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
