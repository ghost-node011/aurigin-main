import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useLenis } from "../lib/SmoothScroll";
import { useTheme } from "../lib/ThemeContext";
import AnimatedLogo from "./AnimatedLogo";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Approach" },
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
        scrolled || open
          ? "py-2.5 sm:py-3 backdrop-blur-xl border-b shadow-sm"
          : "py-4 sm:py-5 border-b border-transparent"
      }`}
      style={{
        borderColor: scrolled || open ? "var(--line)" : "transparent",
        background: open
          ? "var(--bg)"
          : scrolled
            ? "color-mix(in srgb, var(--bg) 84%, transparent)"
            : "transparent",
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        <a
          href="#hero"
          onClick={(e) => goTo(e, "#hero")}
          data-cursor="link"
          className="flex items-center gap-2 group transition-opacity hover:opacity-90 py-0.5"
          aria-label="Aurigin Media"
        >
          <AnimatedLogo className="h-[52px] sm:h-[58px]" animate={false} />
        </a>

        <div className="hidden lg:flex items-center gap-7 xl:gap-9">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => goTo(e, link.href)}
              data-cursor="link"
              className="relative font-display text-xs xl:text-sm font-bold uppercase tracking-wider py-1 group transition-colors"
            >
              <span>{link.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[var(--color-yellow)] transition-all duration-200 ease-out group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4 sm:gap-5">
          <ThemeToggle className="hidden lg:inline-flex" />
          <a
            href="#contact"
            onClick={(e) => goTo(e, "#contact")}
            data-cursor="link"
            className="hidden lg:inline-flex items-center justify-center font-display font-bold text-xs uppercase tracking-wider rounded-full px-5 py-2.5 bg-[var(--fg)] text-[var(--bg)] shadow-sm hover:shadow-md transition-all duration-200"
          >
            Start a project
          </a>
          <button
            onClick={() => setOpen((o) => !o)}
            className="lg:hidden w-9 h-9 rounded-full flex items-center justify-center border border-[var(--line)] text-[var(--fg)] transition-colors hover:border-[var(--color-yellow)] hover:text-[var(--color-yellow)]"
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {open && (
        <div
          className="lg:hidden mt-3 mx-4 px-6 py-6 rounded-2xl border border-[var(--line)] backdrop-blur-2xl shadow-2xl flex flex-col gap-4"
          style={{ background: "color-mix(in srgb, var(--bg) 95%, transparent)" }}
        >
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => goTo(e, link.href)}
              className="font-display text-base font-bold uppercase tracking-wider py-1.5 border-b border-[var(--line)]/40 transition-colors hover:text-[var(--color-yellow)]"
            >
              {link.label}
            </a>
          ))}
          <div className="flex items-center justify-between pt-3">
            <ThemeToggle />
            <a
              href="#contact"
              onClick={(e) => goTo(e, "#contact")}
              className="font-display font-bold text-xs uppercase tracking-wider rounded-full px-5 py-2.5 bg-[var(--fg)] text-[var(--bg)]"
            >
              Start a project
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
