export type Allergen =
  | "V"
  | "VG"
  | "G"
  | "GF"
  | "GF*"
  | "D"
  | "D*"
  | "N"
  | "F"
  | "S"
  | "C"
  | "M"
  | "CR"
  | "E";

export const ALLERGEN_LABELS: Record<Allergen, string> = {
  V: "Vegetarian",
  VG: "Vegan",
  G: "Gluten",
  GF: "Gluten Free",
  "GF*": "Gluten Free Optional",
  D: "Dairy",
  "D*": "Dairy Optional",
  N: "Nuts",
  F: "Fish",
  S: "Soya",
  C: "Celery",
  M: "Molluscs",
  CR: "Crustaceans",
  E: "Egg",
};

export type Category =
  | "breakfast"
  | "appetizers"
  | "salads"
  | "mains"
  | "wraps"
  | "steaks"
  | "sharing"
  | "desserts"
  | "drinks"
  | "juices"
  | "smoothies"
  | "sides"
  | "kids"
  | "lunch-set";

export const CATEGORY_LABELS: Record<Category, string> = {
  breakfast: "Breakfast",
  appetizers: "Appetizers",
  salads: "Salads",
  mains: "Mains",
  wraps: "Wraps",
  steaks: "Steaks",
  sharing: "Sharing Platters",
  desserts: "Desserts",
  drinks: "Drinks",
  juices: "Fresh Juices",
  smoothies: "Smoothies",
  sides: "Sides",
  kids: "Kids",
  "lunch-set": "Lunch Set Menu",
};

export type ServiceMode = "dinein" | "takeaway";

export interface MenuItem {
  name: string;
  description?: string;
  /** Single price ("6.9") or regular/large pair for kebabs */
  price: string | { regular: string; large: string };
  allergens?: Allergen[];
  /** "3", "4-5", "6" for sharing platters */
  forPeople?: string;
}

export interface MenuSection {
  id: string;
  category: Category;
  name: string;
  /** Shown under the section title, e.g. "All our kebabs are served with rice & salad" */
  note?: string;
  items: MenuItem[];
}

export interface BranchMenu {
  branch: string;
  currency: "£";
  /** Shown at top of menu page, e.g. lunch set hours, service charge notice */
  notices?: string[];
  sections: MenuSection[];
}
