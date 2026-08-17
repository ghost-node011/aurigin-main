import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import SplitReveal from "./SplitReveal";

const PROJECTS = [
  {
    tag: "Streetwear · Brand Launch",
    name: "Not For Everyone",
    challenge: "Launch a new streetwear label in a saturated market.",
    idea: "Own the subculture. Make it feel like a movement, not a moment.",
    output: "Brand film, OOH, social, influencer collabs, pop-up event.",
    stats: [
      { v: "3.2x", l: "Reach" },
      { v: "41%", l: "Lift in engagement" },
      { v: "120K", l: "Views" },
    ],
    from: "#1a34e0",
    to: "#0a1466",
  },
  {
    tag: "Skincare · D2C Growth",
    name: "Lumeo",
    challenge: "Drive conversions for a D2C skincare launch.",
    idea: "Creator-led content that educates, entertains and converts.",
    output: "Short-form content, performance ads, landing page & email flow.",
    stats: [
      { v: "2.8%", l: "CTR" },
      { v: "4.6K", l: "Leads" },
      { v: "11.2x", l: "ROAS" },
    ],
    from: "#ff4d1c",
    to: "#8c2100",
  },
];

function ProjectCard({ p, i }) {
  return (
    <div
      className="sticky rounded-[2rem] sm:rounded-[2.5rem] border overflow-hidden shadow-2xl"
      style={{ top: `${5 + i * 2.5}rem`, zIndex: i + 1, borderColor: "var(--line)", background: "var(--card)" }}
    >
      <div
        className="relative h-[46vh] sm:h-[54vh] flex items-center justify-center overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${p.from}, ${p.to})` }}
      >
        <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-24 -left-10 w-80 h-80 rounded-full bg-black/10 blur-2xl" />

        <div className="relative w-[70%] sm:w-[50%] aspect-[4/3] rounded-2xl bg-white/10 backdrop-blur-sm border border-white/25 flex flex-col p-5 gap-3">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-white/50" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/50" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/50" />
          </div>
          <div className="flex-1 grid grid-cols-3 gap-3">
            <div className="col-span-1 rounded-lg bg-white/15" />
            <div className="col-span-2 flex flex-col gap-2">
              <div className="h-3 w-3/4 rounded bg-white/25" />
              <div className="h-3 w-1/2 rounded bg-white/20" />
              <div className="mt-auto h-8 w-1/3 rounded-full bg-white/40" />
            </div>
          </div>
        </div>

        <span className="absolute top-6 left-6 font-mono text-[11px] uppercase tracking-[0.25em] text-white/80 border border-white/30 rounded-full px-3 py-1">
          {p.tag}
        </span>
        <a
          href="#contact"
          data-cursor="link"
          className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors"
        >
          <ArrowUpRight size={20} className="text-black" />
        </a>
        <h3 className="absolute bottom-6 left-6 right-6 font-display font-black uppercase text-white text-[clamp(2rem,6vw,4rem)] leading-none">
          {p.name}
        </h3>
      </div>

      <div className="grid sm:grid-cols-[1.4fr_1fr] gap-8 p-7 sm:p-10">
        <div className="grid sm:grid-cols-3 gap-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--fg-muted)] mb-2">Challenge</p>
            <p className="text-sm sm:text-base">{p.challenge}</p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--fg-muted)] mb-2">Idea</p>
            <p className="text-sm sm:text-base">{p.idea}</p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--fg-muted)] mb-2">Output</p>
            <p className="text-sm sm:text-base">{p.output}</p>
          </div>
        </div>
        <div className="flex sm:flex-col gap-6 sm:gap-4 sm:border-l sm:pl-8" style={{ borderColor: "var(--line)" }}>
          {p.stats.map((s) => (
            <div key={s.l}>
              <p className="font-display font-black text-2xl sm:text-3xl" style={{ color: "var(--color-orange)" }}>
                {s.v}
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--fg-muted)]">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Work() {
  return (
    <section id="work" className="relative py-28 sm:py-36 px-6 border-t" style={{ borderColor: "var(--line)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--fg-muted)]">Featured Work</span>
          <SplitReveal
            text="Bold cases, big impact."
            className="font-display font-black uppercase leading-[0.95] text-[clamp(2.2rem,7vw,5rem)] mt-2"
          />
          <Reveal className="max-w-lg text-[var(--fg-muted)] mt-4">
            We translate ideas into impactful communication — unique creations that trigger the
            right audience and create real opportunities for your brand.
          </Reveal>
        </div>

        <div className="flex flex-col gap-10">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.name} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
