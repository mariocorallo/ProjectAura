import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Smartphone, Trash2, Download, Save, Edit2, FileText } from 'lucide-react';
import { useAura } from '../context/AuraContext';
import { useAuraFeedback } from '../hooks/useAuraFeedback';
import { EXERCISES } from '../constants';

interface NotesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotesDrawer: React.FC<NotesDrawerProps> = ({ isOpen, onClose }) => {
  const { journal, deleteJournalEntry, updateJournalEntry } = useAura();
  const { playSound } = useAuraFeedback();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');

  const exportAll = () => {
    playSound('click');
    if (journal.length === 0) return;
    
    const content = journal
      .sort((a, b) => b.timestamp - a.timestamp)
      .map(entry => {
        const exercise = EXERCISES.find(e => e.id === entry.exerciseId);
        const date = new Date(entry.timestamp).toLocaleString('it-IT');
        return `AURA - ${exercise?.title || entry.exerciseId}\nData: ${date}\n\n${entry.content}\n\n${'='.repeat(40)}`;
      }).join('\n\n\n');

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `aura-tutte-le-riflessioni.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const exportSingle = (id: string) => {
    playSound('tap');
    const entry = journal.find(e => e.id === id);
    if (!entry) return;

    const exercise = EXERCISES.find(e => e.id === entry.exerciseId);
    const date = new Date(entry.timestamp).toLocaleString('it-IT');
    const content = `AURA - ${exercise?.title || entry.exerciseId}\nData: ${date}\n\n${entry.content}`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `riflessione-${entry.id.slice(0, 5)}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleStartEdit = (id: string, current: string) => {
    playSound('tap');
    setEditingId(id);
    setEditContent(current);
  };

  const handleSaveEdit = (id: string) => {
    playSound('click');
    updateJournalEntry(id, editContent);
    setEditingId(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-aura-dark/20 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col"
          >
            <div className="p-8 border-b border-aura-muted/10 flex items-center justify-between bg-aura-bg/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-aura-accent/10 rounded-xl flex items-center justify-center text-aura-accent">
                  <FileText size={20} />
                </div>
                <div>
                  <h2 className="serif text-xl font-bold italic">Le tue note</h2>
                  <p className="text-[10px] uppercase tracking-widest text-aura-muted font-bold">Archivio consapevolezza</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-aura-accent/5 rounded-full transition-colors text-aura-muted"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-aura-bg/10">
              {journal.length > 0 ? (
                <>
                  <button
                    onClick={exportAll}
                    className="w-full flex items-center justify-center gap-2 py-4 bg-aura-dark text-white rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-aura-dark/90 transition-all shadow-lg shadow-aura-dark/10"
                  >
                    <Download size={14} />
                    Scarica tutto l'archivio
                  </button>

                  <div className="space-y-6">
                    {journal.sort((a, b) => b.timestamp - a.timestamp).map((entry) => {
                      const exercise = EXERCISES.find(e => e.id === entry.exerciseId);
                      const isEditing = editingId === entry.id;

                      return (
                        <motion.div
                          key={entry.id}
                          layout
                          className="bg-white p-6 rounded-[32px] border border-white shadow-sm ring-1 ring-aura-dark/5"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex flex-col gap-1">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-aura-accent">
                                {exercise?.title || 'Esercizio'}
                              </span>
                              <div className="flex items-center gap-3 text-aura-muted text-[10px] uppercase tracking-widest">
                                <span className="flex items-center gap-1">
                                  <Calendar size={10} />
                                  {new Date(entry.timestamp).toLocaleDateString('it-IT')}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Smartphone size={10} />
                                  {new Date(entry.timestamp).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              {!isEditing && (
                                <>
                                  <button 
                                    onClick={() => exportSingle(entry.id)}
                                    className="p-2 text-aura-muted hover:text-aura-accent transition-all"
                                    title="Scarica nota"
                                  >
                                    <Download size={14} />
                                  </button>
                                  <button 
                                    onClick={() => handleStartEdit(entry.id, entry.content)}
                                    className="p-2 text-aura-muted hover:text-aura-accent transition-all"
                                    title="Modifica"
                                  >
                                    <Edit2 size={14} />
                                  </button>
                                </>
                              )}
                              <button 
                                onClick={() => { playSound('tap'); deleteJournalEntry(entry.id); }}
                                className="p-2 text-aura-muted hover:text-red-500 transition-all"
                                title="Elimina"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>

                          {isEditing ? (
                            <div className="space-y-3">
                              <textarea
                                autoFocus
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                className="w-full p-4 bg-aura-bg/30 rounded-2xl resize-none text-sm text-aura-ink focus:outline-none focus:ring-2 focus:ring-aura-accent/20 border border-transparent min-h-[100px]"
                              />
                              <button
                                onClick={() => handleSaveEdit(entry.id)}
                                className="w-full py-2 bg-aura-accent text-white rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2"
                              >
                                <Save size={12} />
                                Salva Modifiche
                              </button>
                            </div>
                          ) : (
                            <p className="text-sm text-aura-ink/80 leading-relaxed font-medium">
                              {entry.content}
                            </p>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4 pt-20">
                  <div className="w-20 h-20 bg-aura-muted/5 rounded-full flex items-center justify-center text-aura-muted opacity-30">
                    <FileText size={40} />
                  </div>
                  <h3 className="serif text-xl text-aura-ink italic">Ancora nessuna riflessione</h3>
                  <p className="text-sm text-aura-muted max-w-xs">
                    Le consapevolezze che emergeranno durante i tuoi esercizi verranno salvate qui.
                  </p>
                </div>
              )}
            </div>
            
            <div className="p-8 border-t border-aura-muted/10 text-center bg-aura-bg/5">
              <p className="text-[9px] uppercase tracking-[0.4em] font-medium text-aura-muted">
                Archivio Locale Privato
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
