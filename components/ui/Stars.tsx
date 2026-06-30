import { useRef, useEffect } from 'react';

export function Stars() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d'); if (!ctx) return;
    let raf: number;
    const resize = () => { c.width = window.innerWidth; c.height = document.documentElement.scrollHeight; };
    resize();
    const dots: { x:number; y:number; r:number; o:number; sp:number }[] = [];
    for (let i = 0; i < 100; i++) dots.push({ x: Math.random()*c.width, y: Math.random()*c.height, r: .3+Math.random()*.9, o: .03+Math.random()*.18, sp: 1.5+Math.random()*3.5 });
    let ph = 0;
    const draw = () => {
      ctx.clearRect(0,0,c.width,c.height); ph+=.003;
      for (const d of dots) { ctx.beginPath(); ctx.arc(d.x,d.y,d.r,0,Math.PI*2); ctx.fillStyle=`rgba(180,185,210,${Math.max(0, d.o+Math.sin(ph*d.sp)*d.o*.6)})`; ctx.fill(); }
      raf = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={ref} className="absolute top-0 left-0 w-full pointer-events-none" style={{ zIndex: 0 }} />;
}
