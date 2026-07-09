import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, FormEvent } from "react";
import { ArrowLeft, Lock, CreditCard, Smartphone, Check, ChevronRight } from "lucide-react";
import { siteConfig } from "@/config/site";

/* ── Static order (matches cart defaults) ───────────────────── */
const ORDER_ITEMS = [
  { name: "Fusion Basin Mixer", code: "F10201CL", qty: 1, price: 12450, img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=200" },
  { name: "Zen Exposed Mixer",  code: "Z10801EM", qty: 1, price: 22400, img: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&q=80&w=200" },
];
const SUBTOTAL = ORDER_ITEMS.reduce((s, i) => s + i.price * i.qty, 0);
const TAX      = Math.round(SUBTOTAL * 0.18);
const TOTAL    = SUBTOTAL + TAX;

function fmt(n: number) {
  return "₹ " + n.toLocaleString("en-IN");
}

type Step = 1 | 2 | 3;
type PayMethod = "card" | "upi";

const STEP_LABELS = ["Ship", "Pay", "Confirm"] as const;

export default function CheckoutPage() {
  const router = useRouter();

  /* ── Step state ── */
  const [step, setStep] = useState<Step>(1);
  const [payMethod, setPayMethod] = useState<PayMethod>("card");
  const [placing, setPlacing] = useState(false);

  /* ── Shipping fields ── */
  const [shipping, setShipping] = useState({
    firstName: "", lastName: "", address: "",
    city: "", state: "", zip: "", phone: "", email: "",
  });

  /* ── Card fields ── */
  const [card, setCard] = useState({
    number: "", expiry: "", cvv: "", name: "",
  });

  /* ── UPI field ── */
  const [upiId, setUpiId] = useState("");

  /* ── Helpers ── */
  function formatCard(val: string) {
    return val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  }
  function formatExpiry(val: string) {
    const d = val.replace(/\D/g, "").slice(0, 4);
    return d.length >= 3 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  }

  function handleShippingSubmit(e: FormEvent) {
    e.preventDefault();
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handlePaySubmit(e: FormEvent) {
    e.preventDefault();
    setPlacing(true);
    setTimeout(() => {
      setPlacing(false);
      setStep(3);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1800);
  }

  /* ── Step indicator ── */
  function stepClass(n: number) {
    if (n < step) return "step-done";
    if (n === step) return "step-active";
    return "step-inactive";
  }

  return (
    <div className="page-checkout">
      <Head>
        <title>Secure Checkout | {siteConfig.name}</title>
        <meta name="description" content="Secure checkout for R Ceramica." />
        <meta name="robots" content="noindex" />
      </Head>

      {/* ── Checkout Header ── */}
      <header className="fixed top-0 left-0 w-full z-[100] bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5 h-20">
        <div className="max-w-[1720px] mx-auto px-4 md:px-6 h-full flex items-center justify-between">
          <Link href="/cart"
            className="flex-1 flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-white/40 hover:text-white transition-all">
            <ArrowLeft size={13} />
            <span className="hidden sm:inline">Back to Cart</span>
            <span className="sm:hidden">Cart</span>
          </Link>

          <div className="absolute left-1/2 -translate-x-1/2">
            <Image src="https://rceramica.com/logo/logo.png" alt="R Ceramica" width={120} height={40}
              className="h-8 md:h-10 w-auto object-contain" />
          </div>

          <div className="flex-1 flex justify-end">
            <div className="flex items-center gap-1.5">
              <Lock size={11} className="text-[#c5a059]" />
              <span className="text-[8px] md:text-[9px] uppercase tracking-[0.3em] font-medium text-white/40 hidden xs:block">
                Secure
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-24 md:pt-40 pb-16">
        <div className="max-w-[1440px] mx-auto px-4 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 xl:gap-24">

            {/* ── Left: Form ── */}
            <div className="lg:col-span-7 order-2 lg:order-1 co-slide-up">

              {/* Header */}
              <div className="mb-8 md:mb-12">
                <h1 className="text-3xl md:text-5xl font-display italic font-light mb-2 md:mb-4">
                  Finalize Order
                </h1>
                <p className="text-white/40 text-[8px] md:text-[11px] uppercase tracking-[0.3em]">
                  Excellence delivered to your doorstep
                </p>
              </div>

              {/* Step progress */}
              <div className="flex items-center gap-2 sm:gap-3 mb-8 md:mb-12 pb-6 border-b border-white/5">
                {STEP_LABELS.map((label, i) => {
                  const n = i + 1;
                  const cls = stepClass(n);
                  return (
                    <div key={label} className="flex items-center gap-2 sm:gap-3">
                      <div className={`flex items-center gap-1.5 sm:gap-2 ${cls}`}>
                        <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-[9px] font-medium
                          ${n < step ? "border-[#c5a059] bg-[#c5a059]/10" : "border-current"}`}>
                          {n < step ? <Check size={10} className="text-[#c5a059]" /> : n}
                        </span>
                        <span className="text-[9px] sm:text-[10px] uppercase tracking-widest font-medium">
                          {label}
                        </span>
                      </div>
                      {i < STEP_LABELS.length - 1 && (
                        <div className="w-6 sm:w-10 h-px bg-white/10 mx-1" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* ── Step 1: Shipping ── */}
              {step === 1 && (
                <form onSubmit={handleShippingSubmit} className="space-y-6 md:space-y-8">
                  <div className="grid grid-cols-2 gap-3 md:gap-6">
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.3em] font-medium text-white/40 mb-2">First Name</label>
                      <input className="checkout-input" type="text" placeholder="First Name" required
                        value={shipping.firstName}
                        onChange={(e) => setShipping({ ...shipping, firstName: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.3em] font-medium text-white/40 mb-2">Last Name</label>
                      <input className="checkout-input" type="text" placeholder="Last Name" required
                        value={shipping.lastName}
                        onChange={(e) => setShipping({ ...shipping, lastName: e.target.value })} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.3em] font-medium text-white/40 mb-2">Email</label>
                    <input className="checkout-input" type="email" placeholder="your@email.com" required
                      value={shipping.email}
                      onChange={(e) => setShipping({ ...shipping, email: e.target.value })} />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.3em] font-medium text-white/40 mb-2">Phone</label>
                    <input className="checkout-input" type="tel" placeholder="+91 00000 00000"
                      value={shipping.phone}
                      onChange={(e) => setShipping({ ...shipping, phone: e.target.value })} />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.3em] font-medium text-white/40 mb-2">Address</label>
                    <input className="checkout-input" type="text" placeholder="Street, Building, Area" required
                      value={shipping.address}
                      onChange={(e) => setShipping({ ...shipping, address: e.target.value })} />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
                    <div className="col-span-2 md:col-span-1">
                      <label className="block text-[10px] uppercase tracking-[0.3em] font-medium text-white/40 mb-2">City</label>
                      <input className="checkout-input" type="text" placeholder="City" required
                        value={shipping.city}
                        onChange={(e) => setShipping({ ...shipping, city: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.3em] font-medium text-white/40 mb-2">State</label>
                      <input className="checkout-input" type="text" placeholder="Gujarat"
                        value={shipping.state}
                        onChange={(e) => setShipping({ ...shipping, state: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.3em] font-medium text-white/40 mb-2">PIN Code</label>
                      <input className="checkout-input" type="text" placeholder="363642"
                        value={shipping.zip}
                        onChange={(e) => setShipping({ ...shipping, zip: e.target.value })} />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button type="submit"
                      className="w-full bg-white text-black py-5 rounded-full text-[10px] md:text-[11px] font-bold tracking-[0.35em] uppercase hover:bg-neutral-200 transition-all active:scale-[0.98] flex items-center justify-center gap-3">
                      Continue to Payment <ChevronRight size={14} />
                    </button>
                  </div>
                </form>
              )}

              {/* ── Step 2: Payment ── */}
              {step === 2 && (
                <form onSubmit={handlePaySubmit} className="space-y-6 md:space-y-8">

                  {/* Shipping recap */}
                  <div className="p-5 bg-white/[0.02] border border-white/5 rounded-xl flex justify-between items-start gap-4">
                    <div>
                      <p className="text-[8px] uppercase tracking-[0.3em] text-white/30 mb-1">Delivering to</p>
                      <p className="text-sm font-light text-white/80">
                        {shipping.firstName} {shipping.lastName}
                      </p>
                      <p className="text-[10px] text-white/40 mt-0.5">
                        {shipping.address}{shipping.city ? `, ${shipping.city}` : ""}
                      </p>
                    </div>
                    <button type="button" onClick={() => setStep(1)}
                      className="text-[9px] uppercase tracking-[0.3em] text-[#c5a059] hover:text-white transition-colors shrink-0">
                      Edit
                    </button>
                  </div>

                  {/* Payment method toggle */}
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4">Payment Method</p>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: "card" as PayMethod, icon: <CreditCard size={20} />, label: "Card" },
                        { id: "upi"  as PayMethod, icon: <Smartphone   size={20} />, label: "UPI / Pay" },
                      ].map(({ id, icon, label }) => (
                        <button key={id} type="button" onClick={() => setPayMethod(id)}
                          className={`payment-card rounded-xl p-4 md:p-6 flex flex-col items-center gap-2 ${payMethod === id ? "active" : ""}`}>
                          {icon}
                          <span className="text-[8px] uppercase tracking-[0.25em] font-medium">{label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Card fields */}
                  {payMethod === "card" && (
                    <div className="space-y-5">
                      <div>
                        <label className="block text-[10px] uppercase tracking-[0.3em] font-medium text-white/40 mb-2">Card Number</label>
                        <input className="checkout-input" type="text" inputMode="numeric" placeholder="0000 0000 0000 0000" required
                          value={card.number}
                          onChange={(e) => setCard({ ...card, number: formatCard(e.target.value) })} />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-[0.3em] font-medium text-white/40 mb-2">Name on Card</label>
                        <input className="checkout-input" type="text" placeholder="As printed on card" required
                          value={card.name}
                          onChange={(e) => setCard({ ...card, name: e.target.value })} />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] uppercase tracking-[0.3em] font-medium text-white/40 mb-2">Expiry</label>
                          <input className="checkout-input" type="text" inputMode="numeric" placeholder="MM/YY" required
                            value={card.expiry}
                            onChange={(e) => setCard({ ...card, expiry: formatExpiry(e.target.value) })} />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase tracking-[0.3em] font-medium text-white/40 mb-2">CVV</label>
                          <input className="checkout-input" type="password" inputMode="numeric" placeholder="•••" maxLength={4} required
                            value={card.cvv}
                            onChange={(e) => setCard({ ...card, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) })} />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* UPI field */}
                  {payMethod === "upi" && (
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.3em] font-medium text-white/40 mb-2">UPI ID</label>
                      <input className="checkout-input" type="text" placeholder="yourname@upi" required
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)} />
                      <p className="text-[8px] uppercase tracking-[0.2em] text-white/20 mt-2 pl-1">
                        A payment request will be sent to this UPI ID
                      </p>
                    </div>
                  )}

                  {/* Security note */}
                  <div className="flex items-center gap-3 text-white/20">
                    <Lock size={12} className="text-[#c5a059]/60" />
                    <p className="text-[8px] uppercase tracking-[0.2em]">
                      256-bit SSL encryption · Your data is never stored
                    </p>
                  </div>

                  <div className="pt-2">
                    <button type="submit"
                      className="w-full bg-[#c5a059] text-white py-5 rounded-full text-[10px] md:text-[11px] font-bold tracking-[0.35em] uppercase hover:bg-[#b8935a] transition-all active:scale-[0.98] flex items-center justify-center gap-3 shadow-xl shadow-[#c5a059]/20 disabled:opacity-60"
                      disabled={placing}>
                      {placing ? (
                        <>
                          <span className="w-4 h-4 border border-white/30 border-t-white rounded-full animate-spin" />
                          Processing…
                        </>
                      ) : (
                        <>Place Order · {fmt(TOTAL)}</>
                      )}
                    </button>
                  </div>
                </form>
              )}

              {/* ── Step 3: Confirmation ── */}
              {step === 3 && (
                <div className="py-12 flex flex-col items-center text-center gap-8">
                  <div className="w-20 h-20 rounded-full border border-[#c5a059]/40 bg-[#c5a059]/5 flex items-center justify-center success-pop">
                    <Check size={36} className="text-[#c5a059]" />
                  </div>

                  <div>
                    <p className="text-[9px] uppercase tracking-[0.6em] text-[#c5a059] mb-4">Order Confirmed</p>
                    <h2 className="text-3xl md:text-5xl font-display font-light uppercase tracking-wider mb-4">
                      Thank You
                    </h2>
                    <p className="text-white/40 text-[10px] uppercase tracking-[0.3em] leading-relaxed max-w-sm mx-auto">
                      Your order has been received. A confirmation will be sent to{" "}
                      <span className="text-white/60">{shipping.email || "your email"}</span>.
                    </p>
                  </div>

                  <div className="w-full max-w-sm border border-white/5 bg-white/[0.02] rounded-xl p-6 space-y-3 text-left">
                    <div className="flex justify-between text-[9px] uppercase tracking-[0.2em]">
                      <span className="text-white/30">Order ID</span>
                      <span className="text-white">RC{Date.now().toString().slice(-8)}</span>
                    </div>
                    <div className="flex justify-between text-[9px] uppercase tracking-[0.2em]">
                      <span className="text-white/30">Est. Delivery</span>
                      <span className="text-white">5–7 Business Days</span>
                    </div>
                    <div className="flex justify-between text-[9px] uppercase tracking-[0.2em]">
                      <span className="text-white/30">Amount Paid</span>
                      <span className="text-[#c5a059] font-medium">{fmt(TOTAL)}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 mt-2 justify-center">
                    <Link href="/tracking"
                      className="px-8 py-4 bg-[#c5a059] text-white text-[9px] uppercase tracking-[0.35em] font-bold hover:bg-[#b8935a] transition-all rounded-full">
                      Track Order
                    </Link>
                    <Link href="/products"
                      className="px-8 py-4 bg-white text-black text-[9px] uppercase tracking-[0.35em] font-bold hover:bg-neutral-200 transition-all rounded-full">
                      Continue Shopping
                    </Link>
                    <Link href="/contact"
                      className="px-8 py-4 border border-white/10 text-white/60 hover:text-white hover:border-white/30 text-[9px] uppercase tracking-[0.35em] transition-all rounded-full">
                      Need Help?
                    </Link>
                  </div>
                </div>
              )}

            </div>

            {/* ── Right: Order Summary ── */}
            <div className="lg:col-span-5 order-1 lg:order-2 co-slide-up" style={{ animationDelay: "0.12s" }}>
              <div className="lg:sticky lg:top-32 bg-[#0d0d0d] rounded-2xl md:rounded-3xl p-6 md:p-10 border border-white/5">

                <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/5">
                  <h2 className="text-xl font-display italic font-light">Your Order</h2>
                  <Link href="/cart"
                    className="text-[9px] uppercase tracking-[0.3em] text-[#c5a059] hover:text-white transition-colors">
                    Modify
                  </Link>
                </div>

                {/* Items */}
                <div className="space-y-4 mb-8">
                  {ORDER_ITEMS.map((item) => (
                    <div key={item.code} className="flex gap-4 items-center">
                      <div className="relative w-14 h-14 bg-[#151515] rounded-lg overflow-hidden flex-shrink-0">
                        <Image src={item.img} alt={item.name} fill sizes="56px"
                          className="object-cover grayscale" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[10px] uppercase tracking-tight font-medium truncate">{item.name}</h4>
                        <div className="flex justify-between items-center mt-1.5">
                          <span className="text-[9px] text-white/30 uppercase">Qty: {item.qty}</span>
                          <span className="text-[11px] font-light">{fmt(item.price)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="space-y-3 mb-6 pb-6 border-b border-white/5">
                  <div className="flex justify-between text-[10px] uppercase tracking-widest text-white/30">
                    <span>Subtotal</span>
                    <span className="text-white">{fmt(SUBTOTAL)}</span>
                  </div>
                  <div className="flex justify-between text-[10px] uppercase tracking-widest text-white/30">
                    <span>GST (18%)</span>
                    <span className="text-white">{fmt(TAX)}</span>
                  </div>
                  <div className="flex justify-between text-[10px] uppercase tracking-widest text-[#c5a059]">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[9px] uppercase tracking-[0.3em] font-medium text-[#c5a059]">Total Due</span>
                  <span className="text-2xl md:text-3xl font-display font-light">{fmt(TOTAL)}</span>
                </div>

                {/* Trust badges */}
                <div className="mt-8 pt-6 border-t border-white/5 flex flex-col gap-3">
                  {[
                    { icon: "🔒", text: "Payments are 256-bit SSL encrypted" },
                    { icon: "📦", text: "Free delivery on orders above ₹10,000" },
                    { icon: "↩️", text: "30-day hassle-free returns" },
                  ].map(({ icon, text }) => (
                    <div key={text} className="flex items-center gap-3 text-[8px] uppercase tracking-[0.15em] text-white/25">
                      <span className="text-sm">{icon}</span>
                      {text}
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

/* Tell _app.tsx to skip Navbar/Footer for this page */
CheckoutPage.noLayout = true;
