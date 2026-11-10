import { ArrowLeft } from "lucide-react";
import AnimatedLogo from "./AnimatedLogo";
import TextLink from "./TextLink";
import ThemeToggle from "./ThemeToggle";

// Header and footer shared by the standalone pages (terms, privacy, portfolio).
export default function PageShell({ width = "max-w-3xl", children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b py-3" style={{ borderColor: "var(--line)" }}>
        <div className={`mx-auto flex ${width} items-center justify-between gap-4 px-6 sm:px-8`}>
          <a href="/" aria-label="Aurigin Media home">
            <AnimatedLogo className="h-[52px]" animate={false} />
          </a>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <a
              href="/"
              className="hidden items-center gap-2 font-display text-xs font-bold uppercase tracking-wider sm:inline-flex"
            >
              <ArrowLeft size={15} />
              Back to website
            </a>
          </div>
        </div>
      </header>

      {children}

      <div className="border-t py-6" style={{ borderColor: "var(--line)" }}>
        <div
          className={`mx-auto flex ${width} flex-col items-center justify-between gap-3 px-6 font-mono text-xs tracking-wider sm:flex-row sm:px-8`}
        >
          <p className="text-[var(--fg-muted)]">
            © {new Date().getFullYear()} Aurigin Media. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <TextLink href="/terms/">Terms & Conditions</TextLink>
            <TextLink href="/privacy/">Privacy Policy</TextLink>
          </div>
        </div>
      </div>
    </div>
  );
}
