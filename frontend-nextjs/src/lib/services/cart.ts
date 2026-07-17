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

/** Fired on any cart mutation so the navbar badge and cart page stay in sync. */
export const CART_EVENT = "rc-cart-changed";

export function getCart(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartLine[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCart(lines: CartLine[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(lines));
  window.dispatchEvent(new Event(CART_EVENT));
}

/** Total number of units across all lines — for the navbar badge. */
export function cartCount(lines: CartLine[] = getCart()): number {
  return lines.reduce((sum, l) => sum + l.quantity, 0);
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

/** Set an exact quantity for a line (0 removes it). Used by grid steppers. */
export function setCartQuantity(line: CartLine): void {
  const cart = getCart();
  if (line.quantity <= 0) {
    saveCart(cart.filter((l) => l.slug !== line.slug));
    return;
  }
  const existing = cart.find((l) => l.slug === line.slug);
  if (existing) {
    existing.quantity = line.quantity;
    existing.name = line.name;
    existing.price = line.price;
    existing.image = line.image;
  } else {
    cart.push(line);
  }
  saveCart(cart);
}

export function clearCart(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
  window.dispatchEvent(new Event(CART_EVENT));
}

export function cartSubtotal(lines: CartLine[]): number {
  return lines.reduce((sum, l) => sum + l.price * l.quantity, 0);
}
