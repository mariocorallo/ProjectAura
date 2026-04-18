import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EXERCISES } from './constants';
import { Exercise, UserHistory } from './types';
import { ExerciseCard } from './components/ExerciseCard';
import { ExerciseDetail } from './components/ExerciseDetail';
import { Sparkles, History as HistoryIcon, Lightbulb } from 'lucide-react';

export default function App() {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [activeCategory, setActiveCategory] = useState<Exercise['category'] | 'tutti'>('tutti');
  const [history, setHistory] = useState<UserHistory[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('aura-history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const updateHistory = (id: string, completed = false) => {
    setHistory(prev => {
      const existing = prev.find(h => h.exerciseId === id);
      const updated = existing 
        ? prev.map(h => h.exerciseId === id 
            ? { ...h, lastAccessed: Date.now(), completedCount: h.completedCount + (completed ? 1 : 0) } 
            : h)
        : [...prev, { exerciseId: id as any, lastAccessed: Date.now(), completedCount: completed ? 1 : 0 }];
      
      const limited = updated.sort((a, b) => b.lastAccessed - a.lastAccessed).slice(0, 50);
      localStorage.setItem('aura-history', JSON.stringify(limited));
      return limited;
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (selectedExercise) {
      updateHistory(selectedExercise.id);
    }
  }, [selectedExercise, activeCategory]);

  const recentExercises = history
    .sort((a, b) => b.lastAccessed - a.lastAccessed)
    .slice(0, 3)
    .map(h => EXERCISES.find(e => e.id === h.exerciseId))
    .filter((e): e is Exercise => !!e);

  const recommendedExercises = EXERCISES
    .filter(e => !history.some(h => h.exerciseId === e.id))
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  const filteredExercises = activeCategory === 'tutti' 
    ? EXERCISES 
    : EXERCISES.filter(e => e.category === activeCategory);

  const categories: { id: typeof activeCategory; label: string }[] = [
    { id: 'tutti', label: 'Tutti' },
    { id: 'consapevolezza', label: 'Consapevolezza' },
    { id: 'nutrimento', label: 'Rito del Nutrimento' },
    { id: 'creatività', label: 'Creatività' },
    { id: 'osservazione', label: 'Osservazione' },
  ];

  return (
    <div className="min-h-screen bg-aura-bg selection:bg-aura-accent/20">
      <AnimatePresence mode="wait">
        {!selectedExercise ? (
          <motion.main
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-7xl mx-auto px-6 py-16 md:py-24"
          >
            {/* Header */}
            <header className="mb-20 text-center max-w-2xl mx-auto">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-aura-accent/10 text-aura-accent text-[10px] font-bold uppercase tracking-[0.2em] mb-8"
              >
                <Sparkles size={12} />
                <span>Percorso di Consapevolezza</span>
              </motion.div>
              
              <h1 className="serif text-5xl md:text-7xl font-bold mb-8 italic tracking-tight">
                Aura
              </h1>
              
              <p className="text-lg md:text-xl text-aura-muted leading-relaxed font-light font-serif italic">
                "Il distacco non è mancanza di interesse, ma la capacità di non farsi dominare dall'impulso."
              </p>
            </header>

            {/* Personalized Sections */}
            {history.length > 0 && activeCategory === 'tutti' && (
              <div className="grid md:grid-cols-2 gap-12 mb-20">
                {/* Highlights: Recent */}
                <section>
                  <div className="flex items-center space-x-2 text-aura-muted mb-6">
                    <HistoryIcon size={16} />
                    <h2 className="text-xs uppercase tracking-[0.2em] font-bold">Ultimi Praticati</h2>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    {recentExercises.map(ex => (
                      <button 
                        key={`recent-${ex.id}`}
                        onClick={() => setSelectedExercise(ex)}
                        className="flex items-center p-4 bg-white/40 border border-white rounded-2xl hover:bg-white transition-all text-left group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-aura-accent/10 text-aura-accent flex items-center justify-center mr-4 group-hover:bg-aura-accent group-hover:text-white transition-colors">
                          <Sparkles size={18} />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-aura-ink leading-tight">{ex.title}</h4>
                          <span className="text-[10px] text-aura-muted uppercase tracking-wider">{ex.category}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </section>

                {/* Highlights: Recommended */}
                <section>
                  <div className="flex items-center space-x-2 text-aura-muted mb-6">
                    <Lightbulb size={16} />
                    <h2 className="text-xs uppercase tracking-[0.2em] font-bold">Consigliati per te</h2>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    {recommendedExercises.map(ex => (
                      <button 
                        key={`rec-${ex.id}`}
                        onClick={() => setSelectedExercise(ex)}
                        className="flex items-center p-4 bg-aura-accent/5 border border-aura-accent/10 rounded-2xl hover:bg-aura-accent/10 transition-all text-left group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-white text-aura-accent flex items-center justify-center mr-4 shadow-sm">
                          <Sparkles size={18} />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-aura-ink leading-tight">{ex.title}</h4>
                          <p className="text-[10px] text-aura-muted line-clamp-1">Nuova prospettiva: {ex.objective.slice(0, 40)}...</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {/* Filters */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${
                    activeCategory === cat.id
                      ? 'bg-aura-accent text-white shadow-lg shadow-aura-accent/20'
                      : 'bg-white/50 text-aura-muted hover:bg-white hover:text-aura-accent border border-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Grid */}
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredExercises.map((exercise, i) => (
                  <motion.div
                    key={exercise.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: i * 0.02 }}
                  >
                    <ExerciseCard 
                      exercise={exercise} 
                      onClick={() => setSelectedExercise(exercise)} 
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Footer */}
            <footer className="mt-24 pt-12 border-t border-aura-muted/10 text-center">
              <p className="text-[10px] uppercase tracking-widest font-bold text-aura-muted opacity-50">
                Creato per la decostruzione della compulsione moderna
              </p>
            </footer>
          </motion.main>
        ) : (
          <motion.div
            key="detail"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            <ExerciseDetail 
              exercise={selectedExercise} 
              onBack={() => setSelectedExercise(null)} 
              onComplete={(id) => updateHistory(id, true)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
