"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef, useCallback } from "react";
import { isExternalReserveForSlug, reserveHrefForSlug } from "@/utils/reserveLinks";

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

function buildMenuHref(branch: string | null): string {
  return branch ? `/menu/${branch}` : "/menu";
}

export function StickyHeader() {
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const branch = useBranchFromPath();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    };
    handleScroll(); // initial
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Close on outside click
  useEffect(() => {
    if (!menuOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [menuOpen, closeMenu]);

  const reserveHref = reserveHrefForSlug(branch);
  const reserveExternal = isExternalReserveForSlug(branch);
  const menuHref = buildMenuHref(branch);

  return (
    <header
      ref={menuRef}
      role="banner"
      aria-label="Sticky navigation"
      className={`stickyHeader fixed top-0 left-0 right-0 z-50 border-b transition-all ease-out ${
        visible
          ? "translate-y-0 opacity-100 bg-[var(--header-bg)] backdrop-blur-md border-[var(--header-border)] shadow-lg shadow-black/10"
          : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-2 sm:py-3">
        <Link
          href="/"
          className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cta-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#081408] rounded transition-opacity hover:opacity-90"
          aria-label="Turquaz home"
        >
          <Image src="/logo-header.png" alt="Turquaz" width={140} height={47} className="h-8 sm:h-9 w-auto object-contain" priority />
        </Link>

        <nav className="hidden sm:flex items-center gap-3 sm:gap-4" aria-label="Primary actions">
          <Link
            href={menuHref}
            className="btn-secondary inline-flex items-center px-4 py-2 rounded-lg border-2 border-[var(--cta-secondary-border)] text-[#faf8f5] text-xs font-medium tracking-[0.15em] uppercase hover:border-[var(--cta-primary)] hover:text-[var(--cta-secondary-hover)]"
            aria-label="View menu"
          >
            View Menu
          </Link>
          <Link
            href={reserveHref}
            target={reserveExternal ? "_blank" : undefined}
            rel={reserveExternal ? "noopener noreferrer" : undefined}
            className="btn-primary inline-flex items-center px-5 py-2.5 rounded-lg bg-[var(--cta-primary)] text-[#faf8f5] text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[var(--cta-primary-hover)]"
            aria-label="Reserve a table"
          >
            Reserve a Table
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="sm:hidden flex items-center justify-center w-10 h-10 rounded-lg text-[#faf8f5] hover:bg-[#faf8f5]/10 transition-colors"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <nav
          className="sm:hidden border-t border-[var(--header-border)] bg-[#081408] px-4 py-4 flex flex-col gap-3"
          aria-label="Mobile navigation"
        >
          <Link
            href="/"
            onClick={closeMenu}
            className="text-[#faf8f5] text-sm font-medium tracking-[0.15em] uppercase py-2 hover:text-[var(--cta-primary)] transition-colors"
          >
            Home
          </Link>
          <Link
            href="/locations"
            onClick={closeMenu}
            className="text-[#faf8f5] text-sm font-medium tracking-[0.15em] uppercase py-2 hover:text-[var(--cta-primary)] transition-colors"
          >
            Locations
          </Link>
          <Link
            href={menuHref}
            onClick={closeMenu}
            className="text-[#faf8f5] text-sm font-medium tracking-[0.15em] uppercase py-2 hover:text-[var(--cta-primary)] transition-colors"
          >
            Menu
          </Link>
          <Link
            href={reserveHref}
            target={reserveExternal ? "_blank" : undefined}
            rel={reserveExternal ? "noopener noreferrer" : undefined}
            onClick={closeMenu}
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[var(--cta-primary)] text-[#faf8f5] text-sm font-semibold tracking-[0.2em] uppercase hover:bg-[var(--cta-primary-hover)] transition-colors mt-1"
          >
            Reserve a Table
          </Link>
        </nav>
      )}
    </header>
  );
}
