import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface TimerProps {
  seconds: number;
  onComplete?: () => void;
}

export const Timer = ({ seconds, onComplete }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      onComplete?.();
      if (intervalRef.current) clearInterval(intervalRef.current);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, timeLeft, onComplete]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(seconds);
  };

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (timeLeft / seconds) * 100;

  return (
    <div className="flex flex-col items-center space-y-6 bg-white/50 p-8 rounded-full border border-white min-w-[280px]">
      <div className="relative w-48 h-48 flex items-center justify-center">
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx="96"
            cy="96"
            r="88"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            className="text-aura-muted/10"
          />
          <motion.circle
            cx="96"
            cy="96"
            r="88"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeDasharray="553"
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: 553 - (553 * progress) / 100 }}
            transition={{ duration: 0.5, ease: "linear" }}
            className="text-aura-accent"
          />
        </svg>
        <span className="text-4xl font-mono font-medium tracking-tighter">
          {formatTime(timeLeft)}
        </span>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={toggleTimer}
          className="p-4 rounded-full bg-aura-accent text-white hover:bg-aura-accent/90 transition-colors shadow-lg shadow-aura-accent/20"
        >
          {isActive ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
        </button>
        <button
          onClick={resetTimer}
          className="p-4 rounded-full bg-white text-aura-muted hover:text-aura-accent transition-colors border border-aura-muted/10"
        >
          <RotateCcw size={24} />
        </button>
      </div>
    </div>
  );
};
