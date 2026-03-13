"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Wave Background */}
      <div className="absolute inset-0 bg-black">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/30 via-black to-black" />

      {/* Animated flowing waves - horizontal flow in middle */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg
          className="w-full h-[70vh] opacity-60"
          viewBox="0 0 1440 400"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="flowGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
              <stop offset="20%" stopColor="#10b981" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.6" />
              <stop offset="80%" stopColor="#10b981" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="flowGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
              <stop offset="30%" stopColor="#06b6d4" stopOpacity="0.5" />
              <stop offset="70%" stopColor="#10b981" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="cashGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0" />
              <stop offset="30%" stopColor="#fbbf24" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#f59e0b" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Main Flow Wave 1 - Top */}
          <motion.path
            d="M-200,80 Q200,30 500,80 T1100,80 T1700,80"
            fill="none"
            stroke="url(#flowGradient1)"
            strokeWidth="8"
            strokeLinecap="round"
            animate={{
              d: [
                "M-200,80 Q200,30 500,80 T1100,80 T1700,80",
                "M-200,80 Q200,130 500,80 T1100,80 T1700,80",
                "M-200,80 Q200,30 500,80 T1100,80 T1700,80",
              ],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Main Flow Wave 2 - Middle */}
          <motion.path
            d="M-200,200 Q300,150 700,200 T1300,200 T1900,200"
            fill="none"
            stroke="url(#flowGradient2)"
            strokeWidth="10"
            strokeLinecap="round"
            animate={{
              d: [
                "M-200,200 Q300,150 700,200 T1300,200 T1900,200",
                "M-200,200 Q300,250 700,200 T1300,200 T1900,200",
                "M-200,200 Q300,150 700,200 T1300,200 T1900,200",
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />

          {/* Main Flow Wave 3 - Bottom */}
          <motion.path
            d="M-200,320 Q250,270 600,320 T1200,320 T1800,320 T2400,320"
            fill="none"
            stroke="url(#flowGradient1)"
            strokeWidth="8"
            strokeLinecap="round"
            animate={{
              d: [
                "M-200,320 Q250,270 600,320 T1200,320 T1800,320 T2400,320",
                "M-200,320 Q250,370 600,320 T1200,320 T1800,320 T2400,320",
                "M-200,320 Q250,270 600,320 T1200,320 T1800,320 T2400,320",
              ],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />

          {/* Cash Flow Particles - Flowing through waves */}
          {[...Array(12)].map((_, i) => (
            <motion.circle
              key={i}
              r="4"
              fill="url(#cashGradient)"
              animate={{
                cx: [-100, 1600],
                cy: [140 + (i % 3) * 80, 140 + (i % 3) * 80 + Math.sin(i) * 30],
              }}
              transition={{
                duration: 4 + (i % 3),
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.4,
              }}
            />
          ))}

          {/* Dollar Sign Symbols Flowing */}
          {[...Array(8)].map((_, i) => (
            <motion.text
              key={`dollar-${i}`}
              x={-100}
              y={120 + (i % 4) * 70}
              fill="#fbbf24"
              fontSize="20"
              fontWeight="bold"
              opacity={0.6}
              animate={{
                x: [-100, 1600],
                y: [120 + (i % 4) * 70, 120 + (i % 4) * 70 + Math.sin(i * 0.5) * 20],
              }}
              transition={{
                duration: 5 + (i % 2),
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.6,
              }}
            >
              $
            </motion.text>
          ))}

          {/* Secondary Flow Wave - Accent */}
          <motion.path
            d="M-200,140 Q400,90 800,140 T1600,140"
            fill="none"
            stroke="url(#flowGradient2)"
            strokeWidth="5"
            strokeLinecap="round"
            animate={{
              d: [
                "M-200,140 Q400,90 800,140 T1600,140",
                "M-200,140 Q400,190 800,140 T1600,140",
                "M-200,140 Q400,90 800,140 T1600,140",
              ],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5,
            }}
          />

          {/* Thin accent lines */}
          <motion.path
            d="M-200,260 Q350,210 750,260 T1550,260"
            fill="none"
            stroke="url(#flowGradient1)"
            strokeWidth="3"
            strokeLinecap="round"
            animate={{
              d: [
                "M-200,260 Q350,210 750,260 T1550,260",
                "M-200,260 Q350,310 750,260 T1550,260",
                "M-200,260 Q350,210 750,260 T1550,260",
              ],
            }}
            transition={{
              duration: 6.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.8,
            }}
          />
        </svg>
      </div>

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-emerald-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 60}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
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
            className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 mb-8"
          >
            <Sparkles className="h-4 w-4 text-emerald-400" />
            <span className="text-sm text-emerald-400">AI-Powered Income Strategies</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            The AI That Helps You
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Make Money</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mx-auto max-w-2xl text-lg text-white/60 mb-10"
          >
            Generate personalized, profitable strategies tailored to your skills, budget, and goals.
            Turn your ambitions into actionable plans.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/signup"
              className="group flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-medium text-black hover:bg-white/90 transition-all"
            >
              Start Generating
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#how-it-works"
              className="rounded-full border border-white/20 px-8 py-4 text-base font-medium hover:bg-white/5 transition-colors"
            >
              Learn More
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}