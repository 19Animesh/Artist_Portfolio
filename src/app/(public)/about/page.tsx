import { PageTransition } from "@/components/animations/PageTransition";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import Image from "next/image";

export const metadata = {
  title: "About | Anshika Agarwal",
  description: "Anshika Agarwal is an abstract and mixed media artist whose work explores emotion, memory, and the quieter corners of human experience.",
};

export default function AboutPage() {
  return (
    <PageTransition>
      <div className="min-h-screen pt-32 pb-24 px-6 lg:px-12 bg-gradient-to-b from-[#0c0a09] to-[#050403]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">

          {/* Portrait */}
          <div className="md:w-1/2">
            <ScrollReveal>
              <div className="relative w-full aspect-[9/16] border border-[var(--color-gold-900)] p-3">
                <div className="w-full h-full relative overflow-hidden bg-[var(--color-gold-950)]/30">
                  <Image
                    src="https://res.cloudinary.com/dufyqm2f2/image/upload/c_fill,g_north,ar_9:16/Gemini_Generated_Image_xb98ntxb98ntxb98_hl8i8l"
                    alt="Anshika Agarwal — Artist Portrait"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                {/* Caption below portrait */}
                <p className="mt-3 text-xs text-[var(--color-gold-600)] tracking-widest text-right uppercase">
                  Anshika Agarwal · Studio, 2025
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Bio text */}
          <div className="md:w-1/2 flex flex-col justify-center">
            <ScrollReveal delay={0.1}>
              <p className="text-xs tracking-[0.4em] uppercase text-[var(--color-gold-500)] mb-4">
                About the Artist
              </p>
              <h1 className="text-4xl md:text-6xl font-serif text-[var(--color-gold-100)] uppercase mb-8 leading-tight">
                Anshika<br />Agarwal
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="space-y-5 text-[var(--color-gold-300)] font-light leading-relaxed text-[15px]">
                <p>
                  I started painting not as a craft but as a coping mechanism — a way to sit with
                  feelings I could not name. Over time, the canvases became something more: a
                  private language of texture, pigment, and gold.
                </p>
                <p>
                  My work lives in the gap between abstract and emotional — heavy impasto layers,
                  raw charcoal lines, and metallic accents that catch light differently at every angle.
                  No piece is planned end-to-end; they grow organically, sometimes across weeks,
                  often interrupted by long periods of just looking.
                </p>
                <p>
                  Based in India, working on large-scale canvases and smaller intimate studies.
                  Currently exploring the relationship between negative space and emotional
                  density — what is left out of a painting is just as intentional as what goes in.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.5}>
              <div className="mt-10 pt-8 border-t border-[var(--color-gold-900)] grid grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-3xl font-serif text-[var(--color-gold-300)]">40+</p>
                  <p className="text-[10px] tracking-widest uppercase text-[var(--color-gold-600)] mt-1">Works Created</p>
                </div>
                <div>
                  <p className="text-3xl font-serif text-[var(--color-gold-300)]">6</p>
                  <p className="text-[10px] tracking-widest uppercase text-[var(--color-gold-600)] mt-1">Exhibitions</p>
                </div>
                <div>
                  <p className="text-3xl font-serif text-[var(--color-gold-300)]">4 yrs</p>
                  <p className="text-[10px] tracking-widest uppercase text-[var(--color-gold-600)] mt-1">Studio Practice</p>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </PageTransition>
  );
}
