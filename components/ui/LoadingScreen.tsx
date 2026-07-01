import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { C } from '../../utils/theme';

export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let animationFrameId: number;
    let timeoutId: NodeJS.Timeout;
    const start = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - start) / 1800, 1);
      setProgress(p);
      if (p < 1) {
        animationFrameId = requestAnimationFrame(tick);
      } else {
        timeoutId = setTimeout(onDone, 400);
      }
    };
    animationFrameId = requestAnimationFrame(tick);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timeoutId);
    };
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{ background: C.bg }}
      exit={{ opacity: 0 }}
      transition={{ duration: .8 }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 50% 40% at 50% 45%, rgba(228,228,231,.04), transparent 70%)' }} />

      {/* Pulsing dot */}
      <motion.div
        className="w-3 h-3 rounded-full mb-10"
        style={{ background: C.blue, boxShadow: `0 0 20px ${C.blue}50` }}
        animate={{ scale: [1, 1.4, 1], opacity: [.4, 1, .4] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />

      <p className="text-xs mb-6" style={{ fontFamily: "'JetBrains Mono'", letterSpacing: 4, color: C.t3 }}>
        Initializing Experience...
      </p>

      {/* Progress bar */}
      <div className="w-48 h-[2px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,.06)' }}>
        <motion.div className="h-full rounded-full" style={{ width: `${progress * 100}%`, background: `linear-gradient(90deg, ${C.blue}, ${C.purple})` }} />
      </div>
    </motion.div>
  );
}
