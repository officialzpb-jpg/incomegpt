import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <div className="text-9xl font-bold text-orange-600/20">404</div>
          <h1 className="text-3xl font-bold text-white mt-4">Page Not Found</h1>
          <p className="text-slate-400 mt-2">
            The page you are looking for does not exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/"
            className="flex items-center justify-center gap-2 px-4 py-2 border border-slate-700 text-slate-300 rounded-md hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Link>
          <Link 
            href="/"
            className="flex items-center justify-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-md transition-colors"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
