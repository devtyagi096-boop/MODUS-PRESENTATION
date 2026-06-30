import React, { useRef } from 'react';
import { motion, useTransform, useScroll, MotionValue, useInView } from 'framer-motion';
import { RoughNotation } from 'react-rough-notation';
import { Database, Activity, Layers, Shield, Radio, Heart, AlertTriangle, ChevronDown, ExternalLink, ArrowRight, Cpu, TrendingUp } from 'lucide-react';
import { C } from '../../utils/theme';
import { Cube } from '../ui/Cube';
import { Reveal as Rv } from '../ui/Reveal';
import { WordReveal } from '../ui/WordReveal';
import { TiltCard } from '../ui/TiltCard';

export function ResultsSection({ loaded, mx, my, heroOp, heroY }: { loaded: boolean; mx?: MotionValue<number>; my?: MotionValue<number>; heroOp?: MotionValue<number>; heroY?: MotionValue<number> }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <>
        {/* ═══════════════════════════════
            8 — RESULTS (Apple-style stats)
            ═══════════════════════════════ */}
        <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6" style={{ zIndex: 2 }}>
          <Rv>
            <h2 className="font-bold mb-4" style={{ fontFamily: "'Space Grotesk'", fontSize: 'clamp(2rem,4vw,3rem)', lineHeight: 1.2, letterSpacing: 'normal', wordSpacing: 'normal' }}>
              <WordReveal text="Not just another model." style={{ color: C.w }} />
            </h2>
          </Rv>
          <Rv d={.4}>
            <p className="text-base mb-20" style={{ color: C.t3, maxWidth: 420 }}>
              <WordReveal text="A better way to store, recall, and reason." delay={.5} />
            </p>
          </Rv>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
            <Rv d={0.6}>
              <TiltCard accent={C.blue} className="p-10 text-left h-full flex flex-col justify-between" style={{ backdropFilter: 'blur(16px)', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '24px', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)' }}>
                <div>
                  <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Space Grotesk'", color: C.w }}>Language Modeling (enwik8)</h3>
                  <p className="text-sm mb-6" style={{ color: C.t3 }}>BPC tests data compression.</p>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm" style={{ color: C.t2 }}>Official Mamba</span>
                      <span className="font-mono font-bold" style={{ color: C.blue }}>1.3458</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold" style={{ color: C.w }}>Modus_X</span>
                      <span className="font-mono font-bold" style={{ color: C.purple }}>1.3842</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm" style={{ color: C.t2 }}>xLSTM</span>
                      <span className="font-mono font-bold" style={{ color: C.t2 }}>1.4196</span>
                    </div>
                  </div>
                </div>
                <div className="mt-8 pt-4" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <p className="text-xs font-medium" style={{ color: '#F59E0B' }}>* Modus_X currently trails Official Mamba in raw compression.</p>
                </div>
              </TiltCard>
            </Rv>

            <Rv d={0.75}>
              <TiltCard accent={C.purple} className="p-10 text-left h-full flex flex-col justify-between" style={{ backdropFilter: 'blur(16px)', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '24px', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)' }}>
                <div>
                  <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Space Grotesk'", color: C.w }}>Memory Evidence (Len 128)</h3>
                  <p className="text-sm mb-6" style={{ color: C.t3 }}>Recall tests writable binding and state update.</p>

                  <div ref={ref} className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm" style={{ color: C.t2 }}>Modus_X: Balanced KV Recall</span>
                        <span className="font-mono font-bold" style={{ color: C.purple }}>
                          <RoughNotation type="underline" show={isInView} color="#E4E4E7" strokeWidth={2} padding={[0, 2]} iterations={2}>~97%</RoughNotation>
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,.04)' }}>
                        <div className="h-full rounded-full" style={{ width: '97%', background: C.purple }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm" style={{ color: C.t2 }}>Modus_X: Same-Key Overwrite</span>
                        <span className="font-mono font-bold" style={{ color: C.cyan }}>
                          <RoughNotation type="underline" show={isInView} color="#E4E4E7" strokeWidth={2} padding={[0, 2]} iterations={2}>~89%</RoughNotation>
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,.04)' }}>
                        <div className="h-full rounded-full" style={{ width: '89%', background: C.cyan }} />
                      </div>
                    </div>
                    <div className="pt-2">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm" style={{ color: C.t2 }}>Mamba Baseline</span>
                        <span className="font-mono font-bold" style={{ color: C.t3 }}>~3%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,.04)' }}>
                        <div className="h-full rounded-full" style={{ width: '3%', background: C.t3 }} />
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </Rv>
          </div>
        </section>
    </>
  );
}
