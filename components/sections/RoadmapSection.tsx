import React from 'react';
import { MotionValue } from 'framer-motion';
import { Layers, ArrowRight, Cpu, TrendingUp } from 'lucide-react';
import { C } from '../../utils/theme';
import { Reveal as Rv } from '../ui/Reveal';
import { TiltCard } from '../ui/TiltCard';
import { InlineMath } from 'react-katex';

export function RoadmapSection({ loaded, mx, my, heroOp, heroY }: { loaded: boolean; mx?: MotionValue<number>; my?: MotionValue<number>; heroOp?: MotionValue<number>; heroY?: MotionValue<number> }) {
  return (
    <>
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6" style={{ zIndex: 2 }}>
        <Rv><span className="text-xs" style={{ fontFamily: "'JetBrains Mono'", letterSpacing: 4, color: C.blue }}>// ROADMAP</span></Rv>
        <Rv d={.1}><h2 className="font-bold mt-4 mb-8 text-center" style={{ fontFamily: "'Space Grotesk'", fontSize: 'clamp(1.5rem,3vw,2.5rem)', letterSpacing: 'normal', wordSpacing: 'normal' }}>What  Comes  Next</h2></Rv>

        <Rv d={.15}>
          <p className="text-center text-sm md:text-base mb-12 max-w-2xl mx-auto" style={{ color: C.t2 }}>
            The 1B scaling run is not a product launch; it is the first serious algorithm-scaling test.
          </p>
        </Rv>

        <Rv d={.2}>
          <TiltCard className="p-8 w-full max-w-3xl mx-auto" style={{ backdropFilter: 'blur(16px)', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '24px', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)' }}>
            <h3 className="text-xl font-bold mb-6 text-center" style={{ fontFamily: "'Space Grotesk'", color: C.w }}>Frozen 1B Candidate Specs</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-3"><Layers size={20} style={{ color: C.blue }} /><span style={{ fontFamily: "'JetBrains Mono'", fontSize: '0.85rem', color: C.t2 }}>1,058,963,121 parameters</span></div>
              <div className="flex items-center space-x-3"><TrendingUp size={20} style={{ color: C.purple }} /><span style={{ fontFamily: "'JetBrains Mono'", fontSize: '0.85rem', color: C.t2 }}>32 layers, width 1536</span></div>
              <div className="flex items-center space-x-3"><Cpu size={20} style={{ color: C.cyan }} /><span style={{ fontFamily: "'JetBrains Mono'", fontSize: '0.85rem', color: C.t2 }}>matrix state <InlineMath math="1024 \times 1024" /> / layer</span></div>
              <div className="flex items-center space-x-3"><ArrowRight size={20} style={{ color: C.w }} /><span style={{ fontFamily: "'JetBrains Mono'", fontSize: '0.85rem', color: C.t2 }}>vector state 1024 / layer</span></div>
              <div className="flex items-center space-x-3 md:col-span-2 justify-center mt-2"><span style={{ fontFamily: "'JetBrains Mono'", fontSize: '0.85rem', color: C.blue }}>context length 2048 for primary run</span></div>
            </div>
          </TiltCard>
        </Rv>
      </section>
    </>
  );
}
