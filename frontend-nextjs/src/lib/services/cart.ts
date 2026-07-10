/**
 * services/cart.ts — Minimal client-side cart persisted in localStorage.
 *
 * The cart only stores product slug + quantity + display fields. The REAL
 * price is always recomputed server-side at checkout, so display prices here
 * are for UX only and can never affect what the customer is charged.
 */

export interface CartLine {
  slug: string;
  name: string;
  price: number; // display only
  image?: string;
  quantity: number;
}

const KEY = "rc_cart_v1";

/** A demo cart of real seeded products so checkout is usable before an
 *  Add-to-Cart flow exists on every product page. */
const DEFAULT_CART: CartLine[] = [
  { slug: "petra-vessel-basin", name: "Petra Vessel Basin", price: 24999, image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=200", quantity: 1 },
  { slug: "luxe-chrome-mixer", name: "Luxe Chrome Basin Mixer", price: 12499, image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=200", quantity: 1 },
];

export function getCart(): CartLine[] {
  if (typeof window === "undefined") return DEFAULT_CART;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return DEFAULT_CART;
    const parsed = JSON.parse(raw) as CartLine[];
    return Array.isArray(parsed) && parsed.length ? parsed : DEFAULT_CART;
  } catch {
    return DEFAULT_CART;
  }
}

export function saveCart(lines: CartLine[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(lines));
}

export function addToCart(line: CartLine): void {
  const cart = getCart();
  const existing = cart.find((l) => l.slug === line.slug);
  if (existing) {
    existing.quantity += line.quantity;
  } else {
    cart.push(line);
  }
  saveCart(cart);
}

export function clearCart(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
}

export function cartSubtotal(lines: CartLine[]): number {
  return lines.reduce((sum, l) => sum + l.price * l.quantity, 0);
}
