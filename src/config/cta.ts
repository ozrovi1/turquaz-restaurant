/**
 * CTA hierarchy configuration
 *
 * Primary: "Reserve a Table" → /reservations (or /reservations?branch={slug} on branch pages)
 * Secondary: "View Menu" → /menu (or /menu?branch={slug} on branch pages)
 *
 * Links per location:
 * - On /locations/[slug] (e.g. /locations/green-lanes), the sticky header and
 *   floating button automatically append ?branch={slug} to Reserve and Menu links.
 * - This is derived from usePathname() in StickyHeader and MobileFloatingButton.
 *
 * To override or add custom logic, edit:
 * - src/components/StickyHeader.tsx (buildReserveHref, buildMenuHref)
 * - src/components/MobileFloatingButton.tsx (href)
 * - src/components/LocationCard.tsx (uses branch.slug and branch.menuUrl)
 */

export const CTA_LABELS = {
  primary: "Reserve a Table",
  secondary: "View Menu",
} as const;
