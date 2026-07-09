import type { NavLink, Language } from "@/lib/types";

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Explore", href: "/explore" },
  { label: "Bathrooms", href: "/bathrooms" },
  { label: "Products", href: "/products" },
  { label: "Catalogue", href: "/catalogue" },
  { label: "Contact Us", href: "/contact" },
];

export const LANGUAGES: Language[] = [
  { code: "EN", label: "English" },
  { code: "FR", label: "Français" },
  { code: "IT", label: "Italiano" },
];

export const FOOTER_QUICK_LINKS = [
  { label: "Explore", href: "/explore" },
  { label: "Products", href: "/products" },
  { label: "Bathrooms", href: "/bathrooms" },
  { label: "Catalogue", href: "/catalogue" },
  { label: "Contact Us", href: "/contact" },
];

export const FOOTER_CORPORATE_LINKS = [
  { label: "Our Story", href: "/about" },
  { label: "Chairman Message", href: "/about" },
  { label: "News & Media", href: "/contact" },
  { label: "Career", href: "/contact" },
];
