import Link from "next/link";
import Image from "next/image";
import { branches } from "@/data/branches";
import { branchMenus } from "@/data/menus";
import { logoUrl, aboutUs } from "@/data/site";
import { SectionReveal } from "@/components/SectionReveal";

export const metadata = {
  title: "Menu | Turquaz",
  description: "Browse our menus by location. Authentic Turkish and Mediterranean cuisine at Turquaz branches.",
};

export default function MenuPickerPage() {
  const bookableBranches = branches.filter((b) => branchMenus[b.slug]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-10 sm:py-14 overflow-hidden bg-[#081408]">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-cover bg-center blur-[8px]" style={{ backgroundImage: "url('/photos/landing-bg.png')" }} />
        <div className="absolute inset-0 bg-[#081408]/55" aria-hidden />
        <div className="heroOverlay" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto">
        <div className="text-center mb-8 flex flex-col items-center gap-3">
          <Image src={logoUrl} alt="Turquaz" width={200} height={67} className="h-14 sm:h-16 w-auto object-contain" priority />
          <p className="text-[#faf8f5]/80 text-xs sm:text-sm leading-relaxed max-w-md [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]">
            {aboutUs.short}
          </p>
          <div className="flex items-center justify-center gap-2 mt-1">
            <span className="w-6 h-px bg-[#d4a017]/50" />
            <h1 className="text-lg sm:text-xl font-medium text-[#faf8f5] [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]">Menu</h1>
            <span className="w-6 h-px bg-[#d4a017]/50" />
          </div>
          <p className="text-[#d4a017]/90 text-[10px] sm:text-xs tracking-[0.25em] uppercase font-medium [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]">Choose your branch</p>
        </div>

        <SectionReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {bookableBranches.map((branch) => (
              <Link
                key={branch.slug}
                href={`/menu/${branch.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#d4a017]/30 bg-[#0d1f0d]/60 shadow-lg shadow-black/20 transition-all duration-300 hover:scale-[1.02] hover:border-[#d4a017]/70 hover:shadow-[0_0_28px_rgba(212,160,23,0.18)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  {branch.imageUrl ? (
                    <>
                      <Image
                        src={branch.imageUrl}
                        alt={`Turquaz ${branch.name}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        style={{ objectPosition: "center 35%" }}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#081408]/95 via-[#081408]/35 to-transparent" />
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-[#0d1f0d]" />
                  )}
                </div>
                <div className="p-5 sm:p-6">
                  <p className="text-[10px] sm:text-[11px] text-[#166534] tracking-[0.2em] uppercase mb-1">
                    {branch.area}
                  </p>
                  <h2 className="text-lg sm:text-xl font-medium text-[#faf8f5] mb-2 transition-colors duration-300 group-hover:text-[#d4a017]">
                    {branch.name}
                  </h2>
                  <p className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-[#d4a017] tracking-[0.15em] uppercase">
                    View Menu
                    <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </SectionReveal>

        <div className="mt-10 text-center">
          <Link href="/" className="text-[11px] sm:text-[12px] text-[#faf8f5]/80 font-medium tracking-[0.15em] uppercase hover:text-[#d4a017] transition-colors [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]">
            ← Home
          </Link>
        </div>
      </div>
    </section>
  );
}
