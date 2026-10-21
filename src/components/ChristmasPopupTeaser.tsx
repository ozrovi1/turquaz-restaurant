import { Cormorant_Garamond } from "next/font/google";
import { christmasMenu } from "@/data/seasonal/christmas";

const serif = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

/**
 * Compact phone-sized invitation for the Christmas popup: title, prices and the
 * course outline only. The full printed card lives on the menu page and in the
 * desktop popup, so small screens are not asked to read a whole menu in a modal.
 */
export function ChristmasPopupTeaser({ headingId }: { headingId?: string }) {
  const m = christmasMenu;
  return (
    <article className={`${serif.className} relative bg-[#faf6ec] text-[#1f2a1f] rounded-sm shadow-2xl shadow-black/40`}>
      <div className="absolute inset-2 border border-[#b8891a]/40 pointer-events-none" aria-hidden />
      <div className="relative px-6 py-8 text-center">
        <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-[#1f2a1f]/80">Turquaz Restaurant</p>
        <h2 id={headingId} className="mt-2 text-[34px] leading-tight italic font-medium text-[#14351f]">
          {m.title}
        </h2>

        <div className="mt-5 space-y-1">
          {m.prices.map((p) => (
            <p key={p.label} className="flex items-baseline justify-center gap-2.5">
              <span className="text-xl font-semibold text-[#8a6a10] tabular-nums">£{p.amount}</span>
              <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#1f2a1f]/70">{p.label}</span>
            </p>
          ))}
          <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#1f2a1f]/50">Per person</p>
        </div>

        <div className="flex items-center justify-center gap-2 my-5" aria-hidden>
          <span className="h-px w-10 bg-[#b8891a]/50" />
          <span className="h-1 w-1 rotate-45 bg-[#b8891a]" />
          <span className="h-px w-10 bg-[#b8891a]/50" />
        </div>

        <ol className="space-y-1.5">
          {m.courses.map((c) => (
            <li key={c.id} className="text-[17px] leading-snug">
              <span className="font-medium">{c.title}</span>
              {c.kind === "choose" && <span className="italic text-[#1f2a1f]/55"> · choose one</span>}
              {c.intro && <span className="italic text-[#1f2a1f]/55"> · {c.intro.toLowerCase()}</span>}
            </li>
          ))}
        </ol>
      </div>
    </article>
  );
}
