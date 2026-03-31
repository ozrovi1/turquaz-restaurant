"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { getOpenStatus } from "@/utils/openStatus";
import type { Branch } from "@/data/branches";

interface SisterBranch {
  slug: string;
  name: string;
  area: string;
  address: string;
  phone: string;
  hours?: string;
  imageUrl?: string;
  url?: string;
  comingSoon?: boolean;
}

interface SisterBranchCardProps {
  branch: SisterBranch;
  badge?: "open" | "closes";
}

export function SisterBranchCard({ branch }: SisterBranchCardProps) {
  const fakeBranch = { hours: branch.hours || "" } as Branch;
  const [status, setStatus] = useState(() => getOpenStatus(fakeBranch));

  useEffect(() => {
    const interval = setInterval(() => setStatus(getOpenStatus(fakeBranch)), 60_000);
    return () => clearInterval(interval);
  }, [branch.hours]);

  const badgeText = branch.comingSoon ? "Coming Soon" : status.isOpen ? status.detail : status.label;

  const card = (
    <article className={`group relative flex flex-col overflow-hidden rounded-2xl border border-[#d4af37]/25 bg-[#0d1f0d]/60 shadow-lg shadow-black/20 transition-all duration-300 hover:scale-[1.02] hover:border-[#d4af37]/50 hover:shadow-[0_0_24px_rgba(212,175,55,0.12)] ${branch.comingSoon ? "opacity-50 pointer-events-none" : ""}`}>
      <div className="relative z-10 flex flex-1 flex-col">
        <div className="relative aspect-[4/3] overflow-hidden">
          {branch.imageUrl ? (
            <>
              <Image
                src={branch.imageUrl}
                alt={`Gunes ${branch.name}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a0a]/95 via-[#0a1a0a]/30 to-transparent" />
            </>
          ) : (
            <div className="absolute inset-0 bg-[#0d1f0d]" />
          )}
          <span
            className={`absolute top-3 right-3 px-2.5 py-1 rounded-lg text-[10px] font-medium tracking-wider uppercase ${
              branch.comingSoon
                ? "bg-[#0d1f0d]/90 text-[#faf8f5]/60 border border-[#faf8f5]/20"
                : status.isOpen
                ? "bg-[#2d5a2d]/90 text-[#a8d4a8] border border-[#3d7a3d]/50"
                : "bg-[#0d1f0d]/90 text-[#d4af37]/90 border border-[#d4af37]/30"
            }`}
          >
            {badgeText}
          </span>
        </div>
        <div className="flex flex-1 flex-col justify-end p-4 sm:p-5">
          <p className="text-[10px] sm:text-[11px] text-[#d4af37] tracking-[0.2em] uppercase mb-1">{branch.area}</p>
          <h2 className="text-base sm:text-lg font-medium text-[#faf8f5] leading-tight mb-2">{branch.name}</h2>
          <p className="text-[11px] sm:text-xs text-[#7a9e7a]/90 line-clamp-2 leading-relaxed">{branch.address}</p>
          <p className="text-[10px] sm:text-[11px] text-[#7a9e7a]/80 mt-2 flex items-center gap-1.5">
            <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {branch.phone}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-[#d4af37] tracking-[0.15em] uppercase transition-colors duration-200 group-hover:text-[#e8c547]">
              Reserve a Table
              <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
            </span>
            <span className="inline-flex text-[11px] sm:text-xs font-medium text-[#7a9e7a]/90 tracking-[0.1em] uppercase transition-colors duration-200 group-hover:text-[#7a9e7a]">
              View Menu
            </span>
          </div>
        </div>
      </div>
    </article>
  );

  if (branch.url && !branch.comingSoon) {
    return (
      <a href={branch.url} target="_blank" rel="noopener noreferrer" className="cursor-pointer">
        {card}
      </a>
    );
  }

  return card;
}
