import Link from "next/link";
import { Menu, X } from "lucide-react";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 lg:px-12 mix-blend-difference">
      <Link href="/" className="text-xl font-bold tracking-widest text-[#fafaf9] uppercase">
        Anshika Agarwal
      </Link>
      
      <nav className="hidden md:flex gap-8 text-[#fafaf9] text-sm tracking-widest uppercase">
        <Link href="/gallery" className="hover:text-[var(--color-gold-400)] transition-colors">
          Gallery
        </Link>
        <Link href="/about" className="hover:text-[var(--color-gold-400)] transition-colors">
          About
        </Link>
        <Link href="/contact" className="hover:text-[var(--color-gold-400)] transition-colors">
          Contact
        </Link>
      </nav>

      <button className="md:hidden text-[#fafaf9]" aria-label="Toggle Menu">
        <Menu size={24} />
      </button>
    </header>
  );
}
