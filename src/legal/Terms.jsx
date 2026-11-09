import LegalPage, { ContactDetails, List, Section, TextLink } from "./LegalPage";

export default function Terms() {
  return (
    <LegalPage
      title="Terms & Conditions"
      intro="These terms explain the rules for using the Aurigin Media website. By using this website, you agree to them. If you do not agree, please do not use the website."
    >
      <Section title="1. About us">
        <p>
          This website is operated by Aurigin Media ("Aurigin Media", "we", "us" or "our"). You can
          find our contact details at the end of this page.
        </p>
      </Section>

      <Section title="2. What this website is for">
        <p>
          This website gives general information about Aurigin Media, our services and our work.
          Nothing on it is an offer to provide services. Any work we do for you will be covered by a
          separate written proposal or agreement, and that document will apply to the work.
        </p>
      </Section>

      <Section title="3. Using this website">
        <p>You agree to use this website lawfully. You must not:</p>
        <List
          items={[
            "try to gain unauthorised access to the website or the systems behind it;",
            "disrupt the website or introduce viruses or other harmful code;",
            "copy or collect content from the website in bulk, including through automated tools; or",
            "pretend to be Aurigin Media or suggest that we endorse you without our written permission.",
          ]}
        />
      </Section>

      <Section title="4. Our content">
        <p>
          The text, images, logos, designs and other content on this website belong to Aurigin Media
          or the people who license them to us. You may view the website and share links to it. You
          may not copy, change, sell or reuse its content without our written permission.
        </p>
        <p>
          Client names, logos and other third-party brands shown on this website belong to their
          respective owners.
        </p>
      </Section>

      <Section title="5. Information on this website">
        <p>
          We try to keep this website accurate and up to date, but its content is for general
          information only and may change without notice. We do not promise that it is complete or
          free of errors. Results and case studies describe past work and do not guarantee similar
          results for you.
        </p>
      </Section>

      <Section title="6. Links to other websites">
        <p>
          This website may link to websites run by other people. We do not control those websites
          and are not responsible for their content or how they handle your information.
        </p>
      </Section>

      <Section title="7. Availability">
        <p>
          We may update, suspend or remove any part of this website at any time. We do not promise
          that it will always be available or free of technical problems.
        </p>
      </Section>

      <Section title="8. Limit of our responsibility">
        <p>
          This website is provided "as is". To the fullest extent the law allows, Aurigin Media is
          not responsible for any indirect or consequential loss, or any loss of data, profit or
          business, that results from using or being unable to use this website. Nothing in these
          terms limits any responsibility that cannot legally be limited.
        </p>
      </Section>

      <Section title="9. Your privacy">
        <p>
          Our <TextLink href="/privacy/">Privacy Policy</TextLink> explains how we handle personal
          information.
        </p>
      </Section>

      <Section title="10. Changes to these terms">
        <p>
          We may change these terms from time to time. The latest version will always be on this
          page, with the date it was last updated. By continuing to use the website after a change,
          you accept the updated terms.
        </p>
      </Section>

      <Section title="11. Governing law">
        <p>
          These terms are governed by the laws of India. Any dispute about them or this website will
          be handled by the courts of India.
        </p>
      </Section>

      <Section title="12. Contact us">
        <p>If you have a question about these terms, please contact us:</p>
        <ContactDetails />
      </Section>
    </LegalPage>
  );
}
