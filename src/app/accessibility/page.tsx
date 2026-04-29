import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";
import { legalInfo } from "@/data/legal";

export const metadata: Metadata = {
  title: "Accessibility Statement | Turquaz",
  description: `${legalInfo.tradingName}'s commitment to making this website accessible to everyone.`,
};

export default function AccessibilityPage() {
  return (
    <LegalLayout
      title="Accessibility Statement"
      intro={`${legalInfo.tradingName} wants this website to be usable by as many people as possible, regardless of ability or technology. This statement explains the standards we aim for, the steps we have taken, and how to get in touch if you have a problem.`}
    >
      <section>
        <h2>1. Our commitment</h2>
        <p>
          We aim to meet the <strong>Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</strong>. We design and build the
          site so that it can be operated with a keyboard, read with a screen reader, and re-sized in your browser without
          breaking the layout.
        </p>
      </section>

      <section>
        <h2>2. What we have done</h2>
        <ul>
          <li>All interactive elements (links, buttons, form controls) can be reached and used with a keyboard.</li>
          <li>Images that convey meaning have descriptive <code>alt</code> text; decorative images are marked as such.</li>
          <li>Colour contrast meets WCAG AA against our dark green background; we avoid relying on colour alone to convey meaning.</li>
          <li>The site uses a responsive layout that supports zooming up to 200% and re-flowing on small screens.</li>
          <li>We honour the <code>prefers-reduced-motion</code> setting to limit non-essential animation.</li>
          <li>PDF menus are provided in addition to a fully readable on-page menu, so screen-reader users have an HTML alternative.</li>
        </ul>
      </section>

      <section>
        <h2>3. Known issues</h2>
        <p>
          We are aware of the following items that do not yet meet WCAG 2.1 AA. We will fix them in future updates:
        </p>
        <ul>
          <li>Some embedded third-party content (e.g. Instagram posts, map embeds) may not be fully keyboard or screen-reader accessible.</li>
          <li>Older PDF menus may not be fully tagged for screen-reader navigation. Please ask us by email if you would like the menu in another format.</li>
        </ul>
      </section>

      <section>
        <h2>4. Help and feedback</h2>
        <p>
          If you cannot use part of this website, or you would like the information on it in a different format (large print,
          plain text, audio etc.), please contact us:
        </p>
        <ul>
          <li>Email: <a href={`mailto:${legalInfo.contactEmail}`}>{legalInfo.contactEmail}</a></li>
          <li>Phone: {legalInfo.contactPhone}</li>
        </ul>
        <p>We aim to respond within five working days.</p>
      </section>

      <section>
        <h2>5. Enforcement</h2>
        <p>
          The Equality and Human Rights Commission (EHRC) is responsible for enforcing the Equality Act 2010 in respect of
          accessible websites. If you are not happy with how we respond to your complaint, you can contact the EHRC through
          the{" "}
          <a href="https://www.equalityadvisoryservice.com" target="_blank" rel="noopener noreferrer">
            Equality Advisory and Support Service
          </a>
          .
        </p>
      </section>

      <section>
        <h2>6. Visiting our restaurants</h2>
        <p>
          Each of our restaurants has its own layout. If you would like step-free access details, table heights, or other
          accessibility information for a specific location, please call us in advance and our team will be happy to help.
        </p>
      </section>
    </LegalLayout>
  );
}
