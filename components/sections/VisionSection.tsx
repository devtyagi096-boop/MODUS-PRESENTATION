import React from 'react';
import { MotionValue } from 'framer-motion';
import { C } from '../../utils/theme';
import { Reveal as Rv } from '../ui/Reveal';
import { WordReveal } from '../ui/WordReveal';

export function VisionSection({ loaded, mx, my, heroOp, heroY }: { loaded: boolean; mx?: MotionValue<number>; my?: MotionValue<number>; heroOp?: MotionValue<number>; heroY?: MotionValue<number> }) {
  return (
    <>
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6" style={{zIndex:2}}>
        <div className="absolute inset-0 pointer-events-none" style={{background:'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(161,161,170,.03), transparent 60%)'}} />
        <div className="max-w-3xl p-10" style={{ backdropFilter: 'blur(16px)', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '24px', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)' }}>
          <Rv>
            <h2 className="font-bold" style={{fontFamily:"'Space Grotesk'",fontSize:'clamp(2rem,4vw,3.2rem)',lineHeight:1.25,letterSpacing:'normal',wordSpacing:'normal'}}>
              <WordReveal text="We wanted something" style={{color:C.w}} />
              <br />
              <WordReveal text="simpler." delay={.4} style={{color:C.blue}} />
              <br />
              <WordReveal text="Smarter." delay={.6} style={{color:C.purple}} />
              <br />
              <WordReveal text="Constant." delay={.8} style={{color:C.cyan}} />
            </h2>
          </Rv>
          <Rv d={1.2}>
            <p className="text-base md:text-lg mt-10" style={{color:C.t3,lineHeight:1.7,maxWidth:460,margin:'0 auto'}}>
              What if a language model could process a million tokens with the same memory footprint as ten? Not by compressing. By architecture.
            </p>
          </Rv>
        </div>
      </section>
    </>
  );
}
