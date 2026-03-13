"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  LogOut,
  Loader2,
  Trash2
} from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Profile {
  id: string;
  email: string;
  full_name?: string;
  subscription_status?: string;
  income_goal?: number;
  created_at?: string;
}

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ id: string; email?: string } | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [message, setMessage] = useState("");
  
  // Form states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [incomeGoal, setIncomeGoal] = useState("");

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push("/login");
      return;
    }
    setUser(user);
    setEmail(user.email || "");
    
    // Load profile
    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();
    
    if (profileData) {
      setProfile(profileData);
      setFullName(profileData.full_name || "");
      setIncomeGoal(profileData.income_goal?.toString() || "10000");
    }
    
    setLoading(false);
  };

  const updateProfile = async () => {
    if (!user) {
      setMessage("Not authenticated");
      return;
    }
    
    setSaving(true);
    setMessage("");
    
    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: fullName,
        income_goal: parseInt(incomeGoal) || 10000,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);
    
    if (error) {
      setMessage("Error updating profile: " + error.message);
    } else {
      setMessage("Profile updated successfully!");
    }
    
    setSaving(false);
  };

  const updatePassword = async () => {
    if (!newPassword || newPassword.length < 6) {
      setMessage("Password must be at least 6 characters");
      return;
    }
    
    setSaving(true);
    setMessage("");
    
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    
    if (error) {
      setMessage("Error updating password: " + error.message);
    } else {
      setMessage("Password updated successfully!");
      setNewPassword("");
    }
    
    setSaving(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const deleteAccount = async () => {
    if (!user) return;
    if (!confirm("Are you sure you want to delete your account? This cannot be undone.")) {
      return;
    }
    
    // Delete user data
    await supabase.from("profiles").delete().eq("id", user.id);
    await supabase.from("strategies").delete().eq("user_id", user.id);
    await supabase.from("daily_tasks").delete().eq("user_id", user.id);
    
    // Sign out
    await supabase.auth.signOut();
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
      </div>
    );
  }

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "subscription", label: "Subscription", icon: CreditCard },
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="mx-auto max-w-5xl px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="p-2 -ml-2 hover:bg-white/5 rounded-lg transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-xl font-semibold">Settings</h1>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                    activeTab === tab.id
                      ? "bg-orange-700/20 text-orange-600"
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  {tab.label}
                </button>
              ))}
              
              <hr className="border-white/10 my-4" />
              
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-white/60 hover:bg-white/5 hover:text-white transition-all"
              >
                <LogOut className="h-5 w-5" />
                Sign Out
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-6 p-4 rounded-xl ${
                  message.includes("Error") 
                    ? "bg-red-500/10 border border-red-500/20 text-red-400"
                    : "bg-orange-700/10 border border-orange-700/20 text-orange-600"
                }`}
              >
                {message}
              </motion.div>
            )}

            {activeTab === "profile" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass rounded-2xl p-6 space-y-6"
              >
                <h2 className="text-xl font-semibold">Profile Information</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-orange-700 focus:outline-none"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Email</label>
                    <input
                      type="email"
                      value={email}
                      disabled
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white/40 cursor-not-allowed"
                    />
                    <p className="text-xs text-white/40 mt-1">Email cannot be changed</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Monthly Income Goal</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">$</span>
                      <input
                        type="number"
                        value={incomeGoal}
                        onChange={(e) => setIncomeGoal(e.target.value)}
                        className="w-full pl-8 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-orange-700 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={updateProfile}
                  disabled={saving}
                  className="px-6 py-3 bg-orange-700 text-white rounded-xl font-medium hover:bg-orange-800 disabled:opacity-50 transition-colors"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </motion.div>
            )}

            {activeTab === "subscription" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass rounded-2xl p-6 space-y-6"
              >
                <h2 className="text-xl font-semibold">Subscription</h2>
                
                <div className={`p-6 rounded-xl border ${
                  profile?.subscription_status === 'active' 
                    ? 'bg-orange-700/10 border-orange-700/30' 
                    : 'bg-white/5 border-white/10'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-white/60">Current Plan</p>
                      <p className="text-2xl font-bold">
                        {profile?.subscription_status === 'active' ? 'Pro' : 'Free'}
                      </p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm ${
                      profile?.subscription_status === 'active'
                        ? 'bg-orange-700/20 text-orange-600'
                        : 'bg-white/10 text-white/60'
                    }`}>
                      {profile?.subscription_status === 'active' ? 'Active' : 'Free'}
                    </div>
                  </div>
                  
                  {profile?.subscription_status !== 'active' ? (
                    <Link
                      href="/pricing"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-orange-700 text-white rounded-lg hover:bg-orange-800 transition-colors"
                    >
                      <CreditCard className="h-4 w-4" />
                      Upgrade to Pro
                    </Link>
                  ) : (
                    <p className="text-sm text-white/60">
                      You have unlimited access to all features.
                    </p>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === "security" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass rounded-2xl p-6 space-y-6"
              >
                <h2 className="text-xl font-semibold">Security</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-white/60 mb-2">New Password</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-orange-700 focus:outline-none"
                      placeholder="Enter new password"
                    />
                  </div>
                </div>
                
                <button
                  onClick={updatePassword}
                  disabled={saving}
                  className="px-6 py-3 bg-orange-700 text-white rounded-xl font-medium hover:bg-orange-800 disabled:opacity-50 transition-colors"
                >
                  {saving ? "Updating..." : "Update Password"}
                </button>
                
                <hr className="border-white/10 my-6" />
                
                <div>
                  <h3 className="text-lg font-semibold text-red-400 mb-2">Danger Zone</h3>
                  <p className="text-sm text-white/60 mb-4">
                    Once you delete your account, there is no going back.
                  </p>
                  <button
                    onClick={deleteAccount}
                    className="px-6 py-3 bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl font-medium hover:bg-red-500/30 transition-colors"
                  >
                    <Trash2 className="h-4 w-4 inline mr-2" />
                    Delete Account
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === "notifications" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass rounded-2xl p-6 space-y-6"
              >
                <h2 className="text-xl font-semibold">Notifications</h2>
                
                <div className="space-y-4">
                  {[
                    { label: "Daily task reminders", desc: "Get notified about your daily income tasks" },
                    { label: "New features", desc: "Be the first to know about new features" },
                    { label: "Marketing emails", desc: "Receive tips and strategies for growing your income" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                      <div>
                        <p className="font-medium">{item.label}</p>
                        <p className="text-sm text-white/60">{item.desc}</p>
                      </div>
                      <div className="w-12 h-6 bg-orange-700 rounded-full relative cursor-pointer">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
