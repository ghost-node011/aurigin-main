export const EMAIL = "info@auriginmedia.com";
export const PHONE = "7701858312";

const EMAIL_SUBJECT = "Project enquiry for Aurigin Media";
const EMAIL_BODY = `Hello Aurigin Media team,

I would like to discuss a project with you.

Name:
Company:
What we need:
Timeline:

Kind regards,
`;

export const EMAIL_HREF = `mailto:${EMAIL}?subject=${encodeURIComponent(
  EMAIL_SUBJECT,
)}&body=${encodeURIComponent(EMAIL_BODY)}`;
export const PHONE_HREF = `tel:${PHONE}`;
