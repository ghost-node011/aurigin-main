import { useState } from "react";
import { ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import Reveal from "./Reveal";
import SplitReveal from "./SplitReveal";
import { CLIENTS } from "../lib/clients";
import { PROJECTS } from "../portfolio/projects";

const PORTFOLIO_URL = "/portfolio/";

// Two portfolio projects featured on the home page, shown before the client cards.
const FEATURED_PROJECTS = [
  { name: "Trizzone", tab: "TZ", sector: "Architecture", from: "#1a34e0", to: "#0a1466" },
  {
    name: "Ever Rich Galleria",
    tab: "ERG",
    sector: "3D Visualisation",
    from: "#2b2b30",
    to: "#0b0b0c",
  },
].map(({ name, ...card }) => {
  const project = PROJECTS.find((p) => p.name === name);
  return {
    ...card,
    name,
    highlight: project.category,
    image: project.slides[0].full,
    href: PORTFOLIO_URL,
  };
});

const CARDS = [...FEATURED_PROJECTS, ...CLIENTS.map((client) => ({ ...client, href: "#contact" }))];

export default function Work() {
  const [active, setActive] = useState(0);
  const card = CARDS[active];

  return (
    <section
      id="work"
      className="relative py-28 sm:py-36 px-6 border-t"
      style={{ borderColor: "var(--line)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--fg-muted)]">
            Featured Work
          </span>
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
          {/* Whole card is one link — clicking anywhere opens it, same as the arrow */}
          <a
            key={active}
            href={card.href}
            data-cursor="link"
            aria-label={
              card.image ? `View ${card.name} in the portfolio` : `${card.name} — start a project`
            }
            className="group relative block w-full max-w-sm sm:max-w-md aspect-[3/4] rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-blue)]"
            style={{ background: `linear-gradient(160deg, ${card.from}, ${card.to})` }}
          >
            <div className="absolute -top-16 -right-10 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-14 w-72 h-72 rounded-full bg-black/20 blur-3xl" />

            <div className="relative h-full flex flex-col justify-between gap-6 p-8 sm:p-10">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/70 border border-white/25 rounded-full px-3 py-1">
                  {card.sector}
                </span>
                <span
                  aria-hidden="true"
                  className="w-11 h-11 rounded-full bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center group-hover:bg-white/25 transition-colors"
                >
                  <ArrowUpRight
                    size={20}
                    className="text-white transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </div>

              {/* Portfolio preview (featured projects only) */}
              {card.image && (
                <span className="block rounded-xl overflow-hidden border border-white/20 shadow-xl bg-white transition-transform duration-300 group-hover:scale-[1.02]">
                  <img
                    src={card.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="w-full aspect-video object-cover"
                  />
                </span>
              )}

              <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl p-6 shadow-lg">
                <h3 className="font-display font-black uppercase text-white text-2xl sm:text-3xl leading-none mb-3">
                  {card.name}
                </h3>
                <p className="text-white/80 text-sm sm:text-base">{card.highlight}</p>
              </div>
            </div>
          </a>

          <div
            className="w-full max-w-sm sm:max-w-none sm:w-auto mt-6 sm:mt-0 overflow-x-auto sm:overflow-visible [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: "none" }}
          >
            <div
              className="flex sm:flex-col flex-row justify-start sm:justify-center w-max sm:w-auto mx-auto sm:-ml-6 sm:self-center rounded-full overflow-hidden border divide-x sm:divide-x-0 sm:divide-y divide-[var(--line)] shadow-xl z-10"
              style={{ borderColor: "var(--line)", background: "var(--card)" }}
            >
              {CARDS.map((c, i) => (
                <button
                  key={c.tab}
                  onClick={() => setActive(i)}
                  data-cursor="link"
                  aria-label={c.name}
                  className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center font-mono text-[11px] font-bold uppercase transition-colors flex-shrink-0"
                  style={{
                    color: active === i ? "#fff" : "var(--fg-muted)",
                    background: active === i ? "var(--color-orange)" : "transparent",
                  }}
                >
                  {c.tab}
                </button>
              ))}

              {/* "See more" tab → full portfolio */}
              <a
                href={PORTFOLIO_URL}
                data-cursor="link"
                aria-label="See more work in the portfolio"
                title="See more work"
                className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center flex-shrink-0 text-[var(--color-blue)] transition-colors hover:bg-[var(--color-yellow)] hover:text-[#0b0b0c]"
              >
                <Plus size={18} strokeWidth={2.5} />
              </a>
            </div>
          </div>
        </Reveal>

        <div className="mt-8 flex flex-col items-center gap-4">
          <p className="text-center text-sm text-[var(--fg-muted)]">
            Tap a tab to open a case, or explore the full portfolio.
          </p>
          <a
            href={PORTFOLIO_URL}
            data-cursor="link"
            className="group inline-flex items-center gap-2 font-display font-bold uppercase text-xs sm:text-sm tracking-wide bg-[var(--fg)] text-[var(--bg)] rounded-full px-7 py-3.5 hover:bg-[var(--color-yellow)] hover:text-[#0b0b0c] transition-all duration-200 shadow-sm"
          >
            See more work
            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
