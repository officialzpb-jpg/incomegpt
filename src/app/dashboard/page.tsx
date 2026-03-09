"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  Plus, 
  Target, 
  Wallet, 
  TrendingUp,
  Clock,
  ChevronRight,
  LogOut,
  User,
  Loader2
} from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Strategy {
  id: string;
  title: string;
  expected_monthly_income: string;
  progress: number;
  status: string;
}

interface Profile {
  email: string;
  income_goal: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ id: string; email?: string } | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [loading, setLoading] = useState(true);
  const [incomeGoal, setIncomeGoal] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push("/login");
        return;
      }

      setUser(user);

      // Get profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileData) {
        setProfile(profileData);
        setIncomeGoal(profileData.income_goal.toString());
      }

      // Get strategies
      const { data: strategiesData } = await supabase
        .from("strategies")
        .select("*")
        .eq("user_id", user.id);

      if (strategiesData) {
        setStrategies(strategiesData.map(s => ({
          ...s,
          progress: Math.floor(Math.random() * 100),
          status: "In Progress"
        })));
      }

      setLoading(false);
    };

    getUser();
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const updateIncomeGoal = async () => {
    if (!user) return;
    
    const { error } = await supabase
      .from("profiles")
      .update({ income_goal: parseInt(incomeGoal) || 0 })
      .eq("id", user.id);

    if (error) {
      console.error("Error updating goal:", error);
      alert("Failed to update goal");
      return;
    }

    // Update local state
    setProfile(prev => prev ? { ...prev, income_goal: parseInt(incomeGoal) || 0 } : null);
    
    // Show success feedback
    const btn = document.getElementById("update-goal-btn");
    if (btn) {
      const originalText = btn.textContent;
      btn.textContent = "Saved!";
      setTimeout(() => btn.textContent = originalText, 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 border-r border-white/5 bg-black/50 backdrop-blur-xl hidden lg:block">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2 mb-8">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-semibold">IncomeGPT</span>
          </Link>

          <nav className="space-y-1">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 text-white"
            >
              <Target className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href="/generator"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:bg-white/5 hover:text-white transition-colors"
            >
              <Sparkles className="h-5 w-5" />
              Generate Strategy
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:bg-white/5 hover:text-white transition-colors"
            >
              <Wallet className="h-5 w-5" />
              Earnings
            </Link>
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/5">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="font-medium">{profile?.email?.split('@')[0] || 'User'}</div>
              <div className="text-sm text-white/60">Pro Plan</div>
            </div>
          </div>
          <button 
            onClick={handleSignOut}
            className="flex items-center gap-2 text-sm text-white/60 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 p-6 lg:p-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-white/60 mb-8">Track your income goals and manage your strategies</p>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {[
                { label: "Monthly Goal", value: `$${(profile?.income_goal || 0).toLocaleString()}`, icon: Target },
                { label: "Current Income", value: "$2,400", icon: TrendingUp },
                { label: "Active Strategies", value: strategies.length.toString(), icon: Clock },
              ].map((stat, i) => (
                <div key={i} className="glass rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <stat.icon className="h-5 w-5 text-emerald-400" />
                    <span className="text-sm text-white/60">{stat.label}</span>
                  </div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </div>
              ))}
            </div>

            {/* Income Goal Input */}
            <div className="glass rounded-2xl p-6 mb-8">
              <h2 className="text-lg font-semibold mb-4">Set Your Income Goal</h2>
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">$</span>
                    <input
                      type="number"
                      value={incomeGoal}
                      onChange={(e) => setIncomeGoal(e.target.value)}
                      placeholder="10,000"
                      className="w-full pl-8 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>
                <button 
                  id="update-goal-btn"
                  onClick={updateIncomeGoal}
                  className="px-6 py-3 bg-white text-black rounded-xl font-medium hover:bg-white/90 transition-colors"
                >
                  Update Goal
                </button>
              </div>
            </div>

            {/* Generate Strategy CTA */}
            <Link href="/generator">
              <div className="group glass rounded-2xl p-6 mb-8 hover:bg-white/[0.05] transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500">
                      <Plus className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Generate New Strategy</h3>
                      <p className="text-sm text-white/60">Create a personalized money-making plan</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </Link>

            {/* Saved Strategies */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Your Strategies</h2>
              {strategies.length === 0 ? (
                <div className="glass rounded-xl p-8 text-center">
                  <p className="text-white/60">No strategies yet. Generate your first one!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {strategies.map((strategy) => (
                    <div key={strategy.id} className="glass rounded-xl p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold mb-1">{strategy.title}</h3>
                          <span className="text-emerald-400 text-sm">{strategy.expected_monthly_income}</span>
                        </div>
                        <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400">
                          {strategy.status}
                        </span>
                      </div>
                      <div className="mb-2">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-white/60">Progress</span>
                          <span>{strategy.progress}%</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full"
                            style={{ width: `${strategy.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
