import React, { createContext, useContext, useState, useEffect } from 'react';
import { Exercise, UserHistory, JournalEntry } from '../types';
import { EXERCISES } from '../constants';

interface AuraContextType {
  history: UserHistory[];
  journal: JournalEntry[];
  selectedExercise: Exercise | null;
  currentView: 'dashboard' | 'about' | 'bio' | 'tips';
  searchQuery: string;
  activeCategory: string;
  
  // Actions
  setView: (view: 'dashboard' | 'about' | 'bio' | 'tips') => void;
  selectExercise: (exercise: Exercise | null) => void;
  setSearch: (query: string) => void;
  setCategory: (category: string) => void;
  completeExercise: (id: string, journalContent?: string) => void;
  addJournalEntry: (entry: Omit<JournalEntry, 'id' | 'timestamp'>) => void;
}

const AuraContext = createContext<AuraContextType | undefined>(undefined);

export const AuraProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [history, setHistory] = useState<UserHistory[]>([]);
  const [journal, setJournal] = useState<JournalEntry[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [currentView, setCurrentView] = useState<'dashboard' | 'about' | 'bio' | 'tips'>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('tutti');

  useEffect(() => {
    const savedHistory = localStorage.getItem('aura-history');
    const savedJournal = localStorage.getItem('aura-journal');
    if (savedHistory) setHistory(JSON.parse(savedHistory));
    if (savedJournal) setJournal(JSON.parse(savedJournal));
  }, []);

  const saveToStorage = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
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
      setView: setCurrentView,
      selectExercise: setSelectedExercise,
      setSearch: setSearchQuery,
      setCategory: setActiveCategory,
      completeExercise,
      addJournalEntry
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
