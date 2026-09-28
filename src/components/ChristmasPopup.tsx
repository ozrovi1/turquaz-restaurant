"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChristmasMenuCard } from "@/components/ChristmasMenuCard";
import { christmasMenu, isChristmasMenuActive } from "@/data/seasonal/christmas";
import { getBranchBySlug } from "@/data/branches";
import { reserveTargetForBranch } from "@/utils/reserveLinks";

const SEEN_KEY = "turquaz-christmas-popup-seen";
const OPEN_DELAY_MS = 1200;
const HEADING_ID = "christmas-popup-title";

/** Only greet visitors on the home page and branch pages; never interrupt menus, booking or legal pages. */
function branchSlugFor(pathname: string): string | null | undefined {
  if (pathname === "/") return null;
  const m = pathname.match(/^\/locations\/([^/]+)\/?$/);
  if (m) return getBranchBySlug(m[1]) ? m[1] : undefined;
  return undefined;
}

function alreadySeen(): boolean {
  try {
    return window.sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

function markSeen(): void {
  try {
    window.sessionStorage.setItem(SEEN_KEY, "1");
  } catch {
    // Storage blocked (private mode): the popup may show again next page, which is acceptable.
  }
}

export function ChristmasPopup() {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const slug = branchSlugFor(pathname);
  const eligible = slug !== undefined;

  useEffect(() => {
    if (!eligible || !isChristmasMenuActive() || alreadySeen()) return;
    const t = window.setTimeout(() => {
      markSeen();
      setOpen(true);
    }, OPEN_DELAY_MS);
    return () => window.clearTimeout(t);
  }, [eligible]);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  if (!eligible) return null;

  const branch = slug ? getBranchBySlug(slug) : undefined;
  const reserve = branch ? reserveTargetForBranch(branch) : { href: "/reservation", external: false };
  const menuHref = branch ? `/menu/${branch.slug}?mode=christmas` : "/menu?mode=christmas";

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={HEADING_ID}
      onClose={close}
      onClick={(e) => {
        // Click on the backdrop (the dialog element itself, outside the panel) closes it.
        if (e.target === e.currentTarget) close();
      }}
      className="christmas-dialog m-auto w-[calc(100%-2rem)] max-w-xl max-h-[calc(100dvh-2rem)] p-0 bg-transparent overflow-visible"
    >
      <div className="relative flex flex-col max-h-[calc(100dvh-2rem)]">
        <button
          type="button"
          onClick={close}
          aria-label="Close Christmas menu"
          autoFocus
          className="absolute -top-3 -right-3 z-10 h-9 w-9 rounded-full bg-[#081408] border border-[#d4a017]/60 text-[#d4a017] flex items-center justify-center shadow-lg hover:bg-[#d4a017] hover:text-[#081408] transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>

        <div className="overflow-y-auto overscroll-contain rounded-sm">
          <ChristmasMenuCard headingId={HEADING_ID} />
        </div>

        <div className="mt-3 grid grid-cols-[1fr_auto] sm:flex gap-2">
          <a
            href={reserve.href}
            {...(reserve.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="col-span-2 sm:flex-1 text-center px-5 py-3 rounded-lg bg-[#d4a017] text-[#081408] text-[11px] font-semibold tracking-[0.2em] uppercase hover:bg-[#e8c547] transition-colors"
          >
            {branch ? `Book at ${branch.name}` : "Book a table"}
          </a>
          <Link
            href={menuHref}
            onClick={close}
            className="flex-1 text-center px-5 py-3 rounded-lg border border-[#d4a017]/60 bg-[#081408]/80 text-[#faf8f5] text-[11px] font-medium tracking-[0.2em] uppercase hover:border-[#d4a017] hover:text-[#d4a017] transition-colors"
          >
            {branch ? "View on menu" : "Choose a branch"}
          </Link>
          <a
            href={christmasMenu.pdfUrl}
            download
            className="sm:flex-initial text-center px-5 py-3 rounded-lg border border-[#d4a017]/30 bg-[#081408]/80 text-[#d4a017] text-[11px] font-medium tracking-[0.2em] uppercase hover:border-[#d4a017] transition-colors"
          >
            PDF
          </a>
        </div>
      </div>
    </dialog>
  );
}
