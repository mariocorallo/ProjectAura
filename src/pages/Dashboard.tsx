import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAura } from '../context/AuraContext';
import { useAuraFeedback } from '../hooks/useAuraFeedback';
import { EXERCISES } from '../constants';
import { ExerciseCard } from '../components/ExerciseCard';
import { Newsletter } from '../components/Newsletter';
import { 
  Search, 
  Sparkles, 
  X, 
  History as HistoryIcon,
  LayoutGrid,
  Zap,
  Utensils,
  Palette,
  Eye,
  Briefcase,
  ShoppingBag,
  Dumbbell,
  Car
} from 'lucide-react';

export const Dashboard: React.FC<{ 
  onOpenDrawer: () => void;
  onOpenNotes: () => void;
}> = ({ onOpenDrawer, onOpenNotes }) => {
  const { 
    searchQuery, setSearch, 
    activeCategory, setCategory, 
    selectExercise,
    trackClick
  } = useAura();
  const { playSound } = useAuraFeedback();

  const handleOpenNotes = () => {
    playSound('tap');
    trackClick('Dashboard', 'Open Notes');
    onOpenNotes();
  };

  const handleCategory = (id: string) => {
    playSound('tap');
    trackClick('Dashboard', `Filter Category: ${id}`);
    setCategory(id);
  };

  const handleSearch = (val: string) => {
    if (val.length > searchQuery.length) playSound('tap');
    setSearch(val);
  };

  const filteredExercises = EXERCISES
    .filter(e => activeCategory === 'tutti' || e.category === activeCategory)
    .filter(e => 
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      e.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const categories = [
    { id: 'tutti', label: 'Tutti', icon: LayoutGrid },
    { id: 'everyday', label: 'EVERYDAY', icon: Zap },
    { id: 'consapevolezza', label: 'Consapevolezza', icon: Zap },
    { id: 'a pranzo', label: 'A Pranzo', icon: Utensils },
    { id: 'creatività', label: 'Creatività', icon: Palette },
    { id: 'osservazione', label: 'Osservazione', icon: Eye },
    { id: 'ufficio', label: 'In Ufficio', icon: Briefcase },
    { id: 'spesa', label: 'Al Super', icon: ShoppingBag },
    { id: 'palestra', label: 'In Palestra', icon: Dumbbell },
    { id: 'auto', label: 'In Auto', icon: Car },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="max-w-7xl mx-auto"
    >
      {/* Header */}
      <header 
        className={`transition-all duration-700 ease-in-out text-center max-w-2xl mx-auto ${
          searchQuery ? 'mb-6 scale-90 opacity-40' : 'mb-20'
        }`}
      >
        <AnimatePresence mode="wait">
          {!searchQuery ? (
            <motion.div
              key="full-header"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h1 className="serif text-5xl md:text-7xl font-bold mb-8 italic tracking-tight text-aura-ink">
                Aura
              </h1>
              <p className="text-sm md:text-base text-aura-muted leading-relaxed font-light font-serif italic mb-10 px-4 max-w-lg mx-auto whitespace-pre-line">
                Ti aiuto a disinnescare il pilota automatico.{"\n"}
                Aura è un insieme di piccoli esercizi quotidiani per spezzare la compulsione digitale e riprendere il comando della tua attenzione.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button 
                  onClick={() => { trackClick('Dashboard', 'Open Drawer'); onOpenDrawer(); }}
                  className="inline-flex items-center space-x-2 px-6 py-3 rounded-2xl bg-white border border-white shadow-sm hover:border-aura-accent/20 hover:bg-aura-accent/5 transition-all group"
                >
                  <Sparkles size={16} className="text-aura-accent group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-aura-muted group-hover:text-aura-accent">Scopri Consigli & Storia</span>
                </button>

                <button 
                  onClick={handleOpenNotes}
                  className="inline-flex items-center space-x-2 px-6 py-3 rounded-2xl bg-white border border-white shadow-sm hover:border-aura-accent/20 hover:bg-aura-accent/5 transition-all group"
                >
                  <HistoryIcon size={16} className="text-aura-accent group-hover:rotate-12 transition-transform" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-aura-muted group-hover:text-aura-accent">Le tue note</span>
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="compact-header"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="pt-4"
            >
              <h1 className="serif text-3xl font-bold italic tracking-tight text-aura-ink">
                Aura
              </h1>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto w-full mb-12">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
            <Search size={18} className="text-aura-muted group-focus-within:text-aura-accent transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Cerca un esercizio per titolo o descrizione..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-14 pr-14 py-5 bg-white/40 border-2 border-white rounded-[32px] backdrop-blur-md text-aura-ink placeholder:text-aura-muted/50 focus:outline-none focus:border-aura-accent/30 focus:bg-white/60 transition-all shadow-xl shadow-aura-accent/5"
          />
          {searchQuery && (
            <button
              onClick={() => setSearch('')}
              className="absolute inset-y-0 right-0 pr-6 flex items-center text-aura-muted hover:text-aura-accent transition-colors"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col items-center justify-center gap-6 mb-12">
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategory(cat.id)}
              className={`px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all border flex items-center gap-2 ${
                activeCategory === cat.id
                  ? 'bg-aura-accent text-white border-aura-accent shadow-lg shadow-aura-accent/20'
                  : 'bg-white/40 text-aura-muted hover:bg-white hover:text-aura-accent border-white'
              }`}
            >
              <cat.icon size={14} className={activeCategory === cat.id ? 'text-white' : 'text-aura-accent/60'} />
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <AnimatePresence mode="popLayout">
        {filteredExercises.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
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
                  onClick={() => { playSound('click'); selectExercise(exercise); }} 
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 px-6 bg-white/20 border-2 border-dashed border-white/40 rounded-[48px] backdrop-blur-sm"
          >
            <div className="w-16 h-16 bg-white/40 rounded-full flex items-center justify-center mx-auto mb-6 text-aura-muted">
              <Search size={32} />
            </div>
            <h3 className="serif text-2xl font-bold italic mb-2 text-aura-ink">Nessun esercizio trovato</h3>
            <p className="text-aura-muted max-w-md mx-auto">
              Non abbiamo trovato esercizi che corrispondano alla tua ricerca "{searchQuery}" nella categoria selezionata.
            </p>
            <button 
              onClick={() => { setSearch(''); setCategory('tutti'); }}
              className="mt-8 text-xs font-bold uppercase tracking-widest text-aura-accent hover:underline"
            >
              Resetta tutti i filtri
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {!searchQuery && activeCategory === 'tutti' && (
        <Newsletter />
      )}
    </motion.div>
  );
};
