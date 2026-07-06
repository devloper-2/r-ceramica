import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2, X, Truck, ShieldCheck, MessageSquare } from "lucide-react";
import AccountNavbar from "@/components/layout/AccountNavbar";
import MinimalFooter from "@/components/layout/MinimalFooter";
import { CART_ITEMS, PAYMENT_LOGOS } from "@/lib/constants/cart";
import { siteConfig } from "@/config/site";

const TITLE = `Shopping Cart | ${siteConfig.name}`;

const money = (n: number) =>
  `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const SERVICES = [
  { icon: Truck, title: "Shipping", text: "Professional installation available." },
  { icon: ShieldCheck, title: "Guarantee", text: "Lifetime structural assurance." },
  { icon: MessageSquare, title: "Support", text: "24/7 dedicated concierge." },
];

/**
 * Cart page → "/cart" (ported from cart.html). Quantities are demo/local; the
 * summary recomputes from the line items.
 */
export default function CartPage() {
  const [items, setItems] = useState(CART_ITEMS);

  const setQty = (id: number, delta: number) =>
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, qty: Math.max(1, it.qty + delta) } : it))
    );
  const remove = (id: number) => setItems((prev) => prev.filter((it) => it.id !== id));

  const subtotal = items.reduce((sum, it) => sum + it.price * it.qty, 0);
  const count = items.reduce((sum, it) => sum + it.qty, 0);

  return (
    <div className="page-cart font-jakarta">
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content="Review and finalize your curated R Ceramica selection." />
        <link rel="canonical" href={`${siteConfig.url}/cart`} />
        <meta name="robots" content="noindex" />
      </Head>

      <AccountNavbar backHref="/products" backLabel="Continue Shopping" cartCount={count} rightLink={{ label: "Help", href: "/contact" }} />

      <main className="pt-24 md:pt-48 pb-16 min-h-screen">
        <div className="max-w-[1440px] mx-auto px-4 md:px-12">
          <header className="mb-8 md:mb-20">
            <h1 className="font-serif italic text-3xl md:text-6xl mb-2 opacity-95">Your Order</h1>
            <p className="text-white/30 tracking-[0.2em] text-[8px] md:text-[11px] uppercase">
              Review and finalize your curated spaces
            </p>
          </header>

          {items.length === 0 ? (
            <div className="py-24 text-center">
              <p className="text-white/40 uppercase tracking-[0.3em] text-xs mb-8">Your cart is empty.</p>
              <Link href="/products" className="text-[10px] uppercase tracking-[0.4em] border-b border-white/20 pb-2 hover:border-white transition-all">
                Browse Collection
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 xl:gap-24">
              {/* Items */}
              <div className="lg:col-span-8">
                <div className="hidden md:grid grid-cols-12 pb-4 border-b border-white/10 text-[9px] uppercase tracking-[0.3em] font-medium text-white/30">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>

                <div className="divide-y divide-white/5">
                  {items.map((item) => (
                    <div key={item.id} className="py-4 md:py-10">
                      <div className="flex flex-row gap-4 md:gap-0 md:items-center relative">
                        <div className="w-20 h-24 md:w-32 md:h-44 bg-[var(--color-bg-card)] overflow-hidden flex-shrink-0 relative">
                          <Image src={item.img} alt={item.name} fill sizes="128px" className="object-cover grayscale" />
                        </div>

                        <div className="flex flex-col md:flex-row flex-1 md:items-center min-w-0">
                          <div className="md:w-[45%] pr-4">
                            <span className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] text-[var(--color-gold)] mb-1 block">
                              {item.category}
                            </span>
                            <h3 className="text-sm md:text-xl font-light tracking-wide md:mb-2 uppercase truncate">
                              {item.name}
                            </h3>
                            <div className="md:hidden mt-1">
                              <span className="text-xs font-light text-white/60">{money(item.price)}</span>
                            </div>
                          </div>

                          <div className="hidden md:block w-[15%] text-center text-sm font-light">{money(item.price)}</div>

                          <div className="mt-3 md:mt-0 md:w-[20%] flex items-center md:justify-center">
                            <div className="flex items-center border border-white/10 rounded-full px-2 py-1 md:px-4 md:py-2">
                              <button onClick={() => setQty(item.id, -1)} className="text-white/30 hover:text-white p-1" aria-label="Decrease">
                                <Minus size={12} />
                              </button>
                              <span className="w-8 md:w-12 text-center text-xs">{item.qty}</span>
                              <button onClick={() => setQty(item.id, 1)} className="text-white/30 hover:text-white p-1" aria-label="Increase">
                                <Plus size={12} />
                              </button>
                            </div>
                          </div>

                          <div className="hidden md:block w-[20%] text-right text-base font-medium text-[var(--color-gold)]">
                            {money(item.price * item.qty)}
                          </div>

                          <div className="md:hidden flex justify-between items-center mt-3 pt-3 border-t border-white/5">
                            <span className="text-sm font-semibold text-[var(--color-gold)]">{money(item.price * item.qty)}</span>
                            <button onClick={() => remove(item.id)} className="text-red-500/80 hover:text-red-500 p-2" aria-label="Remove">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>

                        <button
                          onClick={() => remove(item.id)}
                          className="hidden md:flex absolute -right-8 top-1/2 -translate-y-1/2 text-red-500/40 hover:text-red-500 transition-colors"
                          aria-label="Remove item"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8">
                  {SERVICES.map(({ icon: Icon, title, text }) => (
                    <div
                      key={title}
                      className="bg-white/[0.02] border border-white/5 p-4 md:p-8 rounded-xl md:rounded-2xl"
                    >
                      <Icon className="text-[var(--color-gold)] mb-3" size={18} />
                      <h4 className="text-[8px] md:text-[11px] uppercase tracking-widest font-medium mb-1">{title}</h4>
                      <p className="text-[7px] md:text-[10px] text-white/30 leading-tight uppercase hidden sm:block">{text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="lg:col-span-4 lg:mt-0 mt-8">
                <div className="sticky top-32">
                  <div className="bg-white/[0.02] border border-white/5 p-6 md:p-12 rounded-2xl md:rounded-3xl">
                    <h2 className="font-serif italic text-lg md:text-2xl mb-6">Summary</h2>

                    <div className="space-y-4 mb-8 pb-6 border-b border-white/5">
                      <div className="flex justify-between text-[10px] uppercase tracking-widest text-white/40">
                        <span>Subtotal</span>
                        <span className="text-white">{money(subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-[10px] uppercase tracking-widest text-[var(--color-gold)]">
                        <span>Shipping</span>
                        <span>Free</span>
                      </div>
                      <div className="pt-2">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="CODE"
                            className="flex-1 bg-white/5 border border-white/5 rounded-full px-4 py-3 text-[9px] tracking-widest focus:outline-none focus:border-white/20 uppercase"
                          />
                          <button className="bg-white/10 text-white px-4 py-3 rounded-full text-[9px] font-bold tracking-widest hover:bg-white hover:text-black transition-all">
                            OK
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-end mb-8">
                      <span className="text-[9px] uppercase tracking-widest text-white/40 font-medium">Total</span>
                      <span className="text-2xl md:text-3xl font-light tracking-tighter">{money(subtotal)}</span>
                    </div>

                    <Link
                      href="/checkout"
                      className="block w-full bg-[var(--color-gold)] text-white text-center py-5 rounded-full text-[10px] font-bold tracking-[0.3em] uppercase transition-all shadow-xl shadow-[var(--color-gold)]/10 hover:brightness-110"
                    >
                      Checkout
                    </Link>

                    <div className="mt-6 flex justify-center">
                      <div className="flex gap-4 items-center grayscale opacity-20">
                        {PAYMENT_LOGOS.map((logo) => (
                          <Image key={logo.alt} src={logo.src} alt={logo.alt} width={40} height={16} className={`${logo.className} w-auto`} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <MinimalFooter />
    </div>
  );
}
