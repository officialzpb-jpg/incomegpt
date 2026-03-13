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
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-t from-orange-900/30 via-orange-800/15 to-transparent blur-3xl" />
        
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
      </div>

      <div className="relative mx-auto max-w-4xl px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Main Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="mb-8"
          >
            <div className="relative inline-block">
              {/* Glow effect behind logo */}
              <div className="absolute inset-0 bg-orange-600/20 blur-3xl rounded-full scale-150" />
              <img 
                src="/hero-logo.png" 
                alt="WealthForge" 
                className="relative w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-2xl"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 rounded-full border border-orange-800/40 bg-orange-950/30 px-4 py-1.5 mb-6"
          >
            <Hammer className="h-4 w-4 text-orange-500" />
            <span className="text-sm text-orange-400">Forge Your Financial Future</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            Forge Your Path to
            <br />
            <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 bg-clip-text text-transparent">Wealth</span>
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
              className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-800 to-orange-950 px-8 py-4 text-base font-medium text-orange-100 hover:from-orange-900 hover:to-black transition-all border border-orange-800/50"
            >
              Start Forging
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#how-it-works"
              className="rounded-full border border-slate-700 px-8 py-4 text-base font-medium text-slate-300 hover:border-orange-800/50 hover:text-orange-400 transition-colors"
            >
              See How It Works
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
