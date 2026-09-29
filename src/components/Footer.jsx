import { ArrowUp } from "lucide-react";
import { useLenis } from "../lib/SmoothScroll";
import { useTheme } from "../lib/ThemeContext";
import logoDark from "../assets/aurigin-logo-dark.png";
import { InstagramIcon, LinkedinIcon, XIcon } from "./SocialIcons";

const NAV_LINKS = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Approach" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  const lenisRef = useLenis();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const goTo = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target && lenisRef?.current) {
      lenisRef.current.scrollTo(target, { offset: -70, duration: 1.3 });
    } else if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer
      className="px-6 sm:px-8 pt-20 pb-12 border-t"
      style={{
        background: isDark ? "var(--bg)" : "var(--fg)",
        color: isDark ? "var(--fg)" : "var(--bg)",
        borderColor: "var(--line)",
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-14 sm:gap-16">
        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Column 1: Brand & Statement */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <a
              href="#hero"
              onClick={(e) => goTo(e, "#hero")}
              data-cursor="link"
              className="inline-block transition-opacity hover:opacity-90 w-fit"
            >
              <img src={logoDark} alt="Aurigin Media" className="h-8 sm:h-9 w-auto" draggable="false" />
            </a>
            <p className="font-display font-black uppercase text-xl sm:text-2xl leading-tight max-w-sm tracking-tight mt-1">
              Let's give them something<br className="hidden sm:block" /> to talk about.
            </p>
            <p className="text-xs sm:text-sm opacity-60 leading-relaxed max-w-xs font-body">
              Brand strategy, creative, media & AI. Turning brands into culture.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="font-mono text-[11px] uppercase tracking-[0.25em] opacity-40 mb-1">
              Navigation
            </h4>
            <nav className="flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => goTo(e, link.href)}
                  data-cursor="link"
                  className="font-display text-sm font-bold uppercase tracking-wider transition-colors hover:text-[var(--color-yellow)] w-fit"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Column 3: Connect & Socials */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="font-mono text-[11px] uppercase tracking-[0.25em] opacity-40 mb-1">
              Connect
            </h4>
            <div className="flex flex-col gap-2.5">
              <a
                href="#contact"
                onClick={(e) => goTo(e, "#contact")}
                data-cursor="link"
                className="font-display text-sm font-bold uppercase tracking-wider transition-colors hover:text-[var(--color-yellow)] w-fit"
              >
                Contact
              </a>
              <a
                href="mailto:hello@aurigin.media"
                data-cursor="link"
                className="font-display text-sm font-semibold lowercase tracking-wide transition-colors hover:text-[var(--color-yellow)] w-fit"
              >
                hello@aurigin.media
              </a>

              {/* Small, neat social icons */}
              <div className="flex items-center gap-2 mt-2">
                <a
                  href="#"
                  data-cursor="link"
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-full border border-[var(--line)] flex items-center justify-center transition-all duration-200 hover:border-[var(--color-yellow)] hover:text-[var(--color-yellow)] hover:scale-105"
                >
                  <InstagramIcon size={14} />
                </a>
                <a
                  href="#"
                  data-cursor="link"
                  aria-label="LinkedIn"
                  className="w-8 h-8 rounded-full border border-[var(--line)] flex items-center justify-center transition-all duration-200 hover:border-[var(--color-yellow)] hover:text-[var(--color-yellow)] hover:scale-105"
                >
                  <LinkedinIcon size={14} />
                </a>
                <a
                  href="#"
                  data-cursor="link"
                  aria-label="X"
                  className="w-8 h-8 rounded-full border border-[var(--line)] flex items-center justify-center transition-all duration-200 hover:border-[var(--color-yellow)] hover:text-[var(--color-yellow)] hover:scale-105"
                >
                  <XIcon size={14} />
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Studio & Back to Top */}
          <div className="lg:col-span-2 flex flex-col justify-between items-start lg:items-end gap-6">
            <div className="flex flex-col items-start lg:items-end gap-2">
              <h4 className="font-mono text-[11px] uppercase tracking-[0.25em] opacity-40">
                Studio
              </h4>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--line)] text-[10px] font-mono uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-yellow)] animate-pulse" />
                <span className="opacity-80">Available Q3/Q4</span>
              </div>
            </div>

            <button
              onClick={(e) => goTo(e, "#hero")}
              aria-label="Back to top"
              data-cursor="link"
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--line)] font-mono text-xs uppercase tracking-wider transition-all duration-200 hover:border-[var(--color-yellow)] hover:text-[var(--color-yellow)]"
            >
              <span>Back to top</span>
              <ArrowUp size={13} className="transition-transform duration-200 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* Thin divider before copyright */}
        <div className="h-px w-full" style={{ background: "var(--line)" }} />

        {/* Copyright & credits row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono opacity-50 tracking-wider">
          <p>© {new Date().getFullYear()} Aurigin Media. All rights reserved.</p>
          <p className="uppercase text-[11px]">Beyond content. Into culture.</p>
        </div>
      </div>
    </footer>
  );
}
