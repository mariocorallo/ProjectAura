import React from 'react';
import { motion } from 'motion/react';

export const About: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="max-w-3xl mx-auto space-y-12"
    >
      <header className="text-center">
        <h2 className="serif text-5xl font-bold italic mb-6 text-aura-ink">Cos'è Aura</h2>
        <p className="text-aura-muted font-serif italic text-lg">Un rifugio digitale per la mente moderna.</p>
      </header>
      <div className="prose prose-aura space-y-6 text-aura-ink/80 text-lg leading-relaxed">
        <p>
          Aura nasce come risposta alla <strong>iper-stimolazione</strong> del mondo contemporaneo. Viviamo in un'era di "massimo impulso e minima riflessione", dove algoritmi e marketing combattono per catturare ogni nostro secondo di attenzione.
        </p>
        <p>
          Questo spazio non è un'app di produttività, né un social network. È uno <strong>strumento di decostruzione</strong>. Gli esercizi proposti servono a creare quella millimetrica distanza tra l'impulso (comprare, sbloccare il telefono, mangiare per noia) e l'azione.
        </p>
        <div className="bg-white/40 p-10 rounded-[48px] border border-white italic font-serif shadow-sm">
          "Aura non ti chiede di cambiare chi sei, ma di osservare come reagisci. Nel distacco risiede la vera libertà di scelta."
        </div>
      </div>
    </motion.div>
  );
};
