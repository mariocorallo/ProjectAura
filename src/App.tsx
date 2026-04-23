import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { AuraProvider, useAura } from './context/AuraContext';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { About } from './pages/About';
import { Bio } from './pages/Bio';
import { Suggestions } from './pages/Suggestions';
import { Support } from './pages/Support';
import { Legal } from './pages/Legal';
import { Blog } from './pages/Blog';
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

function AppContent() {
  const { 
    selectedExercise, 
    selectExercise, 
    history, 
    completeExercise 
  } = useAura();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!location.pathname.startsWith('/blog')) {
      document.title = 'Aura: Esercizi di Distaccamento';
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', "Scegli la presenza. Aura ti aiuta a disinnescare il pilota automatico attraverso esercizi di distacco e consapevolezza digitale.");
      }
    }
  }, [location.pathname, selectedExercise]);

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
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={
                  <Dashboard 
                    onOpenDrawer={() => setIsDrawerOpen(true)} 
                    onOpenNotes={() => setIsNotesOpen(true)}
                  />
                } />
                <Route path="/about" element={<About />} />
                <Route path="/bio" element={<Bio />} />
                <Route path="/suggestions" element={<Suggestions />} />
                <Route path="/support" element={<Support />} />
                <Route path="/newsletter" element={<Newsletter isView={true} />} />
                <Route path="/privacy" element={<Legal type="privacy" />} />
                <Route path="/cookie-policy" element={<Legal type="cookie" />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<Blog />} />
              </Routes>
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
