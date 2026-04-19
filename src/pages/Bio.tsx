import React from 'react';
import { motion } from 'motion/react';

export const Bio: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="max-w-3xl mx-auto space-y-12"
    >
      <header className="text-center">
        <h2 className="serif text-5xl font-bold italic mb-6 text-aura-ink">Chi sono</h2>
      </header>
      <div className="flex flex-col md:flex-row items-center gap-12">
        <div className="w-48 h-64 bg-aura-accent/10 rounded-[64px] border border-white flex-shrink-0 flex items-center justify-center overflow-hidden shadow-xl">
          <img 
            src="https://www.mariocorallo.com/wp-content/uploads/2026/04/mario.jpg" 
            alt="Mario - Ideatore di Aura"
            className="w-full h-full object-cover grayscale transition-all hover:grayscale-0 duration-700"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="space-y-6 text-aura-ink/80 text-lg leading-relaxed">
          <p>
            Sono un <strong>artista</strong> con competenze digitali, maturate in oltre 30 anni di lavoro in questo settore. Non sono solo uno sviluppatore: la mia visione unisce l'estetica alla funzionalità per decostruire gli automatismi della nostra vita digitale.
          </p>
          <p>
            Ho creato Aura prima di tutto per me stesso. Come molti, ho sentito sulla mia pelle la dispersione causata dal rumore digitale costante. Oggi condivido questo strumento con te, sperando che possa aiutarti a ritrovare il tuo "centro" e la tua presenza.
          </p>
        </div>
      </div>
    </motion.div>
  );
};
