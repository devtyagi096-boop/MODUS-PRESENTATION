import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { C } from '../../utils/theme';

export function TiltCard({ children, className='', accent=C.blue, style={} }: {children:React.ReactNode; className?:string; accent?:string; style?:React.CSSProperties}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0); const ry = useMotionValue(0);
  const srx = useSpring(rx, {stiffness:200,damping:25}); const sry = useSpring(ry, {stiffness:200,damping:25});
  const gx = useMotionValue(50); const gy = useMotionValue(50);
  const move = (e: React.MouseEvent) => { const el=ref.current; if(!el) return; const r=el.getBoundingClientRect(); const px=(e.clientX-r.left)/r.width; const py=(e.clientY-r.top)/r.height; rx.set((py-.5)*-10); ry.set((px-.5)*10); gx.set(px*100); gy.set(py*100); };
  const leave = () => { rx.set(0); ry.set(0); };
  return (
    <motion.div ref={ref} className={`relative rounded-2xl overflow-hidden ${className}`} style={{ rotateX:srx, rotateY:sry, transformStyle:'preserve-3d', backgroundColor: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '1.5rem', boxShadow: '0 4px 24px rgba(0,0,0,0.2)', ...style }} onMouseMove={move} onMouseLeave={leave}>
      <div className="absolute top-0 left-6 right-6 h-px" style={{background:`linear-gradient(90deg, transparent, ${accent}30, transparent)`}} />
      <motion.div className="absolute inset-0 pointer-events-none rounded-2xl" style={{background:`radial-gradient(600px circle at ${gx}% ${gy}%, ${accent}06, transparent 60%)`}} />
      <div style={{transform:'translateZ(30px)'}}>{children}</div>
    </motion.div>
  );
}
