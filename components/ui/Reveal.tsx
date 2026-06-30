import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export function Reveal({ children, d=0, className='', y=50 }: {children:React.ReactNode; d?:number; className?:string; y?:number}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return <motion.div ref={ref} className={className} initial={{opacity:0,y}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:1,delay:d,ease:[.22,1,.36,1]}}>{children}</motion.div>;
}
