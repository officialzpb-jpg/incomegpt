import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-8">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md overflow-hidden">
              <img 
                src="/logo.jpg" 
                alt="IncomeGPT" 
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-sm font-medium">IncomeGPT</span>
          </Link>

          <div className="flex items-center gap-6 text-xs text-white/50">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="mailto:support@incomegpt.com" className="hover:text-white transition-colors">Contact</Link>
          </div>

          <p className="text-xs text-white/30">
            © 2026 IncomeGPT
          </p>
        </div>
      </div>
    </footer>
  );
}
