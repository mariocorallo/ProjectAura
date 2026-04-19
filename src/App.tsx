import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { AuraProvider, useAura } from './context/AuraContext';
import { Dashboard } from './pages/Dashboard';
import { About } from './pages/About';
import { Bio } from './pages/Bio';
import { Suggestions } from './pages/Suggestions';
import { Support } from './pages/Support';
import { ExerciseDetail } from './components/ExerciseDetail';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { SuggestionsDrawer } from './components/SuggestionsDrawer';
import { NotesDrawer } from './components/NotesDrawer';
import { CelebrationOverlay } from './components/CelebrationOverlay';
import { EXERCISES } from './constants';
import { Exercise } from './types';

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
