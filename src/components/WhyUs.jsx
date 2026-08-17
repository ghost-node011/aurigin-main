import { Crown, Globe2, Settings2, Zap } from "lucide-react";
import Reveal from "./Reveal";
import SplitReveal from "./SplitReveal";

const PILLARS = [
  { icon: Crown, title: "Strategy-First", desc: "We start with insight, not assumptions." },
  { icon: Globe2, title: "Culture-Aware", desc: "We speak the language of now, not then." },
  { icon: Settings2, title: "Systems-Driven", desc: "Smart processes. Better output. Consistent impact." },
  { icon: Zap, title: "Fast but Thoughtful", desc: "Agile by nature. Intentional by choice." },
];

export default function WhyUs() {
  return (
    <section id="why" className="relative py-28 sm:py-36 px-6 border-t" style={{ borderColor: "var(--line)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 text-center">
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--fg-muted)]">Why Aurigin</span>
          <SplitReveal
            text="No beige thinking."
            className="font-display font-black uppercase leading-[0.95] text-[clamp(2.2rem,7vw,5rem)] mt-2 text-[var(--color-orange)]"
          />
        </div>

        <Reveal stagger={0.1} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PILLARS.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={title}
              className="rounded-3xl border p-7 flex flex-col gap-5 transition-transform hover:-translate-y-1.5"
              style={{
                borderColor: "var(--line)",
                background: i % 2 === 0 ? "var(--card)" : "transparent",
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: "color-mix(in srgb, var(--color-orange) 15%, transparent)" }}
              >
                <Icon size={22} style={{ color: "var(--color-orange)" }} />
              </div>
              <h3 className="font-display font-extrabold uppercase text-lg">{title}</h3>
              <p className="text-[var(--fg-muted)] text-sm">{desc}</p>
            </div>
          ))}
        </Reveal>

        <div className="mt-12 text-center">
          <p className="font-display font-bold uppercase tracking-wide text-sm text-[var(--fg-muted)]">
            Ideas with direction. Execution with attitude.{" "}
            <span style={{ color: "var(--color-orange)" }}>Impact that lasts.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
