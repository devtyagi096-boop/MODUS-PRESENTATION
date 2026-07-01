import React, { useRef } from 'react';
import { MotionValue, useInView } from 'framer-motion';
import { RoughNotation } from 'react-rough-notation';
import { C } from '../../utils/theme';
import { Reveal as Rv } from '../ui/Reveal';
import { TiltCard } from '../ui/TiltCard';
import { InlineMath } from 'react-katex';

export function AboutSection({ loaded, mx, my, heroOp, heroY }: { loaded: boolean; mx?: MotionValue<number>; my?: MotionValue<number>; heroOp?: MotionValue<number>; heroY?: MotionValue<number> }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 py-32" style={{zIndex:2}}>
      <div className="max-w-4xl mx-auto items-center">
        {/* Right — info */}
        <div
          className="p-8 md:p-12"
          style={{
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '24px',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Rv d={.1}><h2 className="font-bold mt-4 mb-8" style={{fontFamily:"'Space Grotesk'",fontSize:'clamp(1.5rem,3vw,2.2rem)',lineHeight:1.2,letterSpacing:'normal'}}>Attention-free.  Constant-memory.  Dual-stream.</h2></Rv>
          <Rv d={.2}><p ref={ref} className="text-base leading-relaxed mb-10" style={{color:C.t2}}>Modus_X is a novel language model architecture that replaces attention with two parallel memory systems — a matrix for long-range associations and a vector for fast local patterns. The result: <InlineMath math="O(1)" /> memory at inference, regardless of context length.</p></Rv>

          <div className="grid grid-cols-2 gap-4">
            {[{n:'Dual-Stream',l:'Architecture'},{n:<InlineMath math="O(1)" />,l:'Inference Memory'},{n:'Delta Rule',l:'State Update'},{n:'Infinite',l:'Context Horizon'}].map(({n,l},i) => (
              <Rv key={i} d={.3+i*.08}>
                <TiltCard className="p-5 text-center" accent={C.blue}>
                  <p className="text-2xl font-bold mb-1" style={{fontFamily:"'Space Grotesk'",color:C.blue}}>{n}</p>
                  <p className="text-xs" style={{color:C.t3}}>{l}</p>
                </TiltCard>
              </Rv>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
