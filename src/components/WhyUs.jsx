import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Crown, Globe2, Settings2, Zap } from "lucide-react";
import SplitReveal from "./SplitReveal";

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
  { icon: Crown, title: "Strategy-First", desc: "We start with insight, not assumptions.", dir: -1 },
  { icon: Globe2, title: "Culture-Aware", desc: "We speak the language of now, not then.", dir: 1 },
  { icon: Settings2, title: "Systems-Driven", desc: "Smart processes. Better output. Consistent impact.", dir: -1 },
  { icon: Zap, title: "Fast but Thoughtful", desc: "Agile by nature. Intentional by choice.", dir: 1 },
];

export default function WhyUs() {
  const wrapRef = useRef(null);
  const cardsRef = useRef([]);
  cardsRef.current = [];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current;
      const total = cards.length;

      cards.forEach((card, i) => {
        gsap.set(card, { xPercent: PILLARS[i].dir * 60, opacity: 0 });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      cards.forEach((card, i) => {
        const start = i / total;
        tl.to(card, { xPercent: 0, opacity: 1, duration: 1 / total, ease: "power2.out" }, start);
      });
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="why" ref={wrapRef} className="relative h-[400vh]">
      <div
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center pt-20 sm:pt-0 border-t px-6"
        style={{ borderColor: "var(--line)" }}
      >
        <div className="max-w-6xl mx-auto w-full mb-10 text-center">
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--fg-muted)]">Why Aurigin</span>
          <SplitReveal
            text="No beige thinking."
            className="font-display font-black uppercase leading-[0.95] text-[clamp(2.2rem,7vw,5rem)] mt-2 text-[var(--color-orange)]"
          />
        </div>

        <div className="max-w-4xl mx-auto w-full flex flex-col gap-5">
          {PILLARS.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={title}
              ref={(el) => (cardsRef.current[i] = el)}
              className="rounded-3xl border p-6 sm:p-8 flex items-center gap-6 will-change-transform"
              style={{ borderColor: "var(--line)", background: i % 2 === 0 ? "var(--card)" : "transparent" }}
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "color-mix(in srgb, var(--color-orange) 15%, transparent)" }}
              >
                <Icon size={26} style={{ color: "var(--color-orange)" }} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display font-extrabold uppercase text-lg sm:text-xl">{title}</h3>
                <p className="text-[var(--fg-muted)] text-sm sm:text-base mt-1">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
