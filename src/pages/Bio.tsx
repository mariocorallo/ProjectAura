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
            src="https://picsum.photos/seed/aura-bio/400/600" 
            alt="Profilo"
            className="w-full h-full object-cover grayscale opacity-80"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="space-y-6 text-aura-ink/80 text-lg leading-relaxed">
          <p>
            Sono uno sviluppatore e ricercatore appassionato di <strong>Digital Wellbeing</strong> e minimalismo cognitivo. Credo che la tecnologia debba essere un supporto alla vita umana, non un parassita dell'attenzione.
          </p>
          <p>
            Ho creato Aura per me stesso, per combattere la stanchezza mentale derivante dal lavoro digitale costante. Oggi lo condivido con te, sperando che possa aiutarti a ritrovare il tuo "centro" in mezzo al rumore.
          </p>
        </div>
      </div>
    </motion.div>
  );
};
