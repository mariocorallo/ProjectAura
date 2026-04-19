import React from 'react';
import { useAura } from '../../context/AuraContext';
import { useAuraFeedback } from '../../hooks/useAuraFeedback';
import { motion } from 'motion/react';

export const Navbar: React.FC = () => {
  const { currentView, setView } = useAura();
  const { playSound } = useAuraFeedback();

  const menuItems = [
    { id: 'dashboard', label: 'Esercizi' },
    { id: 'about', label: "Cos'è Aura" },
    { id: 'bio', label: 'Chi sono' },
    { id: 'tips', label: 'Consigli' },
    { id: 'support', label: 'Sostienici' },
  ] as const;

  const handleNav = (id: typeof menuItems[number]['id']) => {
    playSound('tap');
    setView(id);
  };

  return (
    <nav className="flex justify-center mb-16 sticky top-8 z-50">
      <div className="flex items-center p-1 bg-white/40 border border-white rounded-[24px] backdrop-blur-md shadow-lg transition-all hover:bg-white/60">
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
    </nav>
  );
};
