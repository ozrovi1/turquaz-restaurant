"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "turquaz-cookie-consent";

type Choice = "accepted" | "rejected";

function readChoice(): Choice | null {
  if (typeof window === "undefined") return null;
  const v = window.localStorage.getItem(STORAGE_KEY);
  return v === "accepted" || v === "rejected" ? v : null;
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (readChoice() === null) setVisible(true);
  }, []);

  const decide = (choice: Choice) => {
    window.localStorage.setItem(STORAGE_KEY, choice);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed bottom-0 inset-x-0 z-[60] border-t border-[#d4a017]/30 bg-[#050d05]/95 backdrop-blur-md shadow-[0_-8px_32px_rgba(0,0,0,0.4)]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[12px] sm:text-[13px] leading-relaxed text-[#faf8f5]/85 max-w-2xl">
          We use essential cookies to make this site work. With your consent we may also set cookies to
          help us understand how you use the site. See our{" "}
          <Link href="/cookies" className="underline text-[#d4a017] hover:text-[#f4d03f]">
            Cookie Policy
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline text-[#d4a017] hover:text-[#f4d03f]">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex flex-row gap-2 sm:gap-3 sm:shrink-0">
          <button
            type="button"
            onClick={() => decide("rejected")}
            className="flex-1 sm:flex-initial px-5 py-2 rounded-lg border border-[#d4a017]/40 text-[#faf8f5] text-[11px] font-medium tracking-[0.15em] uppercase hover:border-[#d4a017] hover:text-[#d4a017] transition-colors"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={() => decide("accepted")}
            className="flex-1 sm:flex-initial px-5 py-2 rounded-lg bg-[#d4a017] text-[#0a0a0a] text-[11px] font-semibold tracking-[0.15em] uppercase hover:bg-[#e8c547] transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
