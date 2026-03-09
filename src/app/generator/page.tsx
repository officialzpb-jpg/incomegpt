"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  ArrowLeft, 
  DollarSign, 
  Clock, 
  Wallet, 
  Lightbulb,
  ArrowRight,
  Loader2
} from "lucide-react";

const skillOptions = [
  "Writing", "Design", "Coding", "Marketing", "Sales", 
  "Teaching", "Photography", "Video Editing", "Data Analysis",
  "Social Media", "SEO", "Copywriting"
];

const timeframeOptions = [
  "1-3 months", "3-6 months", "6-12 months", "1-2 years"
];

export default function GeneratorPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    incomeGoal: "",
    timeframe: "",
    startingBudget: "",
    skills: [] as string[],
  });

  const toggleSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Navigate to results
    router.push("/results");
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-white/5 bg-black/50 backdrop-blur-xl">
        <div className="mx-auto max-w-3xl px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="p-2 -ml-2 hover:bg-white/5 rounded-lg transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg overflow-hidden">
                <img 
                  src="https://i.imgur.com/8XqY3hL.png" 
                  alt="IncomeGPT" 
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="font-semibold">IncomeGPT</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-3xl px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-3">Generate Your Strategy</h1>
            <p className="text-white/60">Tell us about your goals and we&apos;ll create personalized money-making strategies</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Income Goal */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/20">
                  <DollarSign className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                  <label className="font-semibold">Income Goal</label>
                  <p className="text-sm text-white/60">How much do you want to earn per month?</p>
                </div>
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">$</span>
                <input
                  type="number"
                  required
                  value={formData.incomeGoal}
                  onChange={(e) => setFormData({ ...formData, incomeGoal: e.target.value })}
                  placeholder="5,000"
                  className="w-full pl-8 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Timeframe */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/20">
                  <Clock className="h-5 w-5 text-cyan-400" />
                </div>
                <div>
                  <label className="font-semibold">Timeframe</label>
                  <p className="text-sm text-white/60">When do you want to reach your goal?</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {timeframeOptions.map((timeframe) => (
                  <button
                    key={timeframe}
                    type="button"
                    onClick={() => setFormData({ ...formData, timeframe })}
                    className={`py-3 px-4 rounded-xl border transition-all ${
                      formData.timeframe === timeframe
                        ? "border-emerald-500 bg-emerald-500/20 text-emerald-400"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    {timeframe}
                  </button>
                ))}
              </div>
            </div>

            {/* Starting Budget */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/20">
                  <Wallet className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <label className="font-semibold">Starting Budget</label>
                  <p className="text-sm text-white/60">How much can you invest to get started?</p>
                </div>
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">$</span>
                <input
                  type="number"
                  required
                  value={formData.startingBudget}
                  onChange={(e) => setFormData({ ...formData, startingBudget: e.target.value })}
                  placeholder="1,000"
                  className="w-full pl-8 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Skills */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500/20">
                  <Lightbulb className="h-5 w-5 text-yellow-400" />
                </div>
                <div>
                  <label className="font-semibold">Your Skills</label>
                  <p className="text-sm text-white/60">Select all that apply to you</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {skillOptions.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    className={`py-2 px-4 rounded-full border transition-all ${
                      formData.skills.includes(skill)
                        ? "border-emerald-500 bg-emerald-500/20 text-emerald-400"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white py-4 rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Generating Strategies...
                </>
              ) : (
                <>
                  Generate Strategies
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </main>
    </div>
  );
}
