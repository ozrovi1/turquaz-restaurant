import Link from "next/link";
import Image from "next/image";
import { branches } from "@/data/branches";
import { logoUrl, aboutUs, gunesLanding } from "@/data/site";
import { LocationCard } from "@/components/LocationCard";
import { SectionReveal } from "@/components/SectionReveal";

const GUNES_WEBSITE_URL = "https://www.gunesrestaurant.uk/";
const GUNES_EMBED_URL = `${GUNES_WEBSITE_URL}?embed=1`;

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === "1";
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-6 sm:py-8 overflow-hidden bg-[#0a1f0a]">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-cover bg-center blur-[4px]" style={{ backgroundImage: "url('/photos/landing-bg.png')" }} />
        <div className="absolute inset-0 bg-[#d4a017]/10" aria-hidden />
        <div className="heroOverlay" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-2 sm:px-4">
        <div className="text-center mb-6 flex flex-col items-center gap-3">
          <div className="mb-6">
            <Image src={logoUrl} alt="Turquaz" width={200} height={67} className="h-12 sm:h-14 md:h-16 w-auto object-contain" priority />
          </div>
          <p className="text-[#faf8f5] text-[11px] sm:text-xs tracking-[0.25em] uppercase font-medium max-w-md [text-shadow:0_1px_4px_rgba(0,0,0,0.7)]">
            {aboutUs.short}
          </p>
          <div className="flex items-center justify-center gap-2">
            <span className="w-6 h-px bg-[#d4a017]/50" />
            <h1 className="text-lg sm:text-xl font-medium text-[#faf8f5] [text-shadow:0_1px_4px_rgba(0,0,0,0.7)]">Welcome</h1>
            <span className="w-6 h-px bg-[#d4a017]/50" />
          </div>
          <p className="text-[#d4a017] text-[11px] sm:text-xs tracking-[0.25em] uppercase font-medium [text-shadow:0_1px_4px_rgba(0,0,0,0.8)]">Please Select Your Destination</p>
        </div>

        <SectionReveal>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {branches.map((branch, i) => (
            <LocationCard
              key={branch.slug}
              branch={branch}
              badge={i % 2 === 0 ? "open" : "closes"}
              withCardLink={!branch.comingSoon || branch.slug !== "trowbridge"}
            />
          ))}
        </div>
        </SectionReveal>

        <SectionReveal>
        <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-[#d4a017]/10 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-8 h-px bg-[#d4a017]/30" />
            <p className="text-[11px] sm:text-[12px] text-[#faf8f5] tracking-[0.25em] uppercase [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]">Contact</p>
            <span className="w-8 h-px bg-[#d4a017]/30" />
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[#faf8f5] text-xs sm:text-sm [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]">
            {branches
              .filter((b) => !b.comingSoon && b.phone.trim().length > 0)
              .map((branch) => (
              <a key={branch.slug} href={`tel:${branch.phone.replace(/\s/g, "")}`} className="hover:text-[#d4a017] transition-colors">
                {branch.name}: {branch.phone}
              </a>
            ))}
          </div>
          <a href="mailto:info@turquaz.co.uk" className="block mt-2 text-[#faf8f5] text-xs sm:text-sm hover:text-[#f4d03f] transition-colors [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]">
            info@turquaz.co.uk
          </a>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
            <Link href="/locations" className="text-[11px] sm:text-[12px] text-[#faf8f5] font-medium tracking-[0.15em] uppercase hover:text-[#f4d03f] transition-colors [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]">
              Locations
            </Link>
            <Link href="/menu" className="text-[11px] sm:text-[12px] text-[#faf8f5] font-medium tracking-[0.15em] uppercase hover:text-[#f4d03f] transition-colors [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]">
              View Menu
            </Link>
            <Link href="/reservation" className="text-[11px] sm:text-[12px] text-[#faf8f5] font-semibold tracking-[0.15em] uppercase hover:text-[#f4d03f] transition-colors [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]">
              Reserve a Table
            </Link>
          </div>
        </div>
        </SectionReveal>

      </div>

      {!isEmbed && (
        <div className="relative z-10 w-full max-w-6xl mx-auto mt-8 sm:mt-10 px-2 sm:px-4">
          <SectionReveal>
          <div className="pt-6 sm:pt-8 border-t border-[#d4a017]/10">
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="w-8 h-px bg-[#d4a017]/30" />
              <p className="text-[11px] sm:text-[12px] text-[#d4a017] tracking-[0.25em] uppercase [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]">Our Sister Branches</p>
              <span className="w-8 h-px bg-[#d4a017]/30" />
            </div>

            {/* Gunes - live full-page preview (iframe, non-interactive) */}
            <div className="relative rounded-2xl overflow-hidden border border-[#d4a017]/25 bg-[#081408] shadow-xl shadow-black/30">
              <iframe
                src={GUNES_EMBED_URL}
                title={`${gunesLanding.name} — live homepage preview`}
                loading="lazy"
                scrolling="no"
                className="block w-full h-[1800px] sm:h-[1500px] lg:h-[1200px] border-0 pointer-events-none"
              />
              <a
                href={GUNES_WEBSITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${gunesLanding.name} website`}
                className="group absolute inset-0 z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37] focus-visible:ring-inset"
              >
                <span className="absolute top-4 right-4 sm:top-5 sm:right-5 inline-flex items-center gap-2 rounded-lg bg-[#0a1a0a]/85 backdrop-blur-sm border border-[#d4af37]/40 text-[#d4af37] px-4 py-2 font-semibold text-[10px] sm:text-[11px] tracking-[0.2em] uppercase shadow-lg shadow-black/40 transition-all duration-200 group-hover:bg-[#d4af37] group-hover:text-[#0a0a0a]">
                  Visit {gunesLanding.name} Website
                  <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                </span>
              </a>
            </div>
          </div>
          </SectionReveal>
        </div>
      )}
    </section>
  );
}
