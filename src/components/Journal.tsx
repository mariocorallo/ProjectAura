import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuraFeedback } from '../hooks/useAuraFeedback';
import { useAura } from '../context/AuraContext';
import { Plus, Trash2, Calendar, Smartphone, Download, Save, Edit3 } from 'lucide-react';
import { ExerciseId } from '../types';

interface JournalProps {
  exerciseId: ExerciseId;
}

export const Journal = ({ exerciseId }: JournalProps) => {
  const { journal, addJournalEntry, deleteJournalEntry } = useAura();
  const [newEntry, setNewEntry] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { playSound } = useAuraFeedback();

  const entries = journal.filter(e => e.exerciseId === exerciseId);

  const exportEntries = () => {
    playSound('tap');
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

  const startTyping = () => {
    setIsTyping(true);
    playSound('tap');
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 100);
  };

  const handleSave = () => {
    if (!newEntry.trim()) {
      setIsTyping(false);
      return;
    }
    playSound('click');
    addJournalEntry({
      exerciseId,
      content: newEntry
    });
    setNewEntry('');
    setIsTyping(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      <div className="bg-white p-6 rounded-[32px] shadow-sm border border-aura-muted/5 transition-all">
        <AnimatePresence mode="wait">
          {!isTyping ? (
            <motion.div
              key="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center py-4"
            >
              <button
                onClick={startTyping}
                className="group flex flex-col items-center gap-3 text-aura-muted hover:text-aura-accent transition-all"
              >
                <div className="w-14 h-14 rounded-full bg-aura-accent/5 flex items-center justify-center group-hover:bg-aura-accent/10 transition-colors">
                  <Edit3 size={24} />
                </div>
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Annota la tua riflessione</span>
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <textarea
                ref={textareaRef}
                value={newEntry}
                onChange={(e) => setNewEntry(e.target.value)}
                onBlur={() => { if(!newEntry) setIsTyping(false); }}
                placeholder="Cosa senti in questo momento? Quali consapevolezze sono emerse?"
                className="w-full h-32 p-4 bg-aura-bg/50 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-aura-accent/20 transition-all border border-transparent"
              />
              <div className="flex justify-between items-center">
                <button 
                  onClick={() => setIsTyping(false)}
                  className="text-[10px] uppercase tracking-widest font-bold text-aura-muted hover:text-aura-ink"
                >
                  Annulla
                </button>
                <button
                  onClick={handleSave}
                  className="px-8 py-3 bg-aura-accent text-white rounded-xl font-bold hover:bg-aura-accent/90 transition-all flex items-center space-x-2 shadow-lg shadow-aura-accent/10"
                >
                  <Save size={18} />
                  <span>Salva Nota</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="space-y-4">
        {entries.length > 0 && (
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xs uppercase tracking-widest font-bold text-aura-muted">Riflessioni su questa pratica</h3>
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
                onClick={() => deleteJournalEntry(entry.id)}
                className="p-2 text-aura-muted hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
              >
                <Trash2 size={16} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
