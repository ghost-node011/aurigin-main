import { useEffect, useRef, useId } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../lib/ThemeContext";
import logoLight from "../assets/aurigin-logo-light.png";
import logoDark from "../assets/aurigin-logo-dark.png";

// Module-level flag ensures the entrance choreography runs strictly once per website load
let hasAnimatedOnLoad = false;

export default function AnimatedLogo({ className = "", animate = true }) {
  const { theme } = useTheme();
  const uid = useId().replace(/:/g, "_");
  const isFirstLoad = useRef(!hasAnimatedOnLoad);

  useEffect(() => {
    if (animate) {
      hasAnimatedOnLoad = true;
    }
  }, [animate]);

  const imageSrc = theme === "dark" ? logoDark : logoLight;

  // Clip paths:
  // Native image dimensions: 643 x 511
  // Left bar: X ~210 to 270, Y ~76 to 308
  // Middle bar: X ~294 to 352, Y ~20 to 308
  // Right bar: X ~369 to 436, Y ~76 to 308
  // AURIGIN text: X ~16 to 626, Y ~348 to 428
  // MEDIA text & rules: X ~16 to 626, Y ~465 to 494
  const clipLeftId = `bar-left-${uid}`;
  const clipMidId = `bar-mid-${uid}`;
  const clipRightId = `bar-right-${uid}`;
  const clipAuriginId = `text-aurigin-${uid}`;
  const clipMediaId = `text-media-${uid}`;
  const mediaFilterId = `filter-media-darkyellow-${uid}`;

  // If animate prop is true and first load, execute the choreography; otherwise render statically
  const shouldAnimate = Boolean(animate && isFirstLoad.current);

  // 1. Left Bar: slides from left (0.6s)
  const leftBarVariants = {
    hidden: { x: -35, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        delay: 0.05,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // 2. Right Bar: slides from right (0.6s, after left finishes)
  const rightBarVariants = {
    hidden: { x: 35, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        delay: 0.72,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // 3. Middle Yellow Bar: fades in (0.6s)
  const midBarVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        delay: 1.40,
        ease: [0.25, 1, 0.5, 1],
      },
    },
  };

  // 4. "AURIGIN" text: reveals (0.8s)
  const auriginVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 2.08,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  // 5. "MEDIA" text: fades in (0.6s)
  const mediaVariants = {
    hidden: { opacity: 0, y: 6 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 2.70,
        ease: "easeOut",
      },
    },
  };

  return (
    <svg
      viewBox="0 0 643 511"
      className={`w-auto flex-shrink-0 select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Aurigin Media Logo"
      style={{ overflow: "visible" }}
    >
      <defs>
        {/* Left Bar clip */}
        <clipPath id={clipLeftId}>
          <rect x="0" y="0" width="282" height="330" />
        </clipPath>

        {/* Middle Yellow Bar clip */}
        <clipPath id={clipMidId}>
          <rect x="282" y="0" width="78" height="330" />
        </clipPath>

        {/* Right Bar clip */}
        <clipPath id={clipRightId}>
          <rect x="360" y="0" width="283" height="330" />
        </clipPath>

        {/* AURIGIN text clip */}
        <clipPath id={clipAuriginId}>
          <rect x="0" y="325" width="643" height="120" />
        </clipPath>

        {/* MEDIA text clip */}
        <clipPath id={clipMediaId}>
          <rect x="0" y="445" width="643" height="66" />
        </clipPath>

        {/* High-contrast dark yellow filter for MEDIA text */}
        <filter id={mediaFilterId} colorInterpolationFilters="sRGB">
          <feColorMatrix
            type="matrix"
            values={
              theme === "dark"
                ? "0 0 0 0.95 0   0 0 0 0.68 0   0 0 0 0.05 0   0 0 0 1 0"
                : "0 0 0 0.58 0   0 0 0 0.38 0   0 0 0 0.00 0   0 0 0 1 0"
            }
          />
        </filter>
      </defs>

      {/* 1. Left Bar: slides from left (0.6s) */}
      <motion.g
        initial={shouldAnimate ? "hidden" : "visible"}
        animate="visible"
        variants={leftBarVariants}
        style={{ willChange: "transform, opacity" }}
      >
        <image
          href={imageSrc}
          width="643"
          height="511"
          clipPath={`url(#${clipLeftId})`}
        />
      </motion.g>

      {/* 2. Right Bar: slides from right (0.6s) */}
      <motion.g
        initial={shouldAnimate ? "hidden" : "visible"}
        animate="visible"
        variants={rightBarVariants}
        style={{ willChange: "transform, opacity" }}
      >
        <image
          href={imageSrc}
          width="643"
          height="511"
          clipPath={`url(#${clipRightId})`}
        />
      </motion.g>

      {/* 3. Middle Yellow Bar: fades in (0.6s) */}
      <motion.g
        initial={shouldAnimate ? "hidden" : "visible"}
        animate="visible"
        variants={midBarVariants}
        style={{ willChange: "opacity" }}
      >
        <image
          href={imageSrc}
          width="643"
          height="511"
          clipPath={`url(#${clipMidId})`}
        />
      </motion.g>

      {/* 4. AURIGIN Text: reveals (0.8s) */}
      <motion.g
        initial={shouldAnimate ? "hidden" : "visible"}
        animate="visible"
        variants={auriginVariants}
        style={{ willChange: "transform, opacity" }}
      >
        <image
          href={imageSrc}
          width="643"
          height="511"
          clipPath={`url(#${clipAuriginId})`}
        />
      </motion.g>

      {/* 5. MEDIA Text: fades in (0.6s) in rich, visible dark yellow */}
      <motion.g
        initial={shouldAnimate ? "hidden" : "visible"}
        animate="visible"
        variants={mediaVariants}
        style={{ willChange: "transform, opacity" }}
      >
        <g filter={`url(#${mediaFilterId})`}>
          <image
            href={imageSrc}
            width="643"
            height="511"
            clipPath={`url(#${clipMediaId})`}
          />
        </g>
      </motion.g>
    </svg>
  );
}
