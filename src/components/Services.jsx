import { useState } from "react";
import { Compass, Fingerprint, MessagesSquare, MonitorSmartphone, TrendingUp } from "lucide-react";
import Reveal from "./Reveal";
import SplitReveal from "./SplitReveal";

const SERVICES = [
  { icon: Compass, title: "Brand Strategy", desc: "Clarity. Positioning. Differentiation." },
  { icon: Fingerprint, title: "Identity Design", desc: "Names. Visuals. Systems." },
  { icon: MessagesSquare, title: "Content & Social", desc: "Ideas. Stories. Communities." },
  { icon: MonitorSmartphone, title: "Digital Experiences", desc: "Web. Apps. Interactive." },
  { icon: TrendingUp, title: "Media & Growth", desc: "Paid. Organic. Analytics." },
];

export default function Services() {
  const [active, setActive] = useState(0);
  const Icon = SERVICES[active].icon;

  return (
    <section id="services" className="relative py-28 sm:py-36 px-6 border-t" style={{ borderColor: "var(--line)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-16">
          <div>
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--fg-muted)]">Services</span>
            <SplitReveal
              text="Pick your fighter."
              className="font-display font-black uppercase leading-[0.95] text-[clamp(2rem,6vw,4.2rem)] mt-2"
            />
          </div>
          <Reveal className="max-w-sm text-[var(--fg-muted)]">
            Different skills. One mission: cultural impact. Choose a lane, or take the whole squad.
          </Reveal>
        </div>

        <div className="grid md:grid-cols-[1.3fr_1fr] gap-10 lg:gap-20">
          <div>
            {SERVICES.map((s, i) => {
              const ItemIcon = s.icon;
              const isActive = active === i;
              return (
                <button
                  key={s.title}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  data-cursor="link"
                  className="w-full text-left flex items-center gap-6 py-6 border-b group transition-colors"
                  style={{ borderColor: "var(--line)" }}
                >
                  <span className="font-mono text-sm text-[var(--fg-muted)] w-8">0{i + 1}</span>
                  <ItemIcon
                    size={22}
                    strokeWidth={2}
                    className="transition-colors flex-shrink-0"
                    style={{ color: isActive ? "var(--color-orange)" : "var(--fg-muted)" }}
                  />
                  <span
                    className="font-display font-extrabold uppercase text-2xl sm:text-3xl transition-all duration-300"
                    style={{
                      color: isActive ? "var(--fg)" : "var(--fg-muted)",
                      transform: isActive ? "translateX(8px)" : "translateX(0px)",
                    }}
                  >
                    {s.title}
                  </span>
                  <span
                    className="ml-auto hidden sm:block font-body text-sm text-[var(--fg-muted)] transition-opacity duration-300"
                    style={{ opacity: isActive ? 1 : 0 }}
                  >
                    {s.desc}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="hidden md:flex items-center justify-center">
            <div
              key={active}
              className="relative w-full aspect-square rounded-3xl flex flex-col items-center justify-center gap-6 border overflow-hidden"
              style={{ borderColor: "var(--line)", background: "var(--card)" }}
            >
              <div
                className="absolute -right-10 -top-10 w-40 h-40 rounded-full opacity-20"
                style={{ background: "var(--color-orange)" }}
              />
              <Icon size={56} strokeWidth={1.5} style={{ color: "var(--color-orange)" }} />
              <div className="text-center px-8">
                <p className="font-display font-black uppercase text-2xl">{SERVICES[active].title}</p>
                <p className="text-[var(--fg-muted)] mt-2">{SERVICES[active].desc}</p>
              </div>
              <span className="absolute bottom-6 right-6 font-mono text-6xl font-black opacity-10">
                0{active + 1}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
