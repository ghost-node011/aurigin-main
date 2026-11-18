export const EMAIL = "info@auriginmedia.com";
export const PHONE = "7701858312";

const EMAIL_SUBJECT = "Project enquiry for Aurigin Media";
const EMAIL_BODY = `Hello Aurigin Media team,

I would like to discuss a project with you.

Name:
Company:
What we need:

Kind regards,
`;

export const EMAIL_HREF = `mailto:${EMAIL}?subject=${encodeURIComponent(
  EMAIL_SUBJECT,
)}&body=${encodeURIComponent(EMAIL_BODY)}`;
export const PHONE_HREF = `tel:${PHONE}`;

// Office location (Google Maps place from the company listing).
const MAPS_PLACE_ID = "0x390ce215ddd91f4d:0xf4c565534faab0e7";
const MAPS_CID = "17637614924159693031"; // decimal form of the place id's second half

export const OFFICE = {
  name: "Delhi Co.",
  area: "Green Park, New Delhi",
  mapEmbedUrl: `https://maps.google.com/maps?q=${encodeURIComponent(
    "Delhi Co. Green Park New Delhi",
  )}&ftid=${MAPS_PLACE_ID}&z=16&output=embed`,
  mapLinkUrl: `https://www.google.com/maps?cid=${MAPS_CID}`,
};

/**
 * Builds a mailto: link containing every field of the contact form.
 * The site has no backend, so the enquiry is handed to the visitor's email app.
 * To send it to a form service instead, replace this with a fetch() call.
 */
export function buildEnquiryMailto({ name, email, phone, company, services, message }) {
  const lines = [
    "Hello Aurigin Media team,",
    "",
    "I would like to discuss a project with you.",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "—"}`,
    `Company: ${company || "—"}`,
    `Services: ${services.join(", ")}`,
    "",
    "Project details:",
    message,
    "",
    "Kind regards,",
    name,
  ];

  const subject = `Project enquiry from ${name}${company ? ` (${company})` : ""}`;
  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    lines.join("\n"),
  )}`;
}
