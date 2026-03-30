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
  mapEmbedUrl?: string;
  imageUrl?: string;
  /** Map center: [lat, lng] */
  mapCoords?: [number, number];
  /** Instagram handle - add per branch later for live stats & photos */
  instagramHandle?: string;
  /** Instagram post URLs for embed carousel - add per branch later */
  instagramPostUrls?: string[];
  /** Live stats when Instagram connected */
  instagramPostsCount?: number;
  instagramFollowersCount?: number;
  instagramFollowingCount?: number;
  /** Branch-specific menu category images */
  menuImages?: { appetizers?: string; mains?: string; desserts?: string };
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
    mapCoords: [51.250, -0.770],
    instagramHandle: "turkuazrestaurantuk",
    instagramPostsCount: 355,
    instagramFollowersCount: 15000,
    instagramFollowingCount: 141,
    menuImages: {
      appetizers: "/photos/aldershot-appetizers.jpg",
      mains: "/photos/aldershot-mains.jpg",
      desserts: "/photos/aldershot-desserts.png",
    },
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
    mapCoords: [51.443, -0.404],
    instagramHandle: "turkuazrestaurantuk",
    instagramPostsCount: 355,
    instagramFollowersCount: 15000,
    instagramFollowingCount: 141,
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
    mapCoords: [51.115, -0.190],
    instagramHandle: "turkuazrestaurantuk",
    instagramPostsCount: 355,
    instagramFollowersCount: 15000,
    instagramFollowingCount: 141,
  },
  {
    slug: "london",
    name: "East Ham",
    area: "",
    address: "",
    phone: "",
    hours: "",
    comingSoon: true,
  },
];

export function getBranchBySlug(slug: string): Branch | undefined {
  return branches.find((b) => b.slug === slug);
}
