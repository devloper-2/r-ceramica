/**
 * services/checkout.ts — Razorpay checkout, called from the browser at runtime.
 *
 * Flow:
 *   1. POST /checkout/order  → server computes the real total and creates a
 *      Razorpay order, returning its id + amount + public key.
 *   2. Razorpay modal collects payment (card/UPI/etc.) securely — we never
 *      touch raw card data.
 *   3. POST /checkout/verify → server verifies the payment signature and
 *      persists the order, returning the order number.
 */
import type { CartLine } from "./cart";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api/v1";

export interface CheckoutCustomer {
  name: string;
  email: string;
  phone?: string;
}

export interface CheckoutResult {
  orderNumber: string;
  status: string;
  total: number;
  currency: string;
  email: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RazorpayCtor = new (options: any) => { open: () => void };

declare global {
  interface Window {
    Razorpay?: RazorpayCtor;
  }
}

let scriptPromise: Promise<void> | null = null;

function loadRazorpay(): Promise<void> {
  if (typeof window === "undefined") return Promise.reject(new Error("no window"));
  if (window.Razorpay) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise<void>((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Failed to load Razorpay."));
    document.body.appendChild(s);
  });
  return scriptPromise;
}

async function postJson<T>(path: string, body: unknown, token?: string | null): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json?.message || json?.error || `Request failed (${res.status})`);
  }
  return json.data as T;
}

interface OrderResponse {
  razorpayOrderId: string;
  amount: number;
  currency: string;
  keyId: string;
}

/** Runs the full pay → verify flow, opening the Razorpay modal. */
export async function payWithRazorpay(opts: {
  items: CartLine[];
  customer: CheckoutCustomer;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  shipping?: Record<string, any>;
  /** Bearer token so the order links to the signed-in customer. */
  token?: string | null;
  onSuccess: (result: CheckoutResult) => void;
  onError: (message: string) => void;
  onDismiss?: () => void;
}): Promise<void> {
  const lineItems = opts.items.map((l) => ({ slug: l.slug, quantity: l.quantity }));

  try {
    await loadRazorpay();
    const order = await postJson<OrderResponse>("/checkout/order", { items: lineItems });

    const rzp = new window.Razorpay!({
      key: order.keyId,
      amount: order.amount,
      currency: order.currency,
      order_id: order.razorpayOrderId,
      name: "R Ceramica",
      description: "Order payment",
      prefill: {
        name: opts.customer.name,
        email: opts.customer.email,
        contact: opts.customer.phone,
      },
      theme: { color: "#c5a059" },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      handler: async (resp: any) => {
        try {
          const result = await postJson<CheckoutResult>("/checkout/verify", {
            razorpay_order_id: resp.razorpay_order_id,
            razorpay_payment_id: resp.razorpay_payment_id,
            razorpay_signature: resp.razorpay_signature,
            items: lineItems,
            customer: opts.customer,
            shipping: opts.shipping,
          }, opts.token);
          opts.onSuccess(result);
        } catch (e) {
          opts.onError(e instanceof Error ? e.message : "Payment verification failed.");
        }
      },
      modal: { ondismiss: () => opts.onDismiss?.() },
    });
    rzp.open();
  } catch (e) {
    opts.onError(e instanceof Error ? e.message : "Could not start checkout.");
  }
}
