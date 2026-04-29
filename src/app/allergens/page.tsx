import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";
import { legalInfo } from "@/data/legal";

export const metadata: Metadata = {
  title: "Allergen Information | Turquaz",
  description: `Allergen, dietary and food safety information for ${legalInfo.tradingName} restaurants.`,
};

const allergens = [
  "Cereals containing gluten (wheat, rye, barley, oats and their hybrids)",
  "Crustaceans (e.g. prawns, crab, lobster)",
  "Eggs",
  "Fish",
  "Peanuts",
  "Soybeans",
  "Milk (including lactose)",
  "Nuts (almond, hazelnut, walnut, cashew, pecan, brazil, pistachio, macadamia, queensland)",
  "Celery",
  "Mustard",
  "Sesame seeds",
  "Sulphur dioxide and sulphites (above 10 mg/kg or 10 mg/L)",
  "Lupin",
  "Molluscs (e.g. mussels, squid, octopus)",
];

export default function AllergensPage() {
  return (
    <LegalLayout
      title="Allergen & Dietary Information"
      intro={`The safety of our guests is our priority. Many of the dishes we serve at ${legalInfo.tradingName} contain or come into contact with the 14 allergens declared under UK food law. Please read this page before you order and tell our team about any allergy, intolerance or special dietary need.`}
    >
      <section>
        <h2>1. The 14 declared allergens</h2>
        <p>UK food businesses must provide allergen information for the following 14 ingredients:</p>
        <ul>
          {allergens.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>2. Cross-contamination</h2>
        <p>
          Our kitchens prepare a wide variety of dishes side by side and our team handles all 14 allergens listed above.
          Despite the care we take, we cannot guarantee that any dish is completely free from a specific allergen. Sauces,
          oils and grills are shared, and trace amounts of allergens may be present even when an allergen is not listed as an
          ingredient.
        </p>
      </section>

      <section>
        <h2>3. Telling us about your allergy</h2>
        <p>If you have a food allergy, intolerance or coeliac disease, please:</p>
        <ul>
          <li>Speak to a member of our team <strong>before you order</strong>, ideally when you arrive;</li>
          <li>Mention the allergy again when you place your order so the kitchen is aware;</li>
          <li>If you are ordering for someone else, please pass the allergen information on to them.</li>
        </ul>
        <p>
          Our team can show you the up-to-date allergen matrix for the dishes available at your location and help you choose
          options that work for you.
        </p>
      </section>

      <section>
        <h2>4. Vegetarian, vegan and gluten-free choices</h2>
        <p>
          Our menu includes vegetarian (V), vegan (VG) and gluten-free (GF) options. Items marked &ldquo;GF*&rdquo; can be
          adapted to be gluten-free on request &mdash; please ask when you order. The same cross-contamination notice above
          applies: our kitchens are not certified gluten-free environments.
        </p>
      </section>

      <section>
        <h2>5. Online and takeaway orders</h2>
        <p>
          When you order through Deliveroo, Just Eat or another partner, allergen information is shown on those platforms.
          For additional allergen detail before you confirm an order, call your local restaurant on the number listed on our{" "}
          <a href="/locations">Locations</a> page and our team will be happy to help.
        </p>
      </section>

      <section>
        <h2>6. Reporting an issue</h2>
        <p>
          If you believe an allergen statement we provided was incorrect, or if you have suffered an allergic reaction after
          eating with us, please contact us as soon as possible at{" "}
          <a href={`mailto:${legalInfo.contactEmail}`}>{legalInfo.contactEmail}</a> or call {legalInfo.contactPhone}. We take
          every report seriously and investigate it.
        </p>
      </section>

      <section>
        <h2>7. Useful resources</h2>
        <ul>
          <li>
            <a href="https://www.food.gov.uk/safety-hygiene/food-allergies" target="_blank" rel="noopener noreferrer">
              Food Standards Agency &mdash; food allergies
            </a>
          </li>
          <li>
            <a href="https://www.allergyuk.org" target="_blank" rel="noopener noreferrer">
              Allergy UK
            </a>
          </li>
          <li>
            <a href="https://www.coeliac.org.uk" target="_blank" rel="noopener noreferrer">
              Coeliac UK
            </a>
          </li>
        </ul>
      </section>
    </LegalLayout>
  );
}
