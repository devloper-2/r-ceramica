export interface StaticProductImage {
  path: string;
  alt_text?: string;
}

export interface StaticProduct {
  id: number;
  slug: string;
  name: string;

  short_description: string;
  description: string;

  price: number;
  currency: "INR";

  specs: Record<string, string>;

  images: StaticProductImage[];

  image_2d?: string;
  image_3d?: string;

  category_slug: string;
  category_name: string;

  subcategory_slug: string;
  subcategory_name: string;
}

export const STATIC_PRODUCTS: StaticProduct[] = [
  {
    id: 1,

    slug: "architectural-surfaces",

    name: "Architectural Surfaces",

    short_description:
      "Curated porcelain systems for high-envelope architecture.",

    description:
      "A refined collection of premium porcelain surfaces engineered for contemporary architecture, hospitality environments and luxury interiors.",

    price: 2499,
    currency: "INR",

    specs: {
      Code: "ARC-001",
      Material: "Premium Porcelain",
      Finish: "Matt",
      Thickness: "9 mm",
      Size: "1200 × 600 mm",
      Application: "Floor & Wall",
      Surface: "Architectural",
      Installation: "Professional Installation Recommended",
    },

    images: [
      {
        path:
          "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=1600",
        alt_text: "Architectural porcelain surfaces",
      },
      {
        path:
          "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80&w=1600",
        alt_text: "Luxury architectural surface",
      },
      {
        path:
          "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1600",
        alt_text: "Premium interior surface",
      },
    ],

    category_slug: "surfaces",
    category_name: "Surfaces",

    subcategory_slug: "architectural-surfaces",
    subcategory_name: "Architectural Surfaces",
  },

  {
    id: 2,

    slug: "luxury-showers",

    name: "Luxury Showers",

    short_description:
      "Advanced hydro-therapy systems designed for the ultimate wellness experience.",

    description:
      "A sophisticated shower collection combining precision engineering, contemporary aesthetics and advanced water-flow technology.",

    price: 18999,
    currency: "INR",

    specs: {
      Code: "SHW-001",
      Material: "Brass",
      Finish: "Polished Chrome",
      Installation: "Wall Mounted",
      WaterFlow: "High Performance",
      Technology: "Hydro-Therapy",
      Warranty: "5 Years",
    },

    images: [
      {
        path:
          "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1600",
        alt_text: "Luxury shower system",
      },
      {
        path:
          "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&q=80&w=1600",
        alt_text: "Designer shower",
      },
      {
        path:
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=1600",
        alt_text: "Premium bathroom shower",
      },
    ],

    category_slug: "bathware",
    category_name: "Bathware",

    subcategory_slug: "showers",
    subcategory_name: "Luxury Showers",
  },

  {
    id: 3,

    slug: "artisan-faucets",

    name: "Artisan Faucets",

    short_description:
      "Precision engineered hardware defining the intersection of fluid dynamics and sculpture.",

    description:
      "Sculptural faucets engineered with precision brass construction and refined finishes for contemporary luxury bathrooms.",

    price: 7499,
    currency: "INR",

    specs: {
      Code: "FAU-001",
      Material: "Brass",
      Finish: "Blush Gold PVD",
      Mounting: "Deck Mounted",
      Cartridge: "Ceramic Cartridge",
      WaterFlow: "5–7 LPM",
      Warranty: "10 Years",
    },

    images: [
      {
        path:
          "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1600",
        alt_text: "Artisan brass faucet",
      },
      {
        path:
          "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=1600",
        alt_text: "Luxury bathroom faucet",
      },
      {
        path:
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1600",
        alt_text: "Designer faucet",
      },
    ],

    category_slug: "bathware",
    category_name: "Bathware",

    subcategory_slug: "faucets",
    subcategory_name: "Artisan Faucets",
  },

  {
    id: 4,

    slug: "sanitary-form",

    name: "Sanitary Form",

    short_description:
      "High-performance water closets connecting ergonomic form and sustainability for contemporary living.",

    description:
      "Contemporary sanitaryware designed around ergonomic comfort, efficient water consumption and clean architectural form.",

    price: 15999,
    currency: "INR",

    specs: {
      Code: "SAN-001",
      Material: "Vitreous China",
      Finish: "White",
      Type: "Floor Mounted",
      Flush: "Dual Flush",
      WaterConsumption: "3/6 L",
      Seat: "Soft Close",
      Warranty: "10 Years",
    },

    images: [
      {
        path:
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=1600",
        alt_text: "Contemporary sanitaryware",
      },
      {
        path:
          "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1600",
        alt_text: "Modern bathroom sanitaryware",
      },
      {
        path:
          "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=1600",
        alt_text: "Luxury bathroom",
      },
    ],

    category_slug: "sanitaryware",
    category_name: "Sanitaryware",

    subcategory_slug: "water-closets",
    subcategory_name: "Sanitary Form",
  },

  {
    id: 5,

    slug: "minimal-basins",

    name: "Minimal Basins",

    short_description:
      "Hand-crafted artisan basins that redefine the morning ritual through stone and ceramic textures.",

    description:
      "Minimal vessel basins crafted around soft geometry, refined ceramic surfaces and contemporary bathroom architecture.",

    price: 8999,
    currency: "INR",

    specs: {
      Code: "BAS-001",
      Material: "Ceramic",
      Finish: "Matt White",
      Type: "Countertop Basin",
      Shape: "Round",
      Diameter: "420 mm",
      Overflow: "Without Overflow",
      Installation: "Countertop",
    },

    images: [
      {
        path:
          "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&q=80&w=1600",
        alt_text: "Minimal ceramic basin",
      },
      {
        path:
          "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80&w=1600",
        alt_text: "Luxury countertop basin",
      },
      {
        path:
          "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&q=80&w=1600",
        alt_text: "Designer bathroom basin",
      },
    ],

    category_slug: "bathware",
    category_name: "Bathware",

    subcategory_slug: "basins",
    subcategory_name: "Minimal Basins",
  },

  {
    id: 6,

    slug: "frp-manhole",

    name: "FRP Manhole",

    short_description:
      "A blend of durability and sustainable performance.",

    description:
      "High-strength FRP manhole systems engineered for demanding infrastructure applications with excellent durability and corrosion resistance.",

    price: 4999,
    currency: "INR",

    specs: {
      Code: "FRP-001",
      Material: "FRP Composite",
      Finish: "Industrial",
      LoadClass: "Heavy Duty",
      CorrosionResistance: "High",
      Application: "Infrastructure",
      Maintenance: "Low Maintenance",
      ServiceLife: "Long Life",
    },

    images: [
      {
        path:
          "https://images.unsplash.com/photo-1504274066651-8d31a536b11a?auto=format&fit=crop&q=80&w=1600",
        alt_text: "FRP infrastructure system",
      },
      {
        path:
          "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1600",
        alt_text: "Industrial infrastructure",
      },
    ],

    category_slug: "infrastructure",
    category_name: "Infrastructure",

    subcategory_slug: "frp-manhole",
    subcategory_name: "FRP Manhole",
  },
];

export function getStaticProduct(slug: string) {
  return STATIC_PRODUCTS.find((product) => product.slug === slug);
}