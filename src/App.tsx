import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { AuraProvider, useAura } from './context/AuraContext';
import { Dashboard } from './pages/Dashboard';
import { About } from './pages/About';
import { Bio } from './pages/Bio';
import { Suggestions } from './pages/Suggestions';
import { Support } from './pages/Support';
import { Legal } from './pages/Legal';
import { ExerciseDetail } from './components/ExerciseDetail';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { SuggestionsDrawer } from './components/SuggestionsDrawer';
import { NotesDrawer } from './components/NotesDrawer';
import { CelebrationOverlay } from './components/CelebrationOverlay';
import { NewsletterFloating } from './components/NewsletterFloating';
import { Newsletter } from './components/Newsletter';
import { EXERCISES } from './constants';
import { Exercise } from './types';

function DebugLog() {
  const [logs, setLogs] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const originalError = console.error;
    const originalLog = console.log;

    console.error = (...args) => {
      setLogs(prev => [...prev, `[ERROR] ${args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')}`].slice(-10));
      originalError.apply(console, args);
    };

    console.log = (...args) => {
      setLogs(prev => [...prev, `[LOG] ${args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')}`].slice(-10));
      originalLog.apply(console, args);
    };

    const handleGlobalError = (e: ErrorEvent) => {
      setLogs(prev => [...prev, `[GLB ERROR] ${e.message}`].slice(-10));
    };

    window.addEventListener('error', handleGlobalError);
    return () => {
      console.error = originalError;
      console.log = originalLog;
      window.removeEventListener('error', handleGlobalError);
    };
  }, []);

  if (logs.length === 0 && !isVisible) return null;

  return (
    <div className="fixed top-0 left-0 z-[9999] p-2 pointer-events-none">
      <button 
        onClick={() => setIsVisible(!isVisible)}
        className="pointer-events-auto bg-black/80 text-white text-[8px] px-2 py-1 rounded-lg backdrop-blur-sm border border-white/20"
      >
        {isVisible ? 'Chiudi Debug' : 'Debug'}
      </button>
      {isVisible && (
        <div className="mt-2 bg-black/90 text-[10px] text-green-400 p-4 rounded-2xl max-w-[280px] pointer-events-auto font-mono shadow-2xl border border-white/10">
          <div className="flex justify-between items-center mb-2 border-b border-white/10 pb-1">
            <span className="text-white/40 uppercase tracking-widest text-[8px]">Session Logs</span>
            <button onClick={() => setLogs([])} className="text-[8px] text-white/40 hover:text-white uppercase">Pulisci</button>
          </div>
          <div className="space-y-1 overflow-y-auto max-h-[200px]">
            {logs.map((log, i) => (
              <div key={i} className="mb-1 break-words leading-tight">{log}</div>
            ))}
            {logs.length === 0 && <div className="text-white/20 italic">Nessun log intercettato...</div>}
          </div>
        </div>
      )}
    </div>
  );
}

function AppContent() {
  const { 
    currentView, 
    selectedExercise, 
    selectExercise, 
    history, 
    completeExercise 
  } = useAura();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView, selectedExercise]);

  const recentExercises = history
    .sort((a, b) => b.lastAccessed - a.lastAccessed)
    .slice(0, 3)
    .map(h => EXERCISES.find(e => e.id === h.exerciseId))
    .filter((e): e is Exercise => !!e);

  const recommendedExercises = EXERCISES
    .filter(e => !history.some(h => h.exerciseId === e.id))
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-aura-bg selection:bg-aura-accent/20">
      <AnimatePresence mode="wait">
        {!selectedExercise ? (
          <div key="main-shell" className="max-w-7xl mx-auto px-6 py-12 md:py-16">
            <Navbar />
            
            <AnimatePresence mode="wait">
              {currentView === 'dashboard' && (
                <Dashboard 
                  key="dashboard" 
                  onOpenDrawer={() => setIsDrawerOpen(true)} 
                  onOpenNotes={() => setIsNotesOpen(true)}
                />
              )}
              {currentView === 'about' && <About key="about" />}
              {currentView === 'bio' && <Bio key="bio" />}
              {currentView === 'suggestions' && <Suggestions key="suggestions" />}
              {currentView === 'support' && <Support key="support" />}
              {currentView === 'newsletter' && <Newsletter key="newsletter" isView={true} />}
              {currentView === 'privacy' && <Legal key="privacy" type="privacy" />}
              {currentView === 'cookie-policy' && <Legal key="cookie" type="cookie" />}
            </AnimatePresence>

            <Footer />
          </div>
        ) : (
          <div key="detail-shell">
            <ExerciseDetail 
              exercise={selectedExercise} 
              onBack={() => selectExercise(null)} 
              onComplete={(id) => completeExercise(id)}
            />
          </div>
        )}
      </AnimatePresence>

      <ScrollToTop />
      <CelebrationOverlay />
      <NewsletterFloating />
      <DebugLog />
      <SuggestionsDrawer 
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        recentExercises={recentExercises}
        recommendedExercises={recommendedExercises}
        onSelectExercise={selectExercise}
      />
      <NotesDrawer 
        isOpen={isNotesOpen}
        onClose={() => setIsNotesOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuraProvider>
      <AppContent />
    </AuraProvider>
  );
}
