"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for textures and assets
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust duration based on real loading state

    return () => clearTimeout(timeout);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] bg-[var(--background)] flex flex-col items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[var(--color-gold-400)] text-xl tracking-widest font-bold uppercase mb-8"
          >
            Artist // Portfolio
          </motion.div>
          <div className="w-48 h-[1px] bg-[var(--color-gold-900)] overflow-hidden relative">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 1.5, ease: "circOut" }}
              className="absolute inset-0 bg-[var(--color-gold-400)]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
