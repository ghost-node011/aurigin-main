import { Mail, Phone } from "lucide-react";
import SplitReveal from "./SplitReveal";
import Reveal from "./Reveal";
import { InstagramIcon, LinkedinIcon, XIcon } from "./SocialIcons";
import { useTheme } from "../lib/ThemeContext";
import { EMAIL, EMAIL_HREF, PHONE, PHONE_HREF } from "../lib/contact";

export default function CTA() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      id="contact"
      className="relative py-28 sm:py-40 px-6 overflow-hidden border-t"
      style={{
        background: isDark ? "var(--bg)" : "var(--fg)",
        color: isDark ? "var(--fg)" : "var(--bg)",
        borderColor: "var(--line)"
      }}
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
            href={EMAIL_HREF}
            data-cursor="link"
            className="w-full max-w-xs sm:w-72 font-display font-bold text-sm tracking-wide rounded-full px-6 py-4 flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5"
          >
            <Mail size={18} />
            {EMAIL}
          </a>
          <a
            href={PHONE_HREF}
            data-cursor="link"
            className="w-full max-w-xs sm:w-72 font-display font-bold text-sm tracking-wide rounded-full px-6 py-4 flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5"
          >
            <Phone size={18} />
            {PHONE}
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
