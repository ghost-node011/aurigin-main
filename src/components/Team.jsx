import Reveal from "./Reveal";
import SplitReveal from "./SplitReveal";

const TEAM = [
  { name: "Arjun", role: "Cofounder", line: "Reads brands. Not spreadsheets.", color: "#1a34e0" },
  { name: "Udit", role: "Cofounder", line: "Builds the systems. Ships the vision.", color: "#ff4d1c" },
  { name: "Avantika", role: "Project Manager", line: "Keeps every moving part on time.", color: "#0b0b0c" },
];

export default function Team() {
  return (
    <section id="team" className="relative py-28 sm:py-36 px-6 border-t" style={{ borderColor: "var(--line)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-16">
          <div>
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--fg-muted)]">The Studio</span>
            <SplitReveal
              text="The people behind the pixels."
              className="font-display font-black uppercase leading-[0.95] text-[clamp(2rem,6vw,4.2rem)] mt-2"
            />
          </div>
          <span className="font-mono text-xs uppercase tracking-[0.2em] border rounded-full px-4 py-2 text-[var(--fg-muted)]" style={{ borderColor: "var(--line)" }}>
            New Delhi Creative Studio
          </span>
        </div>

        <Reveal stagger={0.08} className="grid sm:grid-cols-3 gap-5">
          {TEAM.map((m) => (
            <div
              key={m.name}
              className="group rounded-3xl border p-6 flex flex-col items-start gap-4 transition-transform hover:-translate-y-2"
              style={{ borderColor: "var(--line)", background: "var(--card)" }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center font-display font-black text-lg text-white transition-transform group-hover:scale-110"
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
        </Reveal>

        <p className="mt-12 text-center font-display font-bold uppercase tracking-wide text-sm text-[var(--fg-muted)]">
          Different minds. Same mission: <span style={{ color: "var(--color-orange)" }}>cultural impact.</span>
        </p>
      </div>
    </section>
  );
}
