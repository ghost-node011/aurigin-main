import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, Heart, PlayCircle, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const CHIPS = [
  { icon: Heart, label: "8.7K", sub: "engagement", pos: "top-[16%] left-[8%] md:left-[12%]" },
  { icon: PlayCircle, label: "120K", sub: "views", pos: "top-[20%] right-[6%] md:right-[10%]" },
  { icon: Sparkles, label: "41%", sub: "lift", pos: "bottom-[22%] left-[6%] md:left-[10%]" },
];

export default function Hero() {
  const wrapRef = useRef(null);
  const ringRef = useRef(null);
  const bigWordRef = useRef(null);
  const bigWordTextRef = useRef(null);
  const blobRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const cueRef = useRef(null);
  const chipsRef = useRef([]);
  chipsRef.current = [];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const entrance = gsap.timeline({ delay: 0.1 });

      entrance
        .fromTo(line1Ref.current, { yPercent: 120 }, { yPercent: 0, duration: 0.7, ease: "power3.out" }, 0)
        .fromTo(line2Ref.current, { yPercent: 120 }, { yPercent: 0, duration: 0.7, ease: "power3.out" }, 0.1)
        .fromTo(subRef.current, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.5 }, 0.3)
        .fromTo(ctaRef.current, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.5 }, 0.4);

      chipsRef.current.forEach((chip, i) => {
        if (!chip) return;
        entrance.fromTo(
          chip,
          { opacity: 0, y: 30, scale: 0.85 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5 },
          0.5 + i * 0.1
        );
        gsap.to(chip, {
          y: "+=10",
          duration: 2 + i * 0.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1,
        });
      });

      // The one scroll-driven effect: background ring/wordmark/blob telescope past as the hero is scrolled through.
      // Kept out of the way of the (now static, load-in) foreground text: the ring starts oversized/off-frame,
      // the wordmark starts faint, and the blob starts hidden, so nothing competes with the headline at rest.
      gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      })
        .to(cueRef.current, { opacity: 0, y: -16, duration: 0.06 }, 0)
        .fromTo(
          ringRef.current,
          { scale: 3.2, rotate: -25, opacity: 1 },
          { scale: 1, rotate: 8, duration: 0.42, ease: "none" },
          0
        )
        .to(ringRef.current, { scale: 0.55, opacity: 0.18, rotate: 55, duration: 0.5, ease: "none" }, 0.42)
        .fromTo(bigWordRef.current, { opacity: 0.55 }, { opacity: 0, scale: 1.25, duration: 0.5, ease: "none" }, 0)
        .fromTo(blobRef.current, { scale: 0.2, opacity: 0 }, { scale: 1, opacity: 0.85, duration: 0.5, ease: "none" }, 0.05);
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const el = bigWordTextRef.current;
    const container = wrapRef.current;
    if (!el || !container) return;

    const fit = () => {
      el.style.transform = "scale(1)";
      const available = container.clientWidth * 0.92;
      const natural = el.getBoundingClientRect().width;
      if (natural > 0) {
        el.style.transform = `scale(${available / natural})`;
      }
    };

    fit();
    document.fonts?.ready?.then(fit);
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  return (
    <section ref={wrapRef} id="hero" className="relative h-[220vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[var(--bg)]">
        <div
          ref={blobRef}
          className="absolute -left-[24vmin] -bottom-[26vmin] w-[70vmin] h-[70vmin] rounded-full"
          style={{ background: "var(--color-orange)" }}
        />

        <div
          ref={bigWordRef}
          className="absolute inset-0 hidden sm:flex items-center justify-center overflow-hidden pointer-events-none select-none"
        >
          <span
            ref={bigWordTextRef}
            className="inline-block font-display font-black uppercase leading-none text-stroke whitespace-nowrap"
            style={{ fontSize: "16rem", transformOrigin: "center" }}
          >
            aurigin
          </span>
        </div>

        <div
          ref={ringRef}
          className="absolute w-[62vmin] h-[62vmin] rounded-full"
          style={{
            border: "5.5vmin solid var(--color-orange)",
            borderRightColor: "transparent",
            borderTopColor: "transparent",
          }}
        />

        {CHIPS.map(({ icon: Icon, label, sub, pos }, i) => (
          <div
            key={label}
            ref={(el) => (chipsRef.current[i] = el)}
            className={`absolute ${pos} z-20 flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--card)]/90 backdrop-blur px-4 py-2 shadow-lg`}
          >
            <Icon size={16} className="text-[var(--color-orange)]" strokeWidth={2.4} />
            <span className="font-display font-extrabold text-sm">{label}</span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--fg-muted)]">{sub}</span>
          </div>
        ))}

        <div className="relative z-10 max-w-4xl px-6 text-center pt-16 sm:pt-20">
          <div className="overflow-hidden">
            <h1 ref={line1Ref} className="font-display font-black uppercase leading-[0.94] text-[clamp(2.4rem,8.2vw,6.4rem)] text-center">
              Beyond content.
            </h1>
          </div>
          <div className="overflow-hidden">
            <h1
              ref={line2Ref}
              className="font-display font-black uppercase leading-[0.94] text-[clamp(2.4rem,8.2vw,6.4rem)] text-center"
              style={{ color: "var(--color-blue, #0066ff)" }}
            >
              Into culture.
            </h1>
          </div>

          <p ref={subRef} className="mt-5 text-base sm:text-lg text-[var(--fg-muted)] max-w-xl mx-auto">
            We don't get lucky. We get it by design. Brand strategy, creative, media and AI —
            built to make you unforgettable.
          </p>

          <div ref={ctaRef} className="mt-6 flex items-center justify-center gap-4">
            <a
              href="#work"
              data-cursor="link"
              className="font-display font-bold uppercase text-sm tracking-wide bg-[var(--fg)] text-[var(--bg)] rounded-full px-7 py-3.5 hover:bg-[var(--color-orange)] hover:text-white transition-colors"
            >
              See our work
            </a>
            <a
              href="#contact"
              data-cursor="link"
              className="font-display font-bold uppercase text-sm tracking-wide border border-[var(--line)] rounded-full px-7 py-3.5 hover:border-[var(--fg)] transition-colors"
            >
              Let's talk
            </a>
          </div>
        </div>

        <div ref={cueRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-[var(--fg-muted)]">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <ArrowDown size={16} className="animate-bounce" />
        </div>
      </div>
    </section>
  );
}
