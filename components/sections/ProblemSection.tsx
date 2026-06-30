import React, { useRef } from 'react';
import { motion, MotionValue, useInView } from 'framer-motion';
import { C } from '../../utils/theme';
import { Reveal as Rv } from '../ui/Reveal';
import { WordReveal } from '../ui/WordReveal';

const AnimatedGraph = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="w-full max-w-2xl mx-auto mt-4 relative" style={{ 
      backdropFilter: 'blur(16px)', 
      backgroundColor: 'rgba(24, 24, 27, 0.4)',
      border: '1px solid rgba(255, 255, 255, 0.08)', 
      borderRadius: '1.5rem', 
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)', 
      padding: '1.5rem',
      fontFamily: "'Space Grotesk', sans-serif"
    }}>
      <div className="absolute top-8 left-8 flex flex-col gap-3 text-sm z-10 text-left">
        <div className="flex items-center gap-2">
          <div className="w-5 h-0.5 bg-[#E4E4E7] shadow-[0_0_8px_#E4E4E7]"></div>
          <span style={{color: '#E4E4E7', fontWeight: 600, letterSpacing: '0.05em'}}>Modus_X O(1) Memory</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-0.5 bg-[#ea580c] shadow-[0_0_8px_#ea580c]"></div>
          <span style={{color: '#ea580c', fontWeight: 500, opacity: 0.8}}>Transformer O(N) Memory</span>
        </div>
      </div>
      
      <div className="relative w-full aspect-[16/9] mt-6">
        <svg viewBox="0 0 500 300" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="grid-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.02)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.08)" />
            </linearGradient>
            <filter id="glow-silver">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <filter id="glow-orange">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Grid */}
          <g stroke="rgba(255, 255, 255, 0.07)" strokeWidth="1" strokeDasharray="4 4">
            <line x1="50" y1="250" x2="470" y2="250" />
            <line x1="50" y1="183" x2="470" y2="183" />
            <line x1="50" y1="116" x2="470" y2="116" />
            <line x1="50" y1="50" x2="470" y2="50" />
            <line x1="50" y1="50" x2="50" y2="250" />
            <line x1="190" y1="50" x2="190" y2="250" />
            <line x1="330" y1="50" x2="330" y2="250" />
            <line x1="470" y1="50" x2="470" y2="250" />
          </g>

          {/* Axes */}
          <line x1="50" y1="250" x2="480" y2="250" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="2" strokeLinecap="round" />
          <line x1="50" y1="250" x2="50" y2="30" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="2" strokeLinecap="round" />

          {/* Labels */}
          <text x="260" y="285" fill="rgba(255, 255, 255, 0.4)" fontSize="12" textAnchor="middle" style={{fontWeight: 500, letterSpacing: '0.05em'}}>Context Length (Tokens)</text>
          <text x="-140" y="20" fill="rgba(255, 255, 255, 0.4)" fontSize="12" textAnchor="middle" transform="rotate(-90)" style={{fontWeight: 500, letterSpacing: '0.05em'}}>Memory Consumption</text>

          {/* Ticks */}
          <text x="50" y="270" fill="rgba(255, 255, 255, 0.3)" fontSize="10" textAnchor="middle">4K</text>
          <text x="190" y="270" fill="rgba(255, 255, 255, 0.3)" fontSize="10" textAnchor="middle">32K</text>
          <text x="330" y="270" fill="rgba(255, 255, 255, 0.3)" fontSize="10" textAnchor="middle">100K</text>
          <text x="470" y="270" fill="rgba(255, 255, 255, 0.3)" fontSize="10" textAnchor="middle">1M</text>

          {/* Transformer Line */}
          <motion.path
            d="M 50 240 C 180 230, 300 160, 470 40"
            fill="none"
            stroke="#ea580c"
            strokeWidth="3"
            filter="url(#glow-orange)"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 2, ease: "easeIn", delay: 0.2 }}
          />
          <motion.circle 
            cx="470" cy="40" r="4" fill="#ea580c"
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 2.2, type: "spring" }}
          />

          {/* Modus_X Line */}
          <motion.path
            d="M 50 210 L 470 210"
            fill="none"
            stroke="#E4E4E7"
            strokeWidth="3.5"
            filter="url(#glow-silver)"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 1.8, ease: "easeOut", delay: 0.6 }}
          />
          <motion.circle 
            cx="470" cy="210" r="4.5" fill="#E4E4E7"
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 2.4, type: "spring" }}
          />
        </svg>
      </div>
    </div>
  );
}

export function ProblemSection({ loaded, mx, my, heroOp, heroY }: { loaded: boolean; mx?: MotionValue<number>; my?: MotionValue<number>; heroOp?: MotionValue<number>; heroY?: MotionValue<number> }) {
  return (
    <>
      <section id="problem" className="relative min-h-screen flex flex-col items-center justify-center text-center px-6" style={{zIndex:2}}>
        <div className="max-w-3xl">
          <Rv>
            <h2 className="font-bold mb-8" style={{fontFamily:"'Space Grotesk'",fontSize:'clamp(2rem,4vw,3.2rem)',lineHeight:1.2,letterSpacing:'normal',wordSpacing:'normal'}}>
              <WordReveal text="AI is powerful." style={{color:C.w}} />
              <br />
              <WordReveal text="Understanding it isn't." delay={.5} style={{color:C.t2}} />
            </h2>
          </Rv>
          <Rv d={.8}>
            <p className="text-base md:text-lg mb-16" style={{color:C.t3,lineHeight:1.7,maxWidth:480,margin:'0 auto'}}>
              Every modern language model builds a growing memory staircase during inference. Every new token adds another step. The longer the conversation, the more it costs.
            </p>
          </Rv>
          <Rv d={1}>
            <AnimatedGraph />
          </Rv>
        </div>
      </section>
    </>
  );
}
