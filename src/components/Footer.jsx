import { ArrowUp } from "lucide-react";
import { useLenis } from "../lib/SmoothScroll";
import { useTheme } from "../lib/ThemeContext";
import logoLight from "../assets/aurigin-logo-light.png";
import logoDark from "../assets/aurigin-logo-dark.png";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Approach" },
  { href: "#team", label: "Studio" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  const lenisRef = useLenis();
  const { theme } = useTheme();
  // footer band background is always var(--fg), the inverse of the page bg
  const logo = theme === "dark" ? logoLight : logoDark;

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
      className="px-6 py-12 border-t"
      style={{ background: "var(--fg)", color: "var(--bg)", borderColor: "color-mix(in srgb, var(--bg) 15%, transparent)" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <a href="#hero" onClick={(e) => goTo(e, "#hero")} className="flex items-center gap-2">
            <img src={logo} alt="Aurigin Media" className="h-7 sm:h-8 w-auto" draggable="false" />
          </a>
          <p className="font-display font-black uppercase text-2xl sm:text-3xl text-right leading-tight">
            Let's give them something<br className="hidden sm:block" /> to talk about.
          </p>
        </div>

        <div className="h-px w-full" style={{ background: "color-mix(in srgb, var(--bg) 15%, transparent)" }} />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => goTo(e, l.href)}
                className="font-display text-xs font-semibold uppercase tracking-wide opacity-70 hover:opacity-100 transition-opacity"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <p className="font-mono text-[11px] uppercase tracking-wider opacity-50 order-3 sm:order-2">
            © {new Date().getFullYear()} Aurigin Media. All rights reserved.
          </p>

          <button
            onClick={(e) => goTo(e, "#hero")}
            aria-label="Back to top"
            className="order-2 sm:order-3 w-10 h-10 rounded-full border flex items-center justify-center hover:opacity-80 transition-opacity"
            style={{ borderColor: "color-mix(in srgb, var(--bg) 25%, transparent)" }}
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
