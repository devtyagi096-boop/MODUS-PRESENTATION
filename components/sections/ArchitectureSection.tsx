import React, { useState } from 'react';
import { motion, useTransform, useScroll, MotionValue, AnimatePresence } from 'framer-motion';
import { Database, Activity, Layers, Shield, Radio, Heart, AlertTriangle, ChevronDown, ExternalLink, ArrowRight, Cpu, TrendingUp } from 'lucide-react';
import { C } from '../../utils/theme';
import { Cube } from '../ui/Cube';
import { Reveal as Rv } from '../ui/Reveal';
import { WordReveal } from '../ui/WordReveal';
import { TiltCard } from '../ui/TiltCard';
import { InlineMath } from 'react-katex';

export function ArchitectureSection({ loaded, mx, my, heroOp, heroY }: { loaded: boolean; mx?: MotionValue<number>; my?: MotionValue<number>; heroOp?: MotionValue<number>; heroY?: MotionValue<number> }) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  return (
    <>
      {/* ═══════════════════════════════
            6 — ARCHITECTURE (self-drawing)
            ═══════════════════════════════ */}
        <section className="relative flex flex-col items-center justify-center px-6 py-32 md:py-40" style={{ zIndex: 2 }}>
          <Rv><span className="text-xs" style={{ fontFamily: "'JetBrains Mono'", letterSpacing: 4, color: C.blue }}>// ARCHITECTURE</span></Rv>
          <Rv d={.1}><h2 className="font-bold mt-4 mb-6 text-center" style={{ fontFamily: "'Space Grotesk'", fontSize: 'clamp(1.8rem,3.5vw,2.5rem)', letterSpacing: 'normal', wordSpacing: 'normal' }}>How  It  Flows</h2></Rv>
          <Rv d={.15}><p className="text-sm md:text-base text-center mb-20" style={{ color: C.t3, maxWidth: 500 }}>Each token passes through a dual-stream block. Both streams process in parallel, then a learned router blends them per-dimension.</p></Rv>

          <Rv d={.2}>
            <div className="flex flex-col items-center">

              {/* ── INPUT TOKEN ── */}
              <TiltCard className="px-12 py-6 text-center" accent={C.t3}>
                <p className="text-lg font-semibold" style={{ fontFamily: "'Space Grotesk'", color: C.w }}>Input Token</p>
                <div className="text-xs mt-2" style={{ color: C.t3 }}><InlineMath math="x \in \mathbb{R}^d" /></div>
              </TiltCard>

              {/* connector */}
              <motion.div className="w-px" style={{ background: `linear-gradient(180deg, ${C.t3}50, ${C.blue}30)` }} initial={{ height: 0 }} whileInView={{ height: 64 }} viewport={{ once: true }} transition={{ duration: .6, delay: .3 }} />
              <div style={{ width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: `8px solid ${C.blue}50` }} />

              {/* ── LINEAR PROJECTIONS ── */}
              <div className="mt-2" />
              <TiltCard className="px-12 py-6 text-center" accent={C.blue}>
                <p className="text-lg font-semibold" style={{ fontFamily: "'Space Grotesk'", color: C.t2 }}>Linear Projections</p>
                <p className="text-xs mt-2" style={{ fontFamily: "'JetBrains Mono'", color: C.t3 }}>k, v, q, gates, η, retain</p>
              </TiltCard>

              {/* connector down to router */}
              <motion.div className="w-px" style={{ background: `linear-gradient(180deg, ${C.blue}30, ${C.cyan}15)` }} initial={{ height: 0 }} whileInView={{ height: 56 }} viewport={{ once: true }} transition={{ duration: .6, delay: .5 }} />
              <div style={{ width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: `8px solid ${C.cyan}50` }} />

              {/* ── ROUTER ── */}
              <div 
                className="mt-3 relative cursor-help flex flex-col items-center w-full"
                onMouseEnter={() => setHoveredNode('router')} 
                onMouseLeave={() => setHoveredNode(null)}
              >
                <TiltCard className="px-10 md:px-14 py-6 md:py-8 text-center" accent={C.cyan}>
                  <Layers size={32} style={{ color: C.cyan }} className="mx-auto mb-3" strokeWidth={1.2} />
                  <p className="text-xl font-bold mb-1" style={{ fontFamily: "'Space Grotesk'", color: C.w }}>Learned Router</p>
                  <div className="text-sm mt-2 mb-3" style={{ color: C.cyan }}><InlineMath math="\sigma(W \cdot x) \cdot H + (1 - \sigma(W \cdot x)) \cdot s" /></div>
                  <p className="text-[11px] leading-relaxed" style={{ color: C.t3, maxWidth: 320 }}>Per-dimension sigmoid gate blends both streams for every dimension of the embedding, per token</p>
                </TiltCard>
                <AnimatePresence>
                  {hoveredNode === 'router' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.95 }}
                      className="absolute z-50 p-4 rounded-xl border whitespace-nowrap backdrop-blur-md left-1/2 -translate-x-1/2 top-full mt-4"
                      style={{
                        background: `${C.bg}e6`,
                        borderColor: `${C.cyan}40`,
                        boxShadow: `0 8px 32px -8px ${C.cyan}30`
                      }}
                    >
                      <p className="text-xs mb-2 font-medium text-left" style={{ color: C.w }}>PyTorch Snippet:</p>
                      <pre className="text-left text-xs bg-black/50 p-3 rounded border border-white/10 font-mono" style={{ color: C.cyan, lineHeight: 1.5 }}>
{`def forward(x, h_stream, s_stream):
    gate = torch.sigmoid(self.w(x))
    return gate * h_stream + (1 - gate) * s_stream`}
                      </pre>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* connector down to fork */}
              <motion.div className="w-px" style={{ background: `linear-gradient(180deg, ${C.cyan}30, ${C.t3}15)` }} initial={{ height: 0 }} whileInView={{ height: 56 }} viewport={{ once: true }} transition={{ duration: .6, delay: .7 }} />

              {/* ── FORK LABEL ── */}
              <p className="text-[10px] font-medium mb-4" style={{ fontFamily: "'JetBrains Mono'", letterSpacing: 4, color: C.t3, textTransform: 'uppercase' }}>parallel streams</p>

              {/* ── HORIZONTAL FORK LINE ── */}
              <div className="relative flex items-start justify-center" style={{ width: '100%', maxWidth: 560 }}>
                {/* horizontal bar connecting the two branches */}
                <motion.div className="absolute top-0 h-px" style={{ left: '25%', right: '25%', background: `linear-gradient(90deg, ${C.blue}30, ${C.t3}20, ${C.purple}30)` }} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: .8, delay: .8 }} />
                {/* center tick mark */}
                <motion.div className="absolute top-0 w-px" style={{ left: '50%', background: C.t3+'30' }} initial={{ height: 0 }} whileInView={{ height: 12 }} viewport={{ once: true }} transition={{ delay: .8 }} />

                {/* ── MATRIX STREAM (Left) ── */}
                <div className="flex flex-col items-center flex-1">
                  <motion.div className="w-px" style={{ background: `${C.blue}30` }} initial={{ height: 0 }} whileInView={{ height: 48 }} viewport={{ once: true }} transition={{ delay: .9 }} />
                  <div style={{ width: 0, height: 0, borderLeft: '4px solid transparent', borderRight: '4px solid transparent', borderTop: `6px solid ${C.blue}40` }} />
                  <div className="mt-3" />
                  <div 
                    onMouseEnter={() => setHoveredNode('matrix')} 
                    onMouseLeave={() => setHoveredNode(null)}
                    className="relative cursor-help flex flex-col items-center"
                  >
                    <TiltCard accent={C.blue} className="p-6 md:p-8 text-center w-48 md:w-56">
                      <Database size={36} style={{ color: C.blue }} className="mx-auto mb-3" strokeWidth={1.2} />
                      <p className="text-2xl font-bold mb-1" style={{ fontFamily: "'Space Grotesk'", color: C.blue }}>H</p>
                      <p className="text-sm font-medium mb-2" style={{ fontFamily: "'Space Grotesk'", color: C.w }}>Matrix Stream</p>
                      <p className="text-[11px]" style={{ fontFamily: "'JetBrains Mono'", color: C.t3 }}><InlineMath math="d \times d" /> associative memory</p>
                      <p className="text-[10px] mt-2" style={{ color: C.t3 }}>Long-range recall via delta rule</p>
                    </TiltCard>
                    <AnimatePresence>
                      {hoveredNode === 'matrix' && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 5, scale: 0.95 }}
                          className="absolute z-50 p-4 rounded-xl border whitespace-nowrap backdrop-blur-md left-1/2 -translate-x-1/2 top-full mt-4"
                          style={{
                            background: `${C.bg}e6`,
                            borderColor: `${C.blue}40`,
                            boxShadow: `0 8px 32px -8px ${C.blue}30`
                          }}
                        >
                          <p className="text-xs mb-1 font-medium" style={{ color: C.w }}>Update Rule:</p>
                          <div className="text-sm" style={{ color: C.blue }}>
                            <InlineMath math="H_t = H_{t-1} + (v_t - H_{t-1}k_t) \otimes k_t" />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  {/* down connector */}
                  <motion.div className="w-px" style={{ background: `${C.blue}25` }} initial={{ height: 0 }} whileInView={{ height: 48 }} viewport={{ once: true }} transition={{ delay: 1.2 }} />
                  <div style={{ width: 0, height: 0, borderLeft: '4px solid transparent', borderRight: '4px solid transparent', borderTop: `6px solid ${C.blue}30` }} />
                </div>

                {/* ── VECTOR STREAM (Right) ── */}
                <div className="flex flex-col items-center flex-1">
                  <motion.div className="w-px" style={{ background: `${C.purple}30` }} initial={{ height: 0 }} whileInView={{ height: 48 }} viewport={{ once: true }} transition={{ delay: .9 }} />
                  <div style={{ width: 0, height: 0, borderLeft: '4px solid transparent', borderRight: '4px solid transparent', borderTop: `6px solid ${C.purple}40` }} />
                  <div className="mt-3" />
                  <div 
                    onMouseEnter={() => setHoveredNode('vector')} 
                    onMouseLeave={() => setHoveredNode(null)}
                    className="relative cursor-help flex flex-col items-center"
                  >
                    <TiltCard accent={C.purple} className="p-6 md:p-8 text-center w-48 md:w-56">
                      <Activity size={36} style={{ color: C.purple }} className="mx-auto mb-3" strokeWidth={1.2} />
                      <p className="text-2xl font-bold mb-1" style={{ fontFamily: "'Space Grotesk'", color: C.purple }}>s</p>
                      <p className="text-sm font-medium mb-2" style={{ fontFamily: "'Space Grotesk'", color: C.w }}>Vector Stream</p>
                      <p className="text-[11px]" style={{ fontFamily: "'JetBrains Mono'", color: C.t3 }}><InlineMath math="d" />-element recurrent state</p>
                      <p className="text-[10px] mt-2" style={{ color: C.t3 }}>Fast local pattern tracking</p>
                    </TiltCard>
                    <AnimatePresence>
                      {hoveredNode === 'vector' && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 5, scale: 0.95 }}
                          className="absolute z-50 p-4 rounded-xl border whitespace-nowrap backdrop-blur-md left-1/2 -translate-x-1/2 top-full mt-4"
                          style={{
                            background: `${C.bg}e6`,
                            borderColor: `${C.purple}40`,
                            boxShadow: `0 8px 32px -8px ${C.purple}30`
                          }}
                        >
                          <p className="text-xs mb-1 font-medium" style={{ color: C.w }}>Update Rule:</p>
                          <div className="text-sm" style={{ color: C.purple }}>
                            <InlineMath math="s_t = \gamma_t \odot s_{t-1} + (1 - \gamma_t) \odot x_t" />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  {/* down connector */}
                  <motion.div className="w-px" style={{ background: `${C.purple}25` }} initial={{ height: 0 }} whileInView={{ height: 48 }} viewport={{ once: true }} transition={{ delay: 1.2 }} />
                  <div style={{ width: 0, height: 0, borderLeft: '4px solid transparent', borderRight: '4px solid transparent', borderTop: `6px solid ${C.purple}30` }} />
                </div>
              </div>

              {/* ── MERGE HORIZONTAL LINE ── */}
              <div className="relative w-full" style={{ maxWidth: 560 }}>
                <motion.div className="absolute top-0 h-px" style={{ left: '25%', right: '25%', background: `linear-gradient(90deg, ${C.blue}30, rgba(255,255,255,.04), ${C.purple}30)` }} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: .8, delay: 1.3 }} />
              </div>

              {/* ── MERGE LABEL ── */}
              <p className="text-[10px] font-medium mt-6 mb-3" style={{ fontFamily: "'JetBrains Mono'", letterSpacing: 4, color: C.t3, textTransform: 'uppercase' }}>merge</p>

              {/* connector down to output */}
              <motion.div className="w-px" style={{ background: `linear-gradient(180deg, rgba(255,255,255,.04), rgba(255,255,255,.04))` }} initial={{ height: 0 }} whileInView={{ height: 56 }} viewport={{ once: true }} transition={{ delay: 1.5 }} />
              <div style={{ width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: `8px solid rgba(255,255,255,.12)` }} />

              {/* ── OUTPUT ── */}
              <div className="mt-3" />
              <TiltCard className="px-12 py-6 text-center" accent={C.t3}>
                <p className="text-lg font-semibold" style={{ fontFamily: "'Space Grotesk'", color: C.w }}>Output</p>
                <p className="text-xs mt-2" style={{ fontFamily: "'JetBrains Mono'", color: C.t3 }}>→ Next Layer / LM Head</p>
              </TiltCard>

            </div>
          </Rv>
        </section>
    </>
  );
}