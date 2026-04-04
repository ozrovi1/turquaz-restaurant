"use client";

import Image from "next/image";

interface InstagramEmbedProps {
  postUrl: string;
  thumbnailSrc: string;
}

export function InstagramEmbed({ postUrl, thumbnailSrc }: InstagramEmbedProps) {
  return (
    <a
      href={postUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="relative block aspect-square rounded-xl overflow-hidden border border-[var(--ig-border,rgba(212,160,23,0.2))] group"
    >
      <Image
        src={thumbnailSrc}
        alt="Instagram post"
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500"
        sizes="(max-width: 640px) 50vw, 25vw"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
        <svg className="w-10 h-10 text-white/0 group-hover:text-white/90 transition-colors drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.058 1.645-.07 4.849-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
          <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8z" />
          <circle cx="18.406" cy="5.594" r="1.44" />
        </svg>
      </div>
    </a>
  );
}
