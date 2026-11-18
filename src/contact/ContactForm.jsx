import { useId, useState } from "react";
import { AlertCircle, ArrowRight, Check, CheckCircle2, Loader2 } from "lucide-react";
import { SERVICES } from "../lib/services";
import { EMAIL, buildEnquiryMailto } from "../lib/contact";
import { sendEnquiry } from "../lib/sendEnquiry";

const SERVICE_OPTIONS = [...SERVICES.map((service) => service.title), "Something else"];

const INPUT_CLASS =
  "w-full rounded-xl border bg-[var(--bg)] px-4 py-3 text-sm text-[var(--fg)] placeholder:text-[var(--fg-muted)]/60 transition-colors focus:border-[var(--color-blue)] focus:outline-none focus:ring-2 focus:ring-[var(--color-blue)]/20 sm:text-base";

const LABEL_CLASS =
  "mb-2 block font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--fg-muted)]";

function Field({ label, required, children, htmlFor }) {
  return (
    <div>
      <label htmlFor={htmlFor} className={LABEL_CLASS}>
        {label}
        {required && <span className="ml-1 text-[var(--color-blue)]">*</span>}
      </label>
      {children}
    </div>
  );
}

function ServiceCheckbox({ value }) {
  return (
    <label className="group relative cursor-pointer">
      <input type="checkbox" name="services" value={value} className="peer sr-only" />
      <span
        className="flex h-full items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition-colors peer-checked:border-[var(--color-blue)] peer-checked:bg-[var(--color-blue)] peer-checked:text-white peer-checked:[&_.check-icon]:opacity-100 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--color-blue)] group-hover:border-[var(--color-blue)]"
        style={{ borderColor: "var(--line)" }}
      >
        <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border border-current/40">
          <Check size={13} strokeWidth={3} className="check-icon opacity-0" />
        </span>
        {value}
      </span>
    </label>
  );
}

export default function ContactForm() {
  const id = useId();
  const [servicesError, setServicesError] = useState(false);
  // "idle" → "sending" → "sent" | "error"
  const [status, setStatus] = useState("idle");
  // Last enquiry, kept so the error fallback can open it in the visitor's email app.
  const [enquiry, setEnquiry] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const services = data.getAll("services");

    if (services.length === 0) {
      setServicesError(true);
      form.querySelector('input[name="services"]')?.focus();
      return;
    }

    const details = { ...Object.fromEntries(data.entries()), services };
    setEnquiry(details);
    setStatus("sending");

    try {
      await sendEnquiry(details);
      form.reset();
      setStatus("sent");
    } catch (error) {
      console.error("Contact form: EmailJS send failed", error);
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div
        className="rounded-3xl border p-8 text-center sm:p-12"
        style={{ borderColor: "var(--line)", background: "var(--card)" }}
        role="status"
      >
        <CheckCircle2 size={48} className="mx-auto text-[var(--color-blue)]" />
        <h2 className="mt-5 font-display text-2xl font-black uppercase sm:text-3xl">
          Thank you{enquiry?.name ? `, ${enquiry.name.split(" ")[0]}` : ""}!
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[var(--fg-muted)]">
          Your enquiry has been sent to our team. We'll get back to you within one working day
          {enquiry?.email ? (
            <>
              {" "}
              at <span className="font-semibold text-[var(--fg)]">{enquiry.email}</span>
            </>
          ) : null}
          .
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 font-display text-xs font-bold uppercase tracking-wider text-[var(--fg-muted)] underline-offset-4 hover:text-[var(--color-blue)] hover:underline"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form
      onSubmit={handleSubmit}
      aria-busy={sending}
      className="contact-form rounded-3xl border p-6 shadow-sm sm:p-10"
      style={{ borderColor: "var(--line)", background: "var(--card)" }}
    >
      <h2 className="font-display text-2xl font-black uppercase tracking-tight sm:text-3xl">
        Start a project
      </h2>
      <p className="mt-2 text-sm text-[var(--fg-muted)]">
        Fields marked <span className="text-[var(--color-blue)]">*</span> are required.
      </p>

      {/* About you */}
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Full name" required htmlFor={`${id}-name`}>
          <input
            id={`${id}-name`}
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            className={INPUT_CLASS}
            style={{ borderColor: "var(--line)" }}
          />
        </Field>
        <Field label="Email" required htmlFor={`${id}-email`}>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            className={INPUT_CLASS}
            style={{ borderColor: "var(--line)" }}
          />
        </Field>
        <Field label="Phone" htmlFor={`${id}-phone`}>
          <input
            id={`${id}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+91 98765 43210"
            className={INPUT_CLASS}
            style={{ borderColor: "var(--line)" }}
          />
        </Field>
        <Field label="Company / brand" htmlFor={`${id}-company`}>
          <input
            id={`${id}-company`}
            name="company"
            type="text"
            autoComplete="organization"
            placeholder="Company name"
            className={INPUT_CLASS}
            style={{ borderColor: "var(--line)" }}
          />
        </Field>
      </div>

      {/* Services */}
      <fieldset
        className="mt-8"
        aria-describedby={servicesError ? `${id}-services-error` : undefined}
      >
        <legend className={LABEL_CLASS}>
          Services you're interested in
          <span className="ml-1 text-[var(--color-blue)]">*</span>
        </legend>
        <div
          className="grid grid-cols-1 gap-3 sm:grid-cols-2"
          onChange={() => setServicesError(false)}
        >
          {SERVICE_OPTIONS.map((service) => (
            <ServiceCheckbox key={service} value={service} />
          ))}
        </div>
        {servicesError && (
          <p id={`${id}-services-error`} role="alert" className="mt-3 text-sm text-red-600">
            Please choose at least one service.
          </p>
        )}
      </fieldset>

      {/* Message */}
      <div className="mt-8">
        <Field label="Project details" required htmlFor={`${id}-message`}>
          <textarea
            id={`${id}-message`}
            name="message"
            required
            rows={6}
            placeholder="Tell us about your brand, your goals and what success looks like."
            className={`${INPUT_CLASS} resize-y`}
            style={{ borderColor: "var(--line)" }}
          />
        </Field>
      </div>

      {/* Send failed: keep the form filled in and offer the email-app fallback */}
      {status === "error" && (
        <div
          role="alert"
          className="mt-8 flex items-start gap-3 rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-sm"
        >
          <AlertCircle size={18} className="mt-0.5 flex-shrink-0 text-red-500" />
          <p>
            Sorry, we couldn't send your enquiry just now. Please try again, or{" "}
            <a
              href={enquiry ? buildEnquiryMailto(enquiry) : `mailto:${EMAIL}`}
              className="font-semibold text-[var(--color-blue)] underline underline-offset-2"
            >
              send it from your email app
            </a>{" "}
            to {EMAIL}.
          </p>
        </div>
      )}

      <div className="mt-8 flex flex-col-reverse items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xs text-xs text-[var(--fg-muted)]">
          We'll only use your details to reply to this enquiry.
        </p>
        <button
          type="submit"
          disabled={sending}
          className="group inline-flex items-center gap-2 rounded-full bg-[var(--fg)] px-8 py-4 font-display text-sm font-bold uppercase tracking-wide text-[var(--bg)] shadow-sm transition-all duration-200 hover:bg-[var(--color-yellow)] hover:text-[#0b0b0c] disabled:cursor-wait disabled:opacity-70 disabled:hover:bg-[var(--fg)] disabled:hover:text-[var(--bg)]"
        >
          {sending ? (
            <>
              Sending…
              <Loader2 size={16} className="animate-spin" aria-hidden="true" />
            </>
          ) : (
            <>
              Send enquiry
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
