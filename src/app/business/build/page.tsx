"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Rocket, 
  Clock, 
  Wallet, 
  Lightbulb,
  Zap,
  ArrowRight,
  Loader2,
  Target
} from "lucide-react";

const skillOptions = [
  "AI Tools",
  "Writing", 
  "Coding", 
  "Marketing", 
  "Sales",
  "Design",
  "Video Editing",
  "Data Analysis",
  "Social Media",
  "SEO",
  "Copywriting",
  "Consulting",
];

const experienceOptions = [
  { value: "beginner", label: "Beginner - Just starting out", description: "Little to no professional experience" },
  { value: "intermediate", label: "Intermediate - Some experience", description: "1-3 years or some client work" },
  { value: "advanced", label: "Advanced - Expert level", description: "3+ years or deep expertise" },
];

export default function BuildBusinessPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    skills: [] as string[],
    timePerWeek: "20",
    startingBudget: "500",
    interests: "",
    experienceLevel: "beginner",
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
    
    if (formData.skills.length === 0) {
      alert("Please select at least one skill");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch("/api/business/blueprint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          skills: formData.skills,
          timePerWeek: parseInt(formData.timePerWeek),
          startingBudget: parseInt(formData.startingBudget),
          interests: formData.interests,
          experienceLevel: formData.experienceLevel,
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Store blueprint in session storage for the results page
        sessionStorage.setItem("businessBlueprint", JSON.stringify(data.blueprint));
        sessionStorage.setItem("blueprintInput", JSON.stringify(data.userInput));
        router.push("/business/blueprint");
      } else {
        alert(data.error || "Failed to generate blueprint");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
      setIsLoading(false);
    }
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
                  src="/logo.jpg" 
                  alt="IncomeGPT" 
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="font-semibold">IncomeGPT</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="border-b border-white/5 bg-gradient-to-b from-emerald-900/20 to-transparent">
        <div className="mx-auto max-w-3xl px-6 py-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm mb-6">
              <Rocket className="h-4 w-4" />
              <span>Build Your $10K Business</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Let AI Build Your
              <span className="text-emerald-400"> Business Blueprint</span>
            </h1>
            <p className="text-lg text-white/60 max-w-xl mx-auto">
              Answer 4 questions and get a complete business plan capable of generating 
              $10,000/month — customized to your skills, time, and budget.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Form */}
      <main className="mx-auto max-w-3xl px-6 py-12">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          {/* Skills Selection */}
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-emerald-500/10">
                <Zap className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="font-semibold">What skills do you have?</h3>
                <p className="text-sm text-white/60">Select all that apply</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {skillOptions.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => toggleSkill(skill)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    formData.skills.includes(skill)
                      ? "bg-emerald-500 text-white"
                      : "bg-white/5 text-white/70 hover:bg-white/10 border border-white/10"
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          {/* Time & Budget */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Clock className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold">Time per week</h3>
                  <p className="text-sm text-white/60">Hours you can dedicate</p>
                </div>
              </div>
              
              <select
                value={formData.timePerWeek}
                onChange={(e) => setFormData(prev => ({ ...prev, timePerWeek: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-emerald-500 focus:outline-none"
              >
                <option value="10">10 hours/week (Side hustle)</option>
                <option value="20">20 hours/week (Part-time)</option>
                <option value="40">40 hours/week (Full-time)</option>
                <option value="60">60+ hours/week (All in)</option>
              </select>
            </div>

            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <Wallet className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold">Starting budget</h3>
                  <p className="text-sm text-white/60">Initial investment</p>
                </div>
              </div>
              
              <select
                value={formData.startingBudget}
                onChange={(e) => setFormData(prev => ({ ...prev, startingBudget: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-emerald-500 focus:outline-none"
              >
                <option value="0">$0 (Zero budget)</option>
                <option value="500">$500 (Minimal)</option>
                <option value="2000">$2,000 (Moderate)</option>
                <option value="5000">$5,000+ (Well-funded)</option>
              </select>
            </div>
          </div>

          {/* Experience Level */}
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-yellow-500/10">
                <Target className="h-5 w-5 text-yellow-400" />
              </div>
              <div>
                <h3 className="font-semibold">Experience level</h3>
                <p className="text-sm text-white/60">Be honest — we will tailor the blueprint</p>
              </div>
            </div>
            
            <div className="space-y-3">
              {experienceOptions.map((option) => (
                <label
                  key={option.value}
                  className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                    formData.experienceLevel === option.value
                      ? "border-emerald-500 bg-emerald-500/10"
                      : "border-white/10 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <input
                    type="radio"
                    name="experience"
                    value={option.value}
                    checked={formData.experienceLevel === option.value}
                    onChange={(e) => setFormData(prev => ({ ...prev, experienceLevel: e.target.value }))}
                    className="mt-1 accent-emerald-500"
                  />
                  <div>
                    <p className="font-medium">{option.label}</p>
                    <p className="text-sm text-white/60">{option.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-pink-500/10">
                <Lightbulb className="h-5 w-5 text-pink-400" />
              </div>
              <div>
                <h3 className="font-semibold">Industries or interests</h3>
                <p className="text-sm text-white/60">What markets excite you? (optional)</p>
              </div>
            </div>
            
            <textarea
              value={formData.interests}
              onChange={(e) => setFormData(prev => ({ ...prev, interests: e.target.value }))}
              placeholder="e.g., SaaS, healthcare, e-commerce, real estate, fitness..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-emerald-500 focus:outline-none resize-none"
            />
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={isLoading || formData.skills.length === 0}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white py-5 rounded-2xl font-semibold text-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Building Your Blueprint...
              </>
            ) : (
              <>
                <Rocket className="h-5 w-5" />
                Build My $10K Business
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </motion.button>

          <p className="text-center text-sm text-white/40">
            Takes 10 seconds. No email required.
          </p>
        </motion.form>
      </main>
    </div>
  );
}