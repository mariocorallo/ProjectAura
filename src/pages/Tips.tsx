import React from 'react';
import { motion } from 'motion/react';

export const Tips: React.FC = () => {
  const tips = [
    { 
      title: "La Regola dei 10 Minuti", 
      desc: "Prima di ogni acquisto non pianificato o del check compulsivo delle email, respira e aspetta 10 minuti. Chiediti: ne ho davvero bisogno o è solo noia?" 
    },
    { 
      title: "Zone No-Tech", 
      desc: "Definisci uno spazio in casa (anche solo il letto o il tavolo da pranzo) dove il telefono è fisicamente bandito." 
    },
    { 
      title: "Osserva la Noia", 
      desc: "Quando sei in fila o aspetti qualcuno, non sbloccare il telefono. Osserva la tua impazienza come se fossi un ricercatore esterno." 
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="max-w-3xl mx-auto space-y-12"
    >
      <header className="text-center">
        <h2 className="serif text-5xl font-bold italic mb-6 text-aura-ink">Consigli</h2>
        <p className="text-aura-muted font-serif italic text-lg">Piccoli rituali per la tua pratica quotidiana.</p>
      </header>
      <div className="grid gap-6">
        {tips.map((tip, i) => (
          <div key={i} className="bg-white/40 p-8 rounded-[32px] border border-white hover:bg-white transition-all shadow-sm group">
            <h4 className="font-bold text-aura-accent text-sm uppercase tracking-wider mb-2 group-hover:translate-x-1 transition-transform">{tip.title}</h4>
            <p className="text-aura-ink/70 leading-relaxed font-light">{tip.desc}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
