"use client";

import Link from "next/link";
import { PaintingReveal } from "@/components/animations/PaintingReveal";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { motion } from "framer-motion";

interface PaintingCardProps {
  id: string;
  title: string;
  medium?: string;
  year?: number;
  imageSrc: string;
  index?: number;
}

export function PaintingCard({ id, title, medium, year, imageSrc, index = 0 }: PaintingCardProps) {
  return (
    <motion.div 
      className="group relative flex flex-col cursor-pointer"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Link href={`/gallery/${id}`}>
        <div className="overflow-hidden bg-[var(--color-gold-950)]/20 mb-4 aspect-[4/5] w-full relative">
          <PaintingReveal
            src={imageSrc}
            alt={title}
            className="w-full h-full"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
            <MagneticButton className="px-6 py-2 border border-[var(--color-gold-300)] text-[var(--color-gold-200)] rounded-full backdrop-blur-sm tracking-widest uppercase text-xs z-20">
              View Detail
            </MagneticButton>
          </div>
        </div>
        <div className="flex justify-between items-end">
          <div>
            <h3 className="text-xl font-serif text-[var(--color-gold-50)]">{title}</h3>
            <p className="text-sm text-[var(--color-gold-400)] tracking-widest uppercase mt-1">
              {medium}
            </p>
          </div>
          <span className="text-sm text-[var(--color-gold-600)]">{year}</span>
        </div>
      </Link>
    </motion.div>
  );
}
