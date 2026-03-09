"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface StrategyChatProps {
  strategyTitle: string;
}

export function StrategyChat({ strategyTitle }: StrategyChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `Hi! I'm your AI strategy coach for **${strategyTitle}**. I can help you with:\n\n• Step-by-step guidance\n• Answering questions\n• Troubleshooting problems\n• Keeping you motivated\n\nWhat would you like help with?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const responses = [
        "That's a great question! For this strategy, I recommend starting with market research to validate demand.",
        "Based on your progress, you're on the right track. Keep focusing on building your MVP.",
        "Consider reaching out to 10 potential customers this week to get feedback.",
        "A common challenge at this stage is pricing. Start higher than you think - you can always lower it.",
        "Have you tried posting about your project in relevant Reddit communities? That could drive early traction.",
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: randomResponse,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setLoading(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="glass rounded-2xl overflow-hidden flex flex-col h-[500px]">
      <div className="p-4 border-b border-white/10 bg-white/5">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold">Strategy Coach</h3>
            <p className="text-xs text-white/60">Ask anything about your strategy</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`flex gap-3 ${
                message.role === "assistant" ? "" : "flex-row-reverse"
              }`}
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full flex-shrink-0 ${
                  message.role === "assistant"
                    ? "bg-gradient-to-br from-emerald-500 to-cyan-500"
                    : "bg-white/10"
                }`}
              >
                {message.role === "assistant" ? (
                  <Bot className="h-4 w-4 text-white" />
                ) : (
                  <User className="h-4 w-4 text-white" />
                )}
              </div>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                  message.role === "assistant"
                    ? "bg-white/5"
                    : "bg-emerald-500/20 text-emerald-100"
                }`}
              >
                {message.content.split("\n").map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < message.content.split("\n").length - 1 && <br />}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div className="bg-white/5 rounded-2xl px-4 py-3 flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm text-white/60">Thinking...</span>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-white/10">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about your strategy..."
            className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-emerald-500 focus:outline-none text-sm"
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="px-4 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors disabled:opacity-50"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
