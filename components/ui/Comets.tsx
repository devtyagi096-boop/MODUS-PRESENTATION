import { useState, useEffect } from 'react';

export function Comets() {
  const [list, setList] = useState<{id:number;x:number;y:number}[]>([]);
  useEffect(() => {
    let n=0;
    const go = () => setList(p => [...p.slice(-3), { id: n++, x: Math.random()*55, y: Math.random()*30 }]);
    go(); const iv = setInterval(go, 7000+Math.random()*8000);
    return () => clearInterval(iv);
  }, []);
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {list.map(s => <div key={s.id} className="absolute" style={{ left:`${s.x}%`, top:`${s.y}%`, width:55, height:1, background:`linear-gradient(90deg, rgba(228,228,231,.6), rgba(161,161,170,.25), transparent)`, borderRadius:2, animation:'shootStar 2s ease-out forwards', transform:'rotate(-35deg)' }} />)}
    </div>
  );
}
