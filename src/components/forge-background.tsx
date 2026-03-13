"use client";

import { motion } from "framer-motion";

export function ForgeBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
      
      {/* Animated grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(249, 115, 22, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(249, 115, 22, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Pulsing forge glow at bottom */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px]"
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="w-full h-full bg-gradient-to-t from-orange-900/40 via-orange-800/20 to-transparent blur-3xl" />
      </motion.div>

      {/* Floating embers */}
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 3 + 1 + 'px',
            height: Math.random() * 3 + 1 + 'px',
            left: `${Math.random() * 100}%`,
            bottom: `${Math.random() * 60}%`,
            background: `radial-gradient(circle, ${Math.random() > 0.5 ? '#ea580c' : '#c2410c'} 0%, transparent 70%)`,
          }}
          animate={{
            y: [0, -150 - Math.random() * 200],
            x: [0, (Math.random() - 0.5) * 100],
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.2, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Heat shimmer effect */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1/3"
        style={{
          background: 'linear-gradient(to top, rgba(234, 88, 12, 0.1), transparent)',
        }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Rotating gear-like circles in background */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`gear-${i}`}
          className="absolute rounded-full border border-orange-900/20"
          style={{
            width: 200 + i * 150 + 'px',
            height: 200 + i * 150 + 'px',
            right: -100 - i * 50 + 'px',
            top: 10 + i * 15 + '%',
          }}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 30 + i * 10,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {[...Array(8)].map((_, j) => (
            <div
              key={j}
              className="absolute w-2 h-4 bg-orange-900/30"
              style={{
                left: '50%',
                top: '0',
                transform: `translateX(-50%) rotate(${j * 45}deg)`,
                transformOrigin: '50% 100px',
              }}
            />
          ))}
        </motion.div>
      ))}
    </div>
  );
}
