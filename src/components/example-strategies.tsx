"use client";

import { motion } from "framer-motion";
import { ArrowRight, DollarSign, TrendingUp, Users } from "lucide-react";

const examples = [
  {
    icon: DollarSign,
    title: "Freelance AI Consultant",
    income: "$5,000/mo",
    difficulty: "Beginner",
    description: "Help small businesses implement AI tools. Low startup cost, high demand.",
  },
  {
    icon: TrendingUp,
    title: "Niche Newsletter",
    income: "$8,000/mo",
    difficulty: "Intermediate",
    description: "Build a paid newsletter in a specialized industry. Compound growth potential.",
  },
  {
    icon: Users,
    title: "Micro-SaaS Product",
    income: "$15,000/mo",
    difficulty: "Advanced",
    description: "Build a small software tool solving a specific problem. Scalable income.",
  },
];

export function ExampleStrategies() {
  return (
    <section id="strategies" className="py-24 lg:py-32 bg-white/[0.02]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Example Strategies</h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            A glimpse of what our AI can generate for you
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {examples.map((example, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group glass rounded-2xl p-6 hover:bg-white/[0.05] transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5">
                  <example.icon className="h-5 w-5 text-orange-600" />
                </div>
                <span className={`
                  text-xs font-medium px-2 py-1 rounded-full
                  ${example.difficulty === "Beginner" ? "bg-orange-700/20 text-orange-600" : ""}
                  ${example.difficulty === "Intermediate" ? "bg-yellow-500/20 text-yellow-400" : ""}
                  ${example.difficulty === "Advanced" ? "bg-red-500/20 text-red-400" : ""}
                `}>
                  {example.difficulty}
                </span>
              </div>

              <h3 className="text-lg font-semibold mb-2">{example.title}</h3>
              <p className="text-sm text-white/60 mb-4">{example.description}</p>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <span className="text-orange-600 font-semibold">{example.income}</span>
                <ArrowRight className="h-4 w-4 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
