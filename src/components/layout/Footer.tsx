import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full py-10 px-6 lg:px-12 border-t border-[var(--color-gold-900)]/30 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-[var(--color-gold-500)]">
        
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="font-serif text-[var(--color-gold-300)] text-base">Anshika Agarwal</span>
          <span className="text-xs tracking-widest uppercase text-[var(--color-gold-700)]">Artist &amp; Designer · India</span>
        </div>

        <p className="text-xs text-[var(--color-gold-700)]">
          &copy; {new Date().getFullYear()} Anshika Agarwal. All rights reserved.
        </p>

        <div className="flex flex-wrap justify-center gap-6 text-xs tracking-widest uppercase">
          <Link href="/gallery" className="hover:text-[var(--color-gold-300)] transition-colors">
            Gallery
          </Link>
          <Link href="/about" className="hover:text-[var(--color-gold-300)] transition-colors">
            About
          </Link>
          <Link href="/contact" className="hover:text-[var(--color-gold-300)] transition-colors">
            Contact
          </Link>
          <Link
            href="https://instagram.com/anshika.agarwal"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--color-gold-300)] transition-colors"
          >
            Instagram
          </Link>
          <Link
            href="https://twitter.com/anshika_agarwal"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--color-gold-300)] transition-colors"
          >
            Twitter / X
          </Link>
        </div>

      </div>
    </footer>
  );
}
