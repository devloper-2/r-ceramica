import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState, FormEvent } from "react";
import { ArrowLeft, Lock, Check, ChevronRight, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/config/site";
import { getCart, clearCart, cartSubtotal, type CartLine } from "@/lib/services/cart";
import { payWithRazorpay, type CheckoutResult } from "@/lib/services/checkout";
import { getCustomer, getToken, isAuthenticated } from "@/lib/services/auth";
import { State, City } from "country-state-city";

function fmt(n: number) {
  return "₹ " + n.toLocaleString("en-IN");
}

type Step = 1 | 2 | 3;
const STEP_LABELS = ["Ship", "Pay", "Confirm"] as const;

export default function CheckoutPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CheckoutResult | null>(null);

  // Cart comes from localStorage (client only).
  const [cart, setCart] = useState<CartLine[]>([]);

  const [shipping, setShipping] = useState({
    firstName: "", lastName: "", address: "",
    city: "", state: "", zip: "", phone: "", email: "",
  });

  const states = useMemo(() => State.getStatesOfCountry("IN"), []);
  const cities = useMemo(() => {
    if (!shipping.state) return [];
    const selectedState = states.find(s => s.name === shipping.state);
    return selectedState ? City.getCitiesOfState("IN", selectedState.isoCode) : [];
  }, [shipping.state, states]);

  // Login is required to check out — redirect guests. Also prefill from account.
  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/login?redirect=/checkout");
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCart(getCart());
    const c = getCustomer();
    if (c) {
      const [firstName, ...rest] = (c.name || "").trim().split(" ");
      setShipping((s) => ({
        ...s,
        firstName: s.firstName || firstName || "",
        lastName: s.lastName || rest.join(" "),
        email: s.email || c.email || "",
        phone: s.phone || c.phone || "",
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const subtotal = useMemo(() => cartSubtotal(cart), [cart]);
  const total = subtotal; // server is authoritative; no GST/shipping for now

  function handleShippingSubmit(e: FormEvent) {
    e.preventDefault();
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function placeOrder() {
    setError(null);
    if (!shipping.firstName || !shipping.email) {
      setError("Please provide your name and email in the shipping step.");
      return;
    }
    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }
    setPlacing(true);
    payWithRazorpay({
      items: cart,
      token: getToken(),
      customer: {
        name: `${shipping.firstName} ${shipping.lastName}`.trim(),
        email: shipping.email,
        phone: shipping.phone,
      },
      shipping: {
        name: `${shipping.firstName} ${shipping.lastName}`.trim(),
        address: shipping.address, city: shipping.city,
        state: shipping.state, zip: shipping.zip,
        phone: shipping.phone,
      },
      onSuccess: (r) => {
        setResult(r);
        clearCart();
        setStep(3);
        window.scrollTo({ top: 0, behavior: "smooth" });
        // Land the customer on their real order after a brief confirmation.
        setTimeout(() => router.push(`/orders/${r.orderNumber}`), 1600);
      },
      onError: (msg) => {
        setPlacing(false);
        setError(msg);
      },
      onDismiss: () => setPlacing(false),
    });
  }

  function stepClass(n: number) {
    if (n < step) return "step-done";
    if (n === step) return "step-active";
    return "step-inactive";
  }

  return (
    <div className="page-checkout">
      <Head>
        <title>{`Secure Checkout | ${siteConfig.name}`}</title>
        <meta name="description" content="Secure checkout for R Ceramica." />
        <meta name="robots" content="noindex" />
      </Head>

      <header className="fixed top-0 left-0 w-full z-[100] bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5 h-20">
        <div className="max-w-[1720px] mx-auto px-4 md:px-6 h-full flex items-center justify-between">
          <Link href="/cart"
            className="flex-1 flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-white/40 hover:text-white transition-all">
            <ArrowLeft size={13} />
            <span className="hidden sm:inline">Back to Cart</span>
            <span className="sm:hidden">Cart</span>
          </Link>
          <div className="absolute left-1/2 -translate-x-1/2">
            <Image src="/images/logo.webp" alt="R Ceramica" width={120} height={40}
              className="h-8 md:h-10 w-auto object-contain" />
          </div>
          <div className="flex-1 flex justify-end">
            <div className="flex items-center gap-1.5">
              <Lock size={16} className="text-[#c5a059]" />
              <span className="text-[8px] md:text-[9px] uppercase tracking-[0.3em] font-medium text-white/40 hidden xs:block">Secure</span>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-24 md:pt-40 pb-16">
        <div className="max-w-[1440px] mx-auto px-4 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 xl:gap-24">

            {/* Left: form */}
            <div className="lg:col-span-7 order-2 lg:order-1 co-slide-up">
              <div className="mb-8 md:mb-12">
                <h1 className="text-3xl md:text-5xl font-display italic font-light mb-2 md:mb-4">Finalize Order</h1>
                <p className="text-white/40 text-[8px] md:text-[11px] uppercase tracking-[0.3em]">Excellence delivered to your doorstep</p>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 mb-8 md:mb-12 pb-6 border-b border-white/5">
                {STEP_LABELS.map((label, i) => {
                  const n = i + 1;
                  return (
                    <div key={label} className="flex items-center gap-2 sm:gap-3">
                      <div className={`flex items-center gap-1.5 sm:gap-2 ${stepClass(n)}`}>
                        <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-[9px] font-medium ${n < step ? "border-[#c5a059] bg-[#c5a059]/10" : "border-current"}`}>
                          {n < step ? <Check size={10} className="text-[#c5a059]" /> : n}
                        </span>
                        <span className="text-[9px] sm:text-[10px] uppercase tracking-widest font-medium">{label}</span>
                      </div>
                      {i < STEP_LABELS.length - 1 && <div className="w-6 sm:w-10 h-px bg-white/10 mx-1" />}
                    </div>
                  );
                })}
              </div>

              {error && (
                <div className="mb-6 p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 text-[11px] tracking-wide">
                  {error}
                </div>
              )}

              {/* Step 1: shipping */}
              {step === 1 && (
                <form onSubmit={handleShippingSubmit} className="space-y-6 md:space-y-8">
                  <div className="grid grid-cols-2 gap-3 md:gap-6">
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.3em] font-medium text-white/40 mb-2">First Name</label>
                      <input className="checkout-input" type="text" placeholder="First Name" required
                        value={shipping.firstName} onChange={(e) => setShipping({ ...shipping, firstName: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.3em] font-medium text-white/40 mb-2">Last Name</label>
                      <input className="checkout-input" type="text" placeholder="Last Name" required
                        value={shipping.lastName} onChange={(e) => setShipping({ ...shipping, lastName: e.target.value })} />
                    </div>
                  </div>
                   <div className="grid grid-cols-2 md:grid-cols-1 gap-3 md:gap-6">
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.3em] font-medium text-white/40 mb-2">Email</label>
                    <input className="checkout-input" type="email" placeholder="your@email.com" required
                      value={shipping.email} onChange={(e) => setShipping({ ...shipping, email: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.3em] font-medium text-white/40 mb-2">Phone</label>
                    <input className="checkout-input" type="tel" placeholder="+91 00000 00000" required
                      value={shipping.phone} onChange={(e) => setShipping({ ...shipping, phone: e.target.value })} />
                  </div>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.3em] font-medium text-white/40 mb-2">Address</label>
                    <input className="checkout-input" type="text" placeholder="Street, Building, Area" required
                      value={shipping.address} onChange={(e) => setShipping({ ...shipping, address: e.target.value })} />
                  </div>
                  <div className="grid grid-cols-3 md:grid-cols-3 gap-3 md:gap-6">
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.3em] font-medium text-white/40 mb-2">State</label>
                      <select className="checkout-input appearance-none" required
                        value={shipping.state} onChange={(e) => setShipping({ ...shipping, state: e.target.value, city: "" })}>
                        <option value="">Select State</option>
                        {states.map(s => <option key={s.isoCode} value={s.name}>{s.name}</option>)}
                      </select>
                    </div>
                    <div className="col-span-1 md:col-span-1">
                      <label className="block text-[10px] uppercase tracking-[0.3em] font-medium text-white/40 mb-2">City</label>
                      <select className="checkout-input appearance-none" required
                        value={shipping.city} onChange={(e) => setShipping({ ...shipping, city: e.target.value })}>
                        <option value="">Select City</option>
                        {cities.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.3em] font-medium text-white/40 mb-2">PIN Code</label>
                      <input className="checkout-input" type="text" placeholder="363642" required
                        value={shipping.zip} onChange={(e) => setShipping({ ...shipping, zip: e.target.value })} />
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

              {/* Step 2: payment via Razorpay */}
              {step === 2 && (
                <div className="space-y-6 md:space-y-8">
                  <div className="p-5 bg-white/[0.02] border border-white/5 rounded-xl flex justify-between items-start gap-4">
                    <div>
                      <p className="text-[8px] uppercase tracking-[0.3em] text-white/30 mb-1">Delivering to</p>
                      <p className="text-sm font-light text-white/80">{shipping.firstName} {shipping.lastName}</p>
                      <p className="text-[10px] text-white/40 mt-0.5">{shipping.address}{shipping.city ? `, ${shipping.city}` : ""}</p>
                    </div>
                    <button type="button" onClick={() => setStep(1)}
                      className="text-[9px] uppercase tracking-[0.3em] text-[#c5a059] hover:text-white transition-colors shrink-0">Edit</button>
                  </div>

                  <div className="p-6 bg-white/[0.02] border border-white/5 rounded-xl flex items-start gap-4">
                    <ShieldCheck size={22} className="text-[#c5a059] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-light text-white/80 mb-1">Secure payment by Razorpay</p>
                      <p className="text-[10px] text-white/40 leading-relaxed">
                        Cards, UPI, net-banking &amp; wallets are handled in Razorpay&apos;s secure window.
                        R Ceramica never sees or stores your card details.
                      </p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button type="button" onClick={placeOrder} disabled={placing}
                      className="w-full bg-[#c5a059] text-white py-5 rounded-full text-[10px] md:text-[11px] font-bold tracking-[0.35em] uppercase hover:bg-[#b8935a] transition-all active:scale-[0.98] flex items-center justify-center gap-3 shadow-xl shadow-[#c5a059]/20 disabled:opacity-60">
                      {placing ? (
                        <><span className="w-4 h-4 border border-white/30 border-t-white rounded-full animate-spin" /> Processing…</>
                      ) : (
                        <>Pay Securely · {fmt(total)}</>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: confirmation */}
              {step === 3 && (
                <div className="py-12 flex flex-col items-center text-center gap-8">
                  <div className="w-20 h-20 rounded-full border border-[#c5a059]/40 bg-[#c5a059]/5 flex items-center justify-center success-pop">
                    <Check size={36} className="text-[#c5a059]" />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.6em] text-[#c5a059] mb-4">Order Confirmed</p>
                    <h2 className="text-3xl md:text-5xl font-display font-light uppercase tracking-wider mb-4">Thank You</h2>
                    <p className="text-white/40 text-[10px] uppercase tracking-[0.3em] leading-relaxed max-w-sm mx-auto">
                      Your order has been received. A confirmation will be sent to{" "}
                      <span className="text-white/60">{result?.email || shipping.email || "your email"}</span>.
                    </p>
                  </div>
                  <div className="w-full max-w-sm border border-white/5 bg-white/[0.02] rounded-xl p-6 space-y-3 text-left">
                    <div className="flex justify-between text-[9px] uppercase tracking-[0.2em]">
                      <span className="text-white/30">Order Number</span>
                      <span className="text-white">{result?.orderNumber ?? "—"}</span>
                    </div>
                    <div className="flex justify-between text-[9px] uppercase tracking-[0.2em]">
                      <span className="text-white/30">Est. Delivery</span>
                      <span className="text-white">5–7 Business Days</span>
                    </div>
                    <div className="flex justify-between text-[9px] uppercase tracking-[0.2em]">
                      <span className="text-white/30">Amount Paid</span>
                      <span className="text-[#c5a059] font-medium">{fmt(result?.total ?? total)}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 mt-2 justify-center">
                    <Link href="/tracking" className="px-8 py-4 bg-[#c5a059] text-white text-[9px] uppercase tracking-[0.35em] font-bold hover:bg-[#b8935a] transition-all rounded-full">Track Order</Link>
                    <Link href="/products" className="px-8 py-4 bg-white text-black text-[9px] uppercase tracking-[0.35em] font-bold hover:bg-neutral-200 transition-all rounded-full">Continue Shopping</Link>
                    <Link href="/contact" className="px-8 py-4 border border-white/10 text-white/60 hover:text-white hover:border-white/30 text-[9px] uppercase tracking-[0.35em] transition-all rounded-full">Need Help?</Link>
                  </div>
                </div>
              )}
            </div>

            {/* Right: order summary */}
            <div className="lg:col-span-5 order-1 lg:order-2 co-slide-up" style={{ animationDelay: "0.12s" }}>
              <div className="lg:sticky lg:top-32 bg-[#0d0d0d] rounded-2xl md:rounded-3xl p-6 md:p-10 border border-white/5">
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/5">
                  <h2 className="text-xl font-display italic font-light">Your Order</h2>
                  <Link href="/cart" className="text-[9px] uppercase tracking-[0.3em] text-[#c5a059] hover:text-white transition-colors">Modify</Link>
                </div>
                <div className="space-y-4 mb-8">
                  {cart.map((item) => (
                    <div key={item.slug} className="flex gap-4 items-center">
                      <div className="relative w-14 h-14 bg-[#151515] rounded-lg overflow-hidden flex-shrink-0">
                        {item.image && <Image src={item.image} alt={item.name} fill sizes="56px" className="object-cover grayscale" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[10px] uppercase tracking-tight font-medium truncate">{item.name}</h4>
                        <div className="flex justify-between items-center mt-1.5">
                          <span className="text-[9px] text-white/30 uppercase">Qty: {item.quantity}</span>
                          <span className="text-[11px] font-light">{fmt(item.price * item.quantity)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {cart.length === 0 && <p className="text-white/30 text-[11px] uppercase tracking-widest">Your cart is empty.</p>}
                </div>
                <div className="space-y-3 mb-6 pb-6 border-b border-white/5">
                  <div className="flex justify-between text-[10px] uppercase tracking-widest text-white/30">
                    <span>Subtotal</span><span className="text-white">{fmt(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-[10px] uppercase tracking-widest text-[#c5a059]">
                    <span>Shipping</span><span>Free</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[9px] uppercase tracking-[0.3em] font-medium text-[#c5a059]">Total Due</span>
                  <span className="text-2xl md:text-3xl font-display font-light">{fmt(total)}</span>
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
