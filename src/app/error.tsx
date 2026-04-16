"use client";

import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#050403] text-center px-6">
      <h1 className="text-4xl md:text-6xl font-serif text-[var(--color-gold-400)] mb-4">
        Something went wrong
      </h1>
      <p className="text-[var(--color-gold-500)] mb-8 max-w-md">
        An unexpected error occurred in the exhibition space.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="px-8 py-3 bg-[var(--color-gold-400)] text-[#000] tracking-widest uppercase text-sm font-semibold hover:bg-[var(--color-gold-300)] transition-colors"
        >
          Try Again
        </button>
        <button
          onClick={() => window.location.href = '/'}
          className="inline-flex items-center gap-2 px-8 py-3 border border-[var(--color-gold-400)] text-[var(--color-gold-400)] tracking-widest uppercase text-sm font-semibold hover:bg-[var(--color-gold-400)] hover:text-[#000] transition-colors"
        >
          <ArrowLeft size={16} /> Return to Home
        </button>
      </div>
    </div>
  );
}
