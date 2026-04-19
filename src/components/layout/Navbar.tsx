import React, { useState, useEffect } from 'react';
import { useAura } from '../../context/AuraContext';
import { useAuraFeedback } from '../../hooks/useAuraFeedback';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentView, setView } = useAura();
  const { playSound } = useAuraFeedback();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Esercizi' },
    { id: 'about', label: "Cos'è Aura" },
    { id: 'bio', label: 'Chi sono' },
    { id: 'newsletter', label: 'Newsletter' },
    { id: 'suggestions', label: 'Suggerimenti' },
    { id: 'support', label: 'Sostienici' },
  ] as const;
  const handleNav = (id: typeof menuItems[number]['id']) => {
    playSound('tap');
    setView(id);
    setIsOpen(false);
  };

  const toggleMenu = () => {
    playSound('tap');
    setIsOpen(!isOpen);
  };

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <nav className="flex justify-center mb-16 sticky top-6 md:top-8 z-50 px-4">
      {/* Desktop Menu */}
      <div className="hidden md:flex items-center p-1 bg-white/40 border border-white rounded-[24px] backdrop-blur-md shadow-lg transition-all hover:bg-white/60">
        {menuItems.map((item) => (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            key={item.id}
            onClick={() => handleNav(item.id)}
            className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all ${
              currentView === item.id 
                ? 'bg-aura-accent text-white shadow-md shadow-aura-accent/10' 
                : 'text-aura-muted hover:text-aura-accent'
            }`}
          >
            {item.label}
          </motion.button>
        ))}
      </div>

      {/* Mobile Toggle Button */}
      <div className="md:hidden w-full flex justify-between items-center px-6 py-4 bg-white/40 border border-white rounded-[24px] backdrop-blur-md shadow-lg">
        <span className="serif italic font-bold text-aura-ink text-xl">Aura</span>
        <button 
          onClick={toggleMenu}
          className="p-2 text-aura-ink hover:text-aura-accent transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-aura-bg z-[60] md:hidden flex flex-col p-8 pt-24 overflow-y-auto"
          >
            <button 
              onClick={toggleMenu}
              className="absolute top-8 right-8 p-3 bg-white rounded-full shadow-sm text-aura-ink"
            >
              <X size={28} />
            </button>

            <div className="space-y-4">
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-aura-muted mb-8">Menu Navigazione</p>
              {menuItems.map((item) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  onClick={() => handleNav(item.id)}
                  className={`w-full text-left py-6 px-4 rounded-[32px] text-2xl serif italic font-bold transition-all flex items-center justify-between group ${
                    currentView === item.id 
                      ? 'text-aura-accent bg-white shadow-xl shadow-aura-accent/5 scale-105' 
                      : 'text-aura-ink/60'
                  }`}
                >
                  <span>{item.label}</span>
                  {currentView === item.id && (
                    <motion.div layoutId="mobile-dot" className="w-2 h-2 bg-aura-accent rounded-full" />
                  )}
                </motion.button>
              ))}
            </div>

            <div className="mt-auto pt-12 text-center text-[10px] uppercase tracking-widest text-aura-muted opacity-40">
              Aura — Esercizi di Presenza
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
