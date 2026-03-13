"use client";

import { motion } from "framer-motion";
import { Target, Zap, Rocket } from "lucide-react";

const steps = [
  {
    icon: Target,
    title: "Set Your Goals",
    description: "Tell us your income target, timeframe, budget, and skills. The more we know, the better your strategies.",
  },
  {
    icon: Zap,
    title: "AI Generates Strategies",
    description: "Our AI analyzes thousands of proven methods to create personalized strategies tailored specifically to you.",
  },
  {
    icon: Rocket,
    title: "Execute \u0026 Earn",
    description: "Get detailed execution plans with step-by-step guidance. Track progress and optimize as you grow.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Three simple steps to go from idea to income
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <div className="glass rounded-2xl p-8 h-full glow">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-700 to-orange-600 mb-6">
                  <step.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-sm font-medium text-orange-600 mb-2">
                  Step {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-white/60">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-gradient-to-r from-orange-700/50 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
