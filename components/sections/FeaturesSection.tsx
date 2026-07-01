import React from 'react';
import { MotionValue } from 'framer-motion';
import { MatrixStreamIcon, VectorStreamIcon, LearnedRouterIcon } from '../ui/AnimatedIcons';
import { C } from '../../utils/theme';
import { Reveal as Rv } from '../ui/Reveal';
import { InlineMath } from 'react-katex';

export function FeaturesSection({ loaded, mx, my, heroOp, heroY }: { loaded: boolean; mx?: MotionValue<number>; my?: MotionValue<number>; heroOp?: MotionValue<number>; heroY?: MotionValue<number> }) {
  return (
    <>
      {[
        { icon: MatrixStreamIcon, title: 'Matrix Stream', sub: 'Content-Addressed Associative Memory', body: 'A grid storing key-value pairs. It writes corrections via the delta rule: check what memory knows, compute the error, stamp only the difference. Like a librarian who fixes wrong answers without rewriting the encyclopedia.', color: C.blue },
        { icon: VectorStreamIcon, title: 'Vector Stream', sub: 'Selective Sequential Recurrence', body: 'A vector tracking recent patterns with Mamba-style selective gating. It decides per-token how much to remember and how much to forget — like a rolling average that intelligently adapts its sensitivity.', color: C.purple },
        { icon: LearnedRouterIcon, title: 'Learned Router', sub: 'Per-Dimension Sigmoid Gating', body: <span>A sigmoid gate <InlineMath math="\sigma(W \cdot x)" /> applied to every dimension of the embedding for each token, producing a per-dimension <InlineMath math="\alpha \in [0,1]" />. When the model needs to recall a fact from 5,000 steps ago, <InlineMath math="\alpha \to 1" /> across relevant dimensions (use matrix). When it's tracking local grammar, <InlineMath math="\alpha \to 0" /> (use vector). Not a single scalar per token — a full per-dimension weighting that the model learns automatically.</span>, color: C.cyan },
      ].map(({ icon: I, title, sub, body, color }, idx) => (
        <section key={idx} className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-16" style={{ zIndex: 2 }}>
          <div className="max-w-4xl w-full grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <Rv>
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="w-40 h-40 md:w-56 md:h-56 rounded-3xl flex items-center justify-center" style={{ background: `${color}08`, border: `1px solid ${color}12` }}>
                    <I color={color} />
                  </div>
                  <div className="absolute -inset-8 rounded-full" style={{ border: `1px dashed ${color}08`, animation: 'orbitSpin 25s linear infinite' }}>
                    <div className="absolute w-2 h-2 rounded-full" style={{ background: color, top: -1, left: '50%', transform: 'translate(-50%,-50%)', boxShadow: `0 0 8px ${color}50` }} />
                  </div>
                </div>
              </div>
            </Rv>
            <div className="p-8 md:p-10" style={{ backdropFilter: 'blur(16px)', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '24px', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)' }}>
              <Rv><span className="text-xs" style={{ fontFamily: "'JetBrains Mono'", letterSpacing: 4, color }}>{`// 0${idx + 1}`}</span></Rv>
              <Rv d={.1}><h2 className="font-bold mt-3 mb-2" style={{ fontFamily: "'Space Grotesk'", fontSize: 'clamp(1.5rem,3vw,2.2rem)', lineHeight: 1.25, letterSpacing: 'normal', wordSpacing: 'normal' }}>{title}</h2></Rv>
              <Rv d={.15}><p className="text-sm mb-6" style={{ color }}>{sub}</p></Rv>
              <Rv d={.2}><p className="text-base leading-relaxed" style={{ color: C.t2 }}>{body}</p></Rv>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
