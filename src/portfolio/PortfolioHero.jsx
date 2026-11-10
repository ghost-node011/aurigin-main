import { MotionConfig, motion } from "framer-motion";
import Marquee from "../components/Marquee";
import { PROJECTS } from "./projects";

const EASE = [0.16, 1, 0.3, 1];
const TITLE = "Portfolio";
const SECTORS = ["Real estate", "Construction", "Architecture", "Interior design"];

const COLUMN_LINES = {
  backgroundImage:
    "repeating-linear-gradient(90deg, rgba(243, 236, 218, 0.14) 0 1px, transparent 1px calc(100% / 12))",
};

// Real project covers shown in the floating stack, back to front.
const SHOWCASE = [
  { name: "Ever Rich Galleria", className: "right-[2%] top-[4%] w-[62%]", rotate: 6, delay: 0.5 },
  { name: "Sri Sri Homz", className: "left-[0%] top-[30%] w-[58%]", rotate: -5, delay: 0.35 },
  { name: "Trizzone", className: "right-[10%] bottom-[2%] w-[60%]", rotate: 2, delay: 0.2 },
].map((item) => ({ ...item, image: PROJECTS.find((p) => p.name === item.name).slides[0].thumb }));

const MARQUEE_ITEMS = Array.from({ length: 6 }, (_, index) => (
  <span key={index} className="flex items-center gap-8 font-mono text-[11px] uppercase tracking-[0.2em]">
    {SECTORS.map((sector) => (
      <span key={sector} className="flex items-center gap-8">
        <span>{sector}</span>
        <span style={{ color: "var(--color-yellow)" }}>•</span>
      </span>
    ))}
  </span>
));

function FloatingCover({ name, image, className, rotate, delay }) {
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ opacity: 0, y: 60, rotate: 0 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{ duration: 1.1, delay, ease: EASE }}
    >
      <motion.div
        className="overflow-hidden rounded-xl border border-white/15 bg-white p-1.5 shadow-2xl shadow-black/60"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6, delay: delay + 1, repeat: Infinity, ease: "easeInOut" }}
      >
        <img src={image} alt={`${name} project`} className="aspect-video w-full rounded-lg object-cover" />
      </motion.div>
    </motion.div>
  );
}

export default function PortfolioHero() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="overflow-hidden" style={{ background: "var(--color-ink)", color: "#f3ecda" }}>
        <div className="relative flex min-h-[600px] flex-col sm:min-h-[640px] lg:min-h-[620px]" style={COLUMN_LINES}>
          {/* Top row */}
          <div className="relative z-10 flex h-16 items-center justify-between border-b border-white/15 px-6 font-mono text-[11px] uppercase tracking-[0.25em] sm:px-8">
            <span className="flex items-center gap-3">
              <span className="h-2 w-2 animate-pulse rounded-full" style={{ background: "var(--color-yellow)" }} />
              Selected work
            </span>
            <span>({String(PROJECTS.length).padStart(2, "0")}) Projects</span>
          </div>

          {/* Two separate columns on desktop (title left, covers right) so they never overlap. */}
          <div className="flex flex-1 flex-col lg:flex-row-reverse lg:items-center">
            {/* Floating stack of real project covers */}
            <div className="pointer-events-none relative mx-6 mt-8 h-[230px] sm:mx-auto sm:h-[300px] sm:w-[520px] lg:mx-0 lg:mr-[3%] lg:mt-0 lg:h-[380px] lg:w-[40%] lg:shrink-0">
              {SHOWCASE.map((item) => (
                <FloatingCover key={item.name} {...item} />
              ))}
            </div>

            {/* Title block: the word is sized from the column width (cqw), so it always fits the gap. */}
            <div className="mt-auto min-w-0 px-6 pb-12 pt-6 sm:px-8 lg:mt-0 lg:flex-1 lg:self-end lg:pl-16 lg:pr-12">
              <div className="@container">
                <h1
                  aria-label={TITLE}
                  className="flex overflow-hidden font-display text-[15.5cqw] font-black uppercase leading-[0.85] tracking-tight"
                >
                  {TITLE.split("").map((letter, index) => (
                    <motion.span
                      key={index}
                      aria-hidden="true"
                      className="inline-block"
                      initial={{ y: "105%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.9, delay: 0.05 * index, ease: EASE }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </h1>
              </div>
              <motion.p
                className="mt-5 max-w-md text-base leading-relaxed opacity-80 sm:text-lg"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 0.8, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
              >
                Marketing built for the built environment. Websites, brands and 3D work for the businesses
                that shape a space.
              </motion.p>
            </div>
          </div>
        </div>

        <Marquee items={MARQUEE_ITEMS} slow gap="gap-8" className="border-t border-white/15 py-3 opacity-80" />
      </section>
    </MotionConfig>
  );
}
