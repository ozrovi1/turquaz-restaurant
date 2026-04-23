import type { BranchMenu, ServiceMode } from "./types";
import { aldershotMenu } from "./aldershot";
import { felthamMenu } from "./feltham";
import { crawleyMenu } from "./crawley";
import { aldershotTakeawayMenu } from "./aldershot-takeaway";
import { felthamTakeawayMenu } from "./feltham-takeaway";

export const branchMenus: Record<string, BranchMenu> = {
  aldershot: aldershotMenu,
  feltham: felthamMenu,
  crawley: crawleyMenu,
};

export const branchTakeawayMenus: Record<string, BranchMenu> = {
  aldershot: aldershotTakeawayMenu,
  feltham: felthamTakeawayMenu,
};

export function getBranchMenu(slug: string, mode: ServiceMode = "dinein"): BranchMenu | undefined {
  if (mode === "takeaway") return branchTakeawayMenus[slug];
  return branchMenus[slug];
}

export function hasTakeaway(slug: string): boolean {
  return slug in branchTakeawayMenus;
}

export * from "./types";
