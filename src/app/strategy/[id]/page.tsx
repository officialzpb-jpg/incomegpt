"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  ArrowLeft, 
  CheckCircle2,
  Circle,
  Clock,
  DollarSign,
  Target,
  Loader2
} from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Step {
  title: string;
  duration: string;
  completed: boolean;
}

interface Strategy {
  title: string;
  description: string;
  expectedMonthlyIncome: string;
  difficulty: string;
  startupCost: string;
  timeframe: string;
  steps: Step[];
}

const strategiesData: Record<number, Strategy> = {
  1: {
    title: "AI-Powered Content Agency",
    description: "Start a content creation agency that leverages AI tools to deliver high-quality content at scale.",
    expectedMonthlyIncome: "$4,000 - $8,000",
    difficulty: "Beginner",
    startupCost: "$500 - $1,000",
    timeframe: "2-4 months",
    steps: [
      { title: "Set up your agency website and portfolio", duration: "1 week", completed: false },
      { title: "Identify 3-5 niche industries to target", duration: "3 days", completed: false },
      { title: "Create service packages and pricing", duration: "1 week", completed: false },
      { title: "Build a client acquisition system", duration: "2 weeks", completed: false },
      { title: "Hire freelancers to scale operations", duration: "1 month", completed: false },
    ]
  },
  2: {
    title: "Niche SaaS Micro-Product",
    description: "Build a small software tool that solves a specific problem for a niche audience.",
    expectedMonthlyIncome: "$5,000 - $15,000",
    difficulty: "Advanced",
    startupCost: "$2,000 - $5,000",
    timeframe: "6-12 months",
    steps: [
      { title: "Research pain points in your target niche", duration: "2 weeks", completed: false },
      { title: "Validate the idea with potential customers", duration: "2 weeks", completed: false },
      { title: "Build a minimal viable product", duration: "2 months", completed: false },
      { title: "Launch on Product Hunt and relevant communities", duration: "1 week", completed: false },
      { title: "Iterate based on user feedback", duration: "Ongoing", completed: false },
    ]
  },
  3: {
    title: "Premium Newsletter Community",
    description: "Create a paid newsletter focused on a specialized topic where you have expertise.",
    expectedMonthlyIncome: "$3,000 - $10,000",
    difficulty: "Intermediate",
    startupCost: "$100 - $500",
    timeframe: "3-6 months",
    steps: [
      { title: "Choose a niche with high willingness to pay", duration: "1 week", completed: false },
      { title: "Set up newsletter infrastructure", duration: "3 days", completed: false },
      { title: "Create a content calendar", duration: "1 week", completed: false },
      { title: "Build an audience through free content", duration: "2 months", completed: false },
      { title: "Launch paid tier with exclusive benefits", duration: "1 week", completed: false },
    ]
  },
};

export default function StrategyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [steps, setSteps] = useState<Step[]>([]);
  const [strategy, setStrategy] = useState<Strategy | null>(null);

  const strategyId = parseInt(params.id as string);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push("/login");
        return;
      }
      
      const strat = strategiesData[strategyId];
      if (strat) {
        setStrategy(strat);
        setSteps(strat.steps);
      }
      
      setLoading(false);
    };

    getUser();
  }, [router, strategyId]);

  const toggleStep = (index: number) => {
    setSteps(prev => prev.map((step, i) => 
      i === index ? { ...step, completed: !step.completed } : step
    ));
  };

  const completedCount = steps.filter(s => s.completed).length;
  const progress = steps.length > 0 ? Math.round((completedCount / steps.length) * 100) : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-400" />
      </div>
    );
  }

  if (!strategy) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Strategy not found</h1>
          <Link href="/dashboard" className="text-emerald-400 hover:text-emerald-300">
            Go back to dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-white/5 bg-black/50 backdrop-blur-xl">
        <div className="mx-auto max-w-4xl px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/results" className="p-2 -ml-2 hover:bg-white/5 rounded-lg transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="font-semibold">IncomeGPT</span>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mb-8">
            <Link href="/results" className="text-sm text-white/60 hover:text-white mb-4 inline-block">
              ← Back to results
            </Link>
            <h1 className="text-3xl font-bold mb-2">{strategy.title}</h1>
            <p className="text-white/60">{strategy.description}</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="glass rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <Target className="h-4 w-4 text-emerald-400" />
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

          {/* Progress */}
          <div className="glass rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Execution Plan</h2>
              <span className="text-sm text-white/60">{completedCount} of {steps.length} completed</span>
            </div>
            
            <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-6">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="space-y-3">
              {steps.map((step, index) => (
                <button
                  key={index}
                  onClick={() => toggleStep(index)}
                  className={`w-full flex items-start gap-4 p-4 rounded-xl border transition-all text-left ${
                    step.completed 
                      ? "border-emerald-500/30 bg-emerald-500/10" 
                      : "border-white/10 hover:border-white/20"
                  }`}
                >
                  {step.completed ? (
                    <CheckCircle2 className="h-6 w-6 text-emerald-400 flex-shrink-0" />
                  ) : (
                    <Circle className="h-6 w-6 text-white/40 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className={`font-medium ${step.completed ? "text-emerald-400 line-through" : ""}`}>
                      {step.title}
                    </p>
                    <p className="text-sm text-white/60">{step.duration}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <Link
              href="/dashboard"
              className="flex-1 text-center py-3 rounded-xl border border-white/20 hover:bg-white/5 transition-colors"
            >
              Back to Dashboard
            </Link>
            <Link
              href="/generator"
              className="flex-1 text-center py-3 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition-colors"
            >
              Generate Another Strategy
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
