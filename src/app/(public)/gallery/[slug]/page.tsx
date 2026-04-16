import { PageTransition } from "@/components/animations/PageTransition";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { PaintingReveal } from "@/components/animations/PaintingReveal";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MagneticButton } from "@/components/animations/MagneticButton";

// Mock data until DB is connected
const MOCK_PAINTINGS = [
  { id: "1", title: "Obsidian Dawn", medium: "Mixed Media", year: 2025, desc: "A chaotic yet serene exploration of darkness breaking into light.", imageSrc: "/placeholder-1.png", dimensions: "48x60 in" },
  { id: "2", title: "Golden Echoes", medium: "Oil & Gold Leaf", year: 2026, desc: "Textures resembling ancient artifacts bathed in modern context.", imageSrc: "/placeholder-2.png", dimensions: "36x48 in" },
];

export default async function ArtworkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Find mock painting or fallback
  const painting = MOCK_PAINTINGS.find(p => p.id === slug) || MOCK_PAINTINGS[0];

  return (
    <PageTransition>
      <div className="min-h-screen pt-32 pb-24 px-6 lg:px-12 bg-[#0c0a09]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Main Visual */}
          <div className="lg:w-2/3">
            <Link href="/gallery" className="inline-flex items-center gap-2 text-[var(--color-gold-500)] hover:text-[var(--color-gold-300)] transition-colors tracking-widest uppercase text-sm mb-12">
              <ArrowLeft size={16} /> Back to Gallery
            </Link>
            <PaintingReveal 
              src={painting.imageSrc}
              alt={painting.title}
              width={1200}
              height={1600}
              priority
              className="w-full bg-[var(--color-gold-950)]/20"
            />
          </div>

          {/* Details Sidebar */}
          <div className="lg:w-1/3 flex flex-col justify-center">
            <ScrollReveal>
              <h1 className="text-4xl md:text-5xl font-serif text-[var(--color-gold-50)] mb-2 uppercase">
                {painting.title}
              </h1>
              <p className="text-xl text-[var(--color-gold-500)] font-serif italic mb-10">
                {painting.year}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="space-y-6 mb-12 border-t border-[var(--color-gold-900)] pt-8">
                <div>
                  <h4 className="text-xs tracking-widest text-[var(--color-gold-600)] uppercase mb-1">Medium</h4>
                  <p className="text-[var(--color-gold-200)]">{painting.medium}</p>
                </div>
                <div>
                  <h4 className="text-xs tracking-widest text-[var(--color-gold-600)] uppercase mb-1">Dimensions</h4>
                  <p className="text-[var(--color-gold-200)]">{painting.dimensions}</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <p className="text-[var(--color-gold-300)] leading-relaxed mb-12 font-sans font-light">
                {painting.desc}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.5}>
              <MagneticButton className="px-8 py-4 bg-[var(--color-gold-400)] text-[#000] tracking-widest uppercase text-sm font-semibold hover:bg-[var(--color-gold-300)] transition-colors w-full md:w-auto">
                Inquire About Piece
              </MagneticButton>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </PageTransition>
  );
}
