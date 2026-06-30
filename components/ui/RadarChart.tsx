import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const features = [
  'Recall',
  'Memory Efficiency',
  'Context Scaling',
  'Raw Compression',
  'Training Speed'
];

// 0 to 100 scale
const transformerData = [50, 30, 40, 95, 90];
const modusXData = [95, 90, 85, 60, 50];

const size = 320;
const center = size / 2;
const radius = 100;

function getPoint(value: number, index: number, total: number) {
  const angle = -Math.PI / 2 + (Math.PI * 2 * index) / total;
  const r = (value / 100) * radius;
  return {
    x: center + r * Math.cos(angle),
    y: center + r * Math.sin(angle)
  };
}

function createPath(data: number[]) {
  const points = data.map((v, i) => getPoint(v, i, data.length));
  return `M ${points.map(p => `${p.x},${p.y}`).join(' L ')} Z`;
}

export function RadarChart() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const transformerPath = createPath(transformerData);
  const modusXPath = createPath(modusXData);

  // Background grid
  const levels = 5;
  const grids = Array.from({ length: levels }).map((_, i) => {
    const r = ((i + 1) / levels) * radius;
    const points = Array.from({ length: features.length }).map((_, j) => {
      const angle = -Math.PI / 2 + (Math.PI * 2 * j) / features.length;
      return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
    });
    return `M ${points.join(' L ')} Z`;
  });

  return (
    <div 
      ref={ref}
      className="relative flex items-center justify-center p-8 rounded-2xl"
      style={{
        backdropFilter: 'blur(16px)',
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
      }}
    >
      <svg width={size} height={size} className="overflow-visible">
        {/* Grids */}
        {grids.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth={1}
          />
        ))}

        {/* Axes */}
        {features.map((_, i) => {
          const p = getPoint(100, i, features.length);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={p.x}
              y2={p.y}
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth={1}
            />
          );
        })}

        {/* Labels */}
        {features.map((feature, i) => {
          // Push labels slightly outside the max radius
          const p = getPoint(125, i, features.length);
          return (
            <text
              key={i}
              x={p.x}
              y={p.y}
              fill="rgba(255,255,255,0.6)"
              fontSize="10"
              fontFamily="'JetBrains Mono'"
              textAnchor="middle"
              alignmentBaseline="middle"
            >
              {feature}
            </text>
          );
        })}

        {/* Transformer Path */}
        <motion.path
          d={transformerPath}
          fill="rgba(234, 88, 12, 0.1)"
          stroke="#ea580c"
          strokeWidth={2}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />

        {/* Modus_X Path */}
        <motion.path
          d={modusXPath}
          fill="rgba(228, 228, 231, 0.15)"
          stroke="#E4E4E7"
          strokeWidth={2}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
        />
        
        {/* Legend */}
        <g transform={`translate(${center - 50}, ${size - 20})`}>
          <circle cx="0" cy="0" r="4" fill="#ea580c" />
          <text x="10" y="3" fontSize="10" fill="rgba(255,255,255,0.7)" fontFamily="'JetBrains Mono'">Transformer</text>
          <circle cx="80" cy="0" r="4" fill="#E4E4E7" />
          <text x="90" y="3" fontSize="10" fill="rgba(255,255,255,0.7)" fontFamily="'JetBrains Mono'">Modus_X</text>
        </g>
      </svg>
    </div>
  );
}
