import React from 'react';
import { MotionValue } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { C } from '../../utils/theme';
import { Reveal as Rv } from '../ui/Reveal';
import { TiltCard } from '../ui/TiltCard';

export function ThankYouSection({ loaded, mx, my, heroOp, heroY }: { loaded: boolean; mx?: MotionValue<number>; my?: MotionValue<number>; heroOp?: MotionValue<number>; heroY?: MotionValue<number> }) {
  return (
    <>
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6" style={{ zIndex: 2 }}>
        <Rv d={.2}>
          <h2 className="font-bold mb-4" style={{ fontFamily: "'Space Grotesk'", fontSize: 'clamp(2rem,4vw,3rem)', letterSpacing: 'normal' }}>
            Thank You.
          </h2>
        </Rv>

        <Rv d={.3}>
          <div className="w-40 h-px mx-auto mb-6" style={{ background: `linear-gradient(90deg, transparent, ${C.border}, transparent)` }} />
        </Rv>

        <Rv d={.35}>
          <p className="text-base mb-16" style={{ color: C.t2, maxWidth: 360 }}>Questions?</p>
        </Rv>

        <Rv d={.4}>
          <a
            href="https://github.com/sanyamChaudhary27/Modus_X"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block no-underline"
            style={{ textDecoration: 'none' }}
          >
            <TiltCard className="px-8 py-5 flex items-center gap-5 cursor-pointer" accent={C.blue} style={{ backdropFilter: 'blur(16px)', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '24px', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)' }}>
              <ExternalLink size={20} style={{ color: C.blue }} />
              <div className="text-left">
                <p className="text-sm" style={{ fontFamily: "'JetBrains Mono'", color: C.t2 }}>github.com/sanyamChaudhary27/Modus_X</p>
                <p className="text-[11px]" style={{ fontFamily: "'JetBrains Mono'", color: C.t3 }}>DOI: 10.5281/zenodo.20443699</p>
              </div>
            </TiltCard>
          </a>
        </Rv>

        <Rv d={.5}><p className="text-sm italic mt-16" style={{ color: C.t3 }}>Two streams. One model. One conversation.</p></Rv>
      </section>

      <footer className="relative py-10 text-center" style={{ borderTop: `1px solid ${C.border}`, zIndex: 2 }}>
        <p className="text-[10px]" style={{ fontFamily: "'JetBrains Mono'", color: C.t3, letterSpacing: 3 }}>MODUS_X · 2026 · MIT LICENSE</p>
      </footer>
    </>
  );
}
