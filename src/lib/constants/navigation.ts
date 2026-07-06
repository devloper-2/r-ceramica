import type { NavLink, Language } from "@/lib/types";

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Tiles", href: "/tiles" },
  { label: "Bathrooms", href: "/bathrooms" },
  { label: "Accessories", href: "/products" },
  { label: "Catalogue", href: "/catalogue" },
  { label: "Contact Us", href: "/contact" },
];

export const LANGUAGES: Language[] = [
  { code: "EN", label: "English" },
  { code: "FR", label: "Français" },
  { code: "IT", label: "Italiano" },
];

export const FOOTER_QUICK_LINKS = [
  { label: "Tiles", href: "/tiles" },
  { label: "Bathware", href: "/bathrooms" },
  { label: "Visualizer", href: "#" },
  { label: "Projects", href: "#" },
  { label: "Blogs", href: "#" },
];

export const FOOTER_CORPORATE_LINKS = [
  { label: "Our Story", href: "/about" },
  { label: "Chairman Message", href: "#" },
  { label: "News & Media", href: "#" },
  { label: "Career", href: "#" },
];
