import React from 'react';
import { motion } from 'framer-motion';

export const MatrixStreamIcon = ({ color = '#E4E4E7' }: { color?: string }) => {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.g
        initial="hidden"
        animate="visible"
      >
        {Array.from({ length: 4 }).map((_, i) =>
          Array.from({ length: 4 }).map((_, j) => (
            <motion.rect
              key={`${i}-${j}`}
              x={10 + j * 12}
              y={10 + i * 12}
              width="8"
              height="8"
              rx="1"
              fill={color}
              variants={{
                hidden: { opacity: 0.2, scale: 0.8 },
                visible: { opacity: 0.9, scale: 1 }
              }}
              transition={{ 
                repeat: Infinity, 
                repeatType: "reverse", 
                duration: 1.5, 
                delay: (i + j) * 0.1 
              }}
            />
          ))
        )}
      </motion.g>
    </svg>
  );
};

export const VectorStreamIcon = ({ color = '#E4E4E7' }: { color?: string }) => {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {Array.from({ length: 5 }).map((_, i) => (
        <rect
          key={i}
          x={8 + i * 10}
          y="28"
          width="6"
          height="8"
          rx="1"
          fill={color}
          opacity={0.3}
        />
      ))}
      <motion.rect
        x="6"
        y="24"
        width="10"
        height="16"
        rx="2"
        stroke={color}
        strokeWidth="1.5"
        fill="transparent"
        animate={{
          x: [6, 46, 6]
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut"
        }}
      />
    </svg>
  );
};

export const LearnedRouterIcon = ({ color = '#E4E4E7' }: { color?: string }) => {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Top Stream (Matrix) */}
      <motion.path
        d="M 8 20 C 24 20, 28 32, 32 32"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="transparent"
        strokeDasharray="4 4"
        animate={{ strokeDashoffset: [0, -8] }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
      {/* Bottom Stream (Vector) */}
      <motion.path
        d="M 8 44 C 24 44, 28 32, 32 32"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="transparent"
        strokeDasharray="4 4"
        animate={{ strokeDashoffset: [0, -8] }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
      {/* Combined Stream */}
      <motion.path
        d="M 32 32 L 56 32"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="transparent"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      />
      {/* Mixer Gate */}
      <motion.circle
        cx="32"
        cy="32"
        r="6"
        fill="#18181b"
        stroke={color}
        strokeWidth="1.5"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      />
      <motion.path
        d="M 29 34 Q 32 34 32 32 T 35 30"
        stroke={color}
        strokeWidth="1"
        fill="transparent"
        strokeLinecap="round"
      />
    </svg>
  );
};
