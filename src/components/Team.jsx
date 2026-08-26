import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitReveal from "./SplitReveal";

gsap.registerPlugin(ScrollTrigger);

const TEAM = [
  { name: "Avantika", role: "Project Manager", line: "Keeps every moving part on time.", color: "#0b0b0c" },
  { name: "Udit", role: "Cofounder", line: "Builds the systems. Ships the vision.", color: "#ff4d1c" },
  { name: "Arjun", role: "Cofounder", line: "Reads brands. Not spreadsheets.", color: "#1a34e0" },
];

export default function Team() {
  const wrapRef = useRef(null);
  const cardsRef = useRef([]);
  cardsRef.current = [];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current;
      const total = cards.length;

      cards.forEach((card) => {
        gsap.set(card, { y: 60, opacity: 0, scale: 0.85 });
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
        tl.to(card, { y: 0, opacity: 1, scale: 1, duration: 1 / total, ease: "back.out(1.6)" }, start);
      });
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="team" ref={wrapRef} className="relative h-[350vh]">
      <div
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center pt-20 sm:pt-0 border-t px-6"
        style={{ borderColor: "var(--line)" }}
      >
        <div className="max-w-6xl mx-auto w-full flex items-end justify-between flex-wrap gap-4 mb-12">
          <div>
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--fg-muted)]">The Studio</span>
            <SplitReveal
              text="The people behind the pixels."
              className="font-display font-black uppercase leading-[0.95] text-[clamp(2rem,6vw,4.2rem)] mt-2"
            />
          </div>
          <span
            className="font-mono text-xs uppercase tracking-[0.2em] border rounded-full px-4 py-2 text-[var(--fg-muted)]"
            style={{ borderColor: "var(--line)" }}
          >
            New Delhi Creative Studio
          </span>
        </div>

        <div className="max-w-6xl mx-auto w-full grid sm:grid-cols-3 gap-5">
          {TEAM.map((m, i) => (
            <div
              key={m.name}
              ref={(el) => (cardsRef.current[i] = el)}
              className="rounded-3xl border p-6 flex flex-col items-start gap-4 will-change-transform"
              style={{ borderColor: "var(--line)", background: "var(--card)" }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center font-display font-black text-lg text-white"
                style={{ background: m.color }}
              >
                {m.name[0]}
              </div>
              <div>
                <p className="font-display font-extrabold text-lg">{m.name}</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-orange)] mt-1">
                  {m.role}
                </p>
              </div>
              <p className="text-sm text-[var(--fg-muted)]">{m.line}</p>
            </div>
          ))}
        </div>

        <p className="max-w-6xl mx-auto w-full mt-10 text-center font-display font-bold uppercase tracking-wide text-sm text-[var(--fg-muted)]">
          Different minds. Same mission: <span style={{ color: "var(--color-orange)" }}>cultural impact.</span>
        </p>
      </div>
    </section>
  );
}
