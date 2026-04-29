import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout } from "@/components/LegalLayout";
import { legalInfo } from "@/data/legal";

export const metadata: Metadata = {
  title: "Privacy Policy | Turquaz",
  description: `How ${legalInfo.tradingName} collects, uses, and protects your personal data under UK GDPR.`,
};

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      intro={`${legalInfo.tradingName} is committed to protecting your personal data. This policy explains what information we collect when you use this website, contact us, or book a table, how we use it, and the rights you have under UK data protection law.`}
    >
      <section>
        <h2>1. Who we are</h2>
        <p>
          The data controller for this website is <strong>{legalInfo.legalEntity}</strong>, registered in {legalInfo.jurisdiction}{" "}
          (Company No. {legalInfo.companyNumber}), with registered office at {legalInfo.registeredOffice}. Our ICO data
          protection registration number is {legalInfo.icoRegistration}.
        </p>
        <p>
          For any questions about this policy or how we handle your data, contact us at{" "}
          <a href={`mailto:${legalInfo.contactEmail}`}>{legalInfo.contactEmail}</a> or {legalInfo.contactPhone}.
        </p>
      </section>

      <section>
        <h2>2. What information we collect</h2>
        <p>We only collect the information we need to operate the website and respond to you. This may include:</p>
        <ul>
          <li>
            <strong>Booking details</strong>: name, email, phone number, party size, date and time, dietary notes, and any
            message you include when you submit a reservation request through our form.
          </li>
          <li>
            <strong>Contact details</strong>: information you provide if you email us or call one of our restaurants.
          </li>
          <li>
            <strong>Technical data</strong>: limited information your browser sends automatically (such as IP address,
            browser type, pages visited and approximate location), and consent preferences stored locally in your browser.
          </li>
        </ul>
        <p>
          We do not currently process online payments on this website. Orders placed through Deliveroo, Just Eat, The Fork
          or other third-party platforms are governed by those platforms&rsquo; own privacy policies.
        </p>
      </section>

      <section>
        <h2>3. How and why we use your data</h2>
        <p>We use your personal data only for the purposes set out below, with the legal basis noted in brackets.</p>
        <ul>
          <li>To process and confirm your booking enquiry (legitimate interests, performance of a contract).</li>
          <li>To respond to your questions or feedback (legitimate interests).</li>
          <li>To keep the website secure, prevent fraud and diagnose problems (legitimate interests).</li>
          <li>To meet our legal and regulatory obligations (legal obligation).</li>
        </ul>
        <p>We do not use your personal data for automated decision-making or profiling.</p>
      </section>

      <section>
        <h2>4. Sharing your information</h2>
        <p>We share your information only where it is needed to provide the service, including with:</p>
        <ul>
          <li>Our hosting and email service providers (e.g. Vercel, Resend) acting under our instructions.</li>
          <li>Reservation partners (e.g. The Fork, Dojo) when you choose to book through them.</li>
          <li>Law enforcement or regulators where we are required to do so by law.</li>
        </ul>
        <p>We do not sell your personal data and we do not share it with advertisers.</p>
      </section>

      <section>
        <h2>5. International transfers</h2>
        <p>
          Some of our service providers may process your data outside the UK. Where this happens we rely on lawful safeguards,
          such as the UK&rsquo;s adequacy decisions or Standard Contractual Clauses, to keep your data protected.
        </p>
      </section>

      <section>
        <h2>6. How long we keep your data</h2>
        <p>
          We keep booking enquiry data for up to 12 months and email correspondence for up to 24 months, unless we need to
          retain it longer to comply with a legal obligation or to deal with a dispute.
        </p>
      </section>

      <section>
        <h2>7. Your rights</h2>
        <p>Under the UK GDPR you have the right to:</p>
        <ul>
          <li>Access the personal data we hold about you;</li>
          <li>Ask us to correct inaccurate data;</li>
          <li>Ask us to delete your data (where there is no legal reason to keep it);</li>
          <li>Restrict or object to certain processing;</li>
          <li>Receive a copy of your data in a portable format;</li>
          <li>Withdraw consent where we rely on it.</li>
        </ul>
        <p>
          To exercise any of these rights, email{" "}
          <a href={`mailto:${legalInfo.contactEmail}`}>{legalInfo.contactEmail}</a>. We will respond within one month.
        </p>
        <p>
          If you are unhappy with how we handle your data you can complain to the Information Commissioner&rsquo;s Office at{" "}
          <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">ico.org.uk</a> or 0303 123 1113.
        </p>
      </section>

      <section>
        <h2>8. Cookies</h2>
        <p>
          For details of the cookies we use and how to control them, please see our{" "}
          <Link href="/cookies">Cookie Policy</Link>.
        </p>
      </section>

      <section>
        <h2>9. Changes to this policy</h2>
        <p>
          We may update this policy from time to time. The &ldquo;last updated&rdquo; date at the top of the page reflects the most
          recent change.
        </p>
      </section>
    </LegalLayout>
  );
}
