"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#strategies", label: "Strategies" },
  { href: "#pricing", label: "Pricing" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/50 backdrop-blur-xl"
    >
      <nav className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg overflow-hidden">
              <img 
                src="https://i.imgur.com/8XqY3hL.png" 
                alt="IncomeGPT" 
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-lg font-semibold">IncomeGPT</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black hover:bg-white/90 transition-colors"
            >
              Get Started
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <motion.div
          initial={false}
          animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
          className={cn("md:hidden overflow-hidden")}
        >
          <div className="py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-sm text-white/60 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <Link
                href="/login"
                className="block text-sm text-white/60 hover:text-white"
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                className="block w-full text-center rounded-full bg-white px-4 py-2 text-sm font-medium text-black"
              >
                Get Started
              </Link>
            </div>
          </div>
        </motion.div>
      </nav>
    </motion.header>
  );
}
