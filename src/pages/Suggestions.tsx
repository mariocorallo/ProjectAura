import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, AlertCircle, MessageSquare, Sparkles } from 'lucide-react';
import { useAuraFeedback } from '../hooks/useAuraFeedback';

export const Suggestions: React.FC = () => {
  const [type, setType] = useState<'practice' | 'bug'>('practice');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState(''); // Honeypot
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { playSound } = useAuraFeedback();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Honeypot check
    if (website) {
      setIsSent(true);
      return;
    }

    setIsSending(true);
    setError(null);
    playSound('click');

    try {
      const response = await fetch('/api/suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, message, email }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || errorData.error || "Errore nell'invio del messaggio");
      }

      setIsSent(true);
      playSound('success');
      setTimeout(() => setIsSent(false), 5000);
      setMessage('');
      setEmail('');
    } catch (err) {
      setError(err instanceof Error ? err.message : "C'è stato un problema con l'invio. Riprova più tardi.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="max-w-2xl mx-auto space-y-12"
    >
      <header className="text-center">
        <h2 className="serif text-5xl font-bold italic mb-6 text-aura-ink">Suggerimenti</h2>
        <p className="text-aura-muted font-serif italic text-lg pb-4">
          Aiutami ad evolvere Aura o segnalami cosa non va.
        </p>
      </header>

      <div className="bg-white/40 p-10 rounded-[48px] border border-white shadow-xl shadow-aura-accent/5 backdrop-blur-sm relative overflow-hidden">
        <input
          type="text"
          name="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />
        <AnimatePresence mode="wait">
          {!isSent ? (
            <motion.form 
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit} 
              className="space-y-8"
            >
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => { setType('practice'); playSound('tap'); }}
                  className={`p-6 rounded-3xl border transition-all flex flex-col items-center gap-3 ${
                    type === 'practice' 
                      ? 'bg-aura-accent text-white border-aura-accent shadow-lg shadow-aura-accent/20' 
                      : 'bg-white/50 text-aura-muted border-white hover:bg-white'
                  }`}
                >
                  <Sparkles size={24} />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-center">Nuova Pratica</span>
                </button>
                <button
                  type="button"
                  onClick={() => { setType('bug'); playSound('tap'); }}
                  className={`p-6 rounded-3xl border transition-all flex flex-col items-center gap-3 ${
                    type === 'bug' 
                      ? 'bg-aura-accent text-white border-aura-accent shadow-lg shadow-aura-accent/20' 
                      : 'bg-white/50 text-aura-muted border-white hover:bg-white'
                  }`}
                >
                  <AlertCircle size={24} />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-center">Segnala Problema</span>
                </button>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-aura-muted ml-2">
                  {type === 'practice' 
                    ? "Su quale tema o problema vorresti una pratica?" 
                    : "Descrivi il bug o il problema riscontrato"}
                </label>
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={type === 'practice' ? "Esempio: Vorrei staccare dopo una call stressante..." : "Descrivi cosa succede..."}
                  className="w-full h-40 p-6 bg-white/60 rounded-[32px] border border-white focus:outline-none focus:ring-4 focus:ring-aura-accent/10 focus:border-aura-accent/20 transition-all resize-none font-medium text-aura-ink placeholder:text-aura-muted/40"
                />
              </div>

              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-aura-muted ml-2">
                  La tua email (opzionale - se vuoi una risposta)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tua@email.com"
                  className="w-full px-6 py-4 bg-white/60 rounded-2xl border border-white focus:outline-none focus:ring-4 focus:ring-aura-accent/10 focus:border-aura-accent/20 transition-all font-medium text-aura-ink"
                />
              </div>

              {error && (
                <motion.p 
                  initial={{ opacity: 0, x: -10 }} 
                  animate={{ opacity: 1, x: 0 }}
                  className="text-red-500 text-xs font-bold text-center italic"
                >
                  {error}
                </motion.p>
              )}

              <button
                type="submit"
                disabled={isSending || !message.trim()}
                className="w-full py-5 bg-aura-ink text-white rounded-[24px] font-bold uppercase tracking-[0.3em] text-[12px] flex items-center justify-center gap-3 hover:bg-aura-accent transition-all disabled:opacity-50 shadow-xl shadow-aura-ink/10"
              >
                {isSending ? (
                  <motion.div 
                    animate={{ rotate: 360 }} 
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  >
                    <Send size={18} />
                  </motion.div>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Invia Messaggio</span>
                  </>
                )}
              </button>
            </motion.form>
          ) : (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-20 text-center space-y-6"
            >
              <div className="w-20 h-20 bg-aura-accent/10 rounded-full flex items-center justify-center mx-auto text-aura-accent">
                <CheckCircle2 size={40} />
              </div>
              <h3 className="serif text-3xl font-bold italic">Messaggio Ricevuto</h3>
              <p className="text-aura-muted max-w-sm mx-auto leading-relaxed">
                Grazie per il tuo contributo. Leggerò il tuo messaggio con attenzione per rendere Aura sempre più utile alla nostra consapevolezza.
              </p>
              <button 
                onClick={() => setIsSent(false)}
                className="text-xs font-bold uppercase tracking-widest text-aura-accent hover:underline pt-4"
              >
                Invia un altro messaggio
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="grid md:grid-cols-2 gap-8 pt-12">
        <div className="bg-white/20 p-8 rounded-[40px] border border-white/40">
          <div className="w-10 h-10 bg-aura-accent/10 rounded-full flex items-center justify-center mb-4 text-aura-accent">
            <Sparkles size={18} />
          </div>
          <h4 className="serif text-xl font-bold mb-2">Nuove Pratiche</h4>
          <p className="text-sm text-aura-muted leading-relaxed">
            Aura è un progetto vivo. Se senti che manca un esercizio per una situazione specifica, dimmelo. Lo svilupperò pensando alle tue necessità.
          </p>
        </div>
        <div className="bg-white/20 p-8 rounded-[40px] border border-white/40">
          <div className="w-10 h-10 bg-red-500/10 rounded-full flex items-center justify-center mb-4 text-red-500">
            <AlertCircle size={18} />
          </div>
          <h4 className="serif text-xl font-bold mb-2">Segnala Bug</h4>
          <p className="text-sm text-aura-muted leading-relaxed">
            L'app non si comporta come dovrebbe? Trovi errori nel testo o nei timer? Ogni segnalazione mi aiuta a pulire l'esperienza.
          </p>
        </div>
      </div>
    </motion.div>
  );
};
