import React, { createContext, useContext, useState, useEffect } from 'react';
import { Exercise, UserHistory, JournalEntry } from '../types';
import { EXERCISES } from '../constants';

interface AuraContextType {
  history: UserHistory[];
  journal: JournalEntry[];
  selectedExercise: Exercise | null;
  currentView: 'dashboard' | 'about' | 'bio' | 'tips' | 'support';
  searchQuery: string;
  activeCategory: string;
  isCelebrating: boolean;
  
  // Actions
  setView: (view: 'dashboard' | 'about' | 'bio' | 'tips' | 'support') => void;
  selectExercise: (exercise: Exercise | null) => void;
  setSearch: (query: string) => void;
  setCategory: (category: string) => void;
  completeExercise: (id: string, journalContent?: string) => void;
  addJournalEntry: (entry: Omit<JournalEntry, 'id' | 'timestamp'>) => void;
  triggerCelebration: () => void;
}

const AuraContext = createContext<AuraContextType | undefined>(undefined);

const APP_VERSION = '1.1.0'; // Incrementiamo per forzare la pulizia

export const AuraProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [history, setHistory] = useState<UserHistory[]>([]);
  const [journal, setJournal] = useState<JournalEntry[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [currentView, setCurrentView] = useState<'dashboard' | 'about' | 'bio' | 'tips' | 'support'>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('tutti');
  const [isCelebrating, setIsCelebrating] = useState(false);

  const triggerCelebration = () => {
    setIsCelebrating(true);
    setTimeout(() => setIsCelebrating(false), 4000);
  };

  useEffect(() => {
    // 0. Gestione errori di caricamento moduli (Anti-schermata bianca)
    const handleError = (e: ErrorEvent) => {
      if (e.message.includes('Loading chunk') || e.message.includes('Script error')) {
        window.location.reload();
      }
    };
    window.addEventListener('error', handleError);

    // 1. Controllo Versione e Pulizia "Casino" precedente
    const savedVersion = localStorage.getItem('aura-version');
    if (savedVersion !== APP_VERSION) {
      localStorage.clear(); // Pulisce il vecchio localStorage che faceva casino
      sessionStorage.clear(); // Pulisce la sessione
      localStorage.setItem('aura-version', APP_VERSION);
      console.log('Aura: Cache di versione pulita.');
    }

    // 2. Caricamento da SESSION storage (si cancella alla chiusura del browser)
    const savedHistory = sessionStorage.getItem('aura-history');
    const savedJournal = sessionStorage.getItem('aura-journal');
    if (savedHistory) setHistory(JSON.parse(savedHistory));
    if (savedJournal) setJournal(JSON.parse(savedJournal));
  }, []);

  const saveToStorage = (key: string, data: any) => {
    // Salviamo in SESSION storage come richiesto
    sessionStorage.setItem(key, JSON.stringify(data));
  };

  const completeExercise = (id: string, journalContent?: string) => {
    const now = Date.now();
    
    // Update History
    setHistory(prev => {
      const existing = prev.find(h => h.exerciseId === id);
      const updated = existing
        ? prev.map(h => h.exerciseId === id ? { ...h, lastAccessed: now, completedCount: h.completedCount + 1 } : h)
        : [...prev, { exerciseId: id as any, lastAccessed: now, completedCount: 1 }];
      saveToStorage('aura-history', updated);
      return updated;
    });

    // Add Journal Entry if provided
    if (journalContent) {
      const newEntry: JournalEntry = {
        id: Math.random().toString(36).substr(2, 9),
        exerciseId: id as any,
        timestamp: now,
        content: journalContent
      };
      setJournal(prev => {
        const updated = [newEntry, ...prev];
        saveToStorage('aura-journal', updated);
        return updated;
      });
    }
  };

  const addJournalEntry = (entry: Omit<JournalEntry, 'id' | 'timestamp'>) => {
    const newEntry: JournalEntry = {
      ...entry,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now()
    };
    setJournal(prev => {
      const updated = [newEntry, ...prev];
      saveToStorage('aura-journal', updated);
      return updated;
    });
  };

  return (
    <AuraContext.Provider value={{
      history,
      journal,
      selectedExercise,
      currentView,
      searchQuery,
      activeCategory,
      isCelebrating,
      setView: setCurrentView,
      selectExercise: setSelectedExercise,
      setSearch: setSearchQuery,
      setCategory: setActiveCategory,
      completeExercise,
      addJournalEntry,
      triggerCelebration
    }}>
      {children}
    </AuraContext.Provider>
  );
};

export const useAura = () => {
  const context = useContext(AuraContext);
  if (context === undefined) {
    throw new Error('useAura must be used within an AuraProvider');
  }
  return context;
};
