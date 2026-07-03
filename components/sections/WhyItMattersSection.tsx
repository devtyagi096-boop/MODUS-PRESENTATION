import React from 'react';
import { MotionValue } from 'framer-motion';
import { Shield, Radio, Heart } from 'lucide-react';
import { C } from '../../utils/theme';
import { Reveal as Rv } from '../ui/Reveal';
import { WordReveal } from '../ui/WordReveal';
import { TiltCard } from '../ui/TiltCard';
import { InlineMath } from 'react-katex';

export function WhyItMattersSection({ loaded, mx, my, heroOp, heroY }: { loaded: boolean; mx?: MotionValue<number>; my?: MotionValue<number>; heroOp?: MotionValue<number>; heroY?: MotionValue<number> }) {
  return (
    <>
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6" style={{ zIndex: 2 }}>
        <Rv>
          <h2 className="font-bold mb-16" style={{ fontFamily: "'Space Grotesk'", fontSize: 'clamp(2rem,4vw,3rem)', lineHeight: 1.2, letterSpacing: 'normal', wordSpacing: 'normal' }}>
            <WordReveal text="Constant memory isn't just efficiency." style={{ color: C.w }} />
            <br />
            <WordReveal text="It's predictable deployment." delay={.5} style={{ color: C.t2 }} />
          </h2>
        </Rv>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl w-full">
          {[
            { icon: Shield, title: 'Healthcare', desc: <span>Constant state helps deployment economics, minimizing footprint for sensitive environments.</span> },
            { icon: Radio, title: 'Decentralized AI', desc: 'Predictable state footprint regardless of session length. A strong foundation for edge deployment.' },
            { icon: Heart, title: 'Signal Processing', desc: 'Matrix memory bookmarks patterns across 5,000+ steps. Long-range detection without growing state.' },
          ].map(({ icon: I, title, desc }, i) => (
            <Rv key={i} d={.8 + i * .12}>
              <TiltCard className="p-7 text-left h-full">
                <I size={24} strokeWidth={1.3} style={{ color: C.blue }} className="mb-4" />
                <h3 className="text-base font-semibold mb-2" style={{ fontFamily: "'Space Grotesk'" }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: C.t2 }}>{desc}</p>
              </TiltCard>
            </Rv>
          ))}
        </div>
      </section>
    </>
  );
}
