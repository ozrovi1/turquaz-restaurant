import Link from "next/link";
import Image from "next/image";
import { branches } from "@/data/branches";
import { logoUrl, aboutUs } from "@/data/site";
import { LocationCard } from "@/components/LocationCard";
import { SectionReveal } from "@/components/SectionReveal";

export const metadata = {
  title: "Locations | Turquaz",
  description: "Find your nearest Turquaz restaurant. Four locations across the UK.",
};

export default function LocationsPage() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-6 sm:py-8 overflow-hidden bg-[#0a1f0a]">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-cover bg-center blur-[8px] sm:blur-[12px]" style={{ backgroundImage: "url('/photos/landing-bg.png')" }} />
        <div className="absolute inset-0 bg-[#0a1f0a]/40" aria-hidden />
        <div className="heroOverlay" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-2 sm:px-4">
        <div className="text-center mb-6 flex flex-col items-center gap-3">
          <Image src={logoUrl} alt="Turquaz" width={200} height={67} className="h-16 sm:h-20 md:h-24 w-auto object-contain" priority />
          <p className="text-[#faf8f5]/80 text-xs sm:text-sm leading-relaxed max-w-md">
            {aboutUs.short}
          </p>
          <div className="flex items-center justify-center gap-2">
            <span className="w-6 h-px bg-[#d4a017]/50" />
            <h1 className="text-lg sm:text-xl font-medium text-[#faf8f5]">Locations</h1>
            <span className="w-6 h-px bg-[#d4a017]/50" />
          </div>
          <p className="text-[#d4a017]/90 text-[10px] sm:text-xs tracking-[0.25em] uppercase font-medium">Please Select Your Destination</p>
        </div>

        <SectionReveal>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {branches
            .filter((b) => !b.comingSoon || b.slug !== "trowbridge")
            .map((branch, i) => (
              <LocationCard
                key={branch.slug}
                branch={branch}
                badge={i % 2 === 0 ? "open" : "closes"}
              />
            ))}
        </div>
        </SectionReveal>

        <SectionReveal>
        <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-[#d4a017]/10 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-8 h-px bg-[#d4a017]/30" />
            <p className="text-[11px] sm:text-[12px] text-[#d4a017] tracking-[0.25em] uppercase">Contact</p>
            <span className="w-8 h-px bg-[#d4a017]/30" />
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[#faf8f5]/80 text-xs sm:text-sm">
            {branches
              .filter((b) => !b.comingSoon && b.phone.trim().length > 0)
              .map((branch) => (
              <a key={branch.slug} href={`tel:${branch.phone.replace(/\s/g, "")}`} className="hover:text-[#d4a017] transition-colors">
                {branch.name}: {branch.phone}
              </a>
            ))}
          </div>
          <a href="mailto:info@turquaz.co.uk" className="block mt-2 text-[#faf8f5]/80 text-xs sm:text-sm hover:text-[#d4a017] transition-colors">
            info@turquaz.co.uk
          </a>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
            <Link href="/" className="text-[11px] sm:text-[12px] text-[#d4a017] font-medium tracking-[0.15em] uppercase hover:text-[#f4d03f] transition-colors">
              Home
            </Link>
            <Link href="/menu" className="text-[11px] sm:text-[12px] text-[#d4a017] font-medium tracking-[0.15em] uppercase hover:text-[#f4d03f] transition-colors">
              View Menu
            </Link>
            <Link href="/reservation" className="text-[11px] sm:text-[12px] text-[#d4a017] font-semibold tracking-[0.15em] uppercase hover:text-[#f4d03f] transition-colors">
              Reserve a Table
            </Link>
          </div>
        </div>
        </SectionReveal>
      </div>
    </section>
  );
}
