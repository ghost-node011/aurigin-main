import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowDown, ArrowUpRight, Heart, PlayCircle, Sparkles } from "lucide-react";

const CHIPS = [
  { icon: Heart, label: "8.7K", sub: "engagement", desc: "Audience resonance" },
  { icon: PlayCircle, label: "120K", sub: "views", desc: "Organic reach" },
  { icon: Sparkles, label: "41%", sub: "lift", desc: "Brand conversion" },
];

export default function Hero() {
  const heroRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const chipsWrapRef = useRef(null);
  const cueRef = useRef(null);
  const ringRef = useRef(null);
  const bigWordTextRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });

      tl.fromTo(
        line1Ref.current,
        { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.75, ease: "power3.out" },
        0
      )
        .fromTo(
          line2Ref.current,
          { yPercent: 120, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.75, ease: "power3.out" },
          0.12
        )
        .fromTo(
          subRef.current,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          0.28
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          0.4
        )
        .fromTo(
          chipsWrapRef.current?.children || [],
          { opacity: 0, x: 28, scale: 0.94 },
          { opacity: 1, x: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" },
          0.45
        )
        .fromTo(
          cueRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.5, ease: "power2.out" },
          0.8
        );

      // Subtle ambient hover motion on the proof cards
      if (chipsWrapRef.current) {
        Array.from(chipsWrapRef.current.children).forEach((child, i) => {
          gsap.to(child, {
            y: "+=8",
            duration: 2.2 + i * 0.4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 1 + i * 0.2,
          });
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-center overflow-hidden bg-[var(--bg)] pt-28 sm:pt-36 pb-16"
    >
      {/* Background Architectural Watermark & Accent Graphics */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {/* Large watermark brand lettering in background */}
        <span
          ref={bigWordTextRef}
          className="absolute -right-12 bottom-6 hidden lg:block font-display font-black uppercase leading-none opacity-[0.035] dark:opacity-[0.06] text-stroke tracking-tighter"
          style={{ fontSize: "22vw" }}
        >
          aurigin
        </span>

        {/* Aurigin Brand Yellow Curved Geometry (shifted to side frame) */}
        <div
          ref={ringRef}
          className="absolute -right-[15vw] -top-[10vw] w-[50vw] h-[50vw] rounded-full opacity-40 dark:opacity-20 pointer-events-none"
          style={{
            border: "4vw solid var(--color-yellow)",
            borderLeftColor: "transparent",
            borderBottomColor: "transparent",
          }}
        />

        {/* Soft atmospheric gradient blob */}
        <div
          className="absolute -left-32 -bottom-32 w-96 h-96 rounded-full opacity-20 dark:opacity-10 blur-3xl pointer-events-none"
          style={{ background: "var(--color-blue)" }}
        />
      </div>

      {/* Main Hero Container: Left-Aligned Editorial Architecture (Image 1 Style) */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Bold Left-Aligned Headline, Subtitle, Text Link & CTA Buttons */}
        <div className="lg:col-span-8 flex flex-col items-start text-left">
          {/* Eyebrow / Agency Tag */}
          <div className="inline-flex items-center gap-2 mb-4 sm:mb-6">
            <span className="w-2 h-2 rounded-full bg-[var(--color-blue)]" />
            <span className="font-mono text-xs tracking-[0.28em] uppercase text-[var(--fg-muted)] font-semibold">
              Aurigin Media · Built Environment Agency
            </span>
          </div>

          {/* Main Headline: Left-Aligned, Massive, with Accent Underline on "Culture." */}
          <div className="overflow-hidden">
            <h1
              ref={line1Ref}
              className="font-display font-black uppercase leading-[0.92] text-[clamp(2.7rem,7.4vw,6.4rem)] text-[var(--fg)] tracking-tight"
            >
              Beyond Content.
            </h1>
          </div>

          <div className="overflow-hidden mt-1 sm:mt-2">
            <h1
              ref={line2Ref}
              className="font-display font-black uppercase leading-[0.92] text-[clamp(2.7rem,7.4vw,6.4rem)] text-[var(--color-blue)] tracking-tight"
            >
              Into{" "}
              <span className="relative inline-block text-[var(--color-blue)]">
                Culture.
                {/* Accent Underline Bar (Modeled directly after Image 1's accent underline) */}
                <span
                  className="absolute -bottom-1 sm:-bottom-2.5 left-0 w-full h-[6px] sm:h-[8px] rounded-full"
                  style={{ backgroundColor: "var(--color-blue)" }}
                />
              </span>
            </h1>
          </div>

          {/* Subtitle Paragraph */}
          <p
            ref={subRef}
            className="mt-6 sm:mt-8 text-base sm:text-xl text-[var(--fg-muted)] max-w-2xl font-normal leading-relaxed"
          >
            We don't get lucky. We get it by design. Brand strategy, creative, media and AI —
            built to make you unforgettable.
          </p>

          {/* Action Row: Editorial Text Link (Image 1 Style) + Aurigin Action Buttons */}
          <div
            ref={ctaRef}
            className="mt-8 sm:mt-11 flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8 w-full sm:w-auto"
          >
            {/* Editorial Link with Arrow matching "LEARN ABOUT OUR BRAND PROCESS →" */}
            <a
              href="#process"
              data-cursor="link"
              className="group inline-flex items-center gap-2.5 font-display font-bold uppercase text-xs sm:text-sm tracking-wider text-[var(--fg)] hover:text-[var(--color-blue)] transition-colors py-1"
            >
              <span>Learn about our process</span>
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-1.5 font-mono">
                →
              </span>
            </a>

            {/* Primary & Secondary Action Buttons */}
            <div className="flex items-center gap-3">
              <a
                href="#work"
                data-cursor="link"
                className="font-display font-bold uppercase text-xs sm:text-sm tracking-wide bg-[var(--fg)] text-[var(--bg)] rounded-full px-7 py-3.5 hover:bg-[var(--color-yellow)] hover:text-[#0b0b0c] transition-all duration-200 shadow-sm"
              >
                See our work
              </a>
              <a
                href="#contact"
                data-cursor="link"
                className="font-display font-bold uppercase text-xs sm:text-sm tracking-wide border border-[var(--line)] rounded-full px-7 py-3.5 text-[var(--fg)] hover:border-[var(--color-blue)] hover:text-[var(--color-blue)] transition-colors"
              >
                Let's talk
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Restructured Proof Metrics (8.7K engagement, 120K views, 41% lift) */}
        <div
          ref={chipsWrapRef}
          className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3.5 sm:gap-4 justify-center"
        >
          {CHIPS.map(({ icon: Icon, label, sub, desc }) => (
            <div
              key={label}
              className="group relative flex items-center justify-between p-4 sm:p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-blue)]"
              style={{
                borderColor: "var(--line)",
                background: "color-mix(in srgb, var(--bg-alt) 90%, transparent)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center border transition-colors"
                  style={{
                    borderColor: "var(--line)",
                    background: "var(--bg)",
                  }}
                >
                  <Icon size={20} className="text-[var(--color-yellow)]" strokeWidth={2.2} />
                </div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display font-black text-2xl text-[var(--fg)] tracking-tight">
                      {label}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-blue)] font-bold">
                      {sub}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--fg-muted)] mt-0.5">{desc}</p>
                </div>
              </div>

              <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[var(--color-blue)]">
                <ArrowUpRight size={16} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Scroll Cue */}
      <div
        ref={cueRef}
        className="relative z-10 mt-12 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full flex items-center justify-between text-[var(--fg-muted)] pt-6 border-t"
        style={{ borderColor: "var(--line)" }}
      >
        <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-[var(--fg-muted)]">
          Selected Built-Environment Cases
        </span>

        <a
          href="#services"
          className="flex items-center gap-2 font-mono text-[11px] tracking-[0.25em] uppercase hover:text-[var(--color-blue)] transition-colors"
        >
          <span>Scroll</span>
          <ArrowDown size={14} className="animate-bounce" />
        </a>
      </div>
    </section>
  );
}
