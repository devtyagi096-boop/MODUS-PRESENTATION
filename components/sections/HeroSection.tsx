import React from 'react';
import { motion, useTransform, useMotionValue, MotionValue } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { C } from '../../utils/theme';
import { Reveal as Rv } from '../ui/Reveal';
import { WordReveal } from '../ui/WordReveal';
import { TiltCard } from '../ui/TiltCard';

export function HeroSection({ loaded, mx, my, heroOp, heroY }: { loaded: boolean; mx?: MotionValue<number>; my?: MotionValue<number>; heroOp?: MotionValue<number>; heroY?: MotionValue<number> }) {
  const defaultMx = useMotionValue(0);
  const defaultMy = useMotionValue(0);
  const safeMx = mx ?? defaultMx;
  const safeMy = my ?? defaultMy;

  const mx15 = useTransform(safeMx, (v: number) => v * 0.15);
  const my15 = useTransform(safeMy, (v: number) => v * 0.15);
  const mx10 = useTransform(safeMx, (v: number) => v * 0.10);
  const my10 = useTransform(safeMy, (v: number) => v * 0.10);
  const mx50 = useTransform(safeMx, (v: number) => v * 0.50);
  const my50 = useTransform(safeMy, (v: number) => v * 0.50);

  return (
    <motion.section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6" style={{opacity:heroOp, y:heroY, zIndex:2}}>
      <div className="absolute inset-0 pointer-events-none" style={{background:`radial-gradient(ellipse 70% 50% at 50% 35%, rgba(228,228,231,.05), transparent 65%)`}} />

      <div
        className="flex flex-col items-center justify-center p-8 md:p-12 mb-10"
        style={{
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '24px',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        }}
      >
        <motion.h1 className="font-bold mb-6" style={{fontFamily:"'Space Grotesk'",fontSize:'clamp(2rem,4vw,3.5rem)',lineHeight:1.18,letterSpacing:'normal',wordSpacing:'.1em'}} initial={{opacity:0,y:40}} animate={loaded?{opacity:1,y:0}:{}} transition={{delay:1.3,duration:.9}}>
          <span style={{color:C.w}}>Modus_X</span><br />
          <span style={{color:C.w}}>A 1B Scaling Proposal</span><br />
          <span style={{color:C.w}}>For Constant-State Memory.</span>
        </motion.h1>

        <motion.p className="text-base md:text-lg max-w-md mb-10" style={{color:C.t2,lineHeight:1.7}} initial={{opacity:0}} animate={loaded?{opacity:1}:{}} transition={{delay:1.8}}>
          An attention-free algorithm family blending matrix and vector streams. Testing the limits of bounded recurrent state.
        </motion.p>

        <motion.div className="flex gap-4" initial={{opacity:0,y:20}} animate={loaded?{opacity:1,y:0}:{}} transition={{delay:2.1}}>
          <motion.a 
            href="#problem" 
            className="px-8 py-3 text-sm font-medium transition-all" 
            style={{
              border: '1px solid rgba(255,255,255,0.2)', 
              color: C.w, 
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(10px)',
              borderRadius: '9999px',
            }}
            whileHover={{ background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.4)', scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Project
          </motion.a>
        </motion.div>
      </div>

      <motion.a href="#problem" className="flex flex-col items-center gap-2" initial={{opacity:0}} animate={loaded?{opacity:1}:{}} transition={{delay:2.6}}>
        <span className="text-[10px]" style={{fontFamily:"'JetBrains Mono'",letterSpacing:4,color:C.t3}}>SCROLL TO EXPLORE</span>
        <ChevronDown size={16} className="animate-bounce" style={{color:C.t3}} />
      </motion.a>
    </motion.section>
  );
}
