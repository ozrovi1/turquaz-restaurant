"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import type { BranchMenu, Category, MenuItem, MenuSection } from "@/data/menus/types";
import { ALLERGEN_LABELS, CATEGORY_LABELS } from "@/data/menus/types";
import { OrnamentalFrame } from "@/components/OrnamentalFrame";

interface MenuRendererProps {
  menu: BranchMenu;
}

function formatPrice(price: MenuItem["price"], currency: string): string {
  if (price === "—") return "";
  if (typeof price === "string") return `${currency}${price}`;
  return `${currency}${price.regular} / ${currency}${price.large}`;
}

function ItemRow({ item, currency }: { item: MenuItem; currency: string }) {
  const priceStr = formatPrice(item.price, currency);
  return (
    <div className="py-4 border-b border-[#d4a017]/10 last:border-b-0">
      <div className="flex items-baseline gap-3">
        <h4 className="text-[#faf8f5] font-medium text-[15px] sm:text-base leading-snug">
          {item.name}
          {item.forPeople && (
            <span className="ml-2 text-[10px] sm:text-[11px] text-[#d4a017] tracking-[0.15em] uppercase font-normal">
              For {item.forPeople}
            </span>
          )}
        </h4>
        <span className="flex-1 border-b border-dotted border-[#d4a017]/25 translate-y-[-3px]" aria-hidden />
        {priceStr && (
          <span className="shrink-0 text-[#d4a017] font-semibold text-[15px] sm:text-base tabular-nums">
            {priceStr}
          </span>
        )}
      </div>
      {item.description && (
        <p className="mt-1.5 text-[#faf8f5]/70 text-[13px] sm:text-sm leading-relaxed max-w-prose">
          {item.description}
        </p>
      )}
      {item.allergens && item.allergens.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {item.allergens.map((a) => (
            <span
              key={a}
              title={ALLERGEN_LABELS[a]}
              className="inline-flex items-center rounded border border-[#d4a017]/30 bg-[#0d1f0d]/60 px-1.5 py-0.5 text-[9px] font-medium tracking-wider text-[#d4a017]/90 uppercase"
            >
              {a}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function SectionBlock({ section, currency }: { section: MenuSection; currency: string }) {
  return (
    <section className="break-inside-avoid">
      <header className="mb-5 text-center">
        <h3 className="text-xl sm:text-2xl font-medium text-[#faf8f5] mb-1">{section.name}</h3>
        {section.note && (
          <p className="text-xs sm:text-sm text-[#faf8f5]/55 italic max-w-xl mx-auto">{section.note}</p>
        )}
        <div className="flex items-center justify-center gap-2 mt-3">
          <span className="w-6 h-px bg-[#d4a017]/40" />
          <span className="text-[#d4a017] text-xs">✦</span>
          <span className="w-6 h-px bg-[#d4a017]/40" />
        </div>
      </header>
      <div>
        {section.items.map((item) => (
          <ItemRow key={item.name} item={item} currency={currency} />
        ))}
      </div>
    </section>
  );
}

export function MenuRenderer({ menu }: MenuRendererProps) {
  // Ordered list of unique categories present in this menu
  const categoriesInOrder = useMemo(() => {
    const seen = new Set<Category>();
    const list: Category[] = [];
    for (const s of menu.sections) {
      if (!seen.has(s.category)) {
        seen.add(s.category);
        list.push(s.category);
      }
    }
    return list;
  }, [menu.sections]);

  const searchParams = useSearchParams();
  const requestedCategory = searchParams?.get("category") as Category | null;
  const initialCategory: Category =
    requestedCategory && categoriesInOrder.includes(requestedCategory)
      ? requestedCategory
      : categoriesInOrder[0];
  const [activeCategory, setActiveCategory] = useState<Category>(initialCategory);
  const rootRef = useRef<HTMLDivElement | null>(null);

  // Keep active category in sync with the ?category= query when the user
  // navigates here from a Delicious Selections tile, and scroll into view.
  useEffect(() => {
    if (requestedCategory && categoriesInOrder.includes(requestedCategory)) {
      setActiveCategory(requestedCategory);
      // Defer until after render so the DOM contains the updated section.
      const t = setTimeout(() => {
        rootRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
      return () => clearTimeout(t);
    }
  }, [requestedCategory, categoriesInOrder]);

  const activeSections = menu.sections.filter((s) => s.category === activeCategory);

  return (
    <div ref={rootRef} className="w-full scroll-mt-20">
      {/* Category pill nav */}
      <nav className="mb-10 sm:mb-12">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {categoriesInOrder.map((cat) => {
            const isActive = cat === activeCategory;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                aria-pressed={isActive}
                className={
                  isActive
                    ? "inline-flex items-center px-5 py-2.5 rounded-full border-2 border-[#d4a017] bg-[#d4a017] text-[#081408] text-[11px] sm:text-[12px] font-semibold tracking-[0.2em] uppercase shadow-lg shadow-[#d4a017]/20 transition-all duration-200"
                    : "inline-flex items-center px-5 py-2.5 rounded-full border border-[#d4a017]/35 bg-[#0d1f0d]/40 text-[#faf8f5]/80 text-[11px] sm:text-[12px] font-medium tracking-[0.2em] uppercase transition-all duration-200 hover:border-[#d4a017] hover:text-[#d4a017] hover:bg-[#0d1f0d]/70"
                }
              >
                {CATEGORY_LABELS[cat]}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Active category inside ornamental frame */}
      <OrnamentalFrame className="px-6 py-10 sm:px-12 sm:py-14">
        <div className="text-center mb-10">
          <p className="text-[#d4a017] text-[11px] sm:text-[12px] tracking-[0.3em] uppercase mb-2">Turquaz {menu.branch.charAt(0).toUpperCase() + menu.branch.slice(1)}</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-[#faf8f5]">
            {CATEGORY_LABELS[activeCategory]}
          </h2>
        </div>

        <div
          className={
            activeSections.length > 1
              ? "columns-1 md:columns-2 gap-10 [&>section]:mb-10"
              : "max-w-2xl mx-auto"
          }
        >
          {activeSections.map((section) => (
            <SectionBlock key={section.id} section={section} currency={menu.currency} />
          ))}
        </div>
      </OrnamentalFrame>

      {/* Notices + Allergen legend */}
      {menu.notices && menu.notices.length > 0 && (
        <div className="mt-12 pt-8 border-t border-[#d4a017]/15 space-y-2 max-w-3xl mx-auto text-center">
          {menu.notices.map((n, i) => (
            <p key={i} className="text-[11px] sm:text-xs text-[#faf8f5]/55 leading-relaxed">{n}</p>
          ))}
        </div>
      )}

      <div className="mt-6 pt-6 border-t border-[#d4a017]/10 max-w-3xl mx-auto text-center">
        <p className="text-[10px] sm:text-[11px] text-[#d4a017] tracking-[0.25em] uppercase mb-3">Allergen Key</p>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 text-[11px] text-[#faf8f5]/55">
          {Object.entries(ALLERGEN_LABELS).map(([code, label]) => (
            <span key={code} className="whitespace-nowrap">
              <strong className="text-[#d4a017]/85 font-semibold">{code}</strong>: {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
