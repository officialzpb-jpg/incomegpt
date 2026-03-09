"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  TrendingUp, 
  Clock, 
  DollarSign,
  Target,
  ChevronRight,
  Check,
  Bookmark,
  Share2,
  Loader2
} from "lucide-react";
import { supabase } from "@/lib/supabase";

const strategies = [
  {
    id: 1,
    title: "AI-Powered Content Agency",
    description: "Start a content creation agency that leverages AI tools to deliver high-quality blog posts, social media content, and marketing copy at scale.",
    expectedMonthlyIncome: "$4,000 - $8,000",
    difficulty: "Beginner",
    startupCost: "$500 - $1,000",
    timeframe: "2-4 months",
    matchScore: 98,
    tags: ["Writing", "AI Tools", "Marketing"],
    steps: [
      "Set up your agency website and portfolio",
      "Identify 3-5 niche industries to target",
      "Create service packages and pricing",
      "Build a client acquisition system",
      "Hire freelancers to scale operations"
    ]
  },
  {
    id: 2,
    title: "Niche SaaS Micro-Product",
    description: "Build a small software tool that solves a specific problem for a niche audience. Focus on simplicity and high value.",
    expectedMonthlyIncome: "$5,000 - $15,000",
    difficulty: "Advanced",
    startupCost: "$2,000 - $5,000",
    timeframe: "6-12 months",
    matchScore: 85,
    tags: ["Coding", "Product", "Sales"],
    steps: [
      "Research pain points in your target niche",
      "Validate the idea with potential customers",
      "Build a minimal viable product",
      "Launch on Product Hunt and relevant communities",
      "Iterate based on user feedback"
    ]
  },
  {
    id: 3,
    title: "Premium Newsletter Community",
    description: "Create a paid newsletter focused on a specialized topic where you have expertise. Build a community of engaged subscribers.",
    expectedMonthlyIncome: "$3,000 - $10,000",
    difficulty: "Intermediate",
    startupCost: "$100 - $500",
    timeframe: "3-6 months",
    matchScore: 92,
    tags: ["Writing", "Community", "Marketing"],
    steps: [
      "Choose a niche with high willingness to pay",
      "Set up newsletter infrastructure",
      "Create a content calendar",
      "Build an audience through free content",
      "Launch paid tier with exclusive benefits"
    ]
  },
];

const difficultyColors: Record<string, string> = {
  Beginner: "bg-emerald-500/20 text-emerald-400",
  Intermediate: "bg-yellow-500/20 text-yellow-400",
  Advanced: "bg-red-500/20 text-red-400",
};

export default function ResultsPage() {
  const router = useRouter();
  const [savedStrategies, setSavedStrategies] = useState<number[]>([]);
  const [savingId, setSavingId] = useState<number | null>(null);

  const saveStrategy = async (strategy: typeof strategies[0]) => {
    setSavingId(strategy.id);
    
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      console.error("Auth error:", authError);
      alert("Please log in to save strategies");
      router.push("/login");
      return;
    }

    console.log("Saving strategy for user:", user.id);
    
    const strategyData = {
      user_id: user.id,
      title: strategy.title,
      description: strategy.description,
      expected_monthly_income: strategy.expectedMonthlyIncome,
      difficulty: strategy.difficulty,
      startup_cost: strategy.startupCost,
      timeframe: strategy.timeframe,
      steps: strategy.steps,
    };
    
    console.log("Strategy data:", strategyData);

    const { data, error } = await supabase.from("strategies").insert(strategyData).select();

    console.log("Insert response:", { data, error });

    if (error) {
      console.error("Error saving strategy:", error);
      alert("Failed to save strategy: " + error.message);
    } else {
      setSavedStrategies(prev => [...prev, strategy.id]);
      alert("Strategy saved successfully!");
    }
    
    setSavingId(null);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-white/5 bg-black/50 backdrop-blur-xl">
        <div className="mx-auto max-w-4xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/generator" className="p-2 -ml-2 hover:bg-white/5 rounded-lg transition-colors">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg overflow-hidden">
                  <img 
                    src="https://i.imgur.com/KoehXsN.jpeg" 
                    alt="IncomeGPT" 
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="font-semibold">IncomeGPT</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 mb-4">
              <Check className="h-4 w-4 text-emerald-400" />
              <span className="text-sm text-emerald-400">3 Strategies Generated</span>
            </div>
            <h1 className="text-3xl font-bold mb-3">Your Personalized Strategies</h1>
            <p className="text-white/60">Based on your goals, budget, and skills</p>
          </div>

          <div className="space-y-6">
            {strategies.map((strategy, index) => (
              <motion.div
                key={strategy.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-2xl p-6 lg:p-8"
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  {/* Left: Main Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold">{strategy.title}</h3>
                          <span className={`text-xs px-2 py-1 rounded-full ${difficultyColors[strategy.difficulty]}`}>
                            {strategy.difficulty}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {strategy.tags.map((tag) => (
                            <span key={tag} className="text-xs px-2 py-1 rounded-full bg-white/5 text-white/60">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => saveStrategy(strategy)}
                          disabled={savedStrategies.includes(strategy.id) || savingId === strategy.id}
                          className={`p-2 rounded-lg transition-colors ${
                            savedStrategies.includes(strategy.id)
                              ? "bg-emerald-500/20 text-emerald-400"
                              : "hover:bg-white/5"
                          }`}
                        >
                          {savingId === strategy.id ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                          ) : (
                            <Bookmark className={`h-5 w-5 ${savedStrategies.includes(strategy.id) ? "fill-current" : ""}`} />
                          )}
                        </button>
                        <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                          <Share2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>

                    <p className="text-white/60 mb-6">{strategy.description}</p>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="glass rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-1">
                          <TrendingUp className="h-4 w-4 text-emerald-400" />
                          <span className="text-xs text-white/60">Monthly Income</span>
                        </div>
                        <div className="font-semibold text-emerald-400">{strategy.expectedMonthlyIncome}</div>
                      </div>
                      <div className="glass rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-1">
                          <DollarSign className="h-4 w-4 text-cyan-400" />
                          <span className="text-xs text-white/60">Startup Cost</span>
                        </div>
                        <div className="font-semibold">{strategy.startupCost}</div>
                      </div>
                      <div className="glass rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-1">
                          <Clock className="h-4 w-4 text-purple-400" />
                          <span className="text-xs text-white/60">Timeframe</span>
                        </div>
                        <div className="font-semibold">{strategy.timeframe}</div>
                      </div>
                    </div>

                    <Link
                      href={`/strategy/${strategy.id}`}
                      className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-medium hover:bg-white/90 transition-colors"
                    >
                      {savedStrategies.includes(strategy.id) ? "View Saved Strategy" : "Generate Execution Plan"}
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>

                  {/* Right: Match Score */}
                  <div className="lg:w-32 flex flex-row lg:flex-col items-center gap-4 lg:gap-2">
                    <div className="relative w-20 h-20">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="rgba(255,255,255,0.1)"
                          strokeWidth="3"
                        />
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="url(#gradient)"
                          strokeWidth="3"
                          strokeDasharray={`${strategy.matchScore}, 100`}
                        />
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#10b981" />
                            <stop offset="100%" stopColor="#06b6d4" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold">{strategy.matchScore}%</span>
                      </div>
                    </div>
                    <span className="text-sm text-white/60">Match Score</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/generator"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
            >
              <Target className="h-4 w-4" />
              Adjust your preferences and regenerate
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
