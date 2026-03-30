"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { BookingForm } from "@/components/BookingForm";

const branches = [
  { slug: "aldershot", name: "Aldershot", area: "Hampshire", phone: "01252 364141" },
  { slug: "feltham", name: "Feltham", area: "West London", phone: "020 8890 0000" },
  { slug: "crawley", name: "Crawley", area: "West Sussex", phone: "07474 030076" },
];

export function ReservationsClient() {
  const searchParams = useSearchParams();
  const preselected = searchParams.get("branch");
  const [selectedBranch, setSelectedBranch] = useState<string | null>(preselected);

  const branch = branches.find((b) => b.slug === selectedBranch);

  return (
    <div className="min-h-screen bg-[#0a1f0a] text-[#faf8f5] py-16 px-6">
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
            {branches.map((b) => (
              <button
                key={b.slug}
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
              Or call us directly to book: <a href="tel:01252364141" className="text-[#22c55e]/70 hover:text-[#22c55e]">01252 364141</a>
            </p>
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
