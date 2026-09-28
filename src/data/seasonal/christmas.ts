/**
 * Christmas set menu, shared by every open branch.
 * Source: Turkuaz_Christmas_Set_Menu.pdf (client, 2026-09-28).
 *
 * Allergen codes here follow the PRINT menu's own key, which differs from
 * the à la carte schema in menus/types.ts (there S = Soya; here S = Sesame).
 * Keep them separate; never map one onto the other.
 */

export interface ChristmasDish {
  name: string;
  description?: string;
  allergens?: string[];
}

export interface ChristmasCourse {
  id: string;
  title: string;
  intro?: string;
  /** "choose" = guest picks one dish; "list" = everything is served */
  kind: "choose" | "list";
  dishes: ChristmasDish[];
}

export interface ChristmasMenu {
  title: string;
  prices: { label: string; amount: string }[];
  courses: ChristmasCourse[];
  allergenKey: { code: string; label: string }[];
  disclaimer: string;
  pdfUrl: string;
  /** ISO date (inclusive). Popup and menu tab only appear inside this window. */
  activeFrom: string;
  /** ISO date (exclusive). Everything disappears on its own after this. */
  activeUntil: string;
}

export const christmasMenu: ChristmasMenu = {
  title: "Christmas Set Menu",
  prices: [
    { label: "Monday to Thursday", amount: "44.95" },
    { label: "Friday to Sunday", amount: "54.95" },
  ],
  courses: [
    {
      id: "arrival",
      title: "Upon Arrival",
      intro: "A glass of your choice",
      kind: "list",
      dishes: [
        { name: "Prosecco", allergens: ["SU"] },
        { name: "Kir Royale", allergens: ["SU"] },
        { name: "Beer", allergens: ["G"] },
        { name: "Soft drink" },
      ],
    },
    {
      id: "starters",
      title: "Starters to Share",
      intro: "A selection of cold and hot mezze",
      kind: "list",
      dishes: [
        { name: "Falafel", allergens: ["S"] },
        { name: "Grilled halloumi", allergens: ["D"] },
        { name: "Calamari", allergens: ["M", "G"] },
        { name: "Hummus", allergens: ["S"] },
        { name: "Beetroot paté", allergens: ["D"] },
        { name: "Kısır", allergens: ["G"] },
      ],
    },
    {
      id: "main",
      title: "Main Course",
      kind: "choose",
      dishes: [
        {
          name: "Special Mix Grill",
          description:
            "One lamb chop, one adana, two chicken shish, two lamb shish and three chicken wings, served with rice and salad",
        },
        {
          name: "Grilled Salmon or Sea Bass",
          description: "Served with seasonal mixed vegetables and mashed potatoes",
          allergens: ["F", "D"],
        },
        {
          name: "Grilled Mixed Seafood",
          description:
            "Sea bass fillet, salmon and king prawns, served with seasonal mixed vegetables and mashed potatoes",
          allergens: ["F", "D", "CR"],
        },
        {
          name: "Veggie & Halloumi Kebab",
          description:
            "Grilled mixed peppers, halloumi, mushrooms, onions, courgette and aubergine in a special tomato sauce, served with rice and salad",
          allergens: ["V", "D"],
        },
        {
          name: "Veggie Moussaka",
          description:
            "Slow-cooked layers of aubergine, potato, onion and garlic with a béchamel cheese sauce, served with rice and salad",
          allergens: ["V", "D", "G"],
        },
        {
          name: "Falafel & Hummus",
          description: "Served with baby potatoes and mixed seasonal vegetables",
          allergens: ["V", "G", "S"],
        },
      ],
    },
    {
      id: "dessert",
      title: "Dessert",
      kind: "choose",
      dishes: [
        { name: "Chocolate Brownie", allergens: ["D", "E", "G"] },
        { name: "Baklava", allergens: ["D", "G", "N"] },
        { name: "Rice Pudding", allergens: ["D"] },
      ],
    },
  ],
  allergenKey: [
    { code: "F", label: "Fish" },
    { code: "CR", label: "Crustaceans" },
    { code: "M", label: "Molluscs" },
    { code: "D", label: "Dairy" },
    { code: "E", label: "Egg" },
    { code: "G", label: "Gluten" },
    { code: "N", label: "Nuts" },
    { code: "S", label: "Sesame" },
    { code: "SU", label: "Sulphites" },
    { code: "V", label: "Suitable for vegetarians" },
  ],
  disclaimer:
    "Please tell a member of the team about any allergies or dietary requirements before ordering. Our dishes are prepared in a kitchen where allergens are present, so we cannot guarantee any dish is free from traces.",
  pdfUrl: "/menus/christmas-set-menu.pdf",
  // TODO(client): confirm the real season dates. Placeholder: live now, gone on 1 Jan.
  activeFrom: "2026-09-28",
  activeUntil: "2027-01-01",
};

export function isChristmasMenuActive(now: Date = new Date()): boolean {
  const t = now.getTime();
  return t >= Date.parse(christmasMenu.activeFrom) && t < Date.parse(christmasMenu.activeUntil);
}

export function allergenLabel(code: string): string {
  return christmasMenu.allergenKey.find((a) => a.code === code)?.label ?? code;
}
