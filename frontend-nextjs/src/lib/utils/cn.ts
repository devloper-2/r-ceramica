/**
 * cn.ts — Lightweight class-name merger.
 *
 * Merges conditional class strings without a dependency on clsx or tailwind-merge.
 * Handles strings, undefined, null, false, and arrays.
 *
 * Usage:
 *   cn("base-class", isActive && "active", undefined)
 *   // → "base-class active"
 *
 *   cn("px-4", ["py-2", "rounded"], condition ? "bg-white" : "bg-black")
 *   // → "px-4 py-2 rounded bg-white"   (or bg-black)
 */

type ClassValue = string | undefined | null | false | ClassValue[];

export function cn(...classes: ClassValue[]): string {
  return classes
    .flat(Infinity as 1)
    .filter(Boolean)
    .join(" ");
}
