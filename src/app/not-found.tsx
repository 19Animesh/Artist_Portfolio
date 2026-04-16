import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#050403] text-center px-6">
      <h1 className="text-8xl font-serif text-[var(--color-gold-400)] mb-6">404</h1>
      <h2 className="text-2xl font-serif text-[var(--color-gold-100)] uppercase tracking-widest mb-4">
        Page Not Found
      </h2>
      <p className="text-[var(--color-gold-500)] mb-8 max-w-md">
        The exhibition space you are looking for does not exist or has been moved.
      </p>
      <Link 
        href="/"
        className="inline-flex items-center gap-2 px-8 py-3 bg-[var(--color-gold-400)] text-[#000] tracking-widest uppercase text-sm font-semibold hover:bg-[var(--color-gold-300)] transition-colors"
      >
        <ArrowLeft size={16} /> Return to Home
      </Link>
    </div>
  );
}
