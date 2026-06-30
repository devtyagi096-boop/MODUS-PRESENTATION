import { useState, useRef } from 'react';
import { motion, useScroll, useSpring, AnimatePresence, useMotionValueEvent } from 'framer-motion';

import CubeScene from './cubescene';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { PresentationLayout } from './components/layout/PresentationLayout';
import { Stars } from './components/ui/Stars';
import { Comets } from './components/ui/Comets';
import { C } from './utils/theme';
import { useKeyboardNavigation } from './hooks/useKeyboardNavigation';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 30 });
  const progressRef = useRef(0);

  useKeyboardNavigation();

  // Sync Framer Motion spring value to a ref for Three.js (v11 API)
  useMotionValueEvent(progress, 'change', (v) => {
    progressRef.current = v;
  });

  return (
    <>
      <AnimatePresence>
        {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}
      </AnimatePresence>

      <div className={`relative ${loaded ? '' : 'invisible'}`} style={{ background: C.bg, minHeight: '100vh' }}>
        <CubeScene progressRef={progressRef} />
        <Stars />
        <Comets />

        {/* Dark vignette — protects text from cube glow */}
        <div className="fixed inset-0 pointer-events-none" style={{
          zIndex: 1,
          background: `
            radial-gradient(ellipse 55% 80% at 30% 50%, rgba(5,5,8,0.72) 0%, transparent 100%),
            radial-gradient(ellipse 40% 60% at 0% 50%,  rgba(5,5,8,0.90) 0%, transparent 100%),
            linear-gradient(to right, rgba(5,5,8,0.80) 0%, rgba(5,5,8,0.30) 40%, transparent 65%)
          `
        }} />

        {/* Global Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-[2px] origin-left z-50"
          style={{ scaleX: progress, background: `linear-gradient(90deg,${C.blue},${C.purple})` }}
        />

        {/* Scrollable Overlay Layer */}
        <div ref={scrollRef} className="relative z-10">
          <PresentationLayout scrollYProgress={scrollYProgress} loaded={loaded} />
        </div>
      </div>
    </>
  );
}
