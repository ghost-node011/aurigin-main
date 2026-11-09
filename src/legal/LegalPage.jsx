import { ArrowLeft } from "lucide-react";
import AnimatedLogo from "../components/AnimatedLogo";
import ThemeToggle from "../components/ThemeToggle";
import { EMAIL, PHONE, PHONE_HREF } from "../lib/contact";

const LAST_UPDATED = "9 November 2026";
const LINK_CLASS =
  "underline underline-offset-2 decoration-[var(--color-blue)] hover:decoration-[var(--color-yellow)]";

export function Section({ title, children }) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-lg font-extrabold sm:text-xl">{title}</h2>
      <div className="mt-3 flex flex-col gap-3 leading-relaxed text-[var(--fg-muted)]">
        {children}
      </div>
    </section>
  );
}

export function List({ items }) {
  return (
    <ul className="flex list-disc flex-col gap-2 pl-5">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

export function TextLink({ href, children }) {
  return (
    <a href={href} className={LINK_CLASS}>
      {children}
    </a>
  );
}

export function EmailLink() {
  return <TextLink href={`mailto:${EMAIL}`}>{EMAIL}</TextLink>;
}

export function ContactDetails() {
  return (
    <List
      items={[
        <>
          Email: <EmailLink />
        </>,
        <>
          Phone: <TextLink href={PHONE_HREF}>{PHONE}</TextLink>
        </>,
      ]}
    />
  );
}

export default function LegalPage({ title, intro, children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b py-3" style={{ borderColor: "var(--line)" }}>
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-6 sm:px-8">
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

      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-14 sm:px-8 sm:py-20">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--fg-muted)]">
          Last updated: {LAST_UPDATED}
        </p>
        <h1 className="mt-3 font-display text-4xl font-black uppercase leading-none sm:text-6xl">
          {title}
        </h1>
        <p className="mt-6 text-lg leading-relaxed">{intro}</p>
        {children}
      </main>

      <div className="border-t py-6" style={{ borderColor: "var(--line)" }}>
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-3 px-6 font-mono text-xs tracking-wider sm:flex-row sm:px-8">
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
