"use client";

import { ReactNode } from "react";

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Global background effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(249, 115, 22, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(249, 115, 22, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
