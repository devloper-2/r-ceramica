/**
 * cart.ts — DATA for the /cart and /checkout pages (ported from cart.html /
 * checkout.html). Demo cart — no persistence.
 */

export interface CartItem {
  id: number;
  category: string;
  name: string;
  price: number;
  qty: number;
  img: string;
}

export const CART_ITEMS: CartItem[] = [
  {
    id: 1,
    category: "Faucets",
    name: "AURA MATTE BLACK TAP",
    price: 2450,
    qty: 1,
    img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    category: "Tiles",
    name: "VENATO CARRARA MARBLE",
    price: 1890,
    qty: 1,
    img: "https://images.unsplash.com/photo-1615529182906-134d12bbd61c?auto=format&fit=crop&q=80",
  },
];

export const CART_SUMMARY = {
  subtotal: 4340,
  tax: 347,
  total: 4687,
};

export const PAYMENT_LOGOS = [
  { src: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg", alt: "Visa", className: "h-2" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg", alt: "Mastercard", className: "h-4" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg", alt: "PayPal", className: "h-3" },
];
