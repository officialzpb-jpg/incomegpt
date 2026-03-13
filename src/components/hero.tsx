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
        
        {/* Animated flowing waves */}
        <svg
          className="absolute bottom-0 left-0 w-full h-1/2 opacity-30"
          viewBox="0 0 1440 600"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#10b981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          
          {/* Wave 1 */}
          <motion.path
            d="M0,300 C240,200 480,400 720,300 C960,200 1200,400 1440,300 L1440,600 L0,600 Z"
            fill="url(#waveGradient1)"
            animate={{
              d: [
                "M0,300 C240,200 480,400 720,300 C960,200 1200,400 1440,300 L1440,600 L0,600 Z",
                "M0,350 C240,450 480,250 720,350 C960,450 1200,250 1440,350 L1440,600 L0,600 Z",
                "M0,300 C240,200 480,400 720,300 C960,200 1200,400 1440,300 L1440,600 L0,600 Z",
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Wave 2 */}
          <motion.path
            d="M0,400 C360,300 720,500 1080,400 C1260,350 1350,450 1440,400 L1440,600 L0,600 Z"
            fill="url(#waveGradient2)"
            animate={{
              d: [
                "M0,400 C360,300 720,500 1080,400 C1260,350 1350,450 1440,400 L1440,600 L0,600 Z",
                "M0,450 C360,550 720,350 1080,450 C1260,500 1350,400 1440,450 L1440,600 L0,600 Z",
                "M0,400 C360,300 720,500 1080,400 C1260,350 1350,450 1440,400 L1440,600 L0,600 Z",
              ],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
          
          {/* Wave 3 */}
          <motion.path
            d="M0,450 C480,350 960,550 1440,450 L1440,600 L0,600 Z"
            fill="url(#waveGradient1)"
            animate={{
              d: [
                "M0,450 C480,350 960,550 1440,450 L1440,600 L0,600 Z",
                "M0,500 C480,600 960,400 1440,500 L1440,600 L0,600 Z",
                "M0,450 C480,350 960,550 1440,450 L1440,600 L0,600 Z",
              ],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </svg>
        
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