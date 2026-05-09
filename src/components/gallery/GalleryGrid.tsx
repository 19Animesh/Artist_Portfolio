"use client";

import { useState } from "react";
import { FilterBar } from "./FilterBar";
import { PaintingCard } from "./PaintingCard";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = ["All", "Mixed Media", "Oil", "Acrylic", "Charcoal"];

import { Painting } from "@/types/painting";

interface GalleryGridProps {
  paintings: Painting[];
}

export function GalleryGrid({ paintings }: GalleryGridProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPaintings = paintings.filter(p => 
    activeCategory === "All" || p.category === activeCategory
  );

  return (
    <div className="w-full">
      <FilterBar 
        categories={CATEGORIES} 
        activeCategory={activeCategory} 
        onSelectCategory={setActiveCategory} 
      />
      
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
        <AnimatePresence mode="popLayout">
          {filteredPaintings.map((painting) => (
            <motion.div
              key={painting.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
            >
              <PaintingCard {...painting} imageSrc={painting.imageUrl} id={painting.slug || painting.id} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      
      {filteredPaintings.length === 0 && (
        <p className="text-[var(--color-gold-700)] text-center py-16 tracking-widest uppercase">
          No works found in this category.
        </p>
      )}
    </div>
  );
}
