import Image from "next/image";
import { logoUrl } from "@/data/site";

/**
 * Stands in for a branch exterior photo that has not arrived yet.
 * Deliberately not a substitute photograph — brand mark and ornament only,
 * so the tile reads as intentional rather than as a missing image.
 */
export function BranchImagePlaceholder() {
  return (
    <div className="absolute inset-0 bg-[#0d1f0d]" aria-hidden="true">
      {/* Warm centre glow so the tile is not a flat block */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 42%, rgba(212,160,23,0.16) 0%, rgba(212,160,23,0.05) 45%, transparent 72%)",
        }}
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4">
        <Ornament />
        <Image
          src={logoUrl}
          alt=""
          width={180}
          height={60}
          className="w-[52%] max-w-[150px] h-auto object-contain opacity-55"
        />
        <Ornament />
      </div>

      {/* Matches the gradient photos carry, so cards align visually */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#081408]/95 via-[#081408]/25 to-transparent" />
    </div>
  );
}

function Ornament() {
  return (
    <span className="flex items-center gap-1.5 text-[#d4a017]/45">
      <span className="w-6 sm:w-8 h-px bg-current" />
      <span className="text-[7px] leading-none">&#9670;</span>
      <span className="w-6 sm:w-8 h-px bg-current" />
    </span>
  );
}
