import Link from "next/link";
import { Hammer } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-orange-900/20 py-8 bg-slate-950">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-md overflow-hidden">
              <img src="/logo.png" alt="WealthForge" className="h-full w-full object-cover" />
            </div>
            <span className="text-base font-medium text-orange-100">WealthForge</span>
          </Link>

          <div className="flex items-center gap-6 text-xs text-slate-500">
            <Link href="/privacy" className="hover:text-orange-400 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-orange-400 transition-colors">Terms</Link>
            <Link href="mailto:support@wealthforge.com" className="hover:text-orange-400 transition-colors">Contact</Link>
          </div>

          <p className="text-xs text-slate-600">
            © 2026 WealthForge
          </p>
        </div>
      </div>
    </footer>
  );
}
