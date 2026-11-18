import emailjs from "@emailjs/browser";

// Kept in its own module so the EmailJS library is only bundled into the contact page.
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

/**
 * Sends a contact-form enquiry to the Aurigin inbox via EmailJS.
 * The keys here must match the {{variables}} used in the EmailJS template.
 * Resolves on success; rejects if EmailJS is not configured or the request fails.
 */
export function sendEnquiry({ name, email, phone, company, services, message }) {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    return Promise.reject(
      new Error("EmailJS is not configured — check the VITE_EMAILJS_* values in .env"),
    );
  }

  return emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      // Used in the template body
      name,
      email,
      phone: phone || "—",
      company: company || "—",
      services: services.join(", "),
      message,
      // Also available to the template (e.g. Subject: {{title}}, body: Received {{time}})
      title: `Project enquiry from ${name}${company ? ` (${company})` : ""}`,
      time: formatIndianTime(new Date()),
    },
    { publicKey: PUBLIC_KEY },
  );
}

// e.g. "18 Nov 2026, 3:45 pm IST"
function formatIndianTime(date) {
  const formatted = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
  return `${formatted} IST`;
}
