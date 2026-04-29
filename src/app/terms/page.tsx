import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout } from "@/components/LegalLayout";
import { legalInfo } from "@/data/legal";

export const metadata: Metadata = {
  title: "Terms & Conditions | Turquaz",
  description: `The terms that govern your use of the ${legalInfo.tradingName} website.`,
};

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms & Conditions"
      intro={`Welcome to ${legalInfo.tradingName}. These terms apply when you visit this website, contact us through it, or use any of the features provided here. Please read them carefully — by using the site you agree to be bound by them.`}
    >
      <section>
        <h2>1. About us</h2>
        <p>
          This website is operated by <strong>{legalInfo.legalEntity}</strong>, a company registered in {legalInfo.jurisdiction}{" "}
          (Company No. {legalInfo.companyNumber}). Our registered office is {legalInfo.registeredOffice}. Where these terms refer to
          &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;, they mean {legalInfo.legalEntity}.
        </p>
      </section>

      <section>
        <h2>2. Using the site</h2>
        <p>
          You may use this website for personal, non-commercial purposes such as viewing our menu, finding our restaurants and
          submitting a reservation enquiry. You agree not to:
        </p>
        <ul>
          <li>Use the site in a way that could damage, disable or impair it;</li>
          <li>Attempt to gain unauthorised access to any part of the site or its underlying systems;</li>
          <li>Use automated means to scrape or copy content for commercial purposes;</li>
          <li>Submit false, misleading or unlawful information through any of our forms.</li>
        </ul>
        <p>We may suspend or restrict access to the site at any time without notice.</p>
      </section>

      <section>
        <h2>3. Bookings</h2>
        <p>
          A reservation request submitted through our website is an enquiry, not a confirmed booking. Your reservation is only
          confirmed when we acknowledge it by email or phone. We may decline a request, ask to relocate it, or contact you to
          adjust the time or party size depending on availability.
        </p>
        <p>
          Where you choose to reserve through a third-party partner such as The Fork or Dojo, that booking is governed by the
          partner&rsquo;s own terms in addition to these.
        </p>
      </section>

      <section>
        <h2>4. Online ordering</h2>
        <p>
          We do not currently take orders or payments directly through this website. Online food orders for delivery or
          collection are placed through third-party platforms such as Deliveroo and Just Eat. Those platforms are responsible
          for processing your order, payment, delivery and any refund or cancellation. Please review the relevant platform&rsquo;s
          terms and refund policy when you place an order with them.
        </p>
      </section>

      <section>
        <h2>5. Menu, prices and availability</h2>
        <p>
          We update our menu and prices from time to time. While we make every effort to keep the information shown on this
          site accurate, the menus served in our restaurants and on third-party ordering platforms are the authoritative
          source for current dishes, prices and availability. Specials and seasonal items may vary by location.
        </p>
      </section>

      <section>
        <h2>6. Allergens and dietary information</h2>
        <p>
          Our dishes are prepared in kitchens that handle a wide range of ingredients including nuts, gluten, dairy, eggs,
          fish, crustaceans and molluscs. We cannot guarantee that any dish is free from a specific allergen due to the risk
          of cross-contamination. If you have an allergy, intolerance or special dietary requirement, please tell our team
          before you order. See our <Link href="/allergens">Allergen Information</Link> page for more detail.
        </p>
      </section>

      <section>
        <h2>7. Intellectual property</h2>
        <p>
          All content on this website, including text, photos, logos, the &ldquo;Turquaz&rdquo; name and the design of the
          site, is owned by us or our licensors and is protected by copyright and trade-mark law. You may view and print
          pages for your own personal use, but you may not otherwise copy, reproduce or distribute any content without our
          prior written permission.
        </p>
      </section>

      <section>
        <h2>8. Links to third-party sites</h2>
        <p>
          The website contains links to third-party services such as Deliveroo, Just Eat, The Fork, Dojo and social media
          platforms. We are not responsible for the content, security or privacy practices of those external sites.
        </p>
      </section>

      <section>
        <h2>9. Liability</h2>
        <p>
          We provide the website on an &ldquo;as is&rdquo; basis and do not guarantee that it will always be available or
          error-free. To the fullest extent permitted by law, we exclude liability for any loss or damage arising from your
          use of the site, except for liability that cannot be excluded under English law (such as for death or personal
          injury caused by our negligence, or for fraud).
        </p>
      </section>

      <section>
        <h2>10. Changes to these terms</h2>
        <p>
          We may update these terms from time to time to reflect changes to the site, our services or applicable law. The
          &ldquo;last updated&rdquo; date at the top of the page shows when the terms were last revised. Continued use of the
          site after a change means you accept the updated terms.
        </p>
      </section>

      <section>
        <h2>11. Governing law</h2>
        <p>
          These terms are governed by the laws of {legalInfo.jurisdiction}. Any dispute relating to the website or these
          terms will be dealt with by the courts of {legalInfo.jurisdiction}.
        </p>
      </section>

      <section>
        <h2>12. Contact</h2>
        <p>
          If you have any questions about these terms, please contact us at{" "}
          <a href={`mailto:${legalInfo.contactEmail}`}>{legalInfo.contactEmail}</a> or call {legalInfo.contactPhone}.
        </p>
      </section>
    </LegalLayout>
  );
}
