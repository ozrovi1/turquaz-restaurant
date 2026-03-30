"use client";

import Link from "next/link";
import Image from "next/image";

interface InstagramFeedProps {
  branchName: string;
  logoUrl: string;
  instagramHandle?: string;
  postUrls?: string[];
  postsCount?: number;
  followersCount?: number;
  followingCount?: number;
  placeholderImages?: string[];
}

export function InstagramFeed({
  branchName,
  logoUrl,
  instagramHandle,
  postUrls = [],
  postsCount,
  followersCount,
  followingCount,
  placeholderImages = [
    "/photos/DSC00115.JPG",
    "/photos/DSC00270.JPG",
    "/photos/DSC00306.JPG",
    "/photos/DSC00424.JPG",
    "/photos/DSC09860.JPG",
  ],
}: InstagramFeedProps) {
  const profileUrl = instagramHandle
    ? `https://www.instagram.com/${instagramHandle.replace(/^@/, "")}/`
    : null;
  const handle = instagramHandle?.replace(/^@/, "") || `turquaz_${branchName.toLowerCase().replace(/\s+/g, "_")}`;

  return (
    <div className="w-full rounded-2xl border border-[#d4a017]/20 bg-[#0d2818]/80 backdrop-blur-sm overflow-hidden">
      {/* Profile header */}
      <div className="flex flex-wrap items-center gap-4 sm:gap-6 px-3 py-4 sm:p-6 border-b border-[#d4a017]/10">
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-[#d4a017]/30 shrink-0 bg-[#0a1f0a]">
          <Image src="/photos/ig-profile.jpg" alt={`Turquaz ${branchName}`} fill className="object-cover" sizes="96px" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xl sm:text-2xl font-semibold text-[#faf8f5]">Turquaz {branchName}</h3>
          <p className="text-[#d4a017] text-sm sm:text-base">@{handle}</p>
          <div className="flex flex-wrap gap-6 mt-2 text-sm text-[#faf8f5]/80">
            <span><strong className="text-[#faf8f5]">{postsCount ?? "—"}</strong> Posts</span>
            <span><strong className="text-[#faf8f5]">{followersCount != null ? (followersCount >= 1000 ? `${(followersCount / 1000).toFixed(1)}K` : followersCount) : "—"}</strong> Followers</span>
            <span><strong className="text-[#faf8f5]">{followingCount ?? "—"}</strong> Following</span>
          </div>
        </div>
        {profileUrl && (
          <Link
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-2.5 rounded-lg bg-[#d4a017] text-[#0a0a0a] font-semibold text-sm hover:bg-[#e8c547] transition-colors shrink-0"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.058 1.645-.07 4.849-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
              <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8z" />
              <circle cx="18.406" cy="5.594" r="1.44" />
            </svg>
            Follow
          </Link>
        )}
      </div>

      {/* Image carousel - placeholder images linking to IG posts or profile */}
      <div
        className="flex gap-3 overflow-x-auto overscroll-x-contain snap-x snap-mandatory px-3 py-4 sm:p-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {placeholderImages.map((src, i) => {
          const linkUrl = postUrls[i] || profileUrl || "#";
          return (
            <a
              key={i}
              href={linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex-shrink-0 w-[160px] sm:w-[200px] md:w-[240px] aspect-square rounded-xl overflow-hidden border border-[#d4a017]/20 snap-center group"
            >
              <Image
                src={src}
                alt={`Turquaz ${branchName} photo ${i + 1}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="240px"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <svg className="w-8 h-8 text-white/0 group-hover:text-white/80 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.058 1.645-.07 4.849-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
                  <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8z" />
                  <circle cx="18.406" cy="5.594" r="1.44" />
                </svg>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
