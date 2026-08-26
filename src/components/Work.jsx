import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import SplitReveal from "./SplitReveal";

const CLIENTS = [
  {
    tab: "PG",
    name: "Prestige Group",
    sector: "Real Estate Development",
    highlight: "Prestige Group Recognition",
    from: "#1a34e0",
    to: "#0a1466",
  },
  {
    tab: "GP",
    name: "Godrej Properties",
    sector: "Real Estate Development",
    highlight: "Godrej Riverine — Gold Award · Godrej Jardinia — #SoldOutClub",
    from: "#ff4d1c",
    to: "#8c2100",
  },
  {
    tab: "ATS",
    name: "ATS HomeKraft",
    sector: "Real Estate Development",
    highlight: "Brand & campaign partner",
    from: "#101f8c",
    to: "#050a33",
  },
  {
    tab: "M3M",
    name: "M3M India",
    sector: "Real Estate Development",
    highlight: "Brand & campaign partner",
    from: "#3a3a3d",
    to: "#0b0b0c",
  },
  {
    tab: "SL",
    name: "SOBHA Limited",
    sector: "Real Estate Development",
    highlight: "SOBHA Aurum Recognition",
    from: "#ffb08a",
    to: "#c96a3d",
  },
  {
    tab: "CD",
    name: "Civitech Developers",
    sector: "Real Estate Development",
    highlight: "Civitech Stadia Appreciation",
    from: "#1a34e0",
    to: "#4d63f0",
  },
  {
    tab: "SSH",
    name: "Sri Sri Homz",
    sector: "Real Estate Development",
    highlight: "Brand & campaign partner",
    from: "#ff4d1c",
    to: "#ffb08a",
  },
];

export default function Work() {
  const [active, setActive] = useState(0);
  const client = CLIENTS[active];

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

        <Reveal className="flex flex-col sm:flex-row items-center sm:items-stretch justify-center">
          <div
            key={active}
            className="relative w-full max-w-sm sm:max-w-md aspect-[3/4] rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl"
            style={{ background: `linear-gradient(160deg, ${client.from}, ${client.to})` }}
          >
            <div className="absolute -top-16 -right-10 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-14 w-72 h-72 rounded-full bg-black/20 blur-3xl" />

            <div className="relative h-full flex flex-col justify-between p-8 sm:p-10">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/70 border border-white/25 rounded-full px-3 py-1">
                  {client.sector}
                </span>
                <a
                  href="#contact"
                  data-cursor="link"
                  className="w-11 h-11 rounded-full bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center hover:bg-white/25 transition-colors"
                >
                  <ArrowUpRight size={20} className="text-white" />
                </a>
              </div>

              <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl p-6 shadow-lg">
                <h3 className="font-display font-black uppercase text-white text-2xl sm:text-3xl leading-none mb-3">
                  {client.name}
                </h3>
                <p className="text-white/80 text-sm sm:text-base">{client.highlight}</p>
              </div>
            </div>
          </div>

          <div className="w-full max-w-sm sm:max-w-none sm:w-auto mt-6 sm:mt-0 overflow-x-auto sm:overflow-visible [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: "none" }}>
            <div
              className="flex sm:flex-col flex-row justify-start sm:justify-center w-max sm:w-auto mx-auto sm:-ml-6 sm:self-center rounded-full overflow-hidden border divide-x sm:divide-x-0 sm:divide-y divide-[var(--line)] shadow-xl z-10"
              style={{ borderColor: "var(--line)", background: "var(--card)" }}
            >
              {CLIENTS.map((c, i) => (
                <button
                  key={c.tab}
                  onClick={() => setActive(i)}
                  data-cursor="link"
                  className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center font-mono text-[11px] font-bold uppercase transition-colors flex-shrink-0"
                  style={{
                    color: active === i ? "#fff" : "var(--fg-muted)",
                    background: active === i ? "var(--color-orange)" : "transparent",
                  }}
                >
                  {c.tab}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <p className="mt-6 text-center text-sm text-[var(--fg-muted)]">
          Tap a client on the tab to open their case.
        </p>
      </div>
    </section>
  );
}
