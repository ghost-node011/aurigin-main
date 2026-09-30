import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedLogo from "./AnimatedLogo";
import { useTheme } from "../lib/ThemeContext";

// Flag to guarantee intro plays strictly once per session / website load
let introHasCompleted = false;

export default function LogoIntro() {
  const [showIntro, setShowIntro] = useState(() => !introHasCompleted);
  const { theme } = useTheme();

  useEffect(() => {
    if (!showIntro) return;

    // Prevent body scrolling during intro animation
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Timing breakdown:
    // Left: 0.05s-0.65s
    // Right: 0.72s-1.32s
    // Mid: 1.40s-2.00s
    // AURIGIN: 2.08s-2.88s
    // MEDIA: 2.70s-3.30s
    // Rest duration: ~0.4s to admire the completed lockup
    // Total wait before starting fade-out: 3700ms
    const timer = setTimeout(() => {
      introHasCompleted = true;
      setShowIntro(false);
      document.body.style.overflow = originalOverflow;
    }, 3700);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = originalOverflow;
    };
  }, [showIntro]);

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          key="fullscreen-logo-intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-auto select-none"
          style={{
            background: "var(--bg)",
          }}
          aria-hidden="true"
        >
          {/* Subtle radial ambient atmosphere */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              background:
                "radial-gradient(circle at center, var(--line) 0%, transparent 65%)",
            }}
          />

          {/* Large centered animated logo */}
          <div className="relative z-10 w-[260px] sm:w-[340px] md:w-[420px] max-w-[85vw] flex items-center justify-center p-6">
            <AnimatedLogo className="w-full h-auto drop-shadow-md" animate={true} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
