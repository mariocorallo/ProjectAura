import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { doc, getDoc, setDoc, collection, onSnapshot, query, serverTimestamp } from 'firebase/firestore';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut, User } from 'firebase/auth';
import { db, auth } from './lib/firebase';
import { EXERCISES } from './constants';
import { Exercise, UserHistory } from './types';
import { ExerciseCard } from './components/ExerciseCard';
import { ExerciseDetail } from './components/ExerciseDetail';
import { ScrollToTop } from './components/ScrollToTop';
import { SuggestionsDrawer } from './components/SuggestionsDrawer';
import { Sparkles, History as HistoryIcon, Lightbulb, Search, X, LogIn, LogOut, User as UserIcon } from 'lucide-react';

export default function App() {
  const [view, setView] = useState<'dashboard' | 'about' | 'bio' | 'tips' | 'support'>('dashboard');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [activeCategory, setActiveCategory] = useState<Exercise['category'] | 'tutti'>('tutti');
  const [history, setHistory] = useState<UserHistory[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isSupporter, setIsSupporter] = useState(false);

  // Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
      
      if (currentUser) {
        // Sync Profile
        const userRef = doc(db, 'users', currentUser.uid);
        const profile = await getDoc(userRef);
        if (!profile.exists()) {
          await setDoc(userRef, {
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
            isSupporter: false,
            createdAt: serverTimestamp()
          });
          setIsSupporter(false);
        } else {
          setIsSupporter(profile.data()?.isSupporter || false);
        }

        // Real-time History sync
        const historyRef = collection(db, 'users', currentUser.uid, 'history');
        const q = query(historyRef);
        const unsubHistory = onSnapshot(q, (snapshot) => {
          const cloudHistory = snapshot.docs.map(doc => doc.data() as UserHistory);
          setHistory(cloudHistory);
        });
        return () => unsubHistory();
      } else {
        // Fallback to local storage if not logged in
        const saved = localStorage.getItem('aura-history');
        if (saved) setHistory(JSON.parse(saved));
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleLogout = () => signOut(auth);

  const updateHistory = async (id: string, completed = false) => {
    if (user) {
      const historyRef = doc(db, 'users', user.uid, 'history', id);
      const existingDoc = await getDoc(historyRef);
      const data = existingDoc.exists() ? existingDoc.data() : { completedCount: 0 };
      
      await setDoc(historyRef, {
        exerciseId: id,
        lastAccessed: Date.now(),
        completedCount: data.completedCount + (completed ? 1 : 0)
      }, { merge: true });
    } else {
      // Offline fallback
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
    }
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

  const filteredExercises = EXERCISES
    .filter(e => activeCategory === 'tutti' || e.category === activeCategory)
    .filter(e => 
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      e.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const categories: { id: typeof activeCategory; label: string }[] = [
    { id: 'tutti', label: 'Tutti' },
    { id: 'consapevolezza', label: 'Consapevolezza' },
    { id: 'a pranzo', label: 'A Pranzo' },
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
    { id: 'support', label: 'Sostienici' },
  ] as const;

  const handleSupport = async () => {
    if (!user) {
      handleLogin();
      return;
    }
    // Simulation: in a real app, this would be a link to Stripe/BMAC 
    // and a webhook would update the database. For demo, we toggle locally.
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, { isSupporter: !isSupporter }, { merge: true });
    setIsSupporter(!isSupporter);

    // Redirect to coffee (in real case)
    if (!isSupporter) {
      window.open('https://www.buymeacoffee.com/', '_blank');
    }
  };

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
            <nav className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
              <div className="flex-1 hidden md:block" />
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
              <div className="flex-1 flex justify-end">
                {authLoading ? (
                  <div className="w-8 h-8 rounded-full bg-white/20 animate-pulse" />
                ) : user ? (
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={handleLogout}
                      className="text-[10px] font-bold uppercase tracking-widest text-aura-muted hover:text-aura-accent transition-colors flex items-center gap-2"
                    >
                      <LogOut size={14} />
                      <span className="hidden sm:inline">Esci</span>
                    </button>
                    <div className="w-8 h-8 rounded-full border border-white overflow-hidden shadow-sm relative">
                      {user.photoURL ? (
                        <img src={user.photoURL} alt={user.displayName || 'Utente'} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      ) : (
                        <div className="w-full h-full bg-aura-accent/10 flex items-center justify-center text-aura-accent">
                          <UserIcon size={16} />
                        </div>
                      )}
                      {isSupporter && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 border border-white rounded-full flex items-center justify-center text-[6px] text-white font-bold">
                          ★
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <button 
                    onClick={handleLogin}
                    className="flex items-center gap-2 px-5 py-2 bg-white text-aura-ink rounded-full text-[10px] font-bold uppercase tracking-[0.2em] border border-white shadow-sm hover:shadow-md transition-all active:scale-95"
                  >
                    <LogIn size={14} className="text-aura-accent" />
                    <span>Accedi</span>
                  </button>
                )}
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
                          <h1 className="serif text-5xl md:text-7xl font-bold mb-8 italic tracking-tight">
                            Aura
                          </h1>
                          <p className="text-sm md:text-base text-aura-muted leading-relaxed font-light font-serif italic mb-10 px-4 max-w-lg mx-auto whitespace-pre-line">
                            Ti aiuto a disinnescare il pilota automatico.{"\n"}
                            Aura è un insieme di piccoli esercizi quotidiani per spezzare la compulsione digitale e riprendere il comando della tua attenzione.
                          </p>
                          <button 
                            onClick={() => setIsDrawerOpen(true)}
                            className="inline-flex items-center space-x-2 px-6 py-3 rounded-2xl bg-white border border-white shadow-sm hover:border-aura-accent/20 hover:bg-aura-accent/5 transition-all group"
                          >
                            <Sparkles size={16} className="text-aura-accent group-hover:scale-110 transition-transform" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-aura-muted group-hover:text-aura-accent">Scopri Consigli & Storia</span>
                          </button>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="compact-header"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="pt-4"
                        >
                          <h1 className="serif text-3xl font-bold italic tracking-tight">
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
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-14 pr-14 py-5 bg-white/40 border-2 border-white rounded-[32px] backdrop-blur-md text-aura-ink placeholder:text-aura-muted/50 focus:outline-none focus:border-aura-accent/30 focus:bg-white/60 transition-all shadow-xl shadow-aura-accent/5"
                      />
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery('')}
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
                  </div>

                  {/* Grid */}
                  {filteredExercises.length > 0 ? (
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
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-20 px-6 bg-white/20 border-2 border-dashed border-white/40 rounded-[48px] backdrop-blur-sm"
                    >
                      <div className="w-16 h-16 bg-white/40 rounded-full flex items-center justify-center mx-auto mb-6 text-aura-muted">
                        <Search size={32} />
                      </div>
                      <h3 className="serif text-2xl font-bold italic mb-2">Nessun esercizio trovato</h3>
                      <p className="text-aura-muted max-w-md mx-auto">
                        Non abbiamo trovato esercizi che corrispondano alla tua ricerca "{searchQuery}" nella categoria selezionata.
                      </p>
                      <button 
                        onClick={() => { setSearchQuery(''); setActiveCategory('tutti'); }}
                        className="mt-8 text-xs font-bold uppercase tracking-widest text-aura-accent hover:underline"
                      >
                        Resetta tutti i filtri
                      </button>
                    </motion.div>
                  )}
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
              ) : view === 'tips' ? (
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
              ) : (
                <motion.div
                  key="view-support"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  className="max-w-4xl mx-auto space-y-16"
                >
                  <header className="text-center space-y-6">
                    <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-aura-muted">Manifesto di Sostegno</span>
                    <h2 className="serif text-5xl md:text-7xl font-bold italic tracking-tight">Supporta Aura</h2>
                    <p className="text-aura-muted font-serif italic text-lg max-w-xl mx-auto leading-relaxed">
                      Aura è uno strumento gratuito e senza pubblicità. Il tuo supporto mi permette di dedicare tempo alla creazione di nuovi esercizi e al mantenimento di questo spazio.
                    </p>
                  </header>

                  <div className="grid md:grid-cols-2 gap-12 items-start">
                    <div className="bg-white/40 p-12 rounded-[56px] border border-white shadow-xl shadow-aura-accent/5 space-y-8">
                      <h3 className="serif text-2xl italic font-bold">Perché sostenerci?</h3>
                      <div className="space-y-6">
                        {[
                          { title: "Indipendenza", desc: "Niente algoritmi, niente marketing compulsivo. Solo esercizi puri." },
                          { title: "Tempo", desc: "Ogni caffè sostiene la ricerca e lo sviluppo di nuove pratiche di distacco." },
                          { title: "Valore", desc: "Supporti un approccio umano e minimale alla tecnologia." }
                        ].map((item, i) => (
                          <div key={i} className="flex gap-4">
                            <div className="w-6 h-6 rounded-full bg-aura-accent/10 flex-shrink-0 flex items-center justify-center text-aura-accent text-[10px] font-bold">
                              {i+1}
                            </div>
                            <div>
                              <h4 className="font-bold text-xs uppercase tracking-wider mb-1">{item.title}</h4>
                              <p className="text-aura-muted text-sm leading-relaxed">{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <button 
                        onClick={handleSupport}
                        className="w-full py-5 bg-aura-accent text-white rounded-3xl font-bold text-sm uppercase tracking-widest shadow-lg shadow-aura-accent/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                      >
                        <LogIn size={18} />
                        {isSupporter ? 'Hai già sostenuto (Grazie!)' : 'Offrimi un caffè'}
                      </button>
                    </div>

                    <div className="space-y-8 pt-6">
                      <h3 className="serif text-2xl italic font-bold">I "Perks" per te</h3>
                      <div className="grid gap-6">
                        {[
                          { icon: "★", title: "Supporter Badge", desc: "Un segno di distinzione sul tuo profilo Aura." },
                          { icon: "✧", title: "Aura Gold", desc: "Sblocca temi visivi e animazioni esclusive (in arrivo)." },
                          { icon: "✎", title: "Muro della Gratitudine", desc: "Il tuo nome nella lista di chi crede nel progetto." }
                        ].map((perk, i) => (
                          <div key={i} className="flex gap-6 p-6 bg-white/20 rounded-3xl border border-white/40 hover:bg-white/40 transition-colors">
                            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-aura-accent text-xl shadow-sm">
                              {perk.icon}
                            </div>
                            <div>
                              <h4 className="font-bold text-sm mb-1">{perk.title}</h4>
                              <p className="text-aura-muted text-xs leading-relaxed">{perk.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="p-8 bg-aura-accent/5 rounded-[40px] border border-aura-accent/10 italic font-serif text-aura-muted text-sm leading-relaxed">
                        "Non è una transazione, è una condivisione di valori. Grazie per aiutarmi a mantenere Aura uno spazio protetto."
                      </div>
                    </div>
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
      <SuggestionsDrawer 
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        recentExercises={recentExercises}
        recommendedExercises={recommendedExercises}
        onSelectExercise={setSelectedExercise}
      />
    </div>
  );
}
