import { ArrowUpRight } from "lucide-react";
import SplitReveal from "./SplitReveal";
import Reveal from "./Reveal";
import { InstagramIcon, LinkedinIcon, XIcon } from "./SocialIcons";

export default function CTA() {
  return (
    <section
      id="contact"
      className="relative py-28 sm:py-40 px-6 overflow-hidden"
      style={{ background: "var(--fg)", color: "var(--bg)" }}
    >
      <div
        className="absolute -right-[20vmin] -top-[20vmin] w-[60vmin] h-[60vmin] rounded-full opacity-90"
        style={{ background: "var(--color-orange)" }}
      />
      <div className="relative max-w-5xl mx-auto text-center">
        <span className="font-mono text-xs tracking-[0.3em] uppercase opacity-60">Let's talk</span>
        <SplitReveal
          text="Your brand, but louder."
          className="font-display font-black uppercase leading-[0.92] text-[clamp(2.4rem,9vw,6rem)] mt-3"
        />
        <Reveal className="mt-6 text-lg opacity-70">Clarity. Creativity. Cultural impact.</Reveal>

        <Reveal className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="mailto:hello@aurigin.media"
            data-cursor="link"
            className="font-display font-bold uppercase text-sm tracking-wide rounded-full px-8 py-4 flex items-center gap-2 transition-transform hover:-translate-y-0.5"
            style={{ background: "var(--color-orange)", color: "#fff" }}
          >
            hello@aurigin.media
            <ArrowUpRight size={18} />
          </a>
          <a
            href="#hero"
            data-cursor="link"
            className="font-display font-bold uppercase text-sm tracking-wide rounded-full px-8 py-4 border"
            style={{ borderColor: "color-mix(in srgb, var(--bg) 30%, transparent)" }}
          >
            Beyond content. Into culture.
          </a>
        </Reveal>

        <Reveal className="mt-16 flex items-center justify-center gap-6 opacity-70">
          <a href="#" data-cursor="link" aria-label="Instagram"><InstagramIcon size={20} /></a>
          <a href="#" data-cursor="link" aria-label="LinkedIn"><LinkedinIcon size={20} /></a>
          <a href="#" data-cursor="link" aria-label="X"><XIcon size={20} /></a>
        </Reveal>
      </div>
    </section>
  );
}
