import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { EMAIL, EMAIL_HREF, OFFICE, PHONE, PHONE_HREF } from "../lib/contact";

const DETAILS = [
  { icon: Mail, label: "Email", value: EMAIL, href: EMAIL_HREF },
  { icon: Phone, label: "Phone", value: PHONE, href: PHONE_HREF },
  {
    icon: MapPin,
    label: "Office",
    value: `${OFFICE.floor}, ${OFFICE.name}`,
    detail: OFFICE.area,
    href: OFFICE.mapLinkUrl,
    external: true,
  },
];

export default function ContactDetails() {
  return (
    <div className="flex flex-col gap-6 lg:sticky lg:top-8">
      <ul className="flex flex-col gap-3">
        {DETAILS.map(({ icon: Icon, label, value, detail, href, external }) => (
          <li key={label}>
            <a
              href={href}
              {...(external && { target: "_blank", rel: "noopener noreferrer" })}
              className="group flex items-center gap-4 rounded-2xl border p-4 transition-colors hover:border-[var(--color-blue)]"
              style={{ borderColor: "var(--line)", background: "var(--card)" }}
            >
              <span
                className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl"
                style={{ background: "color-mix(in srgb, var(--color-blue) 12%, transparent)" }}
              >
                <Icon size={19} className="text-[var(--color-blue)]" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--fg-muted)]">
                  {label}
                </span>
                <span className="block truncate font-display text-sm font-bold sm:text-base">
                  {value}
                </span>
                {detail && (
                  <span className="block truncate text-xs text-[var(--fg-muted)] sm:text-sm">
                    {detail}
                  </span>
                )}
              </span>
              <ArrowUpRight
                size={16}
                aria-hidden="true"
                className="text-[var(--fg-muted)] transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--color-blue)]"
              />
            </a>
          </li>
        ))}
      </ul>

      {/* Office map */}
      <div
        className="overflow-hidden rounded-2xl border shadow-sm"
        style={{ borderColor: "var(--line)", background: "var(--card)" }}
      >
        <iframe
          title={`Map showing ${OFFICE.floor}, ${OFFICE.name}, ${OFFICE.area}`}
          src={OFFICE.mapEmbedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="block aspect-[4/3] w-full border-0"
        />
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--fg-muted)]">
            {OFFICE.area}
          </span>
          <a
            href={OFFICE.mapLinkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-display text-xs font-bold uppercase tracking-wider text-[var(--color-blue)] hover:underline"
          >
            Open in Google Maps
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}
