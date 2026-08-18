import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  ArrowLeft, Minus, Plus, Trash2,
  Truck, ShieldCheck, MessageSquare, Tag,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { getCart, saveCart, cartSubtotal, type CartLine } from "@/lib/services/cart";
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

  // Cart lives in localStorage — read on mount (client only).
  useEffect(() => {
    setItems(getCart());
    setReady(true);
  }, []);

  /** Persist + reflect a new cart state. */
  function commit(next: CartLine[]) {
    setItems(next);
    saveCart(next);
  }

  function updateQty(slug: string, delta: number) {
    commit(
      items
        .map((it) => (it.slug === slug ? { ...it, quantity: Math.max(1, it.quantity + delta) } : it))
        .filter((it) => it.quantity > 0)
    );
  }

  function setQty(slug: string, value: number) {
    const quantity = Math.max(1, value || 1);
    commit(items.map((it) => (it.slug === slug ? { ...it, quantity } : it)));
  }

  function removeItem(slug: string) {
    commit(items.filter((it) => it.slug !== slug));
  }

  function goToCheckout() {
    if (isAuthenticated()) {
      router.push("/checkout");
    } else {
      router.push("/login?redirect=/checkout");
    }
  }

  const subtotal = cartSubtotal(items);
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const total    = subtotal - discount;

  return (
    <div className="page-cart">
      <Head>
        <title>{`Your Cart | ${siteConfig.name}`}</title>
        <meta name="description" content="Review your curated R Ceramica selections before checkout." />
        <link rel="canonical" href={`${siteConfig.url}/cart`} />
        <meta name="robots" content="noindex" />
      </Head>

      <main className="pt-28 md:pt-44 pb-0 md:pb-20 min-h-screen">
        <div className="max-w-[1440px] mx-auto px-4 md:px-12">

          {/* ── Back link ── */}
          <Link href="/explore"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-white/40 hover:text-white transition-colors mb-10 md:mb-14 cart-slide-up">
            <ArrowLeft size={13} />
            Continue Shopping
          </Link>

          {/* ── Page header ── */}
          <header className="mb-10 md:mb-20 cart-slide-up" style={{ animationDelay: "0.05s" }}>
            <h1 className="text-3xl md:text-6xl font-display italic font-light mb-2 text-white/95 tracking-tight">
              Your Order
            </h1>
            <p className="text-white/30 tracking-[0.25em] text-[9px] md:text-[11px] uppercase">
              Review and finalize your curated spaces
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 xl:gap-24">

            {/* ── Left: Cart Items ── */}
            <div className="lg:col-span-8 cart-slide-up" style={{ animationDelay: "0.1s" }}>

              {/* Column headers (desktop only) */}
              {items.length > 0 && (
                <div className="hidden md:grid grid-cols-12 pb-4 border-b border-white/10 text-[9px] uppercase tracking-[0.3em] font-medium text-white/30">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Unit Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>
              )}

              {/* Empty state */}
              {ready && items.length === 0 && (
                <div className="py-32 flex flex-col items-center gap-6 text-center border border-white/5">
                  <div className="w-16 h-16 border border-white/10 flex items-center justify-center">
                    <Tag size={24} className="text-white/20" />
                  </div>
                  <div>
                    <p className="text-lg font-display font-light uppercase tracking-widest mb-2">Your cart is empty</p>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">Discover our curated collections</p>
                  </div>
                  <Link href="/explore"
                    className="mt-2 px-8 py-4 bg-white text-black text-[9px] uppercase tracking-[0.4em] font-bold hover:bg-neutral-200 transition-colors">
                    Browse Collections
                  </Link>
                </div>
              )}

              {/* Item rows */}
              <div className="divide-y divide-white/5">
                {items.map((item) => (
                  <div key={item.slug} className="cart-item-row py-6 md:py-10">
                    <div className="flex flex-row gap-4 md:gap-0 md:items-center relative">

                      {/* Image */}
                      <div className="relative w-20 h-24 md:w-32 md:h-44 bg-[#111] overflow-hidden flex-shrink-0">
                        {item.image && (
                          <Image
                            src={item.image} alt={item.name} fill
                            sizes="(max-width:768px) 80px, 128px"
                            className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                          />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex flex-col md:flex-row flex-1 md:items-center min-w-0 md:pl-8">

                        {/* Name + Meta */}
                        <div className="md:w-[50%] lg:w-[45%] min-w-0 pr-4">
                          <span className="text-[8px] md:text-[10px] uppercase tracking-[0.25em] text-[#c5a059] mb-1 block">
                            R Ceramica
                          </span>
                          <Link href={`/products/${item.slug}`}
                            className="text-sm md:text-xl font-display font-light tracking-wide md:mb-2 uppercase truncate block hover:text-[#c5a059] transition-colors">
                            {item.name}
                          </Link>
                          {/* Mobile price under name */}
                          <div className="md:hidden mt-1.5">
                            <span className="text-xs font-light text-white/50">{fmt(item.price)}</span>
                          </div>
                        </div>

                        {/* Unit price (desktop) */}
                        <div className="hidden md:block md:w-[15%] text-center text-sm font-light text-white/60">
                          {fmt(item.price)}
                        </div>

                        {/* Quantity pill */}
                        <div className="mt-3 md:mt-0 md:w-[20%] flex items-center md:justify-center">
                          <div className="flex items-center border border-white/10 rounded-full px-3 py-1.5 md:px-4 md:py-2 gap-1">
                            <button onClick={() => updateQty(item.slug, -1)}
                              className="text-white/30 hover:text-white p-1 transition-colors" aria-label="Decrease">
                              <Minus size={11} />
                            </button>
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => setQty(item.slug, Number(e.target.value))}
                              className="cart-qty w-8 md:w-10 bg-transparent text-center text-xs focus:outline-none text-white"
                            />
                            <button onClick={() => updateQty(item.slug, 1)}
                              className="text-white/30 hover:text-white p-1 transition-colors" aria-label="Increase">
                              <Plus size={11} />
                            </button>
                          </div>
                        </div>

                        {/* Line total (desktop) */}
                        <div className="hidden md:block md:w-[20%] text-right text-base font-medium text-[#c5a059]">
                          {fmt(item.price * item.quantity)}
                        </div>

                        {/* Mobile: total + remove */}
                        <div className="md:hidden flex justify-between items-center mt-3 pt-3 border-t border-white/5">
                          <span className="text-sm font-semibold text-[#c5a059]">
                            {fmt(item.price * item.quantity)}
                          </span>
                          <button onClick={() => removeItem(item.slug)}
                            className="text-red-500/60 hover:text-red-500 p-2 transition-colors" aria-label="Remove">
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>

                      {/* Desktop remove */}
                      <button onClick={() => removeItem(item.slug)}
                        className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 text-red-500/30 hover:text-red-500 transition-colors p-1"
                        aria-label="Remove item">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* ── Service cards ── */}
              <div className="mt-12 grid grid-cols-3 md:grid-cols-3 gap-3 md:gap-6">
                {[
                  { icon: <Truck size={18} className="text-[#c5a059]" />, title: "Shipping", body: "Professional installation available." },
                  { icon: <ShieldCheck size={18} className="text-[#c5a059]" />, title: "Guarantee", body: "Lifetime structural assurance." },
                  { icon: <MessageSquare size={18} className="text-[#c5a059]" />, title: "Support", body: "24/7 dedicated concierge." },
                ].map(({ icon, title, body }, i) => (
                  <div key={i}
                    className={`cart-glass p-4 md:p-8 rounded-xl md:rounded-2xl text-center md:text-left`}>
                    <div className="mb-3 w-full flex justify-center md:justify-start">{icon}</div>
                    <h4 className="text-[8px] md:text-[10px] uppercase tracking-widest font-medium mb-1.5 text-white">
                      {title}
                    </h4>
                    <p className="text-[7px] md:text-[9px] text-white/30 leading-relaxed uppercase hidden sm:block">
                      {body}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: Order Summary ── */}
            <div className="order-last lg:order-none lg:col-span-4 mt-8 mb-12 lg:mt-0 lg:mb-0 cart-slide-up" style={{ animationDelay: "0.18s" }}>
              <div className="relative lg:sticky lg:top-32">
                <div className="cart-glass p-5 sm:p-6 md:p-10 rounded-2xl md:rounded-3xl">

                  <h2 className="text-xl md:text-2xl font-display italic font-light mb-7 text-white/95">
                    Summary
                  </h2>

                  <div className="space-y-4 mb-7 pb-7 border-b border-white/5">
                    {/* Line items */}
                    {items.map((item) => (
                      <div key={item.slug} className="flex justify-between text-[9px] uppercase tracking-widest text-white/30">
                        <span className="truncate pr-4 max-w-[60%]">{item.name} ×{item.quantity}</span>
                        <span className="text-white/60 flex-shrink-0">{fmt(item.price * item.quantity)}</span>
                      </div>
                    ))}

                    <div className="pt-2 border-t border-white/5">
                      <div className="flex justify-between text-[10px] uppercase tracking-widest text-white/40">
                        <span>Subtotal</span>
                        <span className="text-white">{fmt(subtotal)}</span>
                      </div>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between text-[10px] uppercase tracking-widest text-green-400/70">
                        <span>Promo (RCERA10)</span>
                        <span>−{fmt(discount)}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-[10px] uppercase tracking-widest text-[#c5a059]">
                      <span>Shipping</span>
                      <span>Free</span>
                    </div>

                    {/* Promo code */}
                    <div className="pt-3">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="PROMO CODE"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                          className="flex-1 bg-white/5 border border-white/5 rounded-full px-4 py-3 text-[9px] tracking-widest focus:outline-none focus:border-white/20 uppercase text-white placeholder:text-white/20 transition-colors"
                        />
                        <button
                          onClick={() => {
                            if (promoCode === "RCERA10") setPromoApplied(true);
                          }}
                          className="bg-white/10 text-white px-5 py-3 rounded-full text-[9px] font-bold tracking-widest hover:bg-white hover:text-black transition-all flex-shrink-0"
                        >
                          OK
                        </button>
                      </div>
                      {promoApplied && (
                        <p className="text-[8px] uppercase tracking-[0.2em] text-green-400/70 mt-2 pl-1">
                          ✓ 10% discount applied
                        </p>
                      )}
                      {promoCode && !promoApplied && promoCode.length >= 4 && (
                        <p className="text-[8px] uppercase tracking-[0.2em] text-red-400/60 mt-2 pl-1">
                          Invalid code. Try RCERA10
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between items-end mb-8">
                    <span className="text-[9px] uppercase tracking-widest text-white/40 font-medium">Total</span>
                    <span className="text-2xl md:text-3xl font-display font-light tracking-tighter">
                      {fmt(total)}
                    </span>
                  </div>

                  {/* Checkout CTA */}
                  <button onClick={goToCheckout}
                    disabled={items.length === 0}
                    className={`block w-full text-center py-5 rounded-full text-[10px] font-bold tracking-[0.35em] uppercase transition-all shadow-xl
                      ${items.length > 0
                        ? "bg-[#c5a059] text-white hover:bg-[#b8935a] shadow-[#c5a059]/20"
                        : "bg-white/10 text-white/30 cursor-not-allowed"
                      }`}
                  >
                    {items.length > 0 ? "Proceed to Checkout" : "Cart is Empty"}
                  </button>

                  {/* Payment logos */}
                  <div className="mt-8 flex justify-center">
                    <div className="flex items-center gap-5 opacity-20 grayscale">
                      {/* Visa */}
                      <svg viewBox="0 0 750 471" className="h-3 w-auto fill-white">
                        <path d="M278.2 348.5 311.8 124H361L327.4 348.5H278.2ZM524.3 128.8c-9.3-3.5-23.9-7.3-42.1-7.3-46.4 0-79.1 23.3-79.3 56.6-.3 24.6 23.2 38.4 40.9 46.6 18.2 8.4 24.3 13.8 24.2 21.3-.1 11.5-14.5 16.7-27.9 16.7-18.7 0-28.6-2.6-43.9-9l-6-2.7-6.5 38.1c10.9 4.7 31 8.9 51.9 9.1 48.9 0 80.6-22.9 81-58.4.4-19.4-12.3-34.2-39.1-46.4-16.3-7.9-26.3-13.2-26.2-21.2 0-7.1 8.5-14.7 26.8-14.7 15.3-.2 26.4 3.1 35 6.5l4.2 2 6.2-35.2h-.2ZM628.6 124h-36.2c-11.2 0-19.6 3.1-24.5 14.4L495 348.5h48.9l9.8-25.6 59.6.1 5.6 25.5H661L628.6 124ZM566.2 289.4l18.5-47.6c-.2.4 3.8-9.8 6.1-16.2l3.1 14.6 10.7 49.2h-38.4ZM232.4 124l-46 152.5-4.9-23.9c-8.5-27.3-35-56.9-64.6-71.7l42 157.6h49.2l73.2-214.5h-48.9Z"/>
                        <path fill="white" d="M131.7 124H57.8l-.6 3.4c57.4 13.9 95.4 47.4 111.2 87.7L151.3 138.4c-2.8-11-10.9-14.1-19.6-14.4Z"/>
                      </svg>
                      {/* Mastercard */}
                      <svg viewBox="0 0 38 24" className="h-5 w-auto">
                        <rect width="38" height="24" rx="2" fill="none"/>
                        <circle cx="15" cy="12" r="7" fill="white" opacity=".7"/>
                        <circle cx="23" cy="12" r="7" fill="white" opacity=".7"/>
                      </svg>
                      {/* UPI text */}
                      <span className="text-[10px] font-bold tracking-widest text-white">UPI</span>
                    </div>
                  </div>

                  <p className="text-center text-[8px] uppercase tracking-[0.2em] text-white/15 mt-4">
                    Secure · Encrypted · Trusted
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
