import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATEMENTS = [
  {
    n: "01",
    muted: "Trends chase attention.",
    bold: "Strategy earns recall.",
    align: "left",
  },
  {
    n: "02",
    muted: "Everyone posts.",
    bold: "Very few build culture.",
    align: "right",
  },
  {
    n: "03",
    muted: "Good brands get seen.",
    bold: "Great brands get remembered.",
    align: "left",
  },
];

export default function Manifesto() {
  const wrapRef = useRef(null);
  const rowsRef = useRef([]);
  rowsRef.current = [];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      rowsRef.current.forEach((row, i) => {
        const dir = STATEMENTS[i].align === "right" ? 1 : -1;
        gsap.fromTo(
          row,
          { xPercent: dir * 40, opacity: 0 },
          {
            xPercent: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 85%" },
          }
        );
      });
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={wrapRef} className="relative py-28 sm:py-36 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col gap-20 sm:gap-28">
        {STATEMENTS.map((s, i) => (
          <div
            key={s.n}
            ref={(el) => (rowsRef.current[i] = el)}
            className={`flex flex-col gap-2 will-change-transform ${
              s.align === "right" ? "items-end text-right" : "items-start text-left"
            }`}
          >
            <span className="font-mono text-xs tracking-[0.3em] text-[var(--fg-muted)]">{s.n} /03</span>
            <h2
              className="font-display font-black uppercase leading-[0.95] text-[clamp(1.8rem,6vw,4.5rem)]"
              style={{ color: "var(--color-blue, #0066ff)" }}
            >
              {s.muted}
            </h2>
            <h2
              className="font-display font-black uppercase leading-[0.95] text-[clamp(1.8rem,6vw,4.5rem)]"
              style={{ color: "var(--accent)" }}
            >
              {s.bold}
            </h2>
          </div>
        ))}
      </div>
    </section>
  );
}
