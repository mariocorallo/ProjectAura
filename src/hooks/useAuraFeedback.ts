import { useCallback } from 'react';

export const useAuraFeedback = () => {
  const playSound = useCallback((type: 'click' | 'success' | 'tap') => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.05);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
      } else if (type === 'tap') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(110, now + 0.03);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'success') {
        // A gentle major chord arpeggio
        const frequencies = [440, 554.37, 659.25, 880];
        frequencies.forEach((freq, i) => {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.type = 'sine';
          o.connect(g);
          g.connect(ctx.destination);
          o.frequency.setValueAtTime(freq, now + i * 0.1);
          g.gain.setValueAtTime(0, now + i * 0.1);
          g.gain.linearRampToValueAtTime(0.1, now + i * 0.1 + 0.05);
          g.gain.exponentialRampToValueAtTime(0.01, now + i * 0.1 + 0.5);
          o.start(now + i * 0.1);
          o.stop(now + i * 0.1 + 0.6);
        });
      }
    } catch (e) {
      console.warn('Audio feedback not supported or blocked by browser');
    }
  }, []);

  return { playSound };
};
