import { HeroCanvas } from "@/components/three/HeroCanvas";
import { PageTransition } from "@/components/animations/PageTransition";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { PaintingReveal } from "@/components/animations/PaintingReveal";
import { MagneticButton } from "@/components/animations/MagneticButton";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden -mt-20">
        <HeroCanvas />

        <div className="z-10 text-center px-6 flex flex-col items-center">
          <ScrollReveal>
            <p className="text-xs tracking-[0.4em] uppercase text-[var(--color-gold-500)] mb-5">
              Anshika Agarwal · Artist &amp; Designer
            </p>
            <h1 className="text-5xl md:text-8xl font-serif mb-8 text-[var(--color-gold-50)] leading-none tracking-tight">
              Where silence<br />becomes colour.
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-base md:text-lg text-[var(--color-gold-400)] max-w-lg mx-auto mb-12 font-sans leading-relaxed">
              Paintings rooted in feeling — not formula. Each canvas begins where words run out.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <MagneticButton className="group bg-transparent border border-[var(--color-gold-400)] text-[var(--color-gold-400)] px-8 py-4 rounded-full flex items-center gap-3 hover:bg-[var(--color-gold-400)] hover:text-[#000] transition-colors duration-300 uppercase tracking-widest text-sm">
              <Link href="/gallery" className="flex items-center gap-2">
                View the work <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </MagneticButton>
          </ScrollReveal>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-gold-600)]">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-[var(--color-gold-400)] to-transparent animate-pulse" />
        </div>
      </section>

      {/* Personal artist quote */}
      <section className="w-full py-20 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <p className="text-2xl md:text-3xl font-serif text-[var(--color-gold-200)] leading-relaxed italic">
              &ldquo;I paint the things I cannot say — the weight of a quiet morning, a sudden grief, a joy
              that arrives without warning.&rdquo;
            </p>
            <span className="block mt-6 text-xs tracking-widest uppercase text-[var(--color-gold-600)]">
              — Anshika Agarwal
            </span>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Artwork Preview */}
      <section className="w-full py-24 px-6 lg:px-12 bg-gradient-to-b from-transparent to-[#050403]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl font-serif mb-4 text-[var(--color-gold-200)] flex items-center gap-4">
              <span className="w-10 h-[1px] bg-[var(--color-gold-400)]" /> Recent Works
            </h2>
            <p className="text-sm text-[var(--color-gold-600)] tracking-widest uppercase mb-16 ml-14">
              Selected from the studio, 2025–26
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-end">
            <div className="md:translate-y-16">
              <PaintingReveal
                src="/placeholder-1.png"
                alt="Hues of Forgetting"
                width={800}
                height={1000}
                className="aspect-[3/4]"
              />
              <ScrollReveal delay={0.3} className="mt-6">
                <h3 className="text-xl font-serif text-[var(--color-gold-100)]">Hues of Forgetting</h3>
                <p className="text-xs text-[var(--color-gold-500)] tracking-widest uppercase mt-2">
                  Mixed Media on Canvas · 2025
                </p>
              </ScrollReveal>
            </div>

            <div>
              <PaintingReveal
                src="/placeholder-2.png"
                alt="The Undone Hour"
                width={800}
                height={1000}
                className="aspect-[4/5]"
              />
              <ScrollReveal delay={0.3} className="mt-6">
                <h3 className="text-xl font-serif text-[var(--color-gold-100)]">The Undone Hour</h3>
                <p className="text-xs text-[var(--color-gold-500)] tracking-widest uppercase mt-2">
                  Oil &amp; Gold Leaf · 2026
                </p>
              </ScrollReveal>
            </div>
          </div>

          <ScrollReveal delay={0.5} className="mt-24 flex justify-center">
            <Link
              href="/gallery"
              className="text-sm text-[var(--color-gold-400)] tracking-widest uppercase hover:text-[var(--color-gold-200)] transition-colors border-b border-[var(--color-gold-700)] hover:border-[var(--color-gold-400)] pb-1"
            >
              See all works →
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </PageTransition>
  );
}
