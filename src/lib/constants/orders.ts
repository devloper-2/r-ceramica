/**
 * orders.ts — DATA for the /orders page (ported from orders.html).
 */

export interface OrderSummary {
  id: string;
  status: string;
  statusTone: "active" | "muted";
  title: string;
  meta: string;
  total: string;
  action: { label: string; href: string; primary: boolean };
}

export const ORDERS: OrderSummary[] = [
  {
    id: "#RC-892401-EX",
    status: "In Transit",
    statusTone: "active",
    title: "Winter Nightingale Selection",
    meta: "Ordered on May 12, 2026 • 2 Items",
    total: "$4,687.00",
    action: { label: "Track Order", href: "/tracking", primary: true },
  },
  {
    id: "#RC-721589-EX",
    status: "Delivered",
    statusTone: "muted",
    title: "Minimalist Office Suite",
    meta: "Ordered on April 05, 2026 • 4 Items",
    total: "$12,450.00",
    action: { label: "Order Details", href: "/order-details", primary: false },
  },
];
