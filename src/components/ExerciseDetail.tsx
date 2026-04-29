import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAura } from '../context/AuraContext';
import { useAuraFeedback } from '../hooks/useAuraFeedback';
import { LucideIcon } from './LucideIcon';
import { Timer } from './Timer';
import { Journal } from './Journal';
import { Exercise } from '../types';
import { ArrowLeft, CheckCircle2, Play, CircleStop, Share2, Sparkles } from 'lucide-react';

interface ExerciseDetailProps {
  exercise: Exercise;
  onBack: () => void;
  onComplete?: (id: string) => void;
}

export const ExerciseDetail = ({ exercise, onBack, onComplete }: ExerciseDetailProps) => {
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [showReflection, setShowReflection] = useState(false);
  const { triggerCelebration } = useAura();
  const { playSound } = useAuraFeedback();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [exercise.id]);

  const handleShare = async () => {
    playSound('tap');
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
        // alert('Link copiato negli appunti!');
      } catch (err) {
        console.error('Copy failed', err);
      }
    }
  };

  const startSession = () => {
    playSound('click');
    setIsSessionActive(true);
    setShowReflection(false);
  };

  const endSession = () => {
    playSound('success');
    triggerCelebration();
    setIsSessionActive(false);
    setShowReflection(true);
    if (onComplete) onComplete(exercise.id);
  };

  const renderBackButton = () => (
    <motion.button
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => { playSound('tap'); onBack(); }}
      className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-white shadow-sm border border-aura-accent/10 text-aura-muted hover:text-aura-accent hover:border-aura-accent/20 transition-all group"
    >
      <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
      <span className="font-semibold text-sm">Indietro</span>
    </motion.button>
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto px-6 py-12"
    >
      <div className="flex items-center justify-between mb-12">
        {renderBackButton()}

        <motion.button
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          onClick={handleShare}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white border border-white hover:border-aura-accent/20 hover:bg-aura-accent/5 text-aura-muted hover:text-aura-accent transition-all group"
        >
          <Share2 size={16} />
          <span className="text-xs font-bold uppercase tracking-wider">Condividi</span>
        </motion.button>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start mb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: "spring", damping: 25, stiffness: 100 }}
        >
          <div className="p-4 rounded-3xl bg-aura-accent/10 text-aura-accent w-fit mb-6">
            <LucideIcon name={exercise.icon} size={32} />
          </div>
          
          <h1 className="serif text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {exercise.title}
          </h1>
          
          <div className="space-y-8">
            <motion.section
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-aura-muted mb-3 italic">
                Obiettivo Di Distaccamento
              </h2>
              <p className="text-lg text-aura-ink/80 leading-relaxed font-medium">
                {exercise.objective}
              </p>
            </motion.section>

            <motion.section 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white/40 p-8 rounded-[40px] border border-white"
            >
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
            </motion.section>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="flex flex-col items-center justify-center p-8 rounded-[48px] bg-gradient-to-b from-white to-transparent shadow-xl shadow-aura-accent/5 border border-white min-h-[500px]"
        >
          <AnimatePresence mode="wait">
            {!isSessionActive && !showReflection ? (
              <motion.div 
                key="start"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center space-y-8 max-w-xs"
              >
                <div className="w-24 h-24 bg-aura-accent/5 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={48} className="text-aura-accent opacity-20" />
                </div>
                <h3 className="serif text-2xl font-bold italic">Pronto per iniziare?</h3>
                <p className="text-aura-muted text-sm leading-relaxed">
                  L'essenza di questo esercizio risiede nella tua presenza. Segui le istruzioni che hai appena letto e osserva ciò che accade dentro di te.
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
                className="w-full h-full flex flex-col items-center justify-between py-12 px-6 min-h-[500px] relative overflow-hidden"
              >
                {/* Atmospheric Background Layer */}
                <div className="absolute inset-0 -z-10 pointer-events-none">
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 45, 0],
                      opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-aura-accent blur-[80px] rounded-full"
                  />
                </div>

                <div className="text-center space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-aura-muted opacity-50">
                    Pratica in corso
                  </span>
                  <h3 className="serif text-xl italic text-aura-ink/60">{exercise.title}</h3>
                </div>

                {/* Breathing Guide / Presence Indicator */}
                <div className="flex flex-col items-center justify-center relative">
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="w-32 h-32 rounded-full border border-aura-accent/30 flex items-center justify-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-aura-accent/20 blur-md" />
                  </motion.div>
                  
                  {/* Immersive Audio Hint */}
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                    className="absolute -bottom-16 text-[10px] uppercase tracking-widest font-bold text-aura-accent/60 whitespace-nowrap"
                  >
                    Usa i suoni ambientali per restare nel flusso ↓
                  </motion.p>
                </div>

                <div className="w-full space-y-6">
                  {exercise.id === 'mappatura-automatismi' && (
                    <div className="w-full bg-white/40 p-1 rounded-3xl border border-white">
                      <Journal exerciseId={exercise.id} />
                    </div>
                  )}

                  <button 
                    className="w-full py-4 bg-white text-aura-ink rounded-2xl font-bold border border-white hover:border-aura-accent/20 transition-all flex items-center justify-center space-x-2 shadow-sm"
                    onClick={endSession}
                  >
                    <CircleStop size={18} className="text-aura-accent" />
                    <span>Ho completato la pratica</span>
                  </button>
                </div>
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

      <div className="pt-12 border-t border-aura-accent/5">
        <div className="flex justify-start">
          {renderBackButton()}
        </div>
      </div>
    </motion.div>
  );
};
