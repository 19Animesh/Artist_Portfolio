"use client";

import { motion } from "framer-motion";

interface FilterBarProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export function FilterBar({ categories, activeCategory, onSelectCategory }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-4 mb-16 justify-center">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`relative px-6 py-2 text-sm tracking-widest uppercase transition-colors ${
            activeCategory === category ? "text-[var(--color-gold-100)]" : "text-[var(--color-gold-500)] hover:text-[var(--color-gold-300)]"
          }`}
        >
          {category}
          {activeCategory === category && (
            <motion.div
              layoutId="activeFilter"
              className="absolute bottom-0 left-0 right-0 h-[1px] bg-[var(--color-gold-400)]"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  );
}
