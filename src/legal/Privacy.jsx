import LegalPage, { ContactDetails, EmailLink, List, Section } from "./LegalPage";

export default function Privacy() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="This policy explains what personal information we handle when you visit the Aurigin Media website or contact us, why we handle it, and the choices you have."
    >
      <Section title="1. Who we are">
        <p>
          This website is operated by Aurigin Media ("Aurigin Media", "we", "us" or "our"). We are
          responsible for the personal information described in this policy.
        </p>
      </Section>

      <Section title="2. Information we collect">
        <p>
          You can browse this website without creating an account or filling in a form. We handle
          the following information:
        </p>
        <List
          items={[
            "When you email or call us: your name, email address, phone number, and anything else you choose to tell us.",
            "When you visit the website: the company that hosts the website may keep standard technical records, such as your IP address, browser type, device type, the pages you open and the time of your visit.",
            "Your display setting: if you choose light or dark mode, that choice is saved in your own browser. It is not sent to us.",
          ]}
        />
      </Section>

      <Section title="3. Cookies and tracking">
        <p>
          We do not set cookies on this website, and we do not use analytics or advertising trackers
          on it.
        </p>
      </Section>

      <Section title="4. How we use your information">
        <p>We use personal information to:</p>
        <List
          items={[
            "reply to your enquiry and discuss possible work with you;",
            "provide our services and manage our relationship with you;",
            "keep the website running securely; and",
            "keep business records and meet our legal obligations.",
          ]}
        />
      </Section>

      <Section title="5. Who we share information with">
        <p>
          We do not sell your personal information. We share it only when needed, with:
        </p>
        <List
          items={[
            "companies that help us run our business, such as website hosting and email providers;",
            "professional advisers, such as lawyers and accountants; and",
            "government or law enforcement bodies, when the law requires it.",
          ]}
        />
      </Section>

      <Section title="6. How long we keep information">
        <p>
          We keep personal information only for as long as we need it for the purposes in this
          policy, including to meet legal and record-keeping requirements. After that, we delete it
          or make sure it can no longer identify you.
        </p>
      </Section>

      <Section title="7. How we protect information">
        <p>
          We take reasonable steps to protect personal information. However, no website or email
          service is completely secure, so we cannot guarantee absolute security.
        </p>
      </Section>

      <Section title="8. Your choices and rights">
        <p>
          Subject to applicable law, you can ask us to tell you what personal information we hold
          about you, correct it or delete it. You can also withdraw any consent you have given.
          To make a request or raise a complaint, email <EmailLink />.
        </p>
        <p>
          You may also have the right to complain to the data protection authority where you live.
        </p>
      </Section>

      <Section title="9. Children">
        <p>
          This website is intended for businesses and adults. It is not directed at anyone under 18,
          and we do not knowingly collect personal information from children. If you believe a child
          has given us personal information, please contact us so that we can delete it.
        </p>
      </Section>

      <Section title="10. Changes to this policy">
        <p>
          We may update this policy from time to time. The latest version will always be on this
          page, with the date it was last updated.
        </p>
      </Section>

      <Section title="11. Contact us">
        <p>If you have a question about this policy, please contact us:</p>
        <ContactDetails />
      </Section>
    </LegalPage>
  );
}
