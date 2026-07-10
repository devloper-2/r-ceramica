/**
 * utils/icons.ts — Maps icon NAME strings (from the CMS API) back to
 * lucide-react icon components.
 *
 * The database stores `icon: "Building2"` (a string) because JSON can't hold a
 * React component. Section data files used to hold the component directly; this
 * bridges the two. Register any icon used by CMS content here.
 */
import {
  Building2,
  Globe,
  Headset,
  Smartphone,
  Gem,
  Leaf,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { FeatureCard } from "@/lib/types";

const ICONS: Record<string, LucideIcon> = {
  Building2,
  Globe,
  Headset,
  Smartphone,
  Gem,
  Leaf,
  ShieldCheck,
  Users,
};

/** Resolve an icon by name; falls back to Building2 for unknown names. */
export function iconByName(name: string): LucideIcon {
  return ICONS[name] ?? Building2;
}

/**
 * Given feature-card content whose `icon` may be a string name (from the CMS)
 * or already a lucide component (static fallback), return `FeatureCard[]` with
 * `icon` resolved to the lucide component the section expects.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function resolveCardIcons(cards: any[]): FeatureCard[] {
  return cards.map((c) => ({
    ...c,
    icon: typeof c.icon === "string" ? iconByName(c.icon) : (c.icon as LucideIcon),
  })) as FeatureCard[];
}
