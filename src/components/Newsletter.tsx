import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, CheckCircle2, Loader2, Send } from 'lucide-react';
import { useAuraFeedback } from '../hooks/useAuraFeedback';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const { playSound } = useAuraFeedback();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === 'loading') return;

    setStatus('loading');
    playSound('click');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Errore durante l'iscrizione");
      }

      setStatus('success');
      playSound('success');
      setEmail('');
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : "Riprova più tardi");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-24 px-4 pb-12">
      <div className="bg-white/40 border border-white rounded-[48px] p-8 md:p-12 backdrop-blur-md shadow-xl shadow-aura-accent/5 overflow-hidden relative">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-aura-accent/5 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-aura-accent/5 rounded-full blur-3xl -ml-24 -mb-24" />

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 text-center md:text-left space-y-4">
            <h3 className="serif text-3xl md:text-4xl font-bold italic text-aura-ink">Resta in cammino</h3>
            <p className="text-aura-muted font-serif italic text-lg leading-relaxed">
              Iscriviti alla newsletter per ricevere nuove pratiche di consapevolezza e aggiornamenti sul progetto Aura.
            </p>
          </div>

          <div className="w-full md:w-80">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white rounded-[32px] p-8 text-center space-y-4"
                >
                  <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto text-green-500">
                    <CheckCircle2 size={24} />
                  </div>
                  <p className="text-sm font-bold text-aura-ink uppercase tracking-wider">Benvenuto in Aura</p>
                  <p className="text-xs text-aura-muted italic">Presto riceverai la tua prima pratica.</p>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleSubscribe}
                  className="space-y-4"
                >
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-aura-muted">
                      <Mail size={18} />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="la-tua@email.com"
                      className="w-full pl-12 pr-6 py-5 bg-white/60 border border-white rounded-[24px] focus:outline-none focus:ring-4 focus:ring-aura-accent/10 focus:border-aura-accent/20 transition-all font-medium text-aura-ink placeholder:text-aura-muted/40"
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-[10px] text-red-500 font-bold px-4 italic">{errorMessage}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-5 bg-aura-ink text-white rounded-[24px] font-bold uppercase tracking-[0.3em] text-[12px] flex items-center justify-center gap-3 hover:bg-aura-accent transition-all shadow-xl shadow-aura-ink/10 disabled:opacity-50"
                  >
                    {status === 'loading' ? (
                      <Loader2 className="animate-spin" size={18} />
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Iscriviti</span>
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
