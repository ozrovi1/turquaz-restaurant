/**
 * CTA hierarchy configuration
 *
 * Primary: "Reserve a Table" → /reservation (or /reservation?branch={slug} on branch pages).
 *   Branches with multiple bookingPartners (e.g. Aldershot: The Fork + Dojo) always use
 *   /reservation?branch={slug} from the sticky header; cards can show per-platform links.
 * Secondary: "View Menu" → /menu (or /menu?branch={slug} on branch pages)
 *
 * Links per location:
 * - On /locations/[slug] (e.g. /locations/green-lanes), the sticky header and
 *   floating button automatically append ?branch={slug} to Reserve and Menu links.
 * - This is derived from usePathname() in StickyHeader and MobileFloatingButton.
 *
 * To override or add custom logic, edit:
 * - src/components/StickyHeader.tsx (reserveHrefForSlug via @/utils/reserveLinks, buildMenuHref)
 * - src/components/MobileFloatingButton.tsx (href)
 * - src/components/LocationCard.tsx (uses branch.slug and branch.menuUrl)
 */

export const CTA_LABELS = {
  primary: "Reserve a Table",
  secondary: "View Menu",
} as const;
