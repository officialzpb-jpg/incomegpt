import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg overflow-hidden">
              <img 
                src="https://i.imgur.com/KoehXsN.jpeg" 
                alt="IncomeGPT" 
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-lg font-semibold">IncomeGPT</span>
          </Link>

          <div className="flex items-center gap-8 text-sm text-white/60">
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
            <Link href="#" className="hover:text-white transition-colors">Contact</Link>
          </div>

          <p className="text-sm text-white/40">
            © 2024 IncomeGPT. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
