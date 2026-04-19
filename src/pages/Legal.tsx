import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Cookie, ChevronLeft } from 'lucide-react';
import { useAura } from '../context/AuraContext';
import { handleEmailContact } from '../utils/contact';

export const Legal: React.FC<{ type: 'privacy' | 'cookie' }> = ({ type }) => {
  const { setView } = useAura();

  const content = {
    privacy: {
      title: "Privacy Policy",
      icon: <ShieldCheck className="text-aura-accent" size={32} />,
      lastUpdated: "19 Aprile 2026",
      sections: [
        {
          heading: "1. Introduzione",
          text: "La tua privacy è fondamentale per Aura. Questa Privacy Policy spiega come raccogliamo, utilizziamo e proteggiamo i tuoi dati personali quando utilizzi la nostra applicazione."
        },
        {
          heading: "2. Dati raccolti",
          text: "Aura raccoglie principalmente l'indirizzo email degli utenti che decidono volontariamente di iscriversi alla nostra newsletter. I dati di utilizzo (esercizi completati, note personali) sono memorizzati esclusivamente in locale sul tuo browser (Session Storage) e non vengono mai inviati ai nostri server, a meno che tu non decida esplicitamente di inviarci un suggerimento via email."
        },
        {
          heading: "3. Finalità del trattamento",
          text: "Utilizziamo il tuo indirizzo email esclusivamente per inviarti la newsletter di Aura, che include nuove pratiche di consapevolezza e aggiornamenti sul progetto. Non vendiamo né cediamo i tuoi dati a terzi per scopi di marketing."
        },
        {
          heading: "4. Base legale (GDPR)",
          text: "Il trattamento dei tuoi dati per l'invio della newsletter si basa sul tuo consenso esplicito, fornito al momento dell'iscrizione tramite la spunta della casella di accettazione."
        },
        {
          heading: "5. Diritti dell'interessato",
          text: "Hai il diritto di accedere ai tuoi dati, rettificarli, chiederne la cancellazione o revocare il consenso in qualsiasi momento. Puoi disiscriverti dalla newsletter tramite il link presente in ogni email o contattandoci direttamente."
        }
      ]
    },
    cookie: {
      title: "Cookie Policy",
      icon: <Cookie className="text-aura-accent" size={32} />,
      lastUpdated: "19 Aprile 2026",
      sections: [
        {
          heading: "1. Cosa sono i cookie",
          text: "I cookie sono piccoli file di testo che i siti visitati dall'utente inviano al suo terminale, dove vengono memorizzati per essere poi ritrasmessi agli stessi siti alla successiva visita del medesimo utente."
        },
        {
          heading: "2. Cookie utilizzati da Aura",
          text: "Aura utilizza esclusivamente cookie tecnici e tecnologie di archiviazione locale (Session Storage) strettamente necessari per il funzionamento dell'app (es. memorizzare il progresso degli esercizi o le tue note durante la sessione). Non utilizziamo cookie di profilazione o di terze parti per il tracciamento pubblicitario."
        },
        {
          heading: "3. Cookie di terze parti",
          text: "Per l'invio della newsletter ci appoggiamo a servizi esterni (Brevo/Resend) che potrebbero utilizzare cookie tecnici per gestire correttamente la consegna delle email. Questi sono limitati alla funzione specifica richiesta dall'utente."
        },
        {
          heading: "4. Gestione dei cookie",
          text: "Puoi decidere di disabilitare i cookie tramite le impostazioni del tuo browser, ma questo potrebbe compromettere la corretta fruizione di alcune funzionalità di Aura."
        }
      ]
    }
  };

  const current = content[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="max-w-3xl mx-auto space-y-12 pb-24"
    >
      <header className="text-center">
        <button 
          onClick={() => setView('dashboard')}
          className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-aura-muted hover:text-aura-accent mb-8 transition-colors"
        >
          <ChevronLeft size={14} />
          Torna alla dashboard
        </button>
        <div className="w-20 h-20 bg-aura-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
          {current.icon}
        </div>
        <h2 className="serif text-5xl font-bold italic mb-4 text-aura-ink">{current.title}</h2>
        <p className="text-[10px] uppercase tracking-widest font-bold text-aura-muted">
          Ultimo aggiornamento: {current.lastUpdated}
        </p>
      </header>

      <div className="bg-white/40 p-12 rounded-[48px] border border-white shadow-xl shadow-aura-accent/5 backdrop-blur-sm space-y-10">
        {current.sections.map((section, i) => (
          <section key={i} className="space-y-4">
            <h3 className="serif text-2xl font-bold italic text-aura-ink">{section.heading}</h3>
            <p className="text-aura-muted leading-relaxed font-serif italic text-lg">
              {section.text}
            </p>
          </section>
        ))}
      </div>

      <footer className="text-center pt-8">
        <p className="text-sm text-aura-muted italic">
          Per qualsiasi domanda relativa a queste policy, puoi scrivermi a: <br />
          <button 
            onClick={() => handleEmailContact("Aura App - Privacy / Cookies Info")}
            className="text-aura-accent hover:underline font-bold cursor-pointer"
          >
            mariocorallo@gmail.com
          </button>
        </p>
      </footer>
    </motion.div>
  );
};
