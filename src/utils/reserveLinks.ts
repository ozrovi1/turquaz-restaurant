import type { BookingPartnerLink, Branch } from "@/data/branches";
import { getBranchBySlug } from "@/data/branches";

export function getBookingPartners(branch: Branch): BookingPartnerLink[] {
  return branch.bookingPartners?.filter((p) => p.url?.trim()) ?? [];
}

export function reserveTargetForBranch(branch: Branch): { href: string; external: boolean } {
  const partners = getBookingPartners(branch);
  if (partners.length === 0) {
    return { href: `/reservation?branch=${branch.slug}`, external: false };
  }
  if (partners.length === 1) {
    return { href: partners[0].url, external: true };
  }
  return { href: `/reservation?branch=${branch.slug}`, external: false };
}

export function reserveHrefForSlug(slug: string | null): string {
  if (!slug) return "/reservation";
  const b = getBranchBySlug(slug);
  if (!b) return "/reservation";
  return reserveTargetForBranch(b).href;
}

export function isExternalReserveForSlug(slug: string | null): boolean {
  if (!slug) return false;
  const b = getBranchBySlug(slug);
  if (!b) return false;
  return getBookingPartners(b).length === 1;
}
