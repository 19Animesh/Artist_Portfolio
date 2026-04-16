"use client";

import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

interface PaintingRevealProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

export function PaintingReveal({ src, alt, width = 800, height = 1000, className = "", priority = false }: PaintingRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });
  const [isHovered, setIsHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div 
      ref={ref} 
      className={`relative overflow-hidden group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={isInView ? { y: "0%" } : { y: "100%" }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }} /* Custom cubic-bezier for a dramatic fluid reveal */
        className="w-full h-full absolute inset-0 bg-[var(--background)] z-10 origin-bottom"
        style={{ pointerEvents: 'none' }}
      />
      
      <div className="w-full h-full overflow-hidden relative">
        <motion.div
          style={{ y }}
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full h-full"
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="w-full h-full object-cover filter transition-all duration-700"
            style={{ 
              filter: isHovered ? 'brightness(1.1) contrast(1.05)' : 'brightness(1)',
            }}
            priority={priority}
          />
        </motion.div>
        
        {/* Subtle glass reflection overlay on hover */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-tr from-[var(--color-gold-400)]/0 via-[var(--color-gold-200)]/10 to-transparent pointer-events-none mix-blend-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
}
