import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getBranchBySlug, branches } from "@/data/branches";
import { logoUrl, aboutUs } from "@/data/site";
import { BookingForm } from "@/components/BookingForm";
import { getBookingPartners, reserveTargetForBranch } from "@/utils/reserveLinks";
import { menuCategories } from "@/data/menu";
import { SectionReveal } from "@/components/SectionReveal";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";
import { InstagramFeed } from "@/components/InstagramFeed";
import { BranchMapClient } from "@/components/BranchMapClient";
import { OrnamentalFrame } from "@/components/OrnamentalFrame";
import { MandalaBackground } from "@/components/MandalaBackground";

export async function generateStaticParams() {
  return branches
    .filter((b) => !b.comingSoon || b.slug !== "trowbridge")
    .map((branch) => ({ slug: branch.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const branch = getBranchBySlug(slug);
  if (!branch) return { title: "Location | Turquaz" };
  return { title: `${branch.name} | Turquaz`, description: `Visit our ${branch.name} location. ${branch.address}` };
}

const sectionBgImages = {
  visit: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920",
  selections: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=1920",
  gallery: "/gallery-bg.png",
  testimonials: "/testimonials-bg.png",
};

export default async function BranchPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const branch = getBranchBySlug(slug);
  if (!branch) notFound();
  // Trowbridge has no preview page; every other "coming soon" branch renders a limited preview.
  if (branch.comingSoon && branch.slug === "trowbridge") notFound();

  const isPreview = branch.comingSoon === true;
  const hasPhone = branch.phone.trim().length > 0;
  const partners = getBookingPartners(branch);
  const reserve = reserveTargetForBranch(branch);

  const services = [
    { title: "Party & Celebrations", desc: "Transform your special moments into unforgettable memories with our elegant party spaces and exceptional catering services tailored to your celebration needs." },
    { title: "Luxury Fine Dining", desc: "Experience culinary excellence in our sophisticated dining room where every meal becomes a journey through extraordinary flavors and impeccable service." },
    { title: "Banquet Hall", desc: "Host your grand events in our spacious banquet hall, perfectly equipped for weddings, corporate gatherings, and large celebrations with customizable layouts." },
    { title: "Outdoor Catering", desc: "Bring our exceptional cuisine to your chosen venue with our professional outdoor catering service, ensuring your event is memorable wherever you celebrate." },
  ];

  const testimonials = [
    { quote: "A delightful feast for all the senses! The food was sensational, and the ambiance added charm to the evening. Each course impressed us. A dining experience worth repeating again.", author: "Ian Botham", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" },
    { quote: "Exceptional service and flavours that transport you. The attention to detail in every dish shows the passion behind the kitchen. We will definitely be back.", author: "Sarah Mitchell", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" },
    { quote: "From the warm welcome to the last bite, everything was perfect. The atmosphere is elegant yet relaxed. Highly recommend for any occasion.", author: "James Chen", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100" },
  ];

  return (
    <div className="bg-[#081408] text-[#faf8f5] antialiased">
      {/* Visit Us - blur bg, location name, no extra photo */}
      <section className="relative py-20 sm:py-28 px-6 lg:px-10 overflow-hidden">
        <div className="absolute inset-0">
          <Image src={branch.imageUrl ?? sectionBgImages.visit} alt="" fill className="object-cover scale-[1.02] blur-sm" sizes="100vw" />
          <div className="absolute inset-0 bg-[#081408]/70" />
        </div>
        <SectionReveal className="relative z-10 max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Image src={logoUrl} alt="Turquaz" width={180} height={60} className="h-12 sm:h-14 lg:h-16 w-auto object-contain opacity-95" priority />
          </div>
          <p className="text-[#d4a017] text-[11px] sm:text-[13px] tracking-[0.3em] uppercase mb-1">{branch.area}</p>
          <h1 className="text-3xl sm:text-4xl font-medium text-[#faf8f5] mb-8">{branch.name}</h1>
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="w-8 h-px bg-[#d4a017]/40" />
            <p className="text-[#d4a017] text-[11px] tracking-[0.3em] uppercase">
              {isPreview ? "♦ Opening Soon ♦" : "♦ Visit Us ♦"}
            </p>
            <span className="w-8 h-px bg-[#d4a017]/40" />
          </div>
          <div className="space-y-2 text-[#faf8f5]/90 text-sm sm:text-base">
            <p>{branch.address}</p>
            {branch.hours && <p className="text-[#7a9e7a]">{branch.hours}</p>}
            <a href="mailto:info@turquaz.co.uk" className="block hover:text-[#d4a017] transition-colors">info@turquaz.co.uk</a>
            {hasPhone && (
              <p><a href={`tel:${branch.phone.replace(/\s/g, "")}`} className="hover:text-[#d4a017] transition-colors">Booking: {branch.phone}</a></p>
            )}
          </div>
          {isPreview ? (
            <div className="mt-12 max-w-xl mx-auto rounded-2xl border-2 border-[#d4a017]/30 bg-[#0d1f0d]/80 px-6 py-6 sm:px-8 sm:py-7 text-center">
              <p className="text-[#d4a017] text-[11px] tracking-[0.3em] uppercase mb-2">Coming Soon</p>
              <p className="text-[#faf8f5]/90 text-sm leading-relaxed">
                We&apos;re preparing to open our doors in {branch.area}. Follow us on Instagram or email us at info@turquaz.co.uk to be the first to know when reservations open.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 mt-5">
                {branch.instagramHandle && (
                  <a
                    href={`https://instagram.com/${branch.instagramHandle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border-2 border-[#d4a017]/40 text-[#faf8f5] font-medium text-[12px] tracking-[0.2em] uppercase hover:border-[#d4a017] hover:text-[#d4a017] transition-colors"
                  >
                    Follow Updates
                  </a>
                )}
                <a
                  href="mailto:info@turquaz.co.uk?subject=Opening%20Updates"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#d4a017] text-[#0a0a0a] font-semibold text-[12px] tracking-[0.2em] uppercase hover:bg-[#e8c547] transition-colors"
                >
                  Notify Me
                </a>
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 flex-wrap">
              {partners.length > 1 ? (
                partners.map((p) => (
                  <Link
                    key={p.label}
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary px-8 py-3.5 rounded-lg bg-[#d4a017] text-[#0a0a0a] font-semibold text-[12px] tracking-[0.2em] uppercase hover:bg-[#e8c547]"
                  >
                    Reserve — {p.label}
                  </Link>
                ))
              ) : (
                <Link
                  href={reserve.href}
                  target={reserve.external ? "_blank" : undefined}
                  rel={reserve.external ? "noopener noreferrer" : undefined}
                  className="btn-primary px-8 py-3.5 rounded-lg bg-[#d4a017] text-[#0a0a0a] font-semibold text-[12px] tracking-[0.2em] uppercase hover:bg-[#e8c547]"
                >
                  {partners.length === 1 ? `Reserve — ${partners[0].label}` : "Reserve a Table"}
                </Link>
              )}
              <Link href={`/menu/${branch.slug}`} className="btn-secondary px-8 py-3.5 rounded-lg border-2 border-[#d4a017]/40 text-[#faf8f5] font-medium text-[12px] tracking-[0.2em] uppercase hover:border-[#d4a017] hover:text-[#d4a017]">
                View Menu
              </Link>
              {branch.uberEatsUrl && (
                <a href={branch.uberEatsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg border-2 border-[#22c55e]/40 text-[#22c55e] font-medium text-[12px] tracking-[0.2em] uppercase hover:border-[#22c55e] hover:bg-[#22c55e]/10 transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2v-6h2v6zm1-8H8V7h8v2z"/></svg>
                  Order Online
                </a>
              )}
            </div>
          )}
        </SectionReveal>
      </section>

      {!isPreview && (
      <section className="relative py-20 sm:py-28 px-6 lg:px-10 overflow-hidden bg-[#0d1f0d]">
        <MandalaBackground />
        <SectionReveal className="relative z-10 max-w-4xl mx-auto">
          <OrnamentalFrame>
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-[#d4a017] text-sm">✦</span>
                <p className="text-[#d4a017] text-[11px] tracking-[0.3em] uppercase">Book a Table</p>
                <span className="text-[#d4a017] text-sm">✦</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-medium">Reserve Your Table</h2>
              <p className="text-[#faf8f5]/80 text-sm mt-2">
                {partners.length > 1
                  ? `Booking: ${branch.phone}, or choose The Fork or Dojo below.`
                  : partners.length === 1
                    ? `Booking: ${branch.phone}, or reserve online below.`
                    : `Booking: ${branch.phone} or use the form below`}
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden border-2 border-[#d4a017]/20 bg-[#081408]/80 p-6 sm:p-10">
              {partners.length > 0 ? (
                <div className="text-center space-y-6 py-4">
                  <p className="text-[#faf8f5]/85 text-sm leading-relaxed max-w-md mx-auto">
                    {partners.length > 1
                      ? `You will leave this site to complete your booking on The Fork or Dojo.`
                      : `You will leave this site to complete your booking on ${partners[0].label}.`}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center max-w-md mx-auto">
                    {partners.map((p) => (
                      <Link
                        key={p.label}
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex flex-1 items-center justify-center px-8 py-3.5 rounded-lg bg-[#d4a017] text-[#0a0a0a] font-semibold text-[12px] tracking-[0.2em] uppercase hover:bg-[#e8c547] transition-colors"
                      >
                        {p.label}
                      </Link>
                    ))}
                  </div>
                  <p className="text-[#faf8f5]/50 text-xs">
                    Prefer to call?{" "}
                    <a href={`tel:${branch.phone.replace(/\s/g, "")}`} className="text-[#d4a017] hover:underline">
                      {branch.phone}
                    </a>
                  </p>
                </div>
              ) : (
                <BookingForm branchSlug={branch.slug} branchName={branch.name} />
              )}
            </div>
          </OrnamentalFrame>
        </SectionReveal>
      </section>
      )}

      {/* Our Story - green bg only */}
      <section className="relative py-20 sm:py-28 px-6 lg:px-10 overflow-hidden bg-[#0d1f0d]">
        <MandalaBackground />
        <SectionReveal className="relative z-10 max-w-4xl mx-auto">
          <OrnamentalFrame>
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-[#d4a017] text-sm">◆</span>
              <p className="text-[#d4a017] text-[11px] tracking-[0.3em] uppercase">Our Story +</p>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium mb-6 leading-tight text-center">
              Enjoy Every Moment with Tasty <span className="text-[#d4a017]">Breakfast</span>, Hearty <span className="text-[#d4a017]">Mains &</span> <span className="text-[#d4a017]">Drinks</span>
            </h2>
            <p className="text-[#faf8f5]/80 leading-relaxed mb-10 text-center">{aboutUs.content}</p>
            <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <div className="flex gap-4 p-4 rounded-2xl bg-[#081408]/70 border border-[#d4a017]/10">
                <div className="w-12 h-12 rounded-full border-2 border-[#d4a017]/40 flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-[#d4a017]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                </div>
                <div>
                  <h3 className="text-[#d4a017] text-[11px] tracking-[0.2em] uppercase mb-2">Hygienic Food</h3>
                  <p className="text-[#faf8f5]/80 text-sm">We maintain the highest standards of cleanliness and food safety.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 rounded-2xl bg-[#081408]/70 border border-[#d4a017]/10">
                <div className="w-12 h-12 rounded-xl border-2 border-[#d4a017]/40 flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-[#d4a017]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                </div>
                <div>
                  <h3 className="text-[#d4a017] text-[11px] tracking-[0.2em] uppercase mb-2">Fresh Ambience</h3>
                  <p className="text-[#faf8f5]/80 text-sm">Our elegant dining space offers comfort and sophistication.</p>
                </div>
              </div>
            </div>
          </OrnamentalFrame>
        </SectionReveal>
      </section>

      {/* Instagram Feed - between Our Story and Our Services */}
      <section className="relative py-20 sm:py-28 px-6 lg:px-10 overflow-hidden bg-[#0d1f0d]">
        <MandalaBackground />
        <SectionReveal className="relative z-10 max-w-6xl mx-auto">
          <OrnamentalFrame>
          <InstagramFeed
            branchName={branch.name}
            logoUrl={logoUrl}
            instagramHandle={branch.instagramHandle}
            postUrls={branch.instagramPostUrls}
            postThumbnails={branch.instagramThumbnails}
            postsCount={branch.instagramPostsCount}
            followersCount={branch.instagramFollowersCount}
            followingCount={branch.instagramFollowingCount}
          />
          </OrnamentalFrame>
        </SectionReveal>
      </section>

      {/* Our Services - green bg only */}
      <section className="relative py-20 sm:py-28 px-6 lg:px-10 overflow-hidden bg-[#0d1f0d]">
        <MandalaBackground />
        <SectionReveal className="relative z-10 max-w-6xl mx-auto">
          <OrnamentalFrame>
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-[#d4a017] text-sm">+</span>
                <p className="text-[#d4a017] text-[11px] tracking-[0.3em] uppercase">Our Services</p>
                <span className="text-[#d4a017] text-sm">+</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium">Perfect Spaces for Every Occasion</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((s) => (
                <div key={s.title} className="flex gap-4 p-5 rounded-2xl bg-[#081408]/70 border border-[#d4a017]/10">
                  <div className="w-12 h-12 rounded-full border-2 border-[#d4a017]/40 flex items-center justify-center shrink-0">
                    <span className="text-[#d4a017] text-lg">✦</span>
                  </div>
                  <div>
                    <h3 className="text-[#d4a017] text-[11px] tracking-[0.2em] uppercase mb-2">{s.title}</h3>
                    <p className="text-[#faf8f5]/80 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </OrnamentalFrame>
        </SectionReveal>
      </section>

      {/* Delicious Selections - blur bg photo */}
      <section className="relative py-20 sm:py-28 px-6 lg:px-10 overflow-hidden">
        <div className="absolute inset-0">
          <Image src={sectionBgImages.selections} alt="" fill className="object-cover scale-[1.02] blur-sm" sizes="100vw" />
          <div className="absolute inset-0 bg-[#081408]/60" />
        </div>
        <SectionReveal className="relative z-10 max-w-6xl mx-auto">
          <h2 className="text-center text-2xl sm:text-3xl font-medium mb-12">Delicious Selections</h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {menuCategories.map((cat) => {
              const branchImg = branch.menuImages?.[cat.id as keyof typeof branch.menuImages];
              const imgSrc = branchImg || cat.imageUrl;
              return (
                <Link key={cat.id} href={`/menu/${branch.slug}`} className="group block flex flex-col items-center">
                  <OrnamentalFrame shape="circle" className="mb-6">
                    <div className="relative w-48 h-48 sm:w-56 sm:h-56 overflow-hidden rounded-full shadow-xl shadow-black/30">
                      <Image src={imgSrc} alt={cat.name} fill className={`object-cover group-hover:scale-105 transition-transform duration-500${cat.id === "desserts" ? " scale-150" : ""}`} sizes="(max-width: 640px) 50vw, 20vw" />
                    </div>
                  </OrnamentalFrame>
                  <h3 className="text-[#d4a017] text-lg font-medium text-center mb-2">{cat.name}</h3>
                  <p className="text-[#faf8f5]/80 text-sm text-center mb-4">{cat.description}</p>
                  <p className="text-[#d4a017]/90 text-xs tracking-[0.2em] uppercase text-center">View Menu</p>
                </Link>
              );
            })}
          </div>
        </SectionReveal>
      </section>

      {/* Map + Instagram - map on top, IG feed below */}
      <section className="relative py-20 sm:py-28 px-6 lg:px-10 overflow-hidden">
        <div className="absolute inset-0">
          <Image src={sectionBgImages.gallery} alt="" fill className="object-cover scale-[1.02] blur-sm" sizes="100vw" />
          <div className="sectionOverlay" />
        </div>
        <SectionReveal className="relative z-10 max-w-6xl mx-auto space-y-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-[#d4a017] text-sm">+</span>
              <p className="text-[#d4a017] text-[11px] tracking-[0.3em] uppercase">Find Us</p>
              <span className="text-[#d4a017] text-sm">+</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-medium">Turquaz {branch.name}</h2>
          </div>
          <BranchMapClient
            center={branch.mapCoords ?? [51.5, -0.1]}
            branchName={`Turquaz ${branch.name}`}
            logoUrl={logoUrl}
            address={branch.address}
          />
        </SectionReveal>
      </section>

      {/* Testimonials - carousel with dots */}
      <section className="relative py-20 sm:py-28 px-6 lg:px-10 overflow-hidden">
        <div className="absolute inset-0">
          <Image src={sectionBgImages.testimonials} alt="" fill className="object-cover scale-[1.02] blur-sm" sizes="100vw" />
          <div className="sectionOverlay" />
        </div>
        <SectionReveal className="relative z-10 max-w-4xl mx-auto">
          <TestimonialsCarousel testimonials={testimonials} />
        </SectionReveal>
      </section>

    </div>
  );
}
