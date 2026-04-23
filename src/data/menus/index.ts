import type { BranchMenu } from "./types";
import { aldershotMenu } from "./aldershot";
import { felthamMenu } from "./feltham";
import { crawleyMenu } from "./crawley";

export const branchMenus: Record<string, BranchMenu> = {
  aldershot: aldershotMenu,
  feltham: felthamMenu,
  crawley: crawleyMenu,
};

export function getBranchMenu(slug: string): BranchMenu | undefined {
  return branchMenus[slug];
}

export * from "./types";
