import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Minus,
  Plus,
  Trash2,
  Truck,
  ShieldCheck,
  MessageSquare,
  Tag,
} from "lucide-react";

import { siteConfig } from "@/config/site";
import {
  getCart,
  saveCart,
  cartSubtotal,
  type CartLine,
} from "@/lib/services/cart";
import { isAuthenticated } from "@/lib/services/auth";

function fmt(n: number) {
  return "₹ " + n.toLocaleString("en-IN");
}

export default function CartPage() {
  const router = useRouter();

  const [items, setItems] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  /* ─────────────────────────────────────────────
     CART INITIALIZATION
  ───────────────────────────────────────────── */

  useEffect(() => {
    setItems(getCart());
    setReady(true);
  }, []);

  /* ─────────────────────────────────────────────
     CART STATE
  ───────────────────────────────────────────── */

  function commit(next: CartLine[]) {
    setItems(next);
    saveCart(next);
  }

  function updateQty(slug: string, delta: number) {
    commit(
      items
        .map((item) =>
          item.slug === slug
            ? {
                ...item,
                quantity: Math.max(1, item.quantity + delta),
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  function setQty(slug: string, value: number) {
    const quantity = Math.max(1, value || 1);

    commit(
      items.map((item) =>
        item.slug === slug
          ? {
              ...item,
              quantity,
            }
          : item,
      ),
    );
  }

  function removeItem(slug: string) {
    commit(items.filter((item) => item.slug !== slug));
  }

  /* ─────────────────────────────────────────────
     CHECKOUT
  ───────────────────────────────────────────── */

  function goToCheckout() {
    if (isAuthenticated()) {
      router.push("/checkout");
    } else {
      router.push("/login?redirect=/checkout");
    }
  }

  /* ─────────────────────────────────────────────
     TOTALS
  ───────────────────────────────────────────── */

  const subtotal = cartSubtotal(items);

  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;

  const total = subtotal - discount;

  /* ─────────────────────────────────────────────
     RENDER
  ───────────────────────────────────────────── */

  return (
    <div className="page-cart">
      <Head>
        <title>{`Your Cart | ${siteConfig.name}`}</title>

        <meta
          name="description"
          content="Review your curated R Ceramica selections before checkout."
        />

        <link rel="canonical" href={`${siteConfig.url}/cart/`} />

        <meta name="robots" content="noindex" />
      </Head>

      <main className="pt-28 md:pt-36 lg:pt-40 pb-12 md:pb-20 min-h-screen">
        {/* ═══════════════════════════════════════
            MAIN CONTAINER
        ═══════════════════════════════════════ */}

        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10 lg:px-14 xl:px-16">
          {/* ═══════════════════════════════════════
              TOP NAVIGATION
          ═══════════════════════════════════════ */}

          <div
            className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8 md:mb-10 cart-slide-up"
            style={{ animationDelay: "0s" }}
          >
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-white/40 hover:text-white transition-colors duration-300"
            >
              <ArrowLeft size={13} />
              Continue Shopping
            </Link>

            <Link
              href="/orders"
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-[#c5a059]/80 hover:text-[#c5a059] transition-all duration-300 border border-[#c5a059]/30 px-5 py-2.5 rounded-sm hover:bg-[#c5a059]/10 hover:-translate-y-0.5"
            >
              View Past Orders
            </Link>
          </div>

          {/* ═══════════════════════════════════════
              PAGE HEADER
          ═══════════════════════════════════════ */}

          <header
            className="mb-8 md:mb-12 cart-slide-up"
            style={{ animationDelay: "0.05s" }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display italic font-light mb-3 text-white/95 tracking-tight">
              Your Order
            </h1>

            <p className="text-white/30 tracking-[0.25em] text-[9px] md:text-[11px] uppercase">
              Review and finalize your curated spaces
            </p>
          </header>

          {/* ═══════════════════════════════════════
              MAIN CART CONTENT
          ═══════════════════════════════════════ */}

          <div className="flex flex-col gap-8 md:gap-10 lg:gap-12">
            {/* ═══════════════════════════════════
                FULL WIDTH CART PRODUCTS
            ═══════════════════════════════════ */}

            <section
              className="w-full cart-slide-up"
              style={{ animationDelay: "0.1s" }}
            >
              {/* ── Column Header ── */}

              {items.length > 0 && (
                <div className="hidden md:grid grid-cols-[minmax(280px,1fr)_180px_180px_180px_40px] items-center gap-6 pb-4 border-b border-white/10 text-[9px] uppercase tracking-[0.3em] font-medium text-white/30">
                  <div>Product</div>

                  <div className="text-center">Unit Price</div>

                  <div className="text-center">Quantity</div>

                  <div className="text-right">Total</div>

                  <div />
                </div>
              )}

              {/* ═══════════════════════════════════
                  EMPTY CART
              ═══════════════════════════════════ */}

              {ready && items.length === 0 && (
                <div className="py-24 md:py-32 flex flex-col items-center gap-6 text-center border border-white/5">
                  <div className="w-16 h-16 border border-white/10 flex items-center justify-center">
                    <Tag size={24} className="text-white/20" />
                  </div>

                  <div>
                    <p className="text-lg font-display font-light uppercase tracking-widest mb-2">
                      Your cart is empty
                    </p>

                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">
                      Discover our curated collections
                    </p>
                  </div>

                  <Link
                    href="/explore"
                    className="mt-2 px-8 py-4 bg-white text-black text-[9px] uppercase tracking-[0.4em] font-bold hover:bg-neutral-200 transition-all duration-300 hover:-translate-y-1"
                  >
                    Browse Collections
                  </Link>
                </div>
              )}

              {/* ═══════════════════════════════════
                  PRODUCT ROWS
              ═══════════════════════════════════ */}

              <div>
                {items.map((item, index) => (
                  <div
                    key={item.slug}
                    className="cart-item-row cart-slide-up group relative py-7 md:py-9 lg:py-10 border-b border-white/5"
                    style={{
                      animationDelay: `${0.12 + index * 0.08}s`,
                    }}
                  >
                    {/* Gold hover line */}

                    <span className="absolute left-0 bottom-0 h-px w-0 bg-[#c5a059] transition-all duration-700 group-hover:w-full" />

                    {/* ═══════════════════════════
                        DESKTOP PRODUCT ROW
                    ═══════════════════════════ */}

                    <div className="hidden md:grid grid-cols-[minmax(280px,1fr)_180px_180px_180px_40px] items-center gap-6">
                      {/* ── Product ── */}

                      <div className="flex items-center gap-8 min-w-0">
                        <div className="relative w-32 h-36 lg:w-40 lg:h-48 bg-[#111] overflow-hidden shrink-0 cart-image-reveal">
                          {item.image && (
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              sizes="160px"
                              className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                            />
                          )}
                        </div>

                        <div className="min-w-0">
                          <span className="text-[9px] uppercase tracking-[0.3em] text-[#c5a059] mb-2 block">
                            R Ceramica
                          </span>

                          <Link
                            href={`/products/${item.slug}`}
                            className="text-lg lg:text-2xl font-display font-light tracking-wide uppercase hover:text-[#c5a059] transition-colors duration-300 block"
                          >
                            {item.name}
                          </Link>
                        </div>
                      </div>

                      {/* ── Unit Price ── */}

                      <div className="text-center text-sm lg:text-base font-light text-white/60">
                        {fmt(item.price)}
                      </div>

                      {/* ── Quantity ── */}

                      <div className="flex justify-center">
                        <div className="flex items-center border border-white/10 rounded-full px-4 py-2.5 gap-2 transition-all duration-300 group-hover:border-white/20">
                          <button
                            onClick={() => updateQty(item.slug, -1)}
                            className="text-white/30 hover:text-white p-1.5 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={12} />
                          </button>

                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) =>
                              setQty(item.slug, Number(e.target.value))
                            }
                            className="cart-qty w-10 bg-transparent text-center text-sm focus:outline-none text-white"
                          />

                          <button
                            onClick={() => updateQty(item.slug, 1)}
                            className="text-white/30 hover:text-white p-1.5 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>

                      {/* ── Total ── */}

                      <div className="text-right text-base lg:text-lg font-medium text-[#c5a059] transition-transform duration-300 group-hover:translate-x-1">
                        {fmt(item.price * item.quantity)}
                      </div>

                      {/* ── Delete ── */}

                      <button
                        onClick={() => removeItem(item.slug)}
                        className="flex justify-end text-red-500/30 hover:text-red-500 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    {/* ═══════════════════════════
                        MOBILE PRODUCT ROW
                    ═══════════════════════════ */}

                    <div className="md:hidden">
                      <div className="flex gap-4">
                        {/* Image */}

                        <div className="relative w-24 h-28 bg-[#111] overflow-hidden shrink-0 cart-image-reveal">
                          {item.image && (
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              sizes="96px"
                              className="object-cover"
                            />
                          )}
                        </div>

                        {/* Product content */}

                        <div className="flex-1 min-w-0">
                          <span className="text-[8px] uppercase tracking-[0.25em] text-[#c5a059] block mb-1">
                            R Ceramica
                          </span>

                          <Link
                            href={`/products/${item.slug}`}
                            className="text-sm font-display font-light uppercase tracking-wide text-white block"
                          >
                            {item.name}
                          </Link>

                          <p className="text-xs text-white/40 mt-2">
                            {fmt(item.price)}
                          </p>

                          <div className="flex items-center justify-between mt-4">
                            {/* Quantity */}

                            <div className="flex items-center border border-white/10 rounded-full px-3 py-1.5 gap-1">
                              <button
                                onClick={() => updateQty(item.slug, -1)}
                                className="text-white/30 hover:text-white p-1"
                                aria-label="Decrease quantity"
                              >
                                <Minus size={11} />
                              </button>

                              <input
                                type="number"
                                value={item.quantity}
                                onChange={(e) =>
                                  setQty(item.slug, Number(e.target.value))
                                }
                                className="w-7 bg-transparent text-center text-xs text-white focus:outline-none"
                              />

                              <button
                                onClick={() => updateQty(item.slug, 1)}
                                className="text-white/30 hover:text-white p-1"
                                aria-label="Increase quantity"
                              >
                                <Plus size={11} />
                              </button>
                            </div>

                            {/* Delete */}

                            <button
                              onClick={() => removeItem(item.slug)}
                              className="text-red-500/50 hover:text-red-500 p-2"
                              aria-label="Remove item"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Mobile total */}

                      {/* ── Product Subtotal ── */}
                      <div className="mt-5 pt-4 border-t border-white/[0.08] flex items-end justify-between">
                        <div>
                          <span className="block text-[8px] uppercase tracking-[0.3em] text-white/25 mb-1">
                            Product Subtotal
                          </span>

                          <span className="text-[9px] text-white/35 tracking-wide">
                            {item.quantity} × {fmt(item.price)}
                          </span>
                        </div>

                        <span className="text-base font-medium tracking-wide text-[#c5a059]">
                          {fmt(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* ═══════════════════════════════════
                  SERVICE CARDS
              ═══════════════════════════════════ */}

              <div className="mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-5">
                {[
                  {
                    icon: <Truck size={18} className="text-[#c5a059]" />,
                    title: "Shipping",
                    body: "Professional installation available.",
                  },
                  {
                    icon: <ShieldCheck size={18} className="text-[#c5a059]" />,
                    title: "Guarantee",
                    body: "Lifetime structural assurance.",
                  },
                  {
                    icon: (
                      <MessageSquare size={18} className="text-[#c5a059]" />
                    ),
                    title: "Support",
                    body: "24/7 dedicated concierge.",
                  },
                ].map(({ icon, title, body }, index) => (
                  <div
                    key={index}
                    className="cart-glass p-5 md:p-6 lg:p-7 rounded-xl md:rounded-2xl text-center md:text-left transition-all duration-500 hover:border-[#c5a059]/20 hover:-translate-y-1"
                  >
                    <div className="mb-3 w-full flex justify-center md:justify-start">
                      {icon}
                    </div>

                    <h4 className="text-[9px] md:text-[10px] uppercase tracking-[0.25em] font-medium mb-2 text-white">
                      {title}
                    </h4>

                    <p className="text-[8px] md:text-[9px] text-white/30 leading-relaxed uppercase">
                      {body}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* ═══════════════════════════════════════
                FULL WIDTH ORDER SUMMARY
            ═══════════════════════════════════════ */}

            <section
              className="w-full cart-slide-up mt-0 md:mt-2"
              style={{ animationDelay: "0.25s" }}
            >
              <div className="w-full">
                <div className="cart-glass relative overflow-hidden p-5 sm:p-7 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl">
                  {/* Luxury top accents */}

                  <div className="absolute top-0 left-0 w-24 h-px bg-[#c5a059]/70" />

                  <div className="absolute top-0 right-0 w-24 h-px bg-[#c5a059]/20" />

                  {/* ═════════════════════════════
                      SUMMARY CONTENT
                  ═════════════════════════════ */}

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-6 md:gap-8 items-center">
                    {/* ── Subtotal ── */}

                    <div className="md:col-span-2">
                      <span className="block text-[8px] uppercase tracking-[0.3em] text-white/30 mb-2">
                        Subtotal
                      </span>

                      <span className="text-sm md:text-base text-white">
                        {fmt(subtotal)}
                      </span>
                    </div>

                    {/* ── Shipping ── */}

                    <div className="md:col-span-2">
                      <span className="block text-[8px] uppercase tracking-[0.3em] text-white/30 mb-2">
                        Shipping
                      </span>

                      <span className="text-sm md:text-base text-[#c5a059]">
                        Free
                      </span>
                    </div>

                    {/* ── Promo ── */}

                    <div className="sm:col-span-2 md:col-span-4">
                      <span className="block text-[8px] uppercase tracking-[0.3em] text-white/30 mb-2">
                        Promotional Code
                      </span>

                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="PROMO CODE"
                          value={promoCode}
                          onChange={(e) =>
                            setPromoCode(e.target.value.toUpperCase())
                          }
                          className="flex-1 min-w-0 bg-white/5 border border-white/10 rounded-full px-5 py-3.5 text-[9px] tracking-widest focus:outline-none focus:border-white/25 uppercase text-white placeholder:text-white/20 transition-all duration-300"
                        />

                        <button
                          onClick={() => {
                            if (promoCode === "RCERA10") {
                              setPromoApplied(true);
                            }
                          }}
                          className="bg-white/10 text-white px-6 py-3.5 rounded-full text-[9px] font-bold tracking-widest hover:bg-white hover:text-black transition-all duration-300"
                        >
                          OK
                        </button>
                      </div>

                      {/* Promo success */}

                      {promoApplied && (
                        <p className="text-[8px] uppercase tracking-[0.2em] text-green-400/70 mt-2 pl-2">
                          ✓ 10% discount applied
                        </p>
                      )}

                      {/* Promo error */}

                      {promoCode && !promoApplied && promoCode.length >= 4 && (
                        <p className="text-[8px] uppercase tracking-[0.2em] text-red-400/60 mt-2 pl-2">
                          Invalid code. Try RCERA10
                        </p>
                      )}
                    </div>

                    {/* ── Total ── */}

                    <div className="md:col-span-2 md:border-l md:border-white/10 md:pl-8">
                      <span className="block text-[8px] uppercase tracking-[0.3em] text-white/30 mb-2">
                        Total
                      </span>

                      <span className="text-2xl md:text-3xl lg:text-4xl font-display font-light tracking-tighter text-white">
                        {fmt(total)}
                      </span>
                    </div>

                    {/* ── Checkout ── */}

                    <div className="md:col-span-2">
                      <button
                        onClick={goToCheckout}
                        disabled={items.length === 0}
                        className={`group relative w-full py-4 rounded-full text-[9px] md:text-[10px] font-bold tracking-[0.25em] uppercase overflow-hidden transition-all duration-500 shadow-xl ${
                          items.length > 0
                            ? "bg-[#c5a059] text-white hover:bg-[#b8935a] shadow-[#c5a059]/20 hover:-translate-y-1"
                            : "bg-white/10 text-white/30 cursor-not-allowed"
                        }`}
                      >
                        {/* Hover shine */}

                        {items.length > 0 && (
                          <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        )}

                        <span className="relative z-10">
                          {items.length > 0
                            ? "Proceed to Checkout"
                            : "Cart is Empty"}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* ═════════════════════════════
                      DISCOUNT
                  ═════════════════════════════ */}

                  {discount > 0 && (
                    <div className="mt-6 pt-5 border-t border-white/5 flex justify-between items-center">
                      <span className="text-[8px] uppercase tracking-[0.3em] text-green-400/60">
                        Promotion Applied
                      </span>

                      <span className="text-[10px] text-green-400/70">
                        − {fmt(discount)}
                      </span>
                    </div>
                  )}

                  {/* ═════════════════════════════
                      PAYMENT FOOTER
                  ═════════════════════════════ */}

                  <div className="mt-6 pt-5 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    {/* Payment logos */}

                    <div className="flex items-center gap-5 opacity-25 grayscale">
                      {/* VISA */}

                      <svg
                        viewBox="0 0 750 471"
                        className="h-3 w-auto fill-white"
                      >
                        <path d="M278.2 348.5 311.8 124H361L327.4 348.5H278.2ZM524.3 128.8c-9.3-3.5-23.9-7.3-42.1-7.3-46.4 0-79.1 23.3-79.3 56.6-.3 24.6 23.2 38.4 40.9 46.6 18.2 8.4 24.3 13.8 24.2 21.3-.1 11.5-14.5 16.7-27.9 16.7-18.7 0-28.6-2.6-43.9-9l-6-2.7-6.5 38.1c10.9 4.7 31 8.9 51.9 9.1 48.9 0 80.6-22.9 81-58.4.4-19.4-12.3-34.2-39.1-46.4-16.3-7.9-26.3-13.2-26.2-21.2 0-7.1 8.5-14.7 26.8-14.7 15.3-.2 26.4 3.1 35 6.5l4.2 2 6.2-35.2h-.2ZM628.6 124h-36.2c-11.2 0-19.6 3.1-24.5 14.4L495 348.5h48.9l9.8-25.6 59.6.1 5.6 25.5H661L628.6 124ZM566.2 289.4l18.5-47.6c-.2.4 3.8-9.8 6.1-16.2l3.1 14.6 10.7 49.2h-38.4ZM232.4 124l-46 152.5-4.9-23.9c-8.5-27.3-35-56.9-64.6-71.7l42 157.6h49.2l73.2-214.5h-48.9Z" />

                        <path
                          fill="white"
                          d="M131.7 124H57.8l-.6 3.4c57.4 13.9 95.4 47.4 111.2 87.7L151.3 138.4c-2.8-11-10.9-14.1-19.6-14.4Z"
                        />
                      </svg>

                      {/* MASTERCARD */}

                      <svg viewBox="0 0 38 24" className="h-5 w-auto">
                        <rect width="38" height="24" rx="2" fill="none" />

                        <circle
                          cx="15"
                          cy="12"
                          r="7"
                          fill="white"
                          opacity=".7"
                        />

                        <circle
                          cx="23"
                          cy="12"
                          r="7"
                          fill="white"
                          opacity=".7"
                        />
                      </svg>

                      {/* UPI */}

                      <span className="text-[10px] font-bold tracking-widest text-white">
                        UPI
                      </span>
                    </div>

                    {/* Security */}

                    <p className="text-center sm:text-right text-[8px] uppercase tracking-[0.2em] text-white/20">
                      Secure · Encrypted · Trusted
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
