"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Users, TrendingUp, Zap, Hammer } from "lucide-react";

const stats = [
  { icon: Users, label: "Active Forgers", value: 1247, suffix: "+" },
  { icon: TrendingUp, label: "Avg. Monthly Income", value: 8430, prefix: "$" },
  { icon: Zap, label: "Strategies Generated", value: 15234, suffix: "+" },
  { icon: Hammer, label: "Success Rate", value: 89, suffix: "%" },
];

const recentActivity = [
  { name: "Alex K.", action: "generated a strategy", time: "2m ago" },
  { name: "Sarah M.", action: "reached $5K/month", time: "5m ago" },
  { name: "James R.", action: "forged new income stream", time: "8m ago" },
  { name: "Emily W.", action: "completed first strategy", time: "12m ago" },
];

export function SocialProof() {
  const [counts, setCounts] = useState(stats.map(() => 0));
  const [currentActivity, setCurrentActivity] = useState(0);

  useEffect(() => {
    // Animate numbers on mount
    stats.forEach((stat, i) => {
      const duration = 2000;
      const steps = 60;
      const increment = stat.value / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= stat.value) {
          current = stat.value;
          clearInterval(timer);
        }
        setCounts(prev => {
          const newCounts = [...prev];
          newCounts[i] = Math.floor(current);
          return newCounts;
        });
      }, duration / steps);
    });

    // Rotate activity feed
    const activityInterval = setInterval(() => {
      setCurrentActivity(prev => (prev + 1) % recentActivity.length);
    }, 4000);

    return () => clearInterval(activityInterval);
  }, []);

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="mx-auto max-w-5xl px-4">
        {/* Live Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-slate-900/50 border border-orange-900/20 rounded-xl p-4 text-center"
            >
              <stat.icon className="h-5 w-5 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-100">
                {stat.prefix}{counts[i].toLocaleString()}{stat.suffix}
              </div>
              <div className="text-xs text-slate-500">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Live Activity Feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-slate-900/30 border border-orange-900/20 rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-600"></span>
            </span>
            <span className="text-sm font-medium text-orange-200">Live Activity</span>
          </div>

          <div className="space-y-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentActivity}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-between py-2 px-3 bg-slate-800/50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-orange-700 to-orange-900 flex items-center justify-center text-xs font-medium text-orange-100">
                    {recentActivity[currentActivity].name.charAt(0)}
                  </div>
                  <div>
                    <span className="text-sm text-slate-200">{recentActivity[currentActivity].name}</span>
                    <span className="text-sm text-slate-500"> {recentActivity[currentActivity].action}</span>
                  </div>
                </div>
                <span className="text-xs text-slate-600">{recentActivity[currentActivity].time}</span>
              </motion.div>
            </AnimatePresence>

            {/* Preview of other activities */}
            <div className="space-y-2 opacity-50">
              {recentActivity.slice(currentActivity + 1, currentActivity + 3).map((activity, i) => (
                <div key={i} className="flex items-center justify-between py-2 px-3">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-medium text-slate-500">
                      {activity.name.charAt(0)}
                    </div>
                    <div>
                      <span className="text-sm text-slate-400">{activity.name}</span>
                      <span className="text-sm text-slate-600"> {activity.action}</span>
                    </div>
                  </div>
                  <span className="text-xs text-slate-700">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {[
            {
              quote: "WealthForge helped me create a side hustle that now makes $3K/month.",
              author: "Michael R.",
              role: "Software Engineer",
            },
            {
              quote: "The strategies are actionable. I saw results within the first month.",
              author: "Jessica T.",
              role: "Marketing Manager",
            },
            {
              quote: "Finally, an AI that understands real business, not just theory.",
              author: "David K.",
              role: "Entrepreneur",
            },
          ].map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-slate-900/30 border border-orange-900/20 rounded-xl p-5"
            >
              <p className="text-sm text-slate-300 mb-4">"{testimonial.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-orange-800 to-orange-950 flex items-center justify-center text-xs font-medium text-orange-200">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-200">{testimonial.author}</div>
                  <div className="text-xs text-slate-500">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
