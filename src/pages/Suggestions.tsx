import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, AlertCircle, MessageSquare, Sparkles } from 'lucide-react';
import { useAuraFeedback } from '../hooks/useAuraFeedback';

export const Suggestions: React.FC = () => {
  const { playSound } = useAuraFeedback();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="max-w-2xl mx-auto space-y-12"
    >
      <header className="text-center">
        <h2 className="serif text-5xl font-bold italic mb-6 text-aura-ink">Suggerimenti</h2>
        <p className="text-aura-muted font-serif italic text-lg pb-4">
          Aiutami ad evolvere Aura o segnalami cosa non va.
        </p>
      </header>

      <div className="bg-white/40 p-12 rounded-[48px] border border-white shadow-xl shadow-aura-accent/5 backdrop-blur-sm text-center space-y-8 relative overflow-hidden">
        <div className="w-20 h-20 bg-aura-accent/10 rounded-full flex items-center justify-center mx-auto text-aura-accent">
          <MessageSquare size={32} />
        </div>
        
        <div className="space-y-4">
          <h3 className="serif text-3xl font-bold italic text-aura-ink">Scrivimi direttamente</h3>
          <p className="text-aura-muted max-w-sm mx-auto leading-relaxed">
            Hai un'idea per una nuova pratica o hai riscontrato un problema? Inviami un'email, ti risponderò appena possibile.
          </p>
        </div>

        <a
          href="mailto:mariocorallo@gmail.com?subject=Aura App - Suggerimento / Segnalazione"
          className="inline-flex items-center gap-3 px-12 py-5 bg-aura-ink text-white rounded-[24px] font-bold uppercase tracking-[0.3em] text-[12px] hover:bg-aura-accent transition-all shadow-xl shadow-aura-ink/10"
        >
          <Send size={18} />
          <span>Invia Email</span>
        </a>

        <div className="pt-8 border-t border-white/40 grid grid-cols-2 gap-8">
          <div className="text-center">
            <h4 className="text-[10px] uppercase tracking-widest font-bold text-aura-muted mb-2">Nuove Pratiche</h4>
            <p className="text-[11px] text-aura-ink/60 italic">Su quale tema vorresti lavorare?</p>
          </div>
          <div className="text-center">
            <h4 className="text-[10px] uppercase tracking-widest font-bold text-aura-muted mb-2">Bug Report</h4>
            <p className="text-[11px] text-aura-ink/60 italic">Cosa non funziona come dovrebbe?</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 pt-12">
        <div className="bg-white/20 p-8 rounded-[40px] border border-white/40">
          <div className="w-10 h-10 bg-aura-accent/10 rounded-full flex items-center justify-center mb-4 text-aura-accent">
            <Sparkles size={18} />
          </div>
          <h4 className="serif text-xl font-bold mb-2">Nuove Pratiche</h4>
          <p className="text-sm text-aura-muted leading-relaxed">
            Aura è un progetto vivo. Se senti che manca un esercizio per una situazione specifica, dimmelo. Lo svilupperò pensando alle tue necessità.
          </p>
        </div>
        <div className="bg-white/20 p-8 rounded-[40px] border border-white/40">
          <div className="w-10 h-10 bg-red-500/10 rounded-full flex items-center justify-center mb-4 text-red-500">
            <AlertCircle size={18} />
          </div>
          <h4 className="serif text-xl font-bold mb-2">Segnala Bug</h4>
          <p className="text-sm text-aura-muted leading-relaxed">
            L'app non si comporta come dovrebbe? Trovi errori nel testo o nei timer? Ogni segnalazione mi aiuta a pulire l'esperienza.
          </p>
        </div>
      </div>
    </motion.div>
  );
};
