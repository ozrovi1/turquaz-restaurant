import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { branchMenus, getBranchMenu } from "@/data/menus";
import { getBranchBySlug } from "@/data/branches";
import { logoUrl } from "@/data/site";
import { MenuRenderer } from "@/components/MenuRenderer";
import { SectionReveal } from "@/components/SectionReveal";

export async function generateStaticParams() {
  return Object.keys(branchMenus).map((branch) => ({ branch }));
}

export async function generateMetadata({ params }: { params: Promise<{ branch: string }> }) {
  const { branch } = await params;
  const b = getBranchBySlug(branch);
  if (!b) return { title: "Menu | Turquaz" };
  return {
    title: `${b.name} Menu | Turquaz`,
    description: `Full menu for Turquaz ${b.name}. Authentic Turkish and Mediterranean cuisine.`,
  };
}

export default async function BranchMenuPage({ params }: { params: Promise<{ branch: string }> }) {
  const { branch } = await params;
  const menu = getBranchMenu(branch);
  const branchData = getBranchBySlug(branch);
  if (!menu || !branchData) notFound();

  return (
    <div className="min-h-screen bg-[#081408] text-[#faf8f5]">
      {/* Hero */}
      <section className="relative py-14 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {branchData.imageUrl && (
          <div className="absolute inset-0">
            <Image src={branchData.imageUrl} alt="" fill className="object-cover scale-[1.02] blur-sm" sizes="100vw" priority />
            <div className="absolute inset-0 bg-[#081408]/80" />
          </div>
        )}
        <SectionReveal className="relative z-10 max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-5">
            <Image src={logoUrl} alt="Turquaz" width={180} height={60} className="h-12 sm:h-14 w-auto object-contain opacity-95" priority />
          </div>
          <p className="text-[#d4a017] text-[11px] sm:text-[12px] tracking-[0.3em] uppercase mb-2">{branchData.area}</p>
          <h1 className="text-2xl sm:text-3xl font-medium mb-3">{branchData.name} Menu</h1>
          <p className="text-[#faf8f5]/75 text-xs sm:text-sm max-w-xl mx-auto">
            Authentic Turkish and Mediterranean cuisine, freshly prepared every day.
          </p>
          <div className="mt-6 flex items-center justify-center gap-4 flex-wrap">
            <Link
              href={`/locations/${branchData.slug}`}
              className="text-[11px] sm:text-[12px] text-[#faf8f5]/80 font-medium tracking-[0.15em] uppercase hover:text-[#d4a017] transition-colors"
            >
              ← Back to {branchData.name}
            </Link>
            {branchData.menuUrl && (
              <Link
                href={branchData.menuUrl}
                target="_blank"
                className="text-[11px] sm:text-[12px] text-[#d4a017] font-semibold tracking-[0.15em] uppercase hover:text-[#f4d03f] transition-colors"
              >
                See PDF →
              </Link>
            )}
          </div>
        </SectionReveal>
      </section>

      {/* Menu content */}
      <section className="relative px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-6xl mx-auto">
          <MenuRenderer menu={menu} />
        </div>
      </section>
    </div>
  );
}
