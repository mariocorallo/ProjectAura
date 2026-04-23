import React from 'react';
import { useAura } from '../../context/AuraContext';

export const Footer: React.FC = () => {
  const { setView } = useAura();
  
  return (
    <footer className="mt-32 pt-16 border-t border-aura-muted/10 pb-16">
      <div className="flex flex-col items-center gap-12">
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
          <button onClick={() => setView('about')} className="text-[10px] uppercase font-bold tracking-widest text-aura-muted hover:text-aura-accent transition-colors">Cos'è Aura</button>
          <button onClick={() => setView('bio')} className="text-[10px] uppercase font-bold tracking-widest text-aura-muted hover:text-aura-accent transition-colors">Chi sono</button>
          <button onClick={() => setView('blog')} className="text-[10px] uppercase font-bold tracking-widest text-aura-muted hover:text-aura-accent transition-colors">Blog</button>
          <button onClick={() => setView('suggestions')} className="text-[10px] uppercase font-bold tracking-widest text-aura-muted hover:text-aura-accent transition-colors">Suggerimenti</button>
          <button onClick={() => setView('support')} className="text-[10px] uppercase font-bold tracking-widest text-aura-muted hover:text-aura-accent transition-colors">Sostienici</button>
          <button onClick={() => setView('privacy')} className="text-[10px] uppercase font-bold tracking-widest text-aura-muted hover:text-aura-accent transition-colors">Privacy Policy</button>
          <button onClick={() => setView('cookie-policy')} className="text-[10px] uppercase font-bold tracking-widest text-aura-muted hover:text-aura-accent transition-colors">Cookie Policy</button>
        </div>

        <div className="text-center">
          <p className="text-[10px] uppercase tracking-widest font-bold text-aura-dark mb-4">
            Aura
          </p>
          <p className="text-[10px] uppercase tracking-[0.3em] text-aura-muted opacity-50">
            Creato per la decostruzione della compulsione moderna
          </p>
        </div>
      </div>
    </footer>
  );
};
