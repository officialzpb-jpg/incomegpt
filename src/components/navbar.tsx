"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X, Hammer } from "lucide-react";
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
      className="fixed top-0 left-0 right-0 z-50 border-b border-amber-500/10 bg-slate-950/80 backdrop-blur-md"
    >
      <nav className="mx-auto max-w-5xl px-4">
        <div className="flex h-12 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-md bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
              <Hammer className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-medium bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              WealthForge
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-slate-400 hover:text-amber-400 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="text-xs text-slate-400 hover:text-amber-400 transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="rounded-md bg-gradient-to-r from-amber-500 to-orange-600 px-3 py-1.5 text-xs font-medium text-white hover:from-amber-600 hover:to-orange-700 transition-colors"
            >
              Get Started
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-1.5 text-slate-400"
          >
            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        <motion.div
          initial={false}
          animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
          className={cn("md:hidden overflow-hidden")}
        >
          <div className="py-3 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-xs text-slate-400 hover:text-amber-400 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-amber-500/10 space-y-2">
              <Link
                href="/login"
                className="block text-xs text-slate-400 hover:text-amber-400"
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                className="block w-full text-center rounded-md bg-gradient-to-r from-amber-500 to-orange-600 px-3 py-1.5 text-xs font-medium text-white"
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
