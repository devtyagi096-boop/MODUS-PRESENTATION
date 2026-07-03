import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export function WordReveal({ text, className='', style={}, delay=0 }: {text:string; className?:string; style?:React.CSSProperties; delay?:number}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const words = text.split(' ');
  return (
    <span ref={ref} className={className} style={style}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block' }}
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: .6, delay: delay + i * .07, ease: [.22,1,.36,1] }}
        >
          {w}{i < words.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </span>
  );
}
