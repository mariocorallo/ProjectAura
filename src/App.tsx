import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EXERCISES } from './constants';
import { Exercise, UserHistory, SortOption } from './types';
import { ExerciseCard } from './components/ExerciseCard';
import { ExerciseDetail } from './components/ExerciseDetail';
import { ScrollToTop } from './components/ScrollToTop';
import { Sparkles, History as HistoryIcon, Lightbulb, SortAsc } from 'lucide-react';

export default function App() {
  const [view, setView] = useState<'dashboard' | 'about' | 'bio' | 'tips'>('dashboard');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [activeCategory, setActiveCategory] = useState<Exercise['category'] | 'tutti'>('tutti');
  const [history, setHistory] = useState<UserHistory[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('default');

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
  }, [selectedExercise, activeCategory, view]);

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

  const sortedExercises = [...filteredExercises].sort((a, b) => {
    if (sortBy === 'alphabetical') {
      return a.title.localeCompare(b.title);
    }
    if (sortBy === 'duration') {
      return (a.timerSeconds || 0) - (b.timerSeconds || 0);
    }
    return 0; // default (original order)
  });

  const categories: { id: typeof activeCategory; label: string }[] = [
    { id: 'tutti', label: 'Tutti' },
    { id: 'consapevolezza', label: 'Consapevolezza' },
    { id: 'nutrimento', label: 'Rito del Nutrimento' },
    { id: 'creatività', label: 'Creatività' },
    { id: 'osservazione', label: 'Osservazione' },
    { id: 'ufficio', label: 'In Ufficio' },
    { id: 'spesa', label: 'Al Super' },
    { id: 'palestra', label: 'In Palestra' },
    { id: 'auto', label: 'In Auto' },
  ];

  const menuItems = [
    { id: 'dashboard', label: 'Esercizi' },
    { id: 'about', label: "Cos'è Aura" },
    { id: 'bio', label: 'Chi sono' },
    { id: 'tips', label: 'Consigli' },
  ] as const;

  return (
    <div className="min-h-screen bg-aura-bg selection:bg-aura-accent/20">
      <AnimatePresence mode="wait">
        {!selectedExercise ? (
          <motion.main
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-7xl mx-auto px-6 py-12 md:py-16"
          >
            {/* Minimal Navigation */}
            <nav className="flex justify-center mb-16">
              <div className="flex items-center p-1 bg-white/40 border border-white rounded-[24px] backdrop-blur-sm shadow-sm transition-all hover:bg-white/60">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setView(item.id)}
                    className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all ${
                      view === item.id 
                        ? 'bg-aura-accent text-white shadow-md shadow-aura-accent/10' 
                        : 'text-aura-muted hover:text-aura-accent'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </nav>

            <AnimatePresence mode="wait">
              {view === 'dashboard' ? (
                <motion.div
                  key="view-exercises"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {/* Header */}
                  <header className="mb-20 text-center max-w-2xl mx-auto">
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

                  {/* Filters & Sorting */}
                  <div className="flex flex-col items-center justify-center gap-6 mb-12">
                    <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl">
                      {categories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => setActiveCategory(cat.id)}
                          className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all border ${
                            activeCategory === cat.id
                              ? 'bg-aura-accent text-white border-aura-accent shadow-lg shadow-aura-accent/20'
                              : 'bg-white/40 text-aura-muted hover:bg-white hover:text-aura-accent border-white'
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>

                    {/* Sorting Dropdown */}
                    <div className="flex items-center space-x-3 px-6 py-2 bg-white/30 border border-white rounded-2xl backdrop-blur-md">
                      <SortAsc size={14} className="text-aura-muted" />
                      <select 
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as SortOption)}
                        className="bg-transparent text-[10px] font-bold text-aura-muted hover:text-aura-accent outline-none cursor-pointer uppercase tracking-[0.15em]"
                      >
                        <option value="default">Ordine Consigliato</option>
                        <option value="alphabetical">Alfabetico (A-Z)</option>
                        <option value="duration">Durata (Min-Max)</option>
                      </select>
                    </div>
                  </div>

                  {/* Grid */}
                  <motion.div 
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  >
                    <AnimatePresence mode="popLayout">
                      {sortedExercises.map((exercise, i) => (
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
                </motion.div>
              ) : view === 'about' ? (
                <motion.div
                  key="view-about"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="max-w-3xl mx-auto space-y-12"
                >
                  <header className="text-center">
                    <h2 className="serif text-5xl font-bold italic mb-6">Cos'è Aura</h2>
                    <p className="text-aura-muted font-serif italic text-lg">Un rifugio digitale per la mente moderna.</p>
                  </header>
                  <div className="prose prose-aura space-y-6 text-aura-ink/80 text-lg leading-relaxed">
                    <p>
                      Aura nasce come risposta alla <strong>iper-stimolazione</strong> del mondo contemporaneo. Viviamo in un'era di "massimo impulso e minima riflessione", dove algoritmi e marketing combattono per catturare ogni nostro secondo di attenzione.
                    </p>
                    <p>
                      Questo spazio non è un'app di produttività, né un social network. È uno <strong>strumento di decostruzione</strong>. Gli esercizi proposti servono a creare quella millimetrica distanza tra l'impulso (comprare, sbloccare il telefono, mangiare per noia) e l'azione.
                    </p>
                    <div className="bg-white/40 p-10 rounded-[48px] border border-white italic font-serif">
                      "Aura non ti chiede di cambiare chi sei, ma di osservare come reagisci. Nel distacco risiede la vera libertà di scelta."
                    </div>
                  </div>
                </motion.div>
              ) : view === 'bio' ? (
                <motion.div
                  key="view-bio"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="max-w-3xl mx-auto space-y-12"
                >
                  <header className="text-center">
                    <h2 className="serif text-5xl font-bold italic mb-6">Chi sono</h2>
                  </header>
                  <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="w-48 h-64 bg-aura-accent/10 rounded-[64px] border border-white flex-shrink-0 flex items-center justify-center overflow-hidden">
                      <img 
                        src="https://picsum.photos/seed/aura-bio/400/600" 
                        alt="Profilo"
                        className="w-full h-full object-cover grayscale opacity-80"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="space-y-6 text-aura-ink/80 text-lg leading-relaxed">
                      <p>
                        Sono uno sviluppatore e ricercatore appassionato di <strong>Digital Wellbeing</strong> e minimalismo cognitivo. Credo che la tecnologia debba essere un supporto alla vita umana, non un parassita dell'attenzione.
                      </p>
                      <p>
                        Ho creato Aura per me stesso, per combattere la stanchezza mentale derivante dal lavoro digitale costante. Oggi lo condivido con te, sperando che possa aiutarti a ritrovare il tuo "centro" in mezzo al rumore.
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="view-tips"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="max-w-3xl mx-auto space-y-12"
                >
                  <header className="text-center">
                    <h2 className="serif text-5xl font-bold italic mb-6">Consigli</h2>
                    <p className="text-aura-muted font-serif italic text-lg">Piccoli rituali per la tua pratica quotidiana.</p>
                  </header>
                  <div className="grid gap-6">
                    {[
                      { 
                        title: "La Regola dei 10 Minuti", 
                        desc: "Prima di ogni acquisto non pianificato o del check compulsivo delle email, respira e aspetta 10 minuti. Chiediti: ne ho davvero bisogno o è solo noia?" 
                      },
                      { 
                        title: "Zone No-Tech", 
                        desc: "Definisci uno spazio in casa (anche solo il letto o il tavolo da pranzo) dove il telefono è fisicamente bandito." 
                      },
                      { 
                        title: "Osserva la Noia", 
                        desc: "Quando sei in fila o aspetti qualcuno, non sbloccare il telefono. Osserva la tua impazienza come se fossi un ricercatore esterno." 
                      }
                    ].map((tip, i) => (
                      <div key={i} className="bg-white/40 p-8 rounded-[32px] border border-white hover:bg-white transition-all">
                        <h4 className="font-bold text-aura-accent text-sm uppercase tracking-wider mb-2">{tip.title}</h4>
                        <p className="text-aura-ink/70 leading-relaxed font-light">{tip.desc}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

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
      <ScrollToTop />
    </div>
  );
}
