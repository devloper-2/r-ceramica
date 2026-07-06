import type { ReactNode } from "react";

// ─── Navigation ───────────────────────────────────────────────────────────────
export interface NavLink {
  label: string;
  href: string;
}

export interface Language {
  code: string;
  label: string;
}

// ─── Carousel ─────────────────────────────────────────────────────────────────
export interface CarouselSlide {
  title: string;
  subtitle: string;
  videoSrc: string;
}

// ─── Space Cards ──────────────────────────────────────────────────────────────
export interface SpaceCard {
  label: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
}

// ─── Business Cards ───────────────────────────────────────────────────────────
export interface BusinessCard {
  title: string;
  description: string;
  linkLabel: string;
  href: string;
  icon: ReactNode;
  inverted?: boolean;
}

// ─── Social ───────────────────────────────────────────────────────────────────
export interface SocialLink {
  platform: string;
  href: string;
  ariaLabel: string;
}

export interface SocialPost {
  imageSrc: string;
  imageAlt: string;
  id: number;
}

// ─── Footer ───────────────────────────────────────────────────────────────────
export interface FooterColumn {
  heading: string;
  links: { label: string; href: string }[];
}
