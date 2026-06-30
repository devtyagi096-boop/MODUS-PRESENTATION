import React from 'react';
import { motion, MotionValue } from 'framer-motion';
import { C } from '../../utils/theme';
import { Reveal as Rv } from '../ui/Reveal';
import { WordReveal } from '../ui/WordReveal';

export function CollaborationSection({ loaded, mx, my, heroOp, heroY }: { loaded: boolean; mx?: MotionValue<number>; my?: MotionValue<number>; heroOp?: MotionValue<number>; heroY?: MotionValue<number> }) {
  return (
    <>
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-20" style={{ zIndex: 2 }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(161,161,170,.03), transparent 60%)' }} />

        <Rv>
          <h2 className="font-bold mb-8" style={{ fontFamily: "'Space Grotesk'", fontSize: 'clamp(2rem,4vw,3rem)', lineHeight: 1.22, letterSpacing: 'normal', wordSpacing: 'normal' }}>
            <WordReveal text="Guidance Needed" style={{ color: C.w }} />
          </h2>
        </Rv>

        <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl justify-center text-left">
          {/* Questions Panel */}
          <Rv d={0.5} className="flex-1">
            <div className="h-full space-y-6 mt-4 p-8" style={{ backdropFilter: 'blur(16px)', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '24px', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)' }}>
              <h3 className="text-xl font-semibold mb-4" style={{ fontFamily: "'Space Grotesk'", color: C.w }}>Key Inquiries</h3>
              {[
                "Minimum credible evaluation required for formal endorsement?",
                "Systems and sharding risks prior to deploying funded compute?",
                "Is the institutional sponsorship route framed correctly?",
                "Potential referral or advisory path if outside your primary focus?"
              ].map((q, i) => (
                <motion.div key={i} className="flex gap-3 items-start" initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.8 + i * 0.1 }}>
                  <div className="w-2 h-2 rounded-full flex-shrink-0 mt-2" style={{ background: '#A1A1AA', boxShadow: '0 0 8px rgba(161,161,170,.35)' }} />
                  <p className="text-sm md:text-base" style={{ color: C.t2 }}>{q}</p>
                </motion.div>
              ))}
            </div>
          </Rv>

          {/* De-risked Checklist Panel */}
          <Rv d={0.8} className="flex-1">
            <div className="h-full space-y-6 mt-4 p-8" style={{ backdropFilter: 'blur(16px)', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '24px', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)' }}>
              <h3 className="text-xl font-semibold mb-4" style={{ fontFamily: "'Space Grotesk'", color: C.w }}>Systems Readiness</h3>
              <p className="text-sm mb-4" style={{ color: '#A1A1AA' }}>Architecture prepared for scale prior to compute allocation.</p>
              {[
                "8-core TPU topology fully validated",
                "2x4 data/model sharding mesh implemented",
                "Mixed-precision (BF16) parity confirmed",
                "Hardware matrix scan profile complete"
              ].map((item, i) => (
                <motion.div key={i} className="flex gap-3 items-start" initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 1.1 + i * 0.1 }}>
                  <div className="w-2 h-2 rounded-full flex-shrink-0 mt-2" style={{ background: '#E4E4E7', boxShadow: '0 0 8px rgba(228,228,231,.35)' }} />
                  <p className="text-sm md:text-base" style={{ color: C.t2 }}>{item}</p>
                </motion.div>
              ))}
            </div>
          </Rv>
        </div>
      </section>
    </>
  );
}