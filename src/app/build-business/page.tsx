"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Briefcase, 
  Clock, 
  Wallet, 
  Heart,
  ArrowRight,
  Loader2,
  Sparkles,
  Target,
  Zap
} from "lucide-react";

const skillOptions = [
  "Writing", "Coding", "Design", "Marketing", "Sales", 
  "Teaching", "Photography", "Video Editing", "Data Analysis",
  "Social Media", "SEO", "Copywriting", "AI Tools", "Consulting"
];

const experienceOptions = [
  { value: "beginner", label: "Beginner (0-1 years)", description: "Just starting out" },
  { value: "intermediate", label: "Intermediate (1-3 years)", description: "Some experience" },
  { value: "advanced", label: "Advanced (3+ years)", description: "Expert level" },
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
    setIsLoading(true);
    
    try {
      const response = await fetch("/api/business/blueprint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          skills: formData.skills,
          timePerWeek: Number(formData.timePerWeek),
          startingBudget: Number(formData.startingBudget),
          interests: formData.interests,
          experienceLevel: formData.experienceLevel,
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Store blueprint in session storage for the results page
        sessionStorage.setItem("businessBlueprint", JSON.stringify(data.blueprint));
        sessionStorage.setItem("blueprintInput", JSON.stringify(data.userInput));
        router.push("/build-business/results");
      } else {
        alert("Error: " + data.error);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to generate blueprint. Please try again.");
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

      {/* Main Content */}
      <main className="mx-auto max-w-3xl px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-700/10 border border-orange-700/20 text-orange-600 text-sm mb-6">
            <Sparkles className="h-4 w-4" />
            <span>AI-Powered Business Builder</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">Build My $10K Business</h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Answer a few questions and our AI will generate a complete business blueprint 
            designed to reach $10,000/month.
          </p>
        </motion.div>

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
              <div className="p-2 bg-orange-700/10 rounded-lg">
                <Briefcase className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold">Your Skills</h3>
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
                      ? "bg-orange-700 text-white"
                      : "bg-white/5 text-white/70 hover:bg-white/10 border border-white/10"
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          {/* Experience Level */}
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-700/10 rounded-lg">
                <Target className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold">Experience Level</h3>
                <p className="text-sm text-white/60">How experienced are you in your primary skill?</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {experienceOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, experienceLevel: option.value }))}
                  className={`p-4 rounded-xl text-left transition-all border ${
                    formData.experienceLevel === option.value
                      ? "bg-orange-700/10 border-orange-700/50"
                      : "bg-white/5 border-white/10 hover:bg-white/10"
                  }`}
                >
                  <div className="font-medium mb-1">{option.label}</div>
                  <div className="text-xs text-white/60">{option.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Time & Budget */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-orange-700/10 rounded-lg">
                  <Clock className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Time Available</h3>
                  <p className="text-sm text-white/60">Hours per week</p>
                </div>
              </div>
              <select
                value={formData.timePerWeek}
                onChange={(e) => setFormData(prev => ({ ...prev, timePerWeek: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-orange-700 focus:outline-none"
              >
                <option value="5">5 hours/week (Side hustle)</option>
                <option value="10">10 hours/week (Part-time)</option>
                <option value="20">20 hours/week (Serious side hustle)</option>
                <option value="40">40 hours/week (Full-time)</option>
                <option value="60">60+ hours/week (All in)</option>
              </select>
            </div>

            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-orange-700/10 rounded-lg">
                  <Wallet className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Starting Budget</h3>
                  <p className="text-sm text-white/60">Initial investment</p>
                </div>
              </div>
              <select
                value={formData.startingBudget}
                onChange={(e) => setFormData(prev => ({ ...prev, startingBudget: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-orange-700 focus:outline-none"
              >
                <option value="0">$0 (Zero budget)</option>
                <option value="100">$100 (Minimal)</option>
                <option value="500">$500 (Modest)</option>
                <option value="1000">$1,000 (Comfortable)</option>
                <option value="5000">$5,000+ (Well-funded)</option>
              </select>
            </div>
          </div>

          {/* Interests */}
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-700/10 rounded-lg">
                <Heart className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold">Your Interests</h3>
                <p className="text-sm text-white/60">What industries or topics excite you?</p>
              </div>
            </div>
            <textarea
              value={formData.interests}
              onChange={(e) => setFormData(prev => ({ ...prev, interests: e.target.value }))}
              placeholder="e.g., SaaS, healthcare, fitness, real estate, e-commerce, finance..."
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-orange-700 focus:outline-none min-h-[100px] resize-none"
              required
            />
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isLoading || formData.skills.length === 0 || !formData.interests}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-gradient-to-r from-orange-700 to-orange-600 text-white rounded-xl font-semibold text-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Building Your Blueprint...
              </>
            ) : (
              <>
                <Zap className="h-5 w-5" />
                Generate My $10K Business Blueprint
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </motion.button>

          {formData.skills.length === 0 && (
            <p className="text-center text-sm text-white/40">
              Select at least one skill to continue
            </p>
          )}
        </motion.form>
      </main>
    </div>
  );
}
