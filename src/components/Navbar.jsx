import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
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

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const lenisRef = useLenis();
  const { theme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (e, href) => {
    e.preventDefault();
    setOpen(false);
    const target = document.querySelector(href);
    if (target && lenisRef?.current) {
      lenisRef.current.scrollTo(target, { offset: -70, duration: 1.3 });
    } else if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3 backdrop-blur-md border-b border-[var(--line)]" : "py-5 border-b border-transparent"
      }`}
      style={{ background: scrolled ? "color-mix(in srgb, var(--bg) 82%, transparent)" : "transparent" }}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a
          href="#hero"
          onClick={(e) => goTo(e, "#hero")}
          data-cursor="link"
          className="flex items-center gap-2 group"
        >
          <img
            src={theme === "dark" ? logoDark : logoLight}
            alt="Aurigin Media"
            className="h-8 sm:h-9 w-auto flex-shrink-0"
            draggable="false"
          />
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => goTo(e, link.href)}
              data-cursor="link"
              className="font-display text-sm font-semibold uppercase tracking-wide text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle className="hidden lg:flex" />
          <a
            href="#contact"
            onClick={(e) => goTo(e, "#contact")}
            data-cursor="link"
            className="hidden lg:inline-block font-display font-bold text-xs uppercase tracking-wide rounded-full px-5 py-2.5 bg-[var(--fg)] text-[var(--bg)] hover:bg-[var(--color-orange)] hover:text-white transition-colors"
          >
            Start a project
          </a>
          <button
            onClick={() => setOpen((o) => !o)}
            className="lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="lg:hidden mt-4 px-6 pb-6 flex flex-col gap-4 border-t border-[var(--line)] pt-4">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => goTo(e, link.href)}
              className="font-display text-base font-semibold uppercase tracking-wide"
            >
              {link.label}
            </a>
          ))}
          <div className="flex items-center justify-between pt-2">
            <ThemeToggle />
            <a
              href="#contact"
              onClick={(e) => goTo(e, "#contact")}
              className="font-display font-bold text-xs uppercase tracking-wide rounded-full px-5 py-2.5 bg-[var(--fg)] text-[var(--bg)]"
            >
              Start a project
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
