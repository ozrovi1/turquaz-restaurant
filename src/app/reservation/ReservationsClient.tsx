"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { BookingForm } from "@/components/BookingForm";
import { branches, getBranchBySlug } from "@/data/branches";
import { getBookingPartners } from "@/utils/reserveLinks";

const bookableBranches = branches.filter((b) => !b.comingSoon && b.phone.trim().length > 0);

export function ReservationsClient() {
  const searchParams = useSearchParams();
  const preselected = searchParams.get("branch");
  const [selectedBranch, setSelectedBranch] = useState<string | null>(preselected);

  useEffect(() => {
    setSelectedBranch(preselected);
  }, [preselected]);

  const branch = selectedBranch ? getBranchBySlug(selectedBranch) : undefined;
  const partners = branch ? getBookingPartners(branch) : [];

  return (
    <div className="min-h-screen bg-[#081408] text-[#faf8f5] py-16 px-6">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-medium">Reserve a Table</h1>
          <p className="text-[#faf8f5]/60 text-sm mt-2">
            Book online and we&apos;ll confirm your reservation.
          </p>
        </div>

        {!selectedBranch ? (
          <div className="space-y-3">
            <p className="text-sm text-[#faf8f5]/50 text-center mb-4">
              Choose your location:
            </p>
            {bookableBranches.map((b) => (
              <button
                key={b.slug}
                type="button"
                onClick={() => setSelectedBranch(b.slug)}
                className="w-full text-left bg-[#0d2a0d] border border-[#166534]/20 rounded-lg p-5 hover:border-[#22c55e]/40 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-[#faf8f5] font-medium group-hover:text-[#22c55e] transition-colors">
                      {b.name}
                    </h3>
                    <p className="text-[#faf8f5]/40 text-xs mt-0.5">{b.area}</p>
                  </div>
                  <span className="text-[#166534]/50 group-hover:text-[#22c55e] transition-colors text-lg">
                    &rarr;
                  </span>
                </div>
              </button>
            ))}
            <p className="text-center text-[#faf8f5]/30 text-xs mt-6">
              Or call us directly to book:{" "}
              <a href="tel:01252364141" className="text-[#22c55e]/70 hover:text-[#22c55e]">
                01252 364141
              </a>
            </p>
          </div>
        ) : branch && partners.length > 0 ? (
          <div className="space-y-6 text-center">
            <p className="text-[#faf8f5]/80 text-sm leading-relaxed">
              {partners.length > 1 ? (
                <>
                  <strong className="text-[#faf8f5]">{branch.name}</strong> — choose The Fork or Dojo to book online.
                </>
              ) : (
                <>
                  Online reservations for <strong className="text-[#faf8f5]">{branch.name}</strong> via{" "}
                  {partners[0].label}.
                </>
              )}
            </p>
            <div className="flex flex-col gap-3">
              {partners.map((p) => (
                <Link
                  key={p.label}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full px-6 py-3.5 rounded-lg bg-[#22c55e] text-[#0a0a0a] font-semibold text-sm tracking-[0.15em] uppercase hover:bg-[#4ade80] transition-colors"
                >
                  {p.label}
                </Link>
              ))}
            </div>
            <p className="text-[#faf8f5]/45 text-xs">
              Prefer to call?{" "}
              <a href={`tel:${branch.phone.replace(/\s/g, "")}`} className="text-[#22c55e]/80 hover:text-[#22c55e]">
                {branch.phone}
              </a>
            </p>
            <button
              type="button"
              onClick={() => setSelectedBranch(null)}
              className="text-[#faf8f5]/50 text-sm hover:text-[#faf8f5] transition-colors underline underline-offset-2"
            >
              Choose another location
            </button>
          </div>
        ) : branch ? (
          <BookingForm
            branchSlug={branch.slug}
            branchName={branch.name}
            onBack={() => setSelectedBranch(null)}
          />
        ) : null}
      </div>
    </div>
  );
}
