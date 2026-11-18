import PageShell from "../components/PageShell";
import ContactForm from "./ContactForm";
import ContactDetails from "./ContactDetails";

export default function ContactPage() {
  return (
    <PageShell width="max-w-6xl">
      <main className="flex-1">
        {/* Page header */}
        <section className="relative overflow-hidden px-6 pt-14 pb-12 sm:px-8 sm:pt-20 sm:pb-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-[18vmin] -top-[22vmin] h-[55vmin] w-[55vmin] rounded-full opacity-30 dark:opacity-15"
            style={{
              border: "3.5vmin solid var(--color-yellow)",
              borderLeftColor: "transparent",
              borderBottomColor: "transparent",
            }}
          />
          <div className="relative mx-auto max-w-6xl">
            <div className="mb-4 inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[var(--color-blue)]" />
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-[var(--fg-muted)]">
                Contact us
              </span>
            </div>
            <h1 className="font-display text-[clamp(2.4rem,7vw,5.2rem)] font-black uppercase leading-[0.92] tracking-tight">
              Let's build
              <br />
              <span className="text-[var(--color-blue)]">something louder.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--fg-muted)] sm:text-lg">
              Tell us about your brand and what you need. We reply to every enquiry within one
              working day.
            </p>
          </div>
        </section>

        {/* Form + details */}
        <section className="px-6 pb-20 sm:px-8 sm:pb-28">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
            <aside className="lg:col-span-5">
              <ContactDetails />
            </aside>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
