import Link from "next/link";
import Image from "next/image";
import { legalInfo } from "@/data/legal";
import { logoUrl } from "@/data/site";

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/cookies", label: "Cookie Policy" },
  { href: "/allergens", label: "Allergens" },
  { href: "/accessibility", label: "Accessibility" },
];

const siteLinks = [
  { href: "/", label: "Home" },
  { href: "/locations", label: "Locations" },
  { href: "/menu", label: "Menu" },
  { href: "/reservation", label: "Reserve a Table" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-[#d4a017]/20 bg-[#050d05] text-[#faf8f5]/80 mt-16">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" aria-label="Turquaz home" className="inline-block mb-4">
            <Image src={logoUrl} alt="Turquaz" width={140} height={47} className="h-10 w-auto object-contain opacity-90" />
          </Link>
          <p className="text-[12px] leading-relaxed text-[#faf8f5]/65 max-w-xs">
            Authentic Turkish and Mediterranean cuisine, freshly prepared at our locations across the UK.
          </p>
        </div>

        <div>
          <h3 className="text-[#d4a017] text-[11px] tracking-[0.2em] uppercase font-semibold mb-4">Explore</h3>
          <ul className="space-y-2 text-[12px]">
            {siteLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-[#d4a017] transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-[#d4a017] text-[11px] tracking-[0.2em] uppercase font-semibold mb-4">Legal</h3>
          <ul className="space-y-2 text-[12px]">
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-[#d4a017] transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-[#d4a017] text-[11px] tracking-[0.2em] uppercase font-semibold mb-4">Contact</h3>
          <ul className="space-y-2 text-[12px]">
            <li>
              <a href={`mailto:${legalInfo.contactEmail}`} className="hover:text-[#d4a017] transition-colors">
                {legalInfo.contactEmail}
              </a>
            </li>
            <li>
              <a href={`tel:${legalInfo.contactPhone.replace(/\s/g, "")}`} className="hover:text-[#d4a017] transition-colors">
                {legalInfo.contactPhone}
              </a>
            </li>
            <li className="text-[#faf8f5]/65 leading-relaxed">{legalInfo.registeredOffice}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[#d4a017]/15">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-5 flex flex-col sm:flex-row gap-2 sm:gap-6 items-center justify-between text-[11px] text-[#faf8f5]/55">
          <p>© {year} {legalInfo.legalEntity}. All rights reserved.</p>
          <p>Company No. {legalInfo.companyNumber} · Registered in {legalInfo.jurisdiction}</p>
        </div>
      </div>
    </footer>
  );
}
