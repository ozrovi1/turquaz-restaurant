"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const SCROLL_THRESHOLD = 80;

/**
 * Derives branch slug from pathname when on /locations/[slug].
 * Use this to prefill reservation/menu links per location.
 */
function useBranchFromPath(): string | null {
  const pathname = usePathname();
  const match = pathname?.match(/^\/locations\/([^/]+)$/);
  return match ? match[1] : null;
}

function buildReserveHref(branch: string | null): string {
  return branch ? `/reservations?branch=${branch}` : "/reservations";
}

function buildMenuHref(branch: string | null): string {
  return branch ? `/menu?branch=${branch}` : "/menu";
}

export function StickyHeader() {
  const [visible, setVisible] = useState(false);
  const branch = useBranchFromPath();

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    };
    handleScroll(); // initial
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const reserveHref = buildReserveHref(branch);
  const menuHref = buildMenuHref(branch);

  return (
    <header
      role="banner"
      aria-label="Sticky navigation"
      className={`stickyHeader fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 lg:px-8 py-2 sm:py-3 border-b transition-all ease-out ${
        visible
          ? "translate-y-0 opacity-100 bg-[var(--header-bg)] backdrop-blur-md border-[var(--header-border)] shadow-lg shadow-black/10"
          : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <Link
        href="/"
        className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cta-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a1f0a] rounded transition-opacity hover:opacity-90"
        aria-label="Turquaz home"
      >
        <Image src="/logo-header.png" alt="Turquaz" width={140} height={47} className="h-8 sm:h-9 w-auto object-contain" priority />
      </Link>

      <nav className="flex items-center gap-3 sm:gap-4" aria-label="Primary actions">
        {/* Secondary CTA - hidden on mobile */}
        <Link
          href={menuHref}
          className="btn-secondary hidden sm:inline-flex items-center px-4 py-2 rounded-lg border-2 border-[var(--cta-secondary-border)] text-[#faf8f5] text-xs font-medium tracking-[0.15em] uppercase hover:border-[var(--cta-primary)] hover:text-[var(--cta-secondary-hover)]"
          aria-label="View menu"
        >
          View Menu
        </Link>
        {/* Primary CTA */}
        <Link
          href={reserveHref}
          className="btn-primary inline-flex items-center px-5 py-2.5 rounded-lg bg-[var(--cta-primary)] text-[#faf8f5] text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[var(--cta-primary-hover)]"
          aria-label="Reserve a table"
        >
          Reserve a Table
        </Link>
      </nav>
    </header>
  );
}
