"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  FileText, 
  Video, 
  Sparkles,
  Copy,
  CheckCircle2,
  Instagram,
  Youtube,
  Megaphone,
  ShoppingBag,
  Calendar
} from "lucide-react";

interface ContentResult {
  content: {
    type: string;
    title: string;
    content: string;
    hashtags?: string[];
    tips?: string[];
  }[];
  contentCalendar: {
    day: string;
    platform: string;
    content: string;
  }[];
  summary: string;
}

const CONTENT_TYPES = [
  { id: "tiktok", label: "TikTok Scripts", icon: Video, desc: "Viral short-form video scripts" },
  { id: "youtube", label: "YouTube Ideas", icon: Youtube, desc: "Video concepts & outlines" },
  { id: "ads", label: "Ad Copy", icon: Megaphone, desc: "High-converting ad text" },
  { id: "product", label: "Product Descriptions", icon: ShoppingBag, desc: "Compelling product copy" },
  { id: "social", label: "Social Posts", icon: Instagram, desc: "Instagram, Twitter, LinkedIn" },
];

const PLATFORMS = [
  { id: "instagram", label: "Instagram" },
  { id: "tiktok", label: "TikTok" },
  { id: "youtube", label: "YouTube" },
  { id: "twitter", label: "Twitter/X" },
  { id: "linkedin", label: "LinkedIn" },
];

export default function ContentAgentPage() {
  const [step, setStep] = useState<"input" | "generating" | "results">("input");
  const [businessType, setBusinessType] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [contentTypes, setContentTypes] = useState<string[]>(["social"]);
  const [platforms, setPlatforms] = useState<string[]>(["instagram"]);
  const [results, setResults] = useState<ContentResult | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const toggleContentType = (typeId: string) => {
    setContentTypes(prev => 
      prev.includes(typeId)
        ? prev.filter(t => t !== typeId)
        : [...prev, typeId]
    );
  };

  const togglePlatform = (platformId: string) => {
    setPlatforms(prev => 
      prev.includes(platformId)
        ? prev.filter(p => p !== platformId)
        : [...prev, platformId]
    );
  };

  const generateContent = async () => {
    if (!businessType || !targetAudience || contentTypes.length === 0) return;
    
    setStep("generating");
    
    try {
      const response = await fetch("/api/agents/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessType,
          targetAudience,
          contentTypes,
          platforms,
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setResults(data.result);
        setStep("results");
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error("Content generation error:", error);
      setStep("input");
      alert("Failed to generate content. Please try again.");
    }
  };

  const copyContent = (content: string, index: number) => {
    navigator.clipboard.writeText(content);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-white/5 bg-black/50 backdrop-blur-xl">
        <div className="mx-auto max-w-5xl px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="p-2 -ml-2 hover:bg-white/5 rounded-lg transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <FileText className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <h1 className="font-semibold">Content Agent</h1>
                <p className="text-sm text-white/60">AI-powered content creation</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8">
        {step === "input" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Hero */}
            <div className="text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm mb-6">
                <Sparkles className="h-4 w-4" />
                <span>AI Content Studio</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">Create Content That Converts</h2>
              <p className="text-white/60">
                Generate viral TikTok scripts, YouTube ideas, ad copy, and social media content 
                tailored to your business and audience.
              </p>
            </div>

            {/* Input Form */}
            <div className="glass rounded-2xl p-8 space-y-6">
              {/* Business Type */}
              <div>
                <label className="block text-sm font-medium mb-3">What\u0026apos;s your business?</label>
                <input
                  type="text"
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  placeholder="e.g., AI Automation Agency, Fitness Coaching, E-commerce Store..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none"
                />
              </div>

              {/* Target Audience */}
              <div>
                <label className="block text-sm font-medium mb-3">Who\u0026apos;s your target audience?</label>
                <input
                  type="text"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  placeholder="e.g., Small business owners, Fitness enthusiasts, Busy professionals..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none"
                />
              </div>

              {/* Content Types */}
              <div>
                <label className="block text-sm font-medium mb-3">Content Types</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {CONTENT_TYPES.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => toggleContentType(type.id)}
                      className={`p-4 rounded-xl border transition-all text-left ${
                        contentTypes.includes(type.id)
                          ? "bg-purple-500/10 border-purple-500/50"
                          : "bg-white/5 border-white/10 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${
                          contentTypes.includes(type.id) ? "bg-purple-500/20" : "bg-white/5"
                        }`}>
                          <type.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">{type.label}</p>
                          <p className="text-xs text-white/60">{type.desc}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Platforms */}
              <div>
                <label className="block text-sm font-medium mb-3">Target Platforms</label>
                <div className="flex flex-wrap gap-2">
                  {PLATFORMS.map((platform) => (
                    <button
                      key={platform.id}
                      onClick={() => togglePlatform(platform.id)}
                      className={`px-4 py-2 rounded-full text-sm transition-all ${
                        platforms.includes(platform.id)
                          ? "bg-purple-500 text-white"
                          : "bg-white/5 text-white/70 hover:bg-white/10 border border-white/10"
                      }`}
                    >
                      {platform.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <motion.button
                onClick={generateContent}
                disabled={!businessType || !targetAudience || contentTypes.length === 0}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Sparkles className="h-5 w-5" />
                Generate Content
              </motion.button>
            </div>
          </motion.div>
        )}

        {step === "generating" && (
          <div className="min-h-[60vh] flex flex-col items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 rounded-full border-4 border-purple-500/20 border-t-purple-500 mb-6"
            />
            <h2 className="text-2xl font-bold mb-2">Creating Your Content...</h2>
            <p className="text-white/60">Our AI is crafting viral-worthy content for your brand</p>
          </div>
        )}

        {step === "results" && results && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Summary */}
            <div className="glass rounded-2xl p-6 border border-purple-500/20">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle2 className="h-6 w-6 text-purple-400" />
                <h2 className="text-xl font-bold">Content Ready</h2>
              </div>
              <p className="text-white/70">{results.summary}</p>
            </div>

            {/* Generated Content */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Generated Content</h3>
              
              {results.content.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass rounded-xl p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="inline-block px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full mb-2">
                        {item.type}
                      </span>
                      <h4 className="font-semibold">{item.title}</h4>
                    </div>
                    <button
                      onClick={() => copyContent(item.content, index)}
                      className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-sm"
                    >
                      {copiedIndex === index ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-purple-400" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                  
                  <div className="bg-white/5 rounded-lg p-4 mb-4">
                    <p className="text-sm whitespace-pre-wrap">{item.content}</p>
                  </div>
                  
                  {item.hashtags && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {item.hashtags.map((tag, i) => (
                        <span key={i} className="text-sm text-purple-400">#{tag}</span>
                      ))}
                    </div>
                  )}
                  
                  {item.tips && (
                    <div className="space-y-1">
                      <p className="text-sm text-white/60">💡 Tips:</p>
                      {item.tips.map((tip, i) => (
                        <p key={i} className="text-sm text-white/40">• {tip}</p>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Content Calendar */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="h-5 w-5 text-purple-400" />
                <h3 className="font-semibold">7-Day Content Calendar</h3>
              </div>
              
              <div className="space-y-3">
                {results.contentCalendar.map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-3 bg-white/5 rounded-lg">
                    <div className="flex-shrink-0 w-20">
                      <span className="text-sm font-medium text-purple-400">{item.day}</span>
                    </div>
                    <div className="flex-1">
                      <span className="inline-block px-2 py-0.5 bg-white/10 text-xs rounded mb-1">
                        {item.platform}
                      </span>
                      <p className="text-sm">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => setStep("input")}
                className="flex-1 py-3 bg-white/5 hover:bg-white/10 rounded-xl font-medium transition-colors"
              >
                Generate More Content
              </button>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}