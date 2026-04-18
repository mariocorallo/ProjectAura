import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, History as HistoryIcon, Lightbulb } from 'lucide-react';
import { Exercise } from '../types';

interface SuggestionsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  recentExercises: Exercise[];
  recommendedExercises: Exercise[];
  onSelectExercise: (exercise: Exercise) => void;
}

export const SuggestionsDrawer = ({ 
  isOpen, 
  onClose, 
  recentExercises, 
  recommendedExercises, 
  onSelectExercise 
}: SuggestionsDrawerProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-aura-ink/10 backdrop-blur-sm z-[60]"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-sm bg-white/90 backdrop-blur-xl border-l border-white shadow-2xl z-[70] p-8 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-10">
              <h2 className="serif text-2xl font-bold italic">Discovery</h2>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-aura-accent/5 rounded-full transition-colors text-aura-muted"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-12">
              {/* Recent Section */}
              {recentExercises.length > 0 && (
                <section>
                  <div className="flex items-center space-x-2 text-aura-muted mb-6">
                    <HistoryIcon size={16} />
                    <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold">Ultimi Praticati</h3>
                  </div>
                  <div className="space-y-3">
                    {recentExercises.map(ex => (
                      <button 
                        key={`drawer-recent-${ex.id}`}
                        onClick={() => {
                          onSelectExercise(ex);
                          onClose();
                        }}
                        className="w-full flex items-center p-4 bg-white border border-white rounded-2xl hover:border-aura-accent/20 hover:bg-aura-accent/5 transition-all text-left group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-aura-accent/10 text-aura-accent flex items-center justify-center mr-3 group-hover:bg-aura-accent group-hover:text-white transition-colors">
                          <Sparkles size={14} />
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-aura-ink leading-tight">{ex.title}</h4>
                          <span className="text-[9px] text-aura-muted uppercase tracking-wider">{ex.category}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </section>
              )}

              {/* Recommended Section */}
              <section>
                <div className="flex items-center space-x-2 text-aura-muted mb-6">
                  <Lightbulb size={16} />
                  <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold">Consigliati per te</h3>
                </div>
                <div className="space-y-3">
                  {recommendedExercises.map(ex => (
                    <button 
                      key={`drawer-rec-${ex.id}`}
                      onClick={() => {
                        onSelectExercise(ex);
                        onClose();
                      }}
                      className="w-full flex items-center p-4 bg-aura-accent/5 border border-aura-accent/10 rounded-2xl hover:bg-aura-accent/10 transition-all text-left group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-white text-aura-accent flex items-center justify-center mr-3 shadow-sm">
                        <Sparkles size={14} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-xs text-aura-ink leading-tight truncate">{ex.title}</h4>
                        <p className="text-[9px] text-aura-muted line-clamp-1 italic">
                          {ex.objective.slice(0, 35)}...
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
