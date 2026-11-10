import PageShell from "../components/PageShell";
import TextLink from "../components/TextLink";
import { EMAIL, PHONE, PHONE_HREF } from "../lib/contact";

const LAST_UPDATED = "9 November 2026";

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
    <PageShell>
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
    </PageShell>
  );
}
