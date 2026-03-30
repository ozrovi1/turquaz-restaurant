import Link from "next/link";
import Image from "next/image";
import { branches } from "@/data/branches";
import { logoUrl, aboutUs, gunesLanding } from "@/data/site";
import { LocationCard } from "@/components/LocationCard";
import { SisterBranchCard } from "@/components/SisterBranchCard";
import { SectionReveal } from "@/components/SectionReveal";

export default function HomePage() {
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
            {branches.filter((b) => !b.comingSoon).map((branch) => (
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
            <Link href="/reservations" className="text-[11px] sm:text-[12px] text-[#faf8f5] font-semibold tracking-[0.15em] uppercase hover:text-[#f4d03f] transition-colors [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]">
              Reserve a Table
            </Link>
          </div>
        </div>
        </SectionReveal>

        <SectionReveal>
        <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-[#d4a017]/10">
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="w-8 h-px bg-[#d4a017]/30" />
            <p className="text-[11px] sm:text-[12px] text-[#d4a017] tracking-[0.25em] uppercase [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]">Our Sister Branches</p>
            <span className="w-8 h-px bg-[#d4a017]/30" />
          </div>

          {/* Gunes landing page - embedded */}
          <div className="relative rounded-2xl overflow-hidden border border-[#d4a017]/20 bg-[#081408] transition-all duration-300 hover:border-[#d4a017]/40">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-cover bg-center blur-[3px]" style={{ backgroundImage: `url('${gunesLanding.heroBg}')` }} />
              <div className="absolute inset-0 bg-[#081408]/70" />
            </div>
            <div className="relative z-10 px-6 py-8 sm:py-10">
              <div className="text-center mb-6 sm:mb-8">
                <div className="flex justify-center mb-4 sm:mb-6">
                  <Image src={gunesLanding.logoUrl} alt={gunesLanding.name} width={280} height={90} className="h-20 sm:h-24 w-auto object-contain transition-transform duration-300 hover:scale-105" />
                </div>
                <p className="text-[#faf8f5]/80 text-xs sm:text-sm leading-relaxed max-w-md mx-auto mb-6">
                  {gunesLanding.tagline}
                </p>
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="w-6 h-px bg-[#d4af37]/50" />
                  <h2 className="text-lg sm:text-xl font-medium text-[#faf8f5]">Welcome</h2>
                  <span className="w-6 h-px bg-[#d4af37]/50" />
                </div>
                <p className="text-[#d4af37]/90 text-[10px] sm:text-xs tracking-[0.25em] uppercase font-medium">Please Select Your Destination</p>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:gap-5 max-w-2xl mx-auto">
                {gunesLanding.branches.map((branch, i) => (
                  <SisterBranchCard key={branch.slug} branch={branch} badge={i % 2 === 0 ? "open" : "closes"} />
                ))}
              </div>
              <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-[#d4af37]/10 text-center">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className="w-8 h-px bg-[#d4af37]/30" />
                  <p className="text-[11px] sm:text-[12px] text-[#d4af37] tracking-[0.25em] uppercase">Contact</p>
                  <span className="w-8 h-px bg-[#d4af37]/30" />
                </div>
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[#faf8f5]/80 text-xs sm:text-sm">
                  {gunesLanding.branches.map((branch) => (
                    <span key={branch.slug} className="transition-colors duration-200 hover:text-[#d4af37] cursor-default">{branch.name}: {branch.phone}</span>
                  ))}
                </div>
                <p className="mt-2 text-[#faf8f5]/80 text-xs sm:text-sm transition-colors duration-200 hover:text-[#d4af37] cursor-default">info@gunes.co.uk</p>
                <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
                  <a href="https://www.gunesrestaurant.uk/" target="_blank" rel="noopener noreferrer" className="text-[11px] sm:text-[12px] text-[#d4af37] font-medium tracking-[0.15em] uppercase transition-colors duration-200 hover:text-[#e8c547]">Locations</a>
                  <a href="https://www.gunesrestaurant.uk/" target="_blank" rel="noopener noreferrer" className="text-[11px] sm:text-[12px] text-[#d4af37] font-medium tracking-[0.15em] uppercase transition-colors duration-200 hover:text-[#e8c547]">View Menu</a>
                  <a href="https://www.gunesrestaurant.uk/" target="_blank" rel="noopener noreferrer" className="text-[11px] sm:text-[12px] text-[#d4af37] font-semibold tracking-[0.15em] uppercase transition-colors duration-200 hover:text-[#e8c547]">Reserve a Table</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        </SectionReveal>
      </div>
    </section>
  );
}
