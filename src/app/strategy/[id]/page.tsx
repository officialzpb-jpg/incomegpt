/* eslint-disable */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  CheckCircle2,
  Lock,
  ChevronRight,
  Loader2,
  Send,
  Lightbulb,
  Trophy,
  Rocket
} from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Step {
  id: number;
  title: string;
  duration: string;
  instruction: string;
  aiPrompt: string;
  completed: boolean;
  unlocked: boolean;
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
      {
        id: 1,
        title: "Pick Your Niche",
        duration: "2-3 days",
        instruction: "Pick 1-2 industries you know well or are interested in. Examples: Real estate, SaaS, Healthcare, Finance.",
        aiPrompt: "I need help choosing a niche for my content agency. I know a bit about [TELL ME YOUR INTERESTS]. What niches have high demand and good pay?",
        completed: false,
        unlocked: true,
      },
      {
        id: 2,
        title: "Set Up Your Business",
        duration: "1 week",
        instruction: "Create a simple website with your services, pricing, and contact info. Use Carrd.co or Webflow.",
        aiPrompt: "Help me write the copy for my content agency website. My niche is [YOUR NICHE]. I need: 1) Headline 2) Services description 3) Pricing packages",
        completed: false,
        unlocked: false,
      },
      {
        id: 3,
        title: "Find Your First Client",
        duration: "1-2 weeks",
        instruction: "Send 50 personalized cold emails or DMs to businesses in your niche. Offer a free sample.",
        aiPrompt: "Help me write a cold email to potential clients in [YOUR NICHE]. I want to offer blog writing services. Make it short and compelling.",
        completed: false,
        unlocked: false,
      },
      {
        id: 4,
        title: "Deliver Great Work",
        duration: "Ongoing",
        instruction: "Use AI tools (ChatGPT, Claude) to speed up writing. Always edit and personalize.",
        aiPrompt: "I got my first client! They want a blog post about [TOPIC]. Help me create an outline and write a compelling introduction.",
        completed: false,
        unlocked: false,
      },
      {
        id: 5,
        title: "Scale With Systems",
        duration: "1 month",
        instruction: "Hire freelancers from Upwork/Fiverr. Create templates and SOPs.",
        aiPrompt: "I have 3 clients now and I'm overwhelmed. Help me create a system to manage multiple content projects and find good freelancers.",
        completed: false,
        unlocked: false,
      },
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
      {
        id: 1,
        title: "Find a Painful Problem",
        duration: "2 weeks",
        instruction: "Join communities where your target audience hangs out. Find 10 people complaining about the same problem.",
        aiPrompt: "I want to build a SaaS product. Help me find painful problems that people would pay to solve. My target audience is [WHO]?",
        completed: false,
        unlocked: true,
      },
      {
        id: 2,
        title: "Validate Before Building",
        duration: "2 weeks",
        instruction: "Create a landing page describing your solution. Get 10 people to say they'll pay for it.",
        aiPrompt: "I have a SaaS idea: [DESCRIBE IT]. Help me create a validation landing page and write copy that gets signups.",
        completed: false,
        unlocked: false,
      },
      {
        id: 3,
        title: "Build the MVP",
        duration: "2-3 months",
        instruction: "Build only the core feature. Use no-code tools (Bubble, Webflow) if you can't code.",
        aiPrompt: "I'm building an MVP for [YOUR IDEA]. What's the absolute minimum I need to build to solve the core problem? Help me prioritize features.",
        completed: false,
        unlocked: false,
      },
      {
        id: 4,
        title: "Get First Paying Users",
        duration: "1 month",
        instruction: "Launch on Product Hunt, Indie Hackers, and relevant subreddits. Offer early bird pricing.",
        aiPrompt: "My MVP is ready! Help me plan a launch strategy. I need: 1) Product Hunt post 2) Twitter announcement thread 3) Pricing strategy",
        completed: false,
        unlocked: false,
      },
      {
        id: 5,
        title: "Iterate to $5K MRR",
        duration: "3-6 months",
        instruction: "Talk to users weekly. Fix bugs fast. Add features they actually ask for.",
        aiPrompt: "I have 10 paying customers but growth is slow. Help me analyze what's working and create a plan to reach $5K monthly recurring revenue.",
        completed: false,
        unlocked: false,
      },
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
      {
        id: 1,
        title: "Pick Your Niche",
        duration: "1 week",
        instruction: "Choose a topic where people make money or save time. Examples: Crypto, AI tools, Real estate investing.",
        aiPrompt: "I want to start a paid newsletter. I know about [YOUR EXPERTISE]. What niches have audiences willing to pay $10-50/month for insights?",
        completed: false,
        unlocked: true,
      },
      {
        id: 2,
        title: "Set Up Infrastructure",
        duration: "3 days",
        instruction: "Use Beehiiv or Substack. Create a simple landing page. Set up payment collection.",
        aiPrompt: "Help me write the landing page for my newsletter about [NICHE]. I need: 1) Headline 2) What readers get 3) Pricing tiers",
        completed: false,
        unlocked: false,
      },
      {
        id: 3,
        title: "Write 5 Free Posts",
        duration: "1 month",
        instruction: "Publish valuable content for free. Share on Twitter, LinkedIn, Reddit. Build an email list of 500+.",
        aiPrompt: "I need 5 newsletter topic ideas for [NICHE] that will go viral and attract subscribers. Make them specific and actionable.",
        completed: false,
        unlocked: false,
      },
      {
        id: 4,
        title: "Launch Paid Tier",
        duration: "2 weeks",
        instruction: "Create exclusive content for paying subscribers. Price at $10-20/month. Offer founding member discounts.",
        aiPrompt: "I'm ready to launch my paid tier. Help me decide what exclusive content to offer and write the launch email to my free subscribers.",
        completed: false,
        unlocked: false,
      },
      {
        id: 5,
        title: "Grow to 500 Subscribers",
        duration: "3-6 months",
        instruction: "Post consistently. Collaborate with other newsletter writers. Use Twitter/X threads to drive signups.",
        aiPrompt: "I have 50 paying subscribers. Help me create a growth plan to reach 500. I need specific tactics for [NICHE] newsletters.",
        completed: false,
        unlocked: false,
      },
    ]
  },
};

const aiPersonalities = [
  "Listen, I'm not here to coddle you. I'm here to make you money. Let's get to work.",
  "Another day, another dollar. Or in your case, hopefully thousands. What's the holdup?",
  "I've guided 10,000+ people to their first $10K. You won't be the first to fail if you actually listen.",
  "Stop overthinking. Start doing. That's literally the secret.",
  "Your competitors are already working. What's your excuse?",
];

export default function StrategyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [steps, setSteps] = useState<Step[]>([]);
  const [strategy, setStrategy] = useState<Strategy | null>(null);
  const [currentStep, setCurrentStep] = useState<Step | null>(null);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<{role: string, content: string}[]>([]);
  const [aiTyping, setAiTyping] = useState(false);

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
        setCurrentStep(strat.steps.find((s: Step) => s.unlocked && !s.completed) || strat.steps[0]);
      }
      
      setLoading(false);
    };

    getUser();
  }, [router, strategyId]);

  const completeStep = () => {
    if (!currentStep) return;
    
    setSteps(prev => {
      const newSteps = prev.map(s => 
        s.id === currentStep.id 
          ? { ...s, completed: true } 
          : s.id === currentStep.id + 1 
            ? { ...s, unlocked: true } 
            : s
      );
      
      const nextStep = newSteps.find(s => s.unlocked && !s.completed);
      setCurrentStep(nextStep || null);
      
      return newSteps;
    });
    
    setChatMessages([]);
  };

  const sendMessage = () => {
    if (!chatInput.trim() || !currentStep) return;
    
    const userMsg = chatInput;
    setChatMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setChatInput("");
    setAiTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Good question. Here's exactly what you need to do...",
        "I've seen this before. The answer is simpler than you think.",
        "Stop overcomplicating it. Just do this...",
        "That's the wrong approach. Try this instead...",
        "Finally, a decent question. Here's the answer...",
      ];
      
      setChatMessages(prev => [...prev, { 
        role: "assistant", 
        content: responses[Math.floor(Math.random() * responses.length)] + "\n\n" + currentStep.aiPrompt
      }]);
      setAiTyping(false);
    }, 1500);
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

  if (!strategy || !currentStep) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Trophy className="h-16 w-16 text-emerald-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-4">Strategy Complete! 🎉</h1>
          <p className="text-white/60 mb-6">You&apos;ve completed all steps. Time to make money.</p>
          <Link href="/dashboard" className="text-emerald-400 hover:text-emerald-300">
            Back to Dashboard →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-white/5 bg-black/50 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/results" className="p-2 -ml-2 hover:bg-white/5 rounded-lg transition-colors">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="font-semibold">{strategy.title}</h1>
                <div className="flex items-center gap-4 text-sm text-white/60">
                  <span>{completedCount}/{steps.length} steps</span>
                  <span>{progress}% complete</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Rocket className="h-5 w-5 text-emerald-400" />
              <span className="text-emerald-400 font-medium">${strategy.expectedMonthlyIncome}/mo potential</span>
            </div>
          </div>
          
          <div className="mt-4 h-1 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Step List */}
          <div className="lg:col-span-1">
            <div className="glass rounded-2xl p-4 sticky top-24">
              <h3 className="font-semibold mb-4 px-2">Your Roadmap</h3>
              <div className="space-y-2">
                {steps.map((step, idx) => (
                  <button
                    key={step.id}
                    onClick={() => step.unlocked && setCurrentStep(step)}
                    disabled={!step.unlocked}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
                      currentStep?.id === step.id 
                        ? "bg-emerald-500/20 border border-emerald-500/30" 
                        : step.completed
                          ? "bg-white/5 opacity-60"
                          : step.unlocked
                            ? "hover:bg-white/5"
                            : "opacity-40 cursor-not-allowed"
                    }`}
                  >
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                      step.completed 
                        ? "bg-emerald-500 text-white" 
                        : step.unlocked 
                          ? "bg-white/10 text-white"
                          : "bg-white/5 text-white/40"
                    }`}>
                      {step.completed ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : step.unlocked ? (
                        idx + 1
                      ) : (
                        <Lock className="h-4 w-4" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium text-sm ${step.completed ? "line-through text-white/40" : ""}`}>
                        {step.title}
                      </p>
                      <p className="text-xs text-white/40">{step.duration}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Active Step + AI Chat */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Step Card */}
            <motion.div
              key={currentStep.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-xs text-emerald-400 font-medium">STEP {currentStep.id} OF {steps.length}</span>
                  <h2 className="text-2xl font-bold mt-1">{currentStep.title}</h2>
                </div>
                <span className="text-sm text-white/60">{currentStep.duration}</span>
              </div>
              
              <div className="bg-white/5 rounded-xl p-4 mb-4">
                <div className="flex items-start gap-3">
                  <Lightbulb className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <p className="text-white/80">{currentStep.instruction}</p>
                </div>
              </div>

              <button
                onClick={completeStep}
                className="w-full flex items-center justify-center gap-2 bg-emerald-500 text-white py-4 rounded-xl font-medium hover:bg-emerald-600 transition-colors"
              >
                <CheckCircle2 className="h-5 w-5" />
                I Completed This Step
                <ChevronRight className="h-5 w-5" />
              </button>
            </motion.div>

            {/* AI Coach Chat */}
            <div className="glass rounded-2xl overflow-hidden">
              <div className="p-4 border-b border-white/10 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-lg overflow-hidden border-2 border-emerald-500/50">
                    <img 
                      src="/logo.jpg" 
                      alt="AI Coach" 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">Your AI Money Coach</h3>
                    <p className="text-xs text-white/60">Ask anything. I don&apos;t sugarcoat.</p>
                  </div>
                </div>
              </div>

              <div className="h-[400px] overflow-y-auto p-4 space-y-4">
                {chatMessages.length === 0 && (
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="text-white/80 italic">
                      &quot;{aiPersonalities[Math.floor(Math.random() * aiPersonalities.length)]}&quot;
                    </p>
                    <p className="text-sm text-white/60 mt-3">
                      💡 Try asking: &quot;{currentStep.aiPrompt.substring(0, 80)}...&quot;
                    </p>
                  </div>
                )}
                
                <AnimatePresence>
                  {chatMessages.map((msg, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                    >
                      <div className={`flex h-8 w-8 items-center justify-center rounded-full flex-shrink-0 overflow-hidden ${
                        msg.role === "assistant" 
                          ? "border border-emerald-500/50" 
                          : "bg-white/10"
                      }`}>
                        {msg.role === "assistant" ? (
                          <img src="/logo.jpg" alt="AI" className="h-full w-full object-cover" />
                        ) : (
                          <span className="text-sm">You</span>
                        )}
                      </div>
                      <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                        msg.role === "assistant" ? "bg-white/5" : "bg-emerald-500/20"
                      }`}>
                        {msg.content}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {aiTyping && (
                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg overflow-hidden border border-emerald-500/50">
                      <img src="/logo.jpg" alt="AI" className="h-full w-full object-cover" />
                    </div>
                    <div className="bg-white/5 rounded-2xl px-4 py-3 flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm text-white/60">Thinking (probably judging you)...</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 border-t border-white/10">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Ask your coach anything..."
                    className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-emerald-500 focus:outline-none text-sm"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!chatInput.trim() || aiTyping}
                    className="px-4 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors disabled:opacity-50"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
