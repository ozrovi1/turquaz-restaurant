/**
 * Aldershot only — other branches have no bookingPartners and use /reservation + on-site form.
 * Env NEXT_PUBLIC_ALDERSHOT_THEFORK_BOOKING_URL overrides this. Ad-tracking query params omitted.
 */
const ALDERSHOT_THEFORK_BOOKING_URL =
  "https://www.thefork.co.uk/restaurant/turquaz-mediterranean-restaurant-r846951?cc=83567-2de";

/** Named third-party booking link (e.g. The Fork, Dojo). */
export interface BookingPartnerLink {
  label: string;
  url: string;
}

export interface Branch {
  slug: string;
  name: string;
  area: string;
  address: string;
  phone: string;
  hours: string;
  /** When true, card shows only name + "Coming soon", no details, not clickable */
  comingSoon?: boolean;
  menuUrl?: string;
  /** Per-branch wine list PDF */
  wineListUrl?: string;
  /** Per-branch cocktails PDF */
  cocktailsUrl?: string;
  /** Per-branch combined drinks PDF (wine + drinks in one file) */
  drinksMenuUrl?: string;
  /** Shared dessert PDF (same across Turquaz branches for now) */
  dessertMenuUrl?: string;
  mapEmbedUrl?: string;
  imageUrl?: string;
  /** Map center: [lat, lng] */
  mapCoords?: [number, number];
  /** Uber Eats order URL — shows "Order Online" button when set */
  uberEatsUrl?: string;
  /** Deliveroo order URL */
  deliverooUrl?: string;
  /** Just Eat order URL */
  justEatUrl?: string;
  /** Instagram handle - add per branch later for live stats & photos */
  instagramHandle?: string;
  /** Instagram post URLs for embed carousel */
  instagramPostUrls?: string[];
  /** Local thumbnail paths matching instagramPostUrls order */
  instagramThumbnails?: string[];
  /** Live stats when Instagram connected */
  instagramPostsCount?: number;
  instagramFollowersCount?: number;
  instagramFollowingCount?: number;
  /** Branch-specific menu category images */
  menuImages?: { appetizers?: string; mains?: string; desserts?: string };
  /**
   * Per-branch optional external booking (e.g. The Fork + Dojo). Only Aldershot uses this today.
   * One link → opens in a new tab; two+ → /reservation?branch=… to pick a platform.
   * Omit on other branches → internal booking form only.
   */
  bookingPartners?: BookingPartnerLink[];
}

export const branches: Branch[] = [
  {
    slug: "aldershot",
    name: "Aldershot",
    area: "Hampshire",
    address: "10 Westgate, Aldershot, Hampshire GU11 1WG",
    phone: "01252 364141",
    hours: "Mon–Thu 12:00–23:00, Fri–Sat 12:00–00:00, Sun 12:00–22:00",
    imageUrl: "/photos/aldershot-exterior.png",
    menuUrl: "/menus/aldershot.pdf",
    wineListUrl: "/menus/aldershot-wine-list.pdf",
    cocktailsUrl: "/menus/aldershot-cocktails.pdf",
    dessertMenuUrl: "/menus/desserts.pdf",
    mapCoords: [51.250, -0.770],
    instagramHandle: "turkuazrestaurantuk",
    instagramPostUrls: [
      "https://www.instagram.com/p/DUApAjBjGN2/",
      "https://www.instagram.com/p/DTclzoSjENz/",
      "https://www.instagram.com/p/DTQCgaiDBJu/",
      "https://www.instagram.com/p/DSH1VQrDP5s/",
    ],
    instagramThumbnails: [
      "/photos/instagram/post1.jpg",
      "/photos/instagram/post2.jpg",
      "/photos/instagram/post3.jpg",
      "/photos/instagram/post4.jpg",
    ],
    instagramPostsCount: 355,
    instagramFollowersCount: 15000,
    instagramFollowingCount: 141,
    uberEatsUrl: "https://www.ubereats.com/gb/store/turquaz-restaurant/CgjeStXGVIyeMH_K3qVumQ",
    deliverooUrl: "https://deliveroo.co.uk/menu/camberley/aldershot/turquaz-aldershot",
    justEatUrl: "https://www.just-eat.co.uk/restaurants-turquaz-aldershot/menu",
    menuImages: {
      appetizers: "/photos/aldershot-appetizers.jpg",
      mains: "/photos/aldershot-mains.jpg",
      desserts: "/photos/aldershot-desserts.png",
    },
    /* Aldershot-only external booking; Feltham & Crawley unchanged */
    bookingPartners: [
      {
        label: "The Fork",
        url:
          process.env.NEXT_PUBLIC_ALDERSHOT_THEFORK_BOOKING_URL?.trim() || ALDERSHOT_THEFORK_BOOKING_URL,
      },
      { label: "Dojo", url: process.env.NEXT_PUBLIC_ALDERSHOT_DOJO_BOOKING_URL?.trim() || "https://web.dojo.app/create_booking/vendor/HNpQ4JjPAC5Y8mT1UuY9xBvyDwKdTbbaJDcYw3KoXok_restaurant" },
    ].filter((p) => p.url.length > 0),
  },
  {
    slug: "feltham",
    name: "Feltham",
    area: "West London",
    address: "Unit F, Browells Lane, Leisure West, Feltham TW13 7LX",
    phone: "020 3196 5330",
    hours: "Mon–Sun 12:00–23:00",
    imageUrl: "/photos/feltham-exterior.png",
    menuUrl: "/menus/feltham.pdf",
    wineListUrl: "/menus/aldershot-wine-list.pdf",
    cocktailsUrl: "/menus/aldershot-cocktails.pdf",
    dessertMenuUrl: "/menus/desserts.pdf",
    mapCoords: [51.443, -0.404],
    uberEatsUrl: "https://www.ubereats.com/gb/store/turkuaz-restaurant-feltham/prhGtztKTcutUeGrdAA8VA",
    deliverooUrl: "https://deliveroo.co.uk/menu/london/feltham/turkuaz-restaurant-feltham-browells-lane",
    justEatUrl: "https://www.just-eat.co.uk/restaurants-turkuaz-restaurant-feltham-feltham/menu",
    instagramHandle: "turkuazrestaurantuk",
    instagramPostUrls: [
      "https://www.instagram.com/p/DUApAjBjGN2/",
      "https://www.instagram.com/p/DTclzoSjENz/",
      "https://www.instagram.com/p/DTQCgaiDBJu/",
      "https://www.instagram.com/p/DSH1VQrDP5s/",
    ],
    instagramThumbnails: [
      "/photos/instagram/post1.jpg",
      "/photos/instagram/post2.jpg",
      "/photos/instagram/post3.jpg",
      "/photos/instagram/post4.jpg",
    ],
    instagramPostsCount: 355,
    instagramFollowersCount: 15000,
    instagramFollowingCount: 141,
    bookingPartners: [
      {
        label: "The Fork",
        url: "https://www.thefork.co.uk/restaurant/turkuaz-restaurant-feltham-r825545",
      },
    ],
  },
  {
    slug: "crawley",
    name: "Crawley",
    area: "West Sussex",
    address: "45-47A High Street, Crawley RH10 1BQ",
    phone: "07474 030076",
    hours: "Mon–Fri 12:00–22:00, Sat–Sun 12:00–23:00",
    imageUrl: "/photos/crawley-exterior.png",
    menuUrl: "/menus/crawley.pdf",
    drinksMenuUrl: "/menus/crawley-wine-drinks.pdf",
    dessertMenuUrl: "/menus/desserts.pdf",
    mapCoords: [51.115, -0.190],
    uberEatsUrl: "https://www.ubereats.com/gb/store/turkuaz-restaurant-crawley/gM2jyL2lRlqb84087MtkiA",
    deliverooUrl: "https://deliveroo.co.uk/menu/crawley/crawley/turkuaz-crawley",
    justEatUrl: "https://www.just-eat.co.uk/restaurants-turkuaz-restaurant-crawley-crawley/menu",
    instagramHandle: "turkuazrestaurantuk",
    instagramPostUrls: [
      "https://www.instagram.com/p/DUApAjBjGN2/",
      "https://www.instagram.com/p/DTclzoSjENz/",
      "https://www.instagram.com/p/DTQCgaiDBJu/",
      "https://www.instagram.com/p/DSH1VQrDP5s/",
    ],
    instagramThumbnails: [
      "/photos/instagram/post1.jpg",
      "/photos/instagram/post2.jpg",
      "/photos/instagram/post3.jpg",
      "/photos/instagram/post4.jpg",
    ],
    instagramPostsCount: 355,
    instagramFollowersCount: 15000,
    instagramFollowingCount: 141,
  },
  {
    slug: "staines",
    name: "Staines",
    area: "Surrey",
    address: "Tilly's Ln, Staines TW18 4BL",
    phone: "",
    hours: "",
    mapCoords: [51.4339, -0.5091],
    instagramHandle: "turkuazrestaurantuk",
    comingSoon: true,
  },
  {
    slug: "eastleigh",
    name: "Eastleigh",
    area: "Hampshire",
    address: "Unit L2, The Swan Centre, Eastleigh SO50 5SF",
    phone: "",
    hours: "",
    mapCoords: [50.9688, -1.3514],
    instagramHandle: "turkuazrestaurantuk",
    comingSoon: true,
  },
  {
    slug: "crawley-leisure-park",
    name: "Crawley (Leisure Park)",
    area: "West Sussex",
    address: "Unit 5, Leisure Park, Crawley Leisure Park, Kilnmead, Crawley RH10 8LR",
    phone: "",
    hours: "",
    mapCoords: [51.1196, -0.1780],
    instagramHandle: "turkuazrestaurantuk",
    comingSoon: true,
  },
  {
    slug: "trowbridge",
    name: "Trowbridge",
    area: "Wiltshire",
    address: "Leisure Park, St Stephen's Pl, Trowbridge BA14 8TQ",
    phone: "",
    hours: "",
    instagramHandle: "turkuazrestaurantuk",
    comingSoon: true,
  },
];

export function getBranchBySlug(slug: string): Branch | undefined {
  return branches.find((b) => b.slug === slug);
}
