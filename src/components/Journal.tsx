import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, Calendar, Smartphone, Download } from 'lucide-react';
import { JournalEntry, ExerciseId } from '../types';

interface JournalProps {
  exerciseId: ExerciseId;
}

export const Journal = ({ exerciseId }: JournalProps) => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [newEntry, setNewEntry] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem(`journal-${exerciseId}`);
    if (saved) setEntries(JSON.parse(saved));
  }, [exerciseId]);

  const saveEntries = (updated: JournalEntry[]) => {
    setEntries(updated);
    localStorage.setItem(`journal-${exerciseId}`, JSON.stringify(updated));
  };

  const exportEntries = () => {
    if (entries.length === 0) return;
    
    const sortedEntries = [...entries].sort((a, b) => a.timestamp - b.timestamp);
    const content = sortedEntries.map(entry => {
      const date = new Date(entry.timestamp).toLocaleString('it-IT');
      return `AURA - Riflessioni: ${exerciseId}\nData: ${date}\n\n${entry.content}\n\n${'='.repeat(35)}`;
    }).join('\n\n');

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `aura-riflessioni-${exerciseId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const addEntry = () => {
    if (!newEntry.trim()) return;
    const entry: JournalEntry = {
      id: crypto.randomUUID(),
      exerciseId,
      timestamp: Date.now(),
      content: newEntry,
    };
    saveEntries([entry, ...entries]);
    setNewEntry('');
  };

  const deleteEntry = (id: string) => {
    saveEntries(entries.filter((e) => e.id !== id));
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-aura-muted/5">
        <textarea
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
          placeholder="Cosa senti in questo momento? Quali consapevolezze sono emerse?"
          className="w-full h-32 p-4 bg-aura-bg/50 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-aura-accent/20 transition-all border border-transparent"
        />
        <div className="mt-4 flex justify-end">
          <button
            onClick={addEntry}
            disabled={!newEntry.trim()}
            className="px-6 py-2 bg-aura-accent text-white rounded-xl font-semibold disabled:opacity-50 hover:bg-aura-accent/90 transition-all flex items-center space-x-2"
          >
            <Plus size={18} />
            <span>Annota</span>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {entries.length > 0 && (
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xs uppercase tracking-widest font-bold text-aura-muted">Cronologia Riflessioni</h3>
            <button
              onClick={exportEntries}
              className="flex items-center space-x-2 text-[10px] uppercase tracking-widest font-bold text-aura-accent hover:text-aura-accent/80 transition-colors"
            >
              <Download size={14} />
              <span>Esporta (.txt)</span>
            </button>
          </div>
        )}
        <AnimatePresence initial={false}>
          {entries.map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white/60 backdrop-blur-sm p-5 rounded-2xl border border-white flex justify-between items-start group"
            >
              <div className="flex-1">
                <div className="flex items-center space-x-3 text-aura-muted text-[10px] uppercase tracking-wider mb-2">
                  <span className="flex items-center">
                    <Calendar size={12} className="mr-1" />
                    {new Date(entry.timestamp).toLocaleDateString('it-IT')}
                  </span>
                  <span className="flex items-center">
                    <Smartphone size={12} className="mr-1" />
                    {new Date(entry.timestamp).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-aura-ink leading-relaxed whitespace-pre-wrap">{entry.content}</p>
              </div>
              <button
                onClick={() => deleteEntry(entry.id)}
                className="p-2 text-aura-muted hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
              >
                <Trash2 size={16} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {entries.length === 0 && (
          <div className="text-center py-12 text-aura-muted italic">
            Nessuna riflessione ancora. Inizia la tua pratica di distacco.
          </div>
        )}
      </div>
    </div>
  );
};
