import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY || 're_VT3gVqXu_MfLqAUzfDkQDspY84ie94iBW');

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
      const subject = type === 'bug' 
        ? "Aura Bug Report / Problema" 
        : "Aura Nuova Pratica / Suggerimento";

      const { data, error } = await resend.emails.send({
        from: 'Aura App <onboarding@resend.dev>',
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
        console.error("Resend Error:", error);
        return res.status(500).json({ error: "Errore nell'invio dell'email" });
      }

      res.json({ success: true, data });
    } catch (err) {
      console.error("Server Error:", err);
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
