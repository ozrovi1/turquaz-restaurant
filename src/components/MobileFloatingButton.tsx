"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const SCROLL_THRESHOLD = 120;

function useBranchFromPath(): string | null {
  const pathname = usePathname();
  const match = pathname?.match(/^\/locations\/([^/]+)$/);
  return match ? match[1] : null;
}

export function MobileFloatingButton() {
  const [visible, setVisible] = useState(false);
  const branch = useBranchFromPath();
  const href = branch ? `/reservations?branch=${branch}` : "/reservations";

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`md:hidden fixed bottom-6 right-6 z-40 transition-all duration-300 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
      }`}
    >
      <Link
        href={href}
        className="btn-primary flex items-center gap-2 px-4 py-3 rounded-full bg-[var(--cta-primary)] text-[#0a0a0a] text-xs font-semibold tracking-[0.15em] uppercase shadow-lg shadow-black/25 hover:bg-[var(--cta-primary-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cta-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a1f0a]"
        aria-label="Reserve a table"
      >
        Reserve
      </Link>
    </div>
  );
}
