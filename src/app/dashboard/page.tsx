"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Plus, 
  Target, 
  Wallet, 
  TrendingUp,
  Clock,
  ChevronRight,
  LogOut,
  User,
  Loader2,
  Sparkles,
  Rocket,
  MessageSquare,
  Users,
  FileText,
  Settings,
  Hammer
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { DailyTasks } from "@/components/daily-tasks";

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
  subscription_status?: string;
  subscription_id?: string;
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
    if (!user) {
      alert("No user found - please log in again");
      return;
    }
    
    const goalValue = parseInt(incomeGoal);
    if (isNaN(goalValue) || goalValue < 0) {
      alert("Please enter a valid number");
      return;
    }
    
    console.log("Updating goal for user:", user.id, "to:", goalValue);
    
    const { data, error } = await supabase
      .from("profiles")
      .update({ income_goal: goalValue })
      .eq("id", user.id)
      .select();

    console.log("Update response:", { data, error });

    if (error) {
      console.error("Error updating goal:", error);
      alert("Failed to update goal: " + error.message);
      return;
    }

    // Update local state
    setProfile(prev => prev ? { ...prev, income_goal: goalValue } : null);
    
    // Show success feedback
    alert("Goal updated successfully!");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 border-r border-white/5 bg-black/50 backdrop-blur-xl hidden lg:block">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2 mb-8">
            <div className="h-8 w-8 rounded-md bg-gradient-to-br from-orange-700 to-orange-900 flex items-center justify-center">
              <Hammer className="h-4 w-4 text-orange-100" />
            </div>
            <span className="text-lg font-semibold text-orange-100">WealthForge</span>
          </Link>

          <nav className="space-y-1">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-3 py-2 rounded-lg bg-orange-950/30 text-orange-100 text-sm"
            >
              <Target className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/generator"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 transition-colors text-sm"
            >
              <Sparkles className="h-4 w-4" />
              Generate
            </Link>
            <Link
              href="/business/build"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 transition-colors text-sm"
            >
              <Rocket className="h-4 w-4" />
              Build Business
            </Link>
            <Link
              href="/chat"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 transition-colors text-sm"
            >
              <MessageSquare className="h-4 w-4" />
              AI Coach
            </Link>
            <div className="pt-3 mt-3 border-t border-slate-800">
              <p className="px-3 text-[10px] text-slate-600 uppercase tracking-wider mb-1">Agents</p>
              <Link
                href="/agents/outreach"
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 transition-colors text-sm"
              >
                <Users className="h-4 w-4" />
                Outreach
              </Link>
              <Link
                href="/agents/content"
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 transition-colors text-sm"
              >
                <FileText className="h-4 w-4" />
                Content
              </Link>
            </div>
            <Link
              href="#"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:bg-white/5 hover:text-white transition-colors"
            >
              <Wallet className="h-5 w-5" />
              Earnings
            </Link>
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800 bg-slate-950">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-orange-700 to-orange-900 flex items-center justify-center">
              <User className="h-4 w-4 text-orange-100" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-slate-200 truncate">{profile?.email?.split('@')[0] || 'User'}</div>
              <div className="text-xs text-slate-500">
                {profile?.subscription_status === 'active' ? 'Pro' : 'Free'}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link 
              href="/settings"
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs text-slate-400 hover:text-orange-400 hover:bg-slate-800/50 rounded-lg transition-colors"
            >
              <Settings className="h-3.5 w-3.5" />
              Settings
            </Link>
            <button 
              onClick={handleSignOut}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs text-slate-400 hover:text-red-400 hover:bg-slate-800/50 rounded-lg transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign out
            </button>
          </div>
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
                    <stat.icon className="h-5 w-5 text-orange-600" />
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
                      className="w-full pl-8 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-orange-700 focus:outline-none"
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
              <div className="group glass rounded-2xl p-6 mb-4 hover:bg-white/[0.05] transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-700 to-orange-600">
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

            {/* Build Business CTA */}
            <Link href="/business/build">
              <div className="group glass rounded-2xl p-6 mb-8 hover:bg-white/[0.05] transition-colors cursor-pointer border border-orange-700/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-pink-500">
                      <Rocket className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Build Your $10K Business</h3>
                      <p className="text-sm text-white/60">Get a complete business blueprint in 10 seconds</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </Link>

            {/* Subscription Status */}
            <div className={`glass rounded-2xl p-6 mb-8 border ${profile?.subscription_status === 'active' ? 'border-orange-700/30 bg-orange-700/5' : 'border-white/10'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold mb-1">Subscription</h2>
                  <p className="text-white/60">{profile?.subscription_status === 'active' ? "You\u0026apos;re on the Pro plan" : "Upgrade to Pro for unlimited features"}</p>
                </div>
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${profile?.subscription_status === 'active' ? 'bg-orange-700/20 text-orange-600' : 'bg-white/10 text-white/60'}`}>
                  <div className={`w-2 h-2 rounded-full ${profile?.subscription_status === 'active' ? 'bg-orange-600' : 'bg-white/40'}`} />
                  {profile?.subscription_status === 'active' ? 'Active' : 'Free'}
                </div>
              </div>
              {profile?.subscription_status !== 'active' && (
                <Link href="/pricing" className="mt-4 inline-flex items-center gap-2 text-orange-600 hover:text-orange-300">
                  Upgrade to Pro <ChevronRight className="h-4 w-4" />
                </Link>
              )}
            </div>

            {/* Daily Tasks */}
            <div className="mb-8">
              <DailyTasks />
            </div>

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
                          <span className="text-orange-600 text-sm">{strategy.expected_monthly_income}</span>
                        </div>
                        <span className="text-xs px-2 py-1 rounded-full bg-orange-700/20 text-orange-600">
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
                            className="h-full bg-gradient-to-r from-orange-700 to-orange-600 rounded-full"
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
