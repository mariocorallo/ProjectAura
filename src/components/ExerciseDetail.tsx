import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LucideIcon } from './LucideIcon';
import { Timer } from './Timer';
import { Journal } from './Journal';
import { Exercise } from '../types';
import { ArrowLeft, CheckCircle2, Play, CircleStop, Share2 } from 'lucide-react';

interface ExerciseDetailProps {
  exercise: Exercise;
  onBack: () => void;
  onComplete?: (id: string) => void;
}

export const ExerciseDetail = ({ exercise, onBack, onComplete }: ExerciseDetailProps) => {
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [showReflection, setShowReflection] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [exercise.id]);

  const handleShare = async () => {
    const text = `Prova questo esercizio di Aura: "${exercise.title}"\n\n${exercise.description}`;
    const url = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Aura - ${exercise.title}`,
          text: text,
          url: url,
        });
      } catch (err) {
        console.log('Share failed', err);
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(`${text}\n\nLink: ${url}`);
        alert('Link copiato negli appunti!');
      } catch (err) {
        console.error('Copy failed', err);
      }
    }
  };

  const startSession = () => {
    setIsSessionActive(true);
    setShowReflection(false);
  };

  const endSession = () => {
    setIsSessionActive(false);
    setShowReflection(true);
    if (onComplete) onComplete(exercise.id);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-12">
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="flex items-center space-x-2 text-aura-muted hover:text-aura-accent transition-colors group"
        >
          <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
          <span className="font-medium">Indietro</span>
        </motion.button>

        <motion.button
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={handleShare}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white border border-white hover:border-aura-accent/20 hover:bg-aura-accent/5 text-aura-muted hover:text-aura-accent transition-all group"
        >
          <Share2 size={16} />
          <span className="text-xs font-bold uppercase tracking-wider">Condividi</span>
        </motion.button>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="p-4 rounded-3xl bg-aura-accent/10 text-aura-accent w-fit mb-6">
            <LucideIcon name={exercise.icon} size={32} />
          </div>
          
          <h1 className="serif text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {exercise.title}
          </h1>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-aura-muted mb-3 italic">
                Obiettivo Di Distaccamento
              </h2>
              <p className="text-lg text-aura-ink/80 leading-relaxed font-medium">
                {exercise.objective}
              </p>
            </section>

            <section className="bg-white/40 p-8 rounded-[40px] border border-white">
              <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-aura-muted mb-6">
                Guida Pratica
              </h2>
              <ul className="space-y-4">
                {exercise.instructions.map((step, i) => (
                  <li key={i} className="flex items-start space-x-4">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-aura-accent/10 text-aura-accent flex items-center justify-center text-[10px] font-bold mt-1">
                      {i + 1}
                    </span>
                    <span className="text-aura-muted leading-relaxed">{step}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center justify-center p-8 rounded-[48px] bg-gradient-to-b from-white to-transparent shadow-xl shadow-aura-accent/5 border border-white min-h-[500px]"
        >
          <AnimatePresence mode="wait">
            {!isSessionActive && !showReflection ? (
              <motion.div 
                key="start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center space-y-8 max-w-xs"
              >
                <div className="w-24 h-24 bg-aura-accent/5 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={48} className="text-aura-accent opacity-20" />
                </div>
                <h3 className="serif text-2xl font-bold italic">Pronto per iniziare?</h3>
                <p className="text-aura-muted text-sm leading-relaxed">
                  L'essenza di questo esercizio risiede nella tua presenza. Segui le istruzioni e osserva ciò che accade dentro di te.
                </p>
                <button 
                  className="w-full py-4 bg-aura-accent text-white rounded-2xl font-bold shadow-lg shadow-aura-accent/20 hover:bg-aura-accent/90 transition-all flex items-center justify-center space-x-2"
                  onClick={startSession}
                >
                  <Play size={18} fill="currentColor" />
                  <span>Inizia Ora</span>
                </button>
              </motion.div>
            ) : isSessionActive ? (
              <motion.div 
                key="active"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full flex flex-col items-center justify-center space-y-8"
              >
                {exercise.timerSeconds ? (
                  <div className="flex flex-col items-center space-y-8">
                    <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-aura-muted">Sessione in corso</h3>
                    <Timer seconds={exercise.timerSeconds} onComplete={endSession} />
                  </div>
                ) : (
                  <div className="w-full flex flex-col items-center space-y-8">
                    <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-aura-muted">Esercizio Attivo</h3>
                    
                    {exercise.id === 'mappatura-automatismi' && <Journal exerciseId={exercise.id} />}
                    
                    <div className="bg-aura-accent/5 p-12 rounded-[40px] border border-aura-accent/10 max-w-sm text-center">
                      <p className="serif text-xl text-aura-ink/60 italic leading-relaxed">
                        "Porta la tua attenzione al momento presente. Osserva senza giudizio ciò che accade fuori e dentro di te."
                      </p>
                    </div>

                    <button 
                      className="px-8 py-3 bg-white text-aura-ink rounded-xl font-bold border border-aura-muted/10 hover:border-aura-accent transition-all flex items-center space-x-2 shadow-sm"
                      onClick={endSession}
                    >
                      <CircleStop size={18} className="text-red-500" />
                      <span>Termina Esercizio</span>
                    </button>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div 
                key="reflection"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full space-y-8"
              >
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto text-green-600">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="serif text-2xl font-bold">Esercizio Concluso</h3>
                  <p className="text-sm text-aura-muted">
                    Annota le tue riflessioni per rendere conscio l'automatismo.
                  </p>
                </div>

                <Journal exerciseId={exercise.id} />

                <button 
                  onClick={() => setShowReflection(false)}
                  className="w-full py-4 text-aura-muted text-xs font-bold uppercase tracking-widest hover:text-aura-accent transition-colors"
                >
                  Torna alla Guida
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};
