"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  Send, 
  Sparkles, 
  User,
  Copy,
  Check,
  Loader2,
  Plus,
  Zap
} from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const SUGGESTED_PROMPTS = [
  "How do I start making $10K/month?",
  "What's the best business for my skills?",
  "Help me write a cold email to clients",
  "Analyze my business idea",
  "Give me a 30-day action plan",
  "How do I price my services?",
];

export default function ChatPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Check auth
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
      }
    };
    checkAuth();
  }, [router]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = inputRef.current.scrollHeight + "px";
    }
  }, [input]);

  const sendMessage = async (content: string = input) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: content.trim(),
          history: messages.slice(-10),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.details || `HTTP ${response.status}`);
      }

      if (data.success) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.response,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        throw new Error(data.error || "Failed to get response");
      }
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `Error: ${error instanceof Error ? error.message : "Unknown error"}. Please check that your OpenAI API key is configured correctly.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const copyMessage = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearChat = () => {
    setMessages([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] flex flex-col">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0d0d0d]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link 
              href="/dashboard" 
              className="p-2 -ml-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-emerald-400" />
              </div>
              <span className="font-semibold">IncomeGPT Assistant</span>
            </div>
          </div>

          <button
            onClick={clearChat}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4" />
            New Chat
          </button>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          {messages.length === 0 ? (
            <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center px-4 py-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center max-w-2xl"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold mb-3">How can I help you today?</h1>
                <p className="text-white/60 mb-8">
                  I\u0027m your AI business coach. Ask me anything about building your income, 
                  finding clients, pricing your services, or creating a business plan.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SUGGESTED_PROMPTS.map((prompt, i) => (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => sendMessage(prompt)}
                      className="p-4 text-left bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all group"
                    >
                      <div className="flex items-start gap-3">
                        <Zap className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{prompt}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>
          ) : (
            <div className="py-6">
              <AnimatePresence initial={false}>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`py-6 px-4 ${
                      message.role === "assistant" ? "bg-white/[0.02]" : ""
                    }`}
                  >
                    <div className="max-w-5xl mx-auto flex gap-4">
                      <div className="flex-shrink-0">
                        {message.role === "assistant" ? (
                          <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                            <Sparkles className="h-4 w-4 text-emerald-400" />
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                            <User className="h-4 w-4 text-white/60" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm mb-1 text-white/40">
                          {message.role === "assistant" ? "IncomeGPT" : "You"}
                        </div>
                        <div className="prose prose-invert prose-sm max-w-none">
                          {message.content.split("\n").map((line, i) => (
                            <p key={i} className="mb-2 last:mb-0">
                              {line}
                            </p>
                          ))}
                        </div>

                        {message.role === "assistant" && (
                          <div className="mt-2 flex items-center gap-2">
                            <button
                              onClick={() => copyMessage(message.content, message.id)}
                              className="p-1.5 text-white/40 hover:text-white hover:bg-white/5 rounded transition-colors"
                              title="Copy message"
                            >
                              {copiedId === message.id ? (
                                <Check className="h-4 w-4 text-emerald-400" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-6 px-4 bg-white/[0.02]"
                >
                  <div className="max-w-5xl mx-auto flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <Sparkles className="h-4 w-4 text-emerald-400" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm mb-1 text-white/40">IncomeGPT</div>
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin text-emerald-400" />
                        <span className="text-sm text-white/60">Thinking...</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-white/10 bg-[#0d0d0d] p-4">
        <div className="max-w-5xl mx-auto">
          <div className="relative flex items-end gap-2 bg-white/5 border border-white/10 rounded-2xl p-3 focus-within:border-emerald-500/50 focus-within:bg-white/[0.07] transition-all">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message IncomeGPT..."
              rows={1}
              className="flex-1 bg-transparent resize-none outline-none text-sm max-h-32 min-h-[20px] py-1"
              disabled={isLoading}
            />
            
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || isLoading}
              className="p-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
          
          <p className="text-center text-xs text-white/30 mt-2">
            IncomeGPT can make mistakes. Consider checking important information.
          </p>
        </div>
      </div>
    </div>
  );
}