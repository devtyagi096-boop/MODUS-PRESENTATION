import React from 'react';
import { C } from '../../utils/theme';

export function Cube({ size=160, unified=false }: {size?:number; unified?:boolean}) {
  const h = size/2;
  const a = unified ? C.purple+'35' : C.blue+'30';
  const b = unified ? C.purple+'35' : C.purple+'30';
  return (
    <div className="perspective" style={{width:size,height:size}}>
      <div className="preserve-3d" style={{width:size,height:size,animation:'cubeOrbit 22s linear infinite'}}>
        {[`translateZ(${h}px)`,`rotateY(180deg) translateZ(${h}px)`,`rotateY(-90deg) translateZ(${h}px)`,`rotateY(90deg) translateZ(${h}px)`,`rotateX(90deg) translateZ(${h}px)`,`rotateX(-90deg) translateZ(${h}px)`].map((t,i) =>
          <div key={i} className="absolute inset-0" style={{transform:t, border:`1px solid ${i<2?a:i<4?b:'rgba(255,255,255,.04)'}`}} />
        )}
      </div>
    </div>
  );
}
