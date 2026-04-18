import React from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from './LucideIcon';
import { Exercise } from '../types';
import { Share2 } from 'lucide-react';

interface ExerciseCardProps {
  exercise: Exercise;
  onClick: () => void;
}

export const ExerciseCard = ({ exercise, onClick }: ExerciseCardProps) => {
  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `Prova questo esercizio di Aura: "${exercise.title}"`;
    const url = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({ title: exercise.title, text, url });
      } catch (err) { console.log(err); }
    } else {
      try {
        await navigator.clipboard.writeText(`${text} ${url}`);
        alert('Copiato!');
      } catch (err) { console.log(err); }
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      className="glass-card flex flex-col items-start p-6 rounded-3xl text-left transition-all hover:shadow-lg w-full group relative cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-aura-accent/50"
    >
      <div className="flex justify-between w-full mb-4">
        <div className="p-3 rounded-2xl bg-white shadow-sm transition-colors group-hover:bg-aura-accent group-hover:text-white text-aura-accent">
          <LucideIcon name={exercise.icon} size={24} />
        </div>
        <button 
          onClick={handleShare}
          className="p-2 transition-colors hover:text-aura-accent text-aura-muted/40 z-10"
        >
          <Share2 size={16} />
        </button>
      </div>
      
      <span className="text-[10px] uppercase tracking-widest font-semibold text-aura-muted mb-2">
        {exercise.category}
      </span>
      
      <h3 className="serif text-xl font-bold mb-2 group-hover:text-aura-accent transition-colors">
        {exercise.title}
      </h3>
      
      <p className="text-sm text-aura-muted line-clamp-2 leading-relaxed">
        {exercise.description}
      </p>
      
      <div className="mt-6 flex items-center text-xs font-semibold text-aura-accent opacity-0 group-hover:opacity-100 transition-opacity">
        Pratica <LucideIcon name="ChevronRight" size={14} className="ml-1" />
      </div>
    </motion.div>
  );
};
