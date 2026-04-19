import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, X } from 'lucide-react';
import { useAura } from '../context/AuraContext';
import { useAuraFeedback } from '../hooks/useAuraFeedback';
import { Newsletter } from './Newsletter';

export const NewsletterFloating: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { playSound } = useAuraFeedback();
  const { currentView } = useAura();

  // Non mostriamo il FAB se siamo già nella vista newsletter o se l'utente sta facendo un esercizio
  if (currentView === 'newsletter') return null;

  return (
    <>
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          setIsOpen(true);
          playSound('tap');
        }}
        className="fixed bottom-8 left-8 w-14 h-14 bg-aura-ink text-white rounded-full flex items-center justify-center shadow-2xl z-[40] border border-white/20"
      >
        <Mail size={24} />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-aura-accent rounded-full animate-pulse" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-aura-bg/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white/90 rounded-[48px] shadow-2xl border border-white overflow-hidden p-2"
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 p-2 text-aura-muted hover:text-aura-ink z-20"
              >
                <X size={20} />
              </button>
              
              <div className="max-h-[85vh] overflow-y-auto pt-6 px-2">
                <Newsletter />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
