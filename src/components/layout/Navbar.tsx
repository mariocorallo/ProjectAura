import React from 'react';
import { useAura } from '../../context/AuraContext';

export const Navbar: React.FC = () => {
  const { currentView, setView } = useAura();

  const menuItems = [
    { id: 'dashboard', label: 'Esercizi' },
    { id: 'about', label: "Cos'è Aura" },
    { id: 'bio', label: 'Chi sono' },
    { id: 'tips', label: 'Consigli' },
  ] as const;

  return (
    <nav className="flex justify-center mb-16 sticky top-8 z-50">
      <div className="flex items-center p-1 bg-white/40 border border-white rounded-[24px] backdrop-blur-md shadow-lg transition-all hover:bg-white/60">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all ${
              currentView === item.id 
                ? 'bg-aura-accent text-white shadow-md shadow-aura-accent/10' 
                : 'text-aura-muted hover:text-aura-accent'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
};
