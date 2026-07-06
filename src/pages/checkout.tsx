import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { ArrowLeft, Lock, CreditCard, Apple } from "lucide-react";
import { CART_ITEMS, CART_SUMMARY } from "@/lib/constants/cart";
import { siteConfig } from "@/config/site";

const TITLE = `Secure Checkout | ${siteConfig.name}`;

const money = (n: number) =>
  `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const STEPS = ["Ship", "Pay", "Ok"];

/**
 * Checkout page → "/checkout" (ported from checkout.html). Own minimal header;
 * submitting the (demo) form routes to /tracking.
 */
export default function CheckoutPage() {
  const router = useRouter();
  const subtotal = CART_ITEMS.reduce((s, it) => s + it.price * it.qty, 0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/tracking");
  };

  return (
    <div className="page-checkout font-jakarta">
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content="Securely finalize your R Ceramica order." />
        <link rel="canonical" href={`${siteConfig.url}/checkout`} />
        <meta name="robots" content="noindex" />
      </Head>

      {/* Minimal header */}
      <header className="fixed top-0 left-0 w-full z-[100] bg-[var(--color-bg)]/80 backdrop-blur-md border-b border-white/5 h-20">
        <div className="max-w-[1720px] mx-auto px-4 md:px-6 h-full flex justify-between items-center">
          <Link href="/cart" className="flex-1 flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-white/40 hover:text-white transition-all">
            <ArrowLeft size={14} />
            <span className="hidden sm:inline">Back to Cart</span>
            <span className="sm:hidden">Cart</span>
          </Link>
          <div className="absolute left-1/2 -translate-x-1/2 flex justify-center">
            <Image src="https://rceramica.com/logo/logo.png" alt="R Ceramica" width={100} height={40} className="h-8 md:h-10 w-auto" priority />
          </div>
          <div className="flex-1 flex justify-end">
            <div className="flex items-center gap-2">
              <Lock size={12} className="text-[var(--color-gold)]" />
              <span className="text-[8px] md:text-[9px] uppercase tracking-[0.3em] font-medium text-white/40">Secure</span>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-24 md:pt-48 pb-16">
        <div className="max-w-[1440px] mx-auto px-4 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 xl:gap-24">
            {/* Form */}
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="mb-8 md:mb-12">
                <h1 className="font-serif italic text-3xl md:text-5xl mb-2 md:mb-6">Finalize Order</h1>
                <p className="text-white/40 text-[8px] md:text-[11px] uppercase tracking-[0.3em]">
                  Excellence delivered to your doorstep
                </p>
              </div>

              {/* Steps */}
              <div className="flex items-center justify-between sm:justify-start sm:gap-6 mb-6 sm:mb-12 pb-4 border-b border-white/5">
                {STEPS.map((label, i) => (
                  <div key={label} className="flex items-center gap-3 sm:gap-6">
                    <div className={`flex items-center gap-1.5 sm:gap-3 ${i === 0 ? "text-white" : "text-white/20"}`}>
                      <span className="w-4 h-4 sm:w-6 sm:h-6 rounded-full border border-current flex items-center justify-center text-[8px] sm:text-[10px]">
                        {i + 1}
                      </span>
                      <span className="text-[8px] sm:text-[10px] uppercase tracking-widest font-medium">{label}</span>
                    </div>
                    {i < STEPS.length - 1 && <div className="w-5 sm:w-10 h-px bg-white/10" />}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 md:space-y-12">
                <div className="space-y-4 md:space-y-8">
                  <div className="grid grid-cols-2 gap-3 md:gap-8">
                    <Field label="First Name" placeholder="WINTER" />
                    <Field label="Last Name" placeholder="NIGHTINGALE" />
                  </div>
                  <Field label="Address" placeholder="AVENUE MONTAGE 42" />
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8">
                    <div className="col-span-2 md:col-span-1">
                      <Field label="City" placeholder="HOUSTON" />
                    </div>
                    <Field label="State" placeholder="TX" />
                    <Field label="Zip" placeholder="77002" />
                  </div>
                </div>

                <div className="pt-4 md:pt-12 border-t border-white/5">
                  <h3 className="text-[8px] md:text-[11px] uppercase tracking-[0.3em] font-semibold mb-3">Payment</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="checkout-card active rounded-xl p-3 md:p-6 flex flex-col items-center">
                      <CreditCard className="mb-1.5" size={18} />
                      <span className="text-[7px] uppercase tracking-widest font-medium">Card</span>
                    </div>
                    <div className="checkout-card rounded-xl p-3 md:p-6 flex flex-col items-center">
                      <Apple className="mb-1.5" size={18} />
                      <span className="text-[7px] uppercase tracking-widest font-medium">Pay</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-white text-black py-4 md:py-6 rounded-full text-[9px] md:text-[11px] font-bold tracking-[0.3em] uppercase transition-all active:scale-[0.98]"
                  >
                    Complete Order
                  </button>
                </div>
              </form>
            </div>

            {/* Summary */}
            <div className="lg:col-span-5 order-1 lg:order-2">
              <div className="lg:sticky lg:top-40 bg-[#0d0d0d] rounded-2xl md:rounded-3xl p-6 md:p-12 border border-white/5">
                <header className="flex justify-between items-center mb-6 pb-4 border-b border-white/5">
                  <h2 className="font-serif italic text-xl">Your Order</h2>
                  <Link href="/cart" className="text-[9px] uppercase tracking-[0.3em] text-[var(--color-gold)]">
                    Modify
                  </Link>
                </header>

                <div className="space-y-4 mb-8">
                  {CART_ITEMS.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center">
                      <div className="w-14 h-14 bg-[#151515] rounded-lg overflow-hidden flex-shrink-0 relative">
                        <Image src={item.img} alt={item.name} fill sizes="56px" className="object-cover grayscale" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[10px] uppercase tracking-tight font-medium truncate">{item.name}</h4>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-[9px] text-white/30 uppercase">Qty: {item.qty}</span>
                          <span className="text-[11px] font-light">{money(item.price)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 mb-6 pb-6 border-b border-white/5">
                  <div className="flex justify-between text-[10px] uppercase tracking-widest text-white/30">
                    <span>Subtotal</span>
                    <span className="text-white">{money(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-[10px] uppercase tracking-widest text-white/30">
                    <span>Tax</span>
                    <span className="text-white">{money(CART_SUMMARY.tax)}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[9px] uppercase tracking-[0.3em] font-medium text-[var(--color-gold)]">Total Due</span>
                  <span className="text-2xl font-light">{money(subtotal + CART_SUMMARY.tax)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-[0.3em] font-medium text-white/40 mb-1.5">{label}</label>
      <input type="text" placeholder={placeholder} className="checkout-input" />
    </div>
  );
}
