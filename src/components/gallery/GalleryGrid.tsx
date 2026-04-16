"use client";

import { useState } from "react";
import { FilterBar } from "./FilterBar";
import { PaintingCard } from "./PaintingCard";
import { motion, AnimatePresence } from "framer-motion";

// Mock data — replace with live DB once Paintings are added
const MOCK_PAINTINGS = [
  { id: "1", title: "Hues of Forgetting", medium: "Mixed Media on Canvas", year: 2025, category: "Mixed Media", imageSrc: "/placeholder-1.png" },
  { id: "2", title: "The Undone Hour", medium: "Oil & Gold Leaf", year: 2026, category: "Oil", imageSrc: "/placeholder-2.png" },
  { id: "3", title: "Before I Wake", medium: "Acrylic on Canvas", year: 2024, category: "Acrylic", imageSrc: "/placeholder-1.png" },
  { id: "4", title: "Grief, Annotated", medium: "Charcoal & Gold Pigment", year: 2025, category: "Charcoal", imageSrc: "/placeholder-2.png" },
  { id: "5", title: "Residue", medium: "Oil on Linen", year: 2023, category: "Oil", imageSrc: "/placeholder-1.png" },
  { id: "6", title: "The Space Between Thoughts", medium: "Mixed Media", year: 2026, category: "Mixed Media", imageSrc: "/placeholder-2.png" },
];

const CATEGORIES = ["All", "Mixed Media", "Oil", "Acrylic", "Charcoal"];

export function GalleryGrid() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPaintings = MOCK_PAINTINGS.filter(p => 
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
              <PaintingCard {...painting} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
