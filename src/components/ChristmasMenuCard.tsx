import { Cormorant_Garamond } from "next/font/google";
import {
  allergenLabel,
  christmasMenu,
  type ChristmasCourse,
  type ChristmasDish,
} from "@/data/seasonal/christmas";

const serif = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

function Allergens({ codes }: { codes?: string[] }) {
  if (!codes || codes.length === 0) return null;
  return (
    <span className="ml-1.5 inline-flex gap-1 align-middle">
      {codes.map((c) => (
        <abbr
          key={c}
          title={allergenLabel(c)}
          className="no-underline text-[9px] font-sans font-medium tracking-wider text-[#8a6a10]"
        >
          ({c})
        </abbr>
      ))}
    </span>
  );
}

function Rule() {
  return (
    <div className="flex items-center justify-center gap-2 my-6" aria-hidden>
      <span className="h-px w-12 bg-[#b8891a]/50" />
      <span className="h-1 w-1 rotate-45 bg-[#b8891a]" />
      <span className="h-px w-12 bg-[#b8891a]/50" />
    </div>
  );
}

function CourseHeading({ course }: { course: ChristmasCourse }) {
  return (
    <div className="mb-3">
      <h3 className="font-sans text-[10px] sm:text-[11px] tracking-[0.35em] uppercase text-[#8a6a10]">
        {course.title}
      </h3>
      {course.kind === "choose" && (
        <p className={`${serif.className} italic text-[13px] text-[#1f2a1f]/60 mt-0.5`}>Choose one</p>
      )}
    </div>
  );
}

function InlineList({ course }: { course: ChristmasCourse }) {
  return (
    <div className="text-[15px] sm:text-base leading-relaxed text-[#1f2a1f]/85">
      {course.intro && <p className="italic text-[#1f2a1f]/65">{course.intro}</p>}
      <p>
        {course.dishes.map((d: ChristmasDish, i) => (
          <span key={d.name}>
            {i > 0 && " "}
            <span className="whitespace-nowrap">
              {i > 0 && <span className="text-[#b8891a]" aria-hidden>·&nbsp;</span>}
              {d.name}
              <Allergens codes={d.allergens} />
            </span>
          </span>
        ))}
      </p>
    </div>
  );
}

function DishList({ course }: { course: ChristmasCourse }) {
  return (
    <ul className="space-y-4">
      {course.dishes.map((d) => (
        <li key={d.name}>
          <p className="text-[16px] sm:text-[17px] font-semibold uppercase tracking-[0.06em] text-[#1f2a1f]">
            {d.name}
            <Allergens codes={d.allergens} />
          </p>
          {d.description && (
            <p className="mt-0.5 text-[14px] sm:text-[15px] leading-snug text-[#1f2a1f]/70 max-w-md mx-auto">
              {d.description}
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}

/**
 * The Christmas set menu drawn as a printed card (cream paper, serif, gold rules),
 * mirroring the client's PDF. Used in the site-wide popup and the menu page tab.
 */
export function ChristmasMenuCard({ headingId }: { headingId?: string }) {
  const m = christmasMenu;
  return (
    <article
      className={`${serif.className} relative bg-[#faf6ec] text-[#1f2a1f] rounded-sm shadow-2xl shadow-black/40`}
    >
      <div className="absolute inset-2 sm:inset-3 border border-[#b8891a]/40 pointer-events-none" aria-hidden />
      <div className="relative px-6 sm:px-12 py-10 sm:py-12 text-center">
        <p className="font-sans text-[11px] sm:text-xs tracking-[0.4em] uppercase text-[#1f2a1f]/80">
          Turquaz Restaurant
        </p>
        <h2 id={headingId} className="mt-2 text-4xl sm:text-5xl italic font-medium text-[#14351f]">
          {m.title}
        </h2>

        <div className="mt-5 space-y-1">
          {m.prices.map((p) => (
            <p key={p.label} className="flex items-baseline justify-center gap-3">
              <span className="text-xl sm:text-2xl font-semibold text-[#8a6a10] tabular-nums">£{p.amount}</span>
              <span className="font-sans text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#1f2a1f]/70">
                {p.label}
              </span>
            </p>
          ))}
        </div>
        <p className="mt-1 font-sans text-[10px] tracking-[0.2em] uppercase text-[#1f2a1f]/50">Per person</p>

        {m.courses.map((course) => (
          <section key={course.id} aria-label={course.title}>
            <Rule />
            <CourseHeading course={course} />
            {course.kind === "list" ? <InlineList course={course} /> : <DishList course={course} />}
          </section>
        ))}

        <Rule />
        <div className="font-sans text-[10px] sm:text-[11px] leading-relaxed text-[#1f2a1f]/60 max-w-lg mx-auto">
          <p>
            <span className="font-semibold tracking-[0.15em] uppercase text-[#1f2a1f]/75">Allergen key </span>
            {m.allergenKey.map((a) => `(${a.code}) ${a.label}`).join(" · ")}
          </p>
          <p className="mt-2">{m.disclaimer}</p>
        </div>
      </div>
    </article>
  );
}
