import { Folder, MonitorSmartphone, PlayCircle, Globe2 } from "lucide-react";
import Reveal from "./Reveal";
import SplitReveal from "./SplitReveal";
import brandImg from "../assets/services/brand.jpg";
import creativeImg from "../assets/services/creative.jpg";
import mediaImg from "../assets/services/media.jpg";
import digitalImg from "../assets/services/digital.jpg";

const SERVICES = [
  { icon: Folder, title: "Brand", desc: "Clarity. Positioning. Differentiation.", image: brandImg },
  { icon: PlayCircle, title: "Creative", desc: "Ideas. Stories. Systems.", image: creativeImg },
  { icon: MonitorSmartphone, title: "Media", desc: "Paid. Organic. Analytics.", image: mediaImg },
  { icon: Globe2, title: "Digital", desc: "Web. Apps. Interactive.", image: digitalImg },
];

export default function Services() {
  return (
    <section id="services" className="relative py-28 sm:py-36 px-6 border-t" style={{ borderColor: "var(--line)" }}>
      <div className="max-w-4xl mx-auto">
        <div className="mb-16 text-center">
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--fg-muted)]">Services</span>
          <SplitReveal
            text="Pick your fighter."
            className="font-display font-black uppercase leading-[0.95] text-[clamp(2rem,6vw,4.2rem)] mt-2"
          />
          <Reveal className="max-w-sm mx-auto text-[var(--fg-muted)] mt-4">
            Different skills. One mission: cultural impact. Choose a lane, or take the whole squad.
          </Reveal>
        </div>

        <Reveal
          className="rounded-[2.5rem] border overflow-hidden grid grid-cols-2 divide-x divide-y divide-white/10"
          style={{ borderColor: "var(--line)" }}
        >
          {SERVICES.map(({ icon: Icon, title, desc, image }) => (
            <a
              key={title}
              href="#work"
              data-cursor="link"
              className="group relative flex flex-col items-center justify-center gap-4 py-14 sm:py-20 overflow-hidden"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${image})` }}
              />
              <div className="absolute inset-0 bg-black/75 group-hover:bg-black/60 transition-colors duration-300" />

              <div
                className="relative w-16 h-16 rounded-full flex items-center justify-center border border-white/25 bg-white/10 backdrop-blur-sm transition-transform group-hover:scale-110"
              >
                <Icon size={26} strokeWidth={1.6} className="text-white" />
              </div>
              <div className="relative text-center">
                <p className="font-display font-extrabold uppercase text-lg sm:text-xl text-white">{title}</p>
                <p className="text-white/75 text-xs sm:text-sm mt-1">{desc}</p>
              </div>
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
