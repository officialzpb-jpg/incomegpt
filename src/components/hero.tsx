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
          className="w-full h-[60vh] opacity-50"
          viewBox="0 0 1440 400"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="flowGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
              <stop offset="20%" stopColor="#10b981" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.5" />
              <stop offset="80%" stopColor="#10b981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="flowGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
              <stop offset="30%" stopColor="#06b6d4" stopOpacity="0.4" />
              <stop offset="70%" stopColor="#10b981" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Flow Wave 1 - Top */}
          <motion.path
            d="M-100,100 Q200,50 400,100 T900,100 T1400,100 T1900,100"
            fill="none"
            stroke="url(#flowGradient1)"
            strokeWidth="3"
            animate={{
              d: [
                "M-100,100 Q200,50 400,100 T900,100 T1400,100 T1900,100",
                "M-100,100 Q200,150 400,100 T900,100 T1400,100 T1900,100",
                "M-100,100 Q200,50 400,100 T900,100 T1400,100 T1900,100",
              ],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Flow Wave 2 - Middle */}
          <motion.path
            d="M-100,200 Q300,150 600,200 T1200,200 T1800,200"
            fill="none"
            stroke="url(#flowGradient2)"
            strokeWidth="4"
            animate={{
              d: [
                "M-100,200 Q300,150 600,200 T1200,200 T1800,200",
                "M-100,200 Q300,250 600,200 T1200,200 T1800,200",
                "M-100,200 Q300,150 600,200 T1200,200 T1800,200",
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />
          
          {/* Flow Wave 3 - Bottom */}
          <motion.path
            d="M-100,300 Q250,250 500,300 T1000,300 T1500,300 T2000,300"
            fill="none"
            stroke="url(#flowGradient1)"
            strokeWidth="3"
            animate={{
              d: [
                "M-100,300 Q250,250 500,300 T1000,300 T1500,300 T2000,300",
                "M-100,300 Q250,350 500,300 T1000,300 T1500,300 T2000,300",
                "M-100,300 Q250,250 500,300 T1000,300 T1500,300 T2000,300",
              ],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
          
          {/* Flow Wave 4 - Thinner accent */}
          <motion.path
            d="M-100,150 Q400,100 800,150 T1600,150"
            fill="none"
            stroke="url(#flowGradient2)"
            strokeWidth="2"
            animate={{
              d: [
                "M-100,150 Q400,100 800,150 T1600,150",
                "M-100,150 Q400,200 800,150 T1600,150",
                "M-100,150 Q400,100 800,150 T1600,150",
              ],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5,
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