import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout } from "@/components/LegalLayout";
import { legalInfo } from "@/data/legal";

export const metadata: Metadata = {
  title: "Cookie Policy | Turquaz",
  description: `How ${legalInfo.tradingName} uses cookies and similar technologies on this website.`,
};

export default function CookiePolicyPage() {
  return (
    <LegalLayout
      title="Cookie Policy"
      intro="This page explains what cookies and similar storage technologies we use on this website, what they do, and how you can control them. It works alongside our Privacy Policy."
    >
      <section>
        <h2>1. What is a cookie?</h2>
        <p>
          A cookie is a small text file that a website places on your device so it can remember information about your visit.
          Some cookies are set by the site you are visiting (first-party) and some by other services that the site uses
          (third-party). Similar technologies, such as the browser&rsquo;s local storage, work in much the same way.
        </p>
      </section>

      <section>
        <h2>2. Categories we use</h2>
        <p>
          We try to keep our use of cookies and storage to a minimum. We currently use only the categories below. We do not
          set advertising or cross-site tracking cookies.
        </p>
        <h3>Strictly necessary</h3>
        <p>
          These are needed for the website to work. They cannot be switched off. The only first-party storage we use in this
          category records your cookie consent choice itself, so we do not have to ask again on every page.
        </p>
        <ul>
          <li>
            <code>turquaz-cookie-consent</code> &mdash; stored in your browser&rsquo;s local storage. Records whether you
            accepted or rejected non-essential cookies. Persists until you clear your browser storage.
          </li>
        </ul>
        <h3>Functional</h3>
        <p>
          We may set functional cookies if you choose to use features such as embedded reservation tools or maps. These help
          remember your preferences within those features.
        </p>
        <h3>Analytics &amp; performance</h3>
        <p>
          We do not currently run third-party analytics or performance cookies. If we add them in future we will update this
          page and ask for your consent before they are set.
        </p>
      </section>

      <section>
        <h2>3. Third-party cookies</h2>
        <p>
          Some pages embed content or links from third parties (for example Instagram, YouTube, Google Maps, The Fork or
          Dojo). When you interact with that content, those third parties may set their own cookies on your device. We do not
          control these cookies and they are governed by the third party&rsquo;s privacy and cookie policies.
        </p>
      </section>

      <section>
        <h2>4. Managing your preferences</h2>
        <p>You can change or withdraw your consent at any time by:</p>
        <ul>
          <li>
            Clearing the <code>turquaz-cookie-consent</code> entry from your browser&rsquo;s local storage and reloading the
            page &mdash; the consent banner will appear again;
          </li>
          <li>
            Adjusting your browser settings to block or delete cookies. Help pages for the most common browsers are linked
            from <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer">allaboutcookies.org</a>.
          </li>
        </ul>
        <p>
          Note that blocking strictly necessary storage may stop parts of the site from working as intended.
        </p>
      </section>

      <section>
        <h2>5. More information</h2>
        <p>
          For more on how we handle personal data, please see our <Link href="/privacy">Privacy Policy</Link>. If you have
          questions about this Cookie Policy, contact us at{" "}
          <a href={`mailto:${legalInfo.contactEmail}`}>{legalInfo.contactEmail}</a>.
        </p>
      </section>
    </LegalLayout>
  );
}
