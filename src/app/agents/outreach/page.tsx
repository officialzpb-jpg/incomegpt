"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Target, 
  MessageSquare, 
  Users,
  Sparkles,
  Copy,
  CheckCircle2,
  RefreshCw,
  TrendingUp,
  Mail,
  Linkedin,
  Instagram
} from "lucide-react";

interface OutreachResult {
  leads: {
    name: string;
    company: string;
    source: string;
    message: string;
    followUp: string;
  }[];
  summary: string;
}

const INDUSTRIES = [
  "E-commerce", "SaaS", "Real Estate", "Healthcare", "Finance",
  "Education", "Marketing", "Consulting", "Retail", "Technology"
];

const OUTREACH_CHANNELS = [
  { id: "email", label: "Cold Email", icon: Mail },
  { id: "linkedin", label: "LinkedIn DM", icon: Linkedin },
  { id: "instagram", label: "Instagram DM", icon: Instagram },
];

export default function OutreachAgentPage() {
  const [step, setStep] = useState<"input" | "generating" | "results">("input");
  const [industry, setIndustry] = useState("");
  const [targetDescription, setTargetDescription] = useState("");
  const [channels, setChannels] = useState<string[]>(["email"]);
  const [results, setResults] = useState<OutreachResult | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const toggleChannel = (channelId: string) => {
    setChannels(prev => 
      prev.includes(channelId)
        ? prev.filter(c => c !== channelId)
        : [...prev, channelId]
    );
  };

  const generateOutreach = async () => {
    if (!industry || !targetDescription || channels.length === 0) return;
    
    setStep("generating");
    
    try {
      const response = await fetch("/api/agents/outreach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          industry,
          targetDescription,
          channels,
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
      console.error("Outreach generation error:", error);
      setStep("input");
      alert("Failed to generate outreach. Please try again.");
    }
  };

  const copyMessage = (message: string, index: number) => {
    navigator.clipboard.writeText(message);
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
              <div className="p-2 bg-orange-700/10 rounded-lg">
                <Target className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <h1 className="font-semibold">Outreach Agent</h1>
                <p className="text-sm text-white/60">AI-powered lead generation & outreach</p>
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-700/10 border border-orange-700/20 text-orange-600 text-sm mb-6">
                <Sparkles className="h-4 w-4" />
                <span>AI Outreach Automation</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">Find & Connect With Your Ideal Clients</h2>
              <p className="text-white/60">
                Our AI agent will research your target market, generate personalized outreach messages, 
                and create a follow-up strategy to help you land more clients.
              </p>
            </div>

            {/* Input Form */}
            <div className="glass rounded-2xl p-8 space-y-6">
              {/* Industry Selection */}
              <div>
                <label className="block text-sm font-medium mb-3">Select Your Industry</label>
                <div className="flex flex-wrap gap-2">
                  {INDUSTRIES.map((ind) => (
                    <button
                      key={ind}
                      onClick={() => setIndustry(ind)}
                      className={`px-4 py-2 rounded-full text-sm transition-all ${
                        industry === ind
                          ? "bg-orange-700 text-white"
                          : "bg-white/5 text-white/70 hover:bg-white/10 border border-white/10"
                      }`}
                    >
                      {ind}
                    </button>
                  ))}
                </div>
              </div>

              {/* Target Description */}
              <div>
                <label className="block text-sm font-medium mb-3">Describe Your Ideal Client</label>
                <textarea
                  value={targetDescription}
                  onChange={(e) => setTargetDescription(e.target.value)}
                  placeholder="e.g., Small e-commerce businesses doing $500K+ revenue who need help with email marketing..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-orange-700 focus:outline-none min-h-[100px]"
                />
              </div>

              {/* Channel Selection */}
              <div>
                <label className="block text-sm font-medium mb-3">Outreach Channels</label>
                <div className="grid grid-cols-3 gap-4">
                  {OUTREACH_CHANNELS.map((channel) => (
                    <button
                      key={channel.id}
                      onClick={() => toggleChannel(channel.id)}
                      className={`p-4 rounded-xl border transition-all flex flex-col items-center gap-2 ${
                        channels.includes(channel.id)
                          ? "bg-orange-700/10 border-orange-700/50"
                          : "bg-white/5 border-white/10 hover:border-white/20"
                      }`}
                    >
                      <channel.icon className="h-6 w-6" />
                      <span className="text-sm">{channel.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <motion.button
                onClick={generateOutreach}
                disabled={!industry || !targetDescription || channels.length === 0}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-orange-700 to-orange-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Target className="h-5 w-5" />
                Generate Outreach Campaign
              </motion.button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: Users, title: "Find Leads", desc: "AI researches and identifies your ideal prospects" },
                { icon: MessageSquare, title: "Write Messages", desc: "Personalized outreach that gets responses" },
                { icon: TrendingUp, title: "Track & Follow Up", desc: "Smart follow-up sequences to close deals" },
              ].map((feature, i) => (
                <div key={i} className="glass rounded-xl p-6 text-center">
                  <feature.icon className="h-8 w-8 text-orange-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-white/60">{feature.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {step === "generating" && (
          <div className="min-h-[60vh] flex flex-col items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 rounded-full border-4 border-orange-700/20 border-t-orange-700 mb-6"
            />
            <h2 className="text-2xl font-bold mb-2">Researching Your Market...</h2>
            <p className="text-white/60">Our AI is finding leads and crafting personalized messages</p>
          </div>
        )}

        {step === "results" && results && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Summary */}
            <div className="glass rounded-2xl p-6 border border-orange-700/20">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle2 className="h-6 w-6 text-orange-600" />
                <h2 className="text-xl font-bold">Campaign Ready</h2>
              </div>
              <p className="text-white/70">{results.summary}</p>
            </div>

            {/* Leads */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Generated Leads & Messages</h3>
              
              {results.leads.map((lead, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass rounded-xl p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold">{lead.name}</h4>
                      <p className="text-sm text-white/60">{lead.company}</p>
                      <span className="inline-block mt-2 text-xs px-2 py-1 bg-white/5 rounded-full">
                        Source: {lead.source}
                      </span>
                    </div>
                    <button
                      onClick={() => copyMessage(lead.message, index)}
                      className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-sm"
                    >
                      {copiedIndex === index ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-orange-600" />
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
                    <p className="text-sm whitespace-pre-wrap">{lead.message}</p>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-white/60">
                    <RefreshCw className="h-4 w-4" />
                    <span>Follow-up: {lead.followUp}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => setStep("input")}
                className="flex-1 py-3 bg-white/5 hover:bg-white/10 rounded-xl font-medium transition-colors"
              >
                Generate New Campaign
              </button>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
