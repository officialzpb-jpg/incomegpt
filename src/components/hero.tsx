"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Hammer, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Animated Forge Background */}
      <div className="absolute inset-0">
        {/* Dark gradient base */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
        
        {/* Glowing forge effect at bottom */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-t from-orange-600/20 via-amber-600/10 to-transparent blur-3xl" />
        
        {/* Floating sparks */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `${Math.random() * 50}%`,
            }}
            animate={{
              y: [0, -100 - Math.random() * 200],
              x: [0, (Math.random() - 0.5) * 100],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeOut",
            }}
          />
        ))}

        {/* Horizontal flowing energy lines */}
        <svg
          className="absolute inset-0 w-full h-full opacity-30"
          viewBox="0 0 1440 800"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="forgeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0" />
              <stop offset="30%" stopColor="#f59e0b" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#ea580c" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#f59e0b" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Flowing energy waves */}
          {[350, 400, 450].map((y, i) => (
            <motion.path
              key={i}
              d={`M-200,${y} Q300,${y - 30} 700,${y} T1500,${y}`}
              fill="none"
              stroke="url(#forgeGradient)"
              strokeWidth={6 - i}
              strokeLinecap="round"
              animate={{
                d: [
                  `M-200,${y} Q300,${y - 30} 700,${y} T1500,${y}`,
                  `M-200,${y} Q300,${y + 30} 700,${y} T1500,${y}`,
                  `M-200,${y} Q300,${y - 30} 700,${y} T1500,${y}`,
                ],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
        </svg>
      </div>

      <div className="relative mx-auto max-w-4xl px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 mb-8"
          >
            <Hammer className="h-4 w-4 text-amber-400" />
            <span className="text-sm text-amber-400">Forge Your Financial Future</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            Forge Your Path to
            <br />
            <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 bg-clip-text text-transparent">Wealth</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mx-auto max-w-2xl text-lg text-slate-400 mb-10"
          >
            Like a blacksmith shapes metal, we help you forge personalized income strategies. 
            Turn your skills into profitable ventures.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/signup"
              className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 px-8 py-4 text-base font-medium text-white hover:from-amber-600 hover:to-orange-700 transition-all"
            >
              Start Forging
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#how-it-works"
              className="rounded-full border border-slate-700 px-8 py-4 text-base font-medium text-slate-300 hover:border-amber-500/50 hover:text-amber-400 transition-colors"
            >
              See How It Works
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}