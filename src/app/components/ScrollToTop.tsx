import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ scale: 0, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0, opacity: 0, y: 20 }}
          whileHover={{ scale: 1.12, y: -2 }}
          whileTap={{ scale: 0.92 }}
          onClick={scrollToTop}
          className="
            fixed bottom-7 right-7 z-[9999]
            w-12 h-12 md:w-13 md:h-13
            bg-primary hover:bg-primary/90
            text-white
            rounded-full
            shadow-xl shadow-primary/30
            flex items-center justify-center
            transition-colors duration-300
            border-2 border-white
            group
          "
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-300" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
