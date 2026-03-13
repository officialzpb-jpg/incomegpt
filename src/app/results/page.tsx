"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  TrendingUp, 
  Clock, 
  DollarSign,
  ChevronRight,
  Bookmark,
  Loader2,
  Sparkles
} from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Step {
  id?: number;
  title?: string;
  duration?: string;
  instruction?: string;
  aiPrompt?: string;
  completed?: boolean;
  unlocked?: boolean;
}

interface Strategy {
  id: string;
  title: string;
  description: string;
  expectedMonthlyIncome: string;
  difficulty: string;
  startupCost: string;
  timeframe: string;
  matchScore: number;
  steps: (string | Step)[];
  tags: string[];
}

export default function ResultsPage() {
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [loading, setLoading] = useState(true);
  const [savedStrategies, setSavedStrategies] = useState<string[]>([]);
  const [savingId, setSavingId] = useState<string | null>(null);

  useEffect(() => {
    // Load strategies from sessionStorage
    const stored = sessionStorage.getItem("generatedStrategies");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setStrategies(parsed);
      } catch {
        console.error("Failed to parse strategies");
      }
    }
    setLoading(false);
  }, []);

  const saveStrategy = async (strategy: Strategy) => {
    setSavingId(strategy.id);
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert("Please log in to save strategies");
      setSavingId(null);
      return;
    }
    
    const { error } = await supabase
      .from("saved_strategies")
      .insert({
        user_id: user.id,
        strategy_id: strategy.id,
        title: strategy.title,
        description: strategy.description,
        data: strategy,
      });
    
    if (error) {
      alert("Failed to save strategy: " + error.message);
    } else {
      setSavedStrategies(prev => [...prev, strategy.id]);
      alert("Strategy saved successfully!");
    }
    
    setSavingId(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-400" />
      </div>
    );
  }

  if (strategies.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <Sparkles className="h-16 w-16 text-emerald-400 mb-6" />
        <h1 className="text-2xl font-bold mb-4">No Strategies Found</h1>
        <p className="text-white/60 mb-6">Generate strategies first to see results.</p>
        <Link 
          href="/generator"
          className="px-6 py-3 bg-emerald-500 text-white rounded-xl font-medium"
        >
          Generate Strategies
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="border-b border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="mx-auto max-w-5xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="p-2 -ml-2 hover:bg-white/5 rounded-lg transition-colors">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="font-semibold">Your Strategies</h1>
                <p className="text-sm text-white/60">{strategies.length} strategies generated</p>
              </div>
            </div>
            <Link 
              href="/generator"
              className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-medium transition-colors"
            >
              Generate New
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8">
        <div className="space-y-6">
          {strategies.map((strategy, index) => (
            <motion.div
              key={strategy.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl font-bold text-emerald-400">{strategy.matchScore}%</span>
                    <span className="text-sm text-white/60">Match Score</span>
                  </div>
                  <h2 className="text-xl font-bold mb-2">{strategy.title}</h2>
                  <p className="text-white/70 mb-4">{strategy.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {strategy.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-white/5 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <button
                  onClick={() => saveStrategy(strategy)}
                  disabled={savedStrategies.includes(strategy.id) || savingId === strategy.id}
                  className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50"
                >
                  <Bookmark className={`h-5 w-5 ${savedStrategies.includes(strategy.id) ? 'fill-emerald-400 text-emerald-400' : ''}`} />
                </button>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-white/60 mb-1">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm">Income</span>
                  </div>
                  <div className="font-semibold">{strategy.expectedMonthlyIncome}</div>
                </div>
                
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-white/60 mb-1">
                    <DollarSign className="h-4 w-4" />
                    <span className="text-sm">Startup</span>
                  </div>
                  <div className="font-semibold">{strategy.startupCost}</div>
                </div>
                
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-white/60 mb-1">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">Timeline</span>
                  </div>
                  <div className="font-semibold">{strategy.timeframe}</div>
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="font-semibold mb-3">Action Steps</h3>
                <ol className="space-y-2">
                  {strategy.steps.map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm">
                        {i + 1}
                      </span>
                      <span className="text-white/70">
                        {typeof step === 'string' ? step : step.title || 'Step ' + (i + 1)}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
              
              <Link 
                href={`/strategy/${strategy.id}`}
                className="flex items-center justify-center gap-2 w-full py-3 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition-colors"
              >
                View Full Plan
                <ChevronRight className="h-4 w-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}