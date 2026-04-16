import { PageTransition } from "@/components/animations/PageTransition";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

export const metadata = {
  title: "Gallery | Artist Portfolio",
  description: "Browse the digital exhibition of abstract mixed media art.",
};

export default function GalleryPage() {
  return (
    <PageTransition>
      <div className="w-full min-h-screen px-6 lg:px-12 py-32 bg-gradient-to-b from-[#0c0a09] to-[#050403]">
        <div className="max-w-screen-2xl mx-auto">
          <ScrollReveal>
            <h1 className="text-4xl md:text-6xl font-serif mb-6 text-[var(--color-gold-100)] uppercase tracking-tight text-center">
              Selected Works
            </h1>
            <p className="text-center text-[var(--color-gold-400)] mb-20 max-w-2xl mx-auto tracking-wide text-sm md:text-base">
              A curated collection of recent pieces spanning multiple mediums and thematic explorations.
            </p>
          </ScrollReveal>

          <GalleryGrid />
        </div>
      </div>
    </PageTransition>
  );
}
