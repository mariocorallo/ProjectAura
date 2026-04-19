import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { useAura } from '../context/AuraContext';

export const CelebrationOverlay: React.FC = () => {
  const { isCelebrating } = useAura();

  return (
    <AnimatePresence>
      {isCelebrating && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 pointer-events-none z-[100] flex items-center justify-center overflow-hidden"
        >
          {/* Subtle Ambient Glow */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.5, opacity: 0.3 }}
            exit={{ opacity: 0 }}
            className="absolute w-[500px] h-[500px] bg-aura-accent rounded-full blur-[120px]"
          />

          {/* Sparkles / Particles */}
          <div className="relative">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  opacity: 0, 
                  scale: 0,
                  x: 0,
                  y: 0 
                }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0, 1.2, 0.8],
                  x: (Math.random() - 0.5) * 400,
                  y: (Math.random() - 0.5) * 400,
                  rotate: Math.random() * 360
                }}
                transition={{ 
                  duration: 2.5,
                  delay: i * 0.1,
                  ease: "easeOut"
                }}
                className="absolute"
              >
                <Sparkles className="text-aura-accent w-6 h-6" />
              </motion.div>
            ))}
          </div>

          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="bg-white/90 backdrop-blur-xl px-12 py-6 rounded-full shadow-2xl border border-white flex items-center gap-4"
          >
            <div className="w-10 h-10 bg-aura-accent/20 rounded-full flex items-center justify-center">
              <Sparkles className="text-aura-accent w-5 h-5" />
            </div>
            <p className="text-aura-dark font-serif text-xl">Momento di consapevolezza raggiunto</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
