import type { BranchMenu, ServiceMode } from "./types";
import { aldershotMenu } from "./aldershot";
import { felthamMenu } from "./feltham";
import { crawleyMenu } from "./crawley";
import { stainesMenu } from "./staines";
import { aldershotTakeawayMenu } from "./aldershot-takeaway";
import { felthamTakeawayMenu } from "./feltham-takeaway";
import { stainesTakeawayMenu } from "./staines-takeaway";
import { crawleyLeisureParkMenu } from "./crawley-leisure-park";
import { crawleyLeisureParkTakeawayMenu } from "./crawley-leisure-park-takeaway";

export const branchMenus: Record<string, BranchMenu> = {
  aldershot: aldershotMenu,
  feltham: felthamMenu,
  crawley: crawleyMenu,
  staines: stainesMenu,
  "crawley-leisure-park": crawleyLeisureParkMenu,
};

export const branchTakeawayMenus: Record<string, BranchMenu> = {
  aldershot: aldershotTakeawayMenu,
  feltham: felthamTakeawayMenu,
  staines: stainesTakeawayMenu,
  "crawley-leisure-park": crawleyLeisureParkTakeawayMenu,
};

export function getBranchMenu(slug: string, mode: ServiceMode = "dinein"): BranchMenu | undefined {
  if (mode === "takeaway") return branchTakeawayMenus[slug];
  return branchMenus[slug];
}

export function hasTakeaway(slug: string): boolean {
  return slug in branchTakeawayMenus;
}

export * from "./types";
