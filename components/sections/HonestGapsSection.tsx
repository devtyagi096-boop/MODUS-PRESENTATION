import React from 'react';
import { motion, useTransform, useScroll, MotionValue } from 'framer-motion';
import { Database, Activity, Layers, Shield, Radio, Heart, AlertTriangle, ChevronDown, ExternalLink, ArrowRight, Cpu, TrendingUp } from 'lucide-react';
import { C } from '../../utils/theme';
import { Cube } from '../ui/Cube';
import { Reveal as Rv } from '../ui/Reveal';
import { WordReveal } from '../ui/WordReveal';
import { TiltCard } from '../ui/TiltCard';
import { RadarChart } from '../ui/RadarChart';

export function HonestGapsSection({ loaded, mx, my, heroOp, heroY }: { loaded: boolean; mx?: MotionValue<number>; my?: MotionValue<number>; heroOp?: MotionValue<number>; heroY?: MotionValue<number> }) {
  return (
    <>
        {/* ═══════════════════════════════
            9 — HONEST GAPS — Cinematic
            ═══════════════════════════════ */}
        {/* 9a — Opening statement, full viewport */}
        <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6" style={{ zIndex: 2 }}>
          <Rv>
            <h2 className="font-bold" style={{ fontFamily: "'Space Grotesk'", fontSize: 'clamp(2rem,4vw,3rem)', lineHeight: 1.2, letterSpacing: 'normal', wordSpacing: 'normal' }}>
              <WordReveal text="We know exactly" style={{ color: C.w }} />
              <br />
              <WordReveal text="where it breaks." delay={.4} style={{ color: 'rgba(245,158,11,.85)' }} />
            </h2>
          </Rv>
          <Rv d={.9}>
            <p className="text-sm md:text-base mt-8 max-w-md" style={{ color: C.t3, lineHeight: 1.7 }}>
              A researcher who knows the exact failure modes is more valuable than one who only claims successes. These gaps define the research agenda.
            </p>
          </Rv>
          <Rv d={1.1}>
            <div className="mt-16">
              <RadarChart />
            </div>
          </Rv>
        </section>

        {/* 9b — Each gap: one per full viewport */}
        {[
          {
            num: '01',
            title: 'Sample Efficiency',
            metric: '80K',
            metricLabel: 'training steps',
            vs: 'vs Transformer at 40K',
            body: 'Modus_X at 80,000 training steps still trails a Transformer trained for only 40,000 steps on perplexity. The Transformer currently learns faster per gradient update.',
            outlook: 'Likely closes with longer training — the loss curve was still descending at termination. The model was not saturated.',
            severity: 65,
          },
          {
            num: '02',
            title: 'Inference Speed & TPU Sharding',
            metric: '↑',
            metricLabel: 'TPU sharding discovered',
            vs: 'official Mamba (GPU) vs Modus_X (TPU) pending',
            body: 'We have found a way to shard Modus_X over multiple TPU devices, which significantly increased inference throughput. However, no custom CUDA kernels exist yet for GPU comparison. Fair benchmarking requires testing official Mamba on GPU vs Modus_X on TPU — those results are pending.',
            outlook: 'TPU multi-device sharding is working. Next step: run standardised benchmarks comparing official Mamba on GPU against Modus_X on TPU to produce a fair, publishable comparison.',
            severity: 45,
          },
        ].map(({ num, title, metric, metricLabel, vs, body, outlook, severity }, i) => (
          <section key={i} className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-16" style={{ zIndex: 2 }}>
            <div className="max-w-4xl w-full grid md:grid-cols-2 gap-12 md:gap-20 items-center">
              {/* Left — The number & severity */}
              <Rv>
                <div className="flex flex-col items-center md:items-start">
                  {/* Gap number */}
                  <span className="text-xs mb-6" style={{ fontFamily: "'JetBrains Mono'", letterSpacing: 4, color: 'rgba(245,158,11,.5)' }}>
                    GAP {num} OF 02
                  </span>

                  {/* Big metric */}
                  <motion.p
                    className="font-bold mb-2"
                    style={{ fontFamily: "'Space Grotesk'", fontSize: 'clamp(3rem,6vw,4.5rem)', lineHeight: 1, letterSpacing: 'normal', color: 'rgba(245,158,11,.9)' }}
                    initial={{ opacity: 0, scale: .7, filter: 'blur(10px)' }}
                    whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    viewport={{ once: true }}
                    transition={{ duration: .8, delay: .2 }}
                  >
                    {metric}
                  </motion.p>
                  <p className="text-sm mb-1" style={{ fontFamily: "'Space Grotesk'", color: C.w }}>{metricLabel}</p>
                  <p className="text-xs mb-10" style={{ fontFamily: "'JetBrains Mono'", color: C.t3 }}>{vs}</p>

                  {/* Severity bar */}
                  <div className="w-full max-w-xs">
                    <div className="flex justify-between mb-2">
                      <span className="text-[10px]" style={{ fontFamily: "'JetBrains Mono'", letterSpacing: 2, color: C.t3 }}>SEVERITY</span>
                      <span className="text-[10px]" style={{ fontFamily: "'JetBrains Mono'", color: 'rgba(245,158,11,.7)' }}>{severity}%</span>
                    </div>
                    <div className="w-full h-[3px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,.04)' }}>
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, rgba(245,158,11,.3), rgba(245,158,11,.8))` }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${severity}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: .5, ease: [.22, 1, .36, 1] }}
                      />
                    </div>
                  </div>
                </div>
              </Rv>

              {/* Right — Description */}
              <div className="p-8" style={{ backdropFilter: 'blur(16px)', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '24px', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)' }}>
                <Rv d={.15}>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(245,158,11,.08)', border: '1px solid rgba(245,158,11,.15)' }}>
                      <AlertTriangle size={16} style={{ color: '#F59E0B' }} />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold" style={{ fontFamily: "'Space Grotesk'", letterSpacing: '.05em', wordSpacing: '.18em' }}>{title}</h3>
                  </div>
                </Rv>

                <Rv d={.25}>
                  <p className="text-base leading-relaxed mb-8" style={{ color: C.t2 }}>{body}</p>
                </Rv>

                <Rv d={.35}>
                  <div className="p-5 rounded-xl" style={{ background: 'rgba(245,158,11,.04)', borderLeft: '2px solid rgba(245,158,11,.25)' }}>
                    <p className="text-[10px] mb-2" style={{ fontFamily: "'JetBrains Mono'", letterSpacing: 3, color: 'rgba(245,158,11,.6)' }}>OUTLOOK</p>
                    <p className="text-sm leading-relaxed" style={{ color: C.t2 }}>{outlook}</p>
                  </div>
                </Rv>
              </div>
            </div>

            {/* Connecting line to next gap */}
            {i < 1 && (
              <motion.div
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: .8 }}
              >
                <div className="w-px h-8" style={{ background: 'linear-gradient(180deg, rgba(245,158,11,.15), transparent)' }} />
                <ChevronDown size={14} style={{ color: 'rgba(245,158,11,.2)' }} />
              </motion.div>
            )}
          </section>
        ))}
    </>
  );
}
