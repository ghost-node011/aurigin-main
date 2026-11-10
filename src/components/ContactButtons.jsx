import { Mail, Phone } from "lucide-react";
import { EMAIL, EMAIL_HREF, PHONE, PHONE_HREF } from "../lib/contact";

const BUTTON_CLASS =
  "w-full max-w-xs sm:w-72 font-display font-bold text-sm tracking-wide rounded-full px-6 py-4 flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5";

// Styled by the "#contact a[href^=...]" rules in index.css, so render inside #contact.
export default function ContactButtons() {
  return (
    <>
      <a href={EMAIL_HREF} data-cursor="link" className={BUTTON_CLASS}>
        <Mail size={18} />
        {EMAIL}
      </a>
      <a href={PHONE_HREF} data-cursor="link" className={BUTTON_CLASS}>
        <Phone size={18} />
        {PHONE}
      </a>
    </>
  );
}
