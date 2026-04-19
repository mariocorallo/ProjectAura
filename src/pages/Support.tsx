import React from 'react';
import { motion } from 'motion/react';
import { Coffee, Heart, Sparkles, ExternalLink } from 'lucide-react';

export const Support: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-3xl mx-auto py-12"
    >
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif text-aura-dark mb-6">Sostieni Aura</h1>
        <p className="text-lg text-aura-muted leading-relaxed">
          Aura è un progetto nato per aiutarci a ritrovare la nostra attenzione e vivere con più consapevolezza. 
          Ogni contributo aiuta a mantenere il progetto gratuito e accessibile a tutti.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white/60 p-8 rounded-[32px] border border-white backdrop-blur-sm shadow-sm">
          <div className="w-12 h-12 bg-aura-accent/10 rounded-2xl flex items-center justify-center mb-6">
            <Heart className="w-6 h-6 text-aura-accent" />
          </div>
          <h3 className="text-xl font-bold text-aura-dark mb-4 uppercase tracking-wider text-[12px]">Perché sostenerci?</h3>
          <p className="text-sm text-aura-muted leading-loose">
            Il tuo supporto ci permette di creare nuovi esercizi, migliorare l'esperienza e 
            coprire i costi di infrastruttura. Mantieni vivo il distaccamento digitale.
          </p>
        </div>

        <div className="bg-white/60 p-8 rounded-[32px] border border-white backdrop-blur-sm shadow-sm">
          <div className="w-12 h-12 bg-aura-accent/10 rounded-2xl flex items-center justify-center mb-6">
            <Sparkles className="w-6 h-6 text-aura-accent" />
          </div>
          <h3 className="text-xl font-bold text-aura-dark mb-4 uppercase tracking-wider text-[12px]">Cosa riceverai?</h3>
          <p className="text-sm text-aura-muted leading-loose">
            Oltre alla nostra infinita gratitudine, aiuterai migliaia di persone a ritagliarsi 
            momenti di pace in un mondo sempre più frenetico. La tua è una scintilla di consapevolezza.
          </p>
        </div>
      </div>

      <div className="bg-aura-dark text-white p-10 md:p-14 rounded-[48px] text-center shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-full bg-aura-accent/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        
        <Coffee className="w-16 h-16 mx-auto mb-8 text-aura-accent animate-pulse" />
        <h2 className="text-3xl md:text-4xl font-serif mb-6 leading-tight">Offre un caffè digitale ad Aura</h2>
        <p className="text-white/70 mb-10 max-w-md mx-auto leading-relaxed">
          Un piccolo gesto per te, un grande aiuto per la nostra missione. Sostienici su Buy Me a Coffee.
        </p>

        <a 
          href="https://buymeacoffee.com/progettoaura"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-aura-accent text-white px-10 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[12px] transition-all hover:scale-105 hover:shadow-xl active:scale-95 group/btn"
        >
          Vai a Buy Me a Coffee
          <ExternalLink className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
        </a>
      </div>

      <div className="mt-20 text-center">
        <p className="text-xs text-aura-muted uppercase tracking-[0.3em] font-medium italic">
          Grazie di essere parte di questo viaggio.
        </p>
      </div>
    </motion.div>
  );
};
