import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowLeft, MapPin, CreditCard, ShieldCheck } from "lucide-react";

/* ── Static order data (keyed by order ID) ── */
const ORDER_DATA: Record<string, {
  id: string;
  name: string;
  date: string;
  status: string;
  items: { name: string; spec: string; qty: number; price: string; img: string }[];
  subtotal: string;
  tax: string;
  total: string;
  address: string[];
  payment: { brand: string; last4: string; date: string };
  inspection?: string;
}> = {
  "RC-721589-EX": {
    id: "RC-721589-EX",
    name: "Minimalist Office Suite",
    date: "April 05, 2026",
    status: "Delivered & Inspected",
    items: [
      {
        name: "Statuario Signature Slab",
        spec: "Matte Finish · 2400×1200 mm",
        qty: 2,
        price: "₹ 53,200",
        img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=300",
      },
      {
        name: "Aurum Vessel Filler",
        spec: "24K Brushed Gold · Limited Series",
        qty: 1,
        price: "₹ 35,400",
        img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=300",
      },
      {
        name: "Eclipse Floating Mirror",
        spec: "Backlit LED · Smoked Black Frame",
        qty: 1,
        price: "₹ 14,800",
        img: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&q=80&w=300",
      },
    ],
    subtotal: "₹ 1,03,400",
    tax: "₹ 0",
    total: "₹ 1,03,400",
    address: ["Winter Nightingale", "Avenue Montage 42, Suite 800", "Houston, TX 77002", "United States"],
    payment: { brand: "Visa", last4: "8901", date: "04/05/26" },
    inspection: "All marble slabs were inspected and verified for structural integrity upon arrival. Curation signatures provided by agent Marco V. on delivery.",
  },
  "RC-892401-EX": {
    id: "RC-892401-EX",
    name: "Winter Nightingale Selection",
    date: "May 12, 2026",
    status: "In Transit",
    items: [
      {
        name: "Fusion Basin Mixer",
        spec: "Chrome Finish · F10201CL",
        qty: 1,
        price: "₹ 12,450",
        img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=300",
      },
      {
        name: "Zen Exposed Mixer",
        spec: "Exposed Series · Z10801EM",
        qty: 1,
        price: "₹ 22,400",
        img: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&q=80&w=300",
      },
    ],
    subtotal: "₹ 34,850",
    tax: "₹ 6,273",
    total: "₹ 41,123",
    address: ["Winter Nightingale", "Avenue Montage 42, Suite 800", "Houston, TX 77002", "United States"],
    payment: { brand: "Visa", last4: "8901", date: "05/12/26" },
  },
};

export default function OrderDetailsPage() {
  const router = useRouter();
  const { id } = router.query;
  const order = typeof id === "string" ? ORDER_DATA[id] : null;

  if (!order) {
    return (
      <div className="page-orders min-h-screen flex flex-col items-center justify-center gap-6">
        <p className="text-white/40 text-[10px] uppercase tracking-[0.4em]">Order not found</p>
        <Link href="/orders" className="text-[9px] uppercase tracking-[0.3em] text-[#c5a059] hover:text-white transition-colors">
          ← Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="page-orders">
      <Head>
        <title>Acquisition Record #{order.id} | R Ceramica</title>
        <meta name="description" content={`Order details for ${order.name} — R Ceramica.`} />
        <meta name="robots" content="noindex" />
      </Head>

      <main className="pt-32 md:pt-48 pb-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-[1000px] mx-auto">

          {/* Page header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 orders-slide-up">
            <div>
              <Link href="/orders"
                className="inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.3em] text-white/30 hover:text-white transition-colors mb-6">
                <ArrowLeft size={12} />
                Order History
              </Link>
              <h1 className="text-4xl md:text-6xl font-display italic font-light mb-4">
                Acquisition Record
              </h1>
              <p className="text-[10px] md:text-[11px] uppercase tracking-[0.4em] text-white/30">
                Order: #{order.id} &bull; {order.date}
              </p>
            </div>
            <div className="flex items-center gap-3 py-2 px-5 bg-white/5 rounded-full border border-white/10 shrink-0">
              <div className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-medium">{order.status}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">

            {/* ── Left: Items + Inspection note ── */}
            <div className="lg:col-span-8 space-y-6">

              <div className="orders-glass rounded-3xl overflow-hidden">
                <div className="p-6 md:p-8 border-b border-white/5">
                  <h2 className="text-[11px] font-medium uppercase tracking-widest text-white/60">
                    Curation Details
                  </h2>
                </div>

                {order.items.map((item, i) => (
                  <div key={i}
                    className={`p-6 md:p-8 flex gap-5 md:gap-6 ${i < order.items.length - 1 ? "border-b border-white/5" : ""} ${i % 2 === 0 ? "bg-white/[0.01]" : ""}`}>
                    <div className="w-20 h-20 md:w-28 md:h-28 bg-white/5 rounded-xl overflow-hidden shrink-0">
                      <Image src={item.img} alt={item.name} width={112} height={112}
                        className="w-full h-full object-cover grayscale" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <h3 className="text-sm md:text-base font-light mb-1 uppercase tracking-wider">
                          {item.name}
                        </h3>
                        <p className="text-[10px] text-white/30 uppercase tracking-widest">{item.spec}</p>
                      </div>
                      <div className="flex justify-between items-end">
                        <span className="text-[10px] text-white/40 uppercase tracking-widest font-medium">
                          Qty: 0{item.qty}
                        </span>
                        <span className="text-base md:text-lg font-light">{item.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Inspection note */}
              {order.inspection && (
                <div className="p-6 md:p-8 rounded-3xl orders-glass orders-gold-tint">
                  <div className="flex gap-4 items-start">
                    <ShieldCheck size={20} className="text-[#c5a059] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#c5a059] mb-2">
                        Post-Delivery Inspection Report
                      </h4>
                      <p className="text-[11px] text-white/60 leading-relaxed font-light">
                        {order.inspection}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ── Right: Summary sidebar ── */}
            <div className="lg:col-span-4 space-y-6">

              {/* Financial summary */}
              <div className="orders-glass p-6 md:p-8 rounded-3xl">
                <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-8">
                  Financial Summary
                </h3>
                <div className="space-y-4 mb-8 pb-8 border-b border-white/5">
                  <div className="flex justify-between text-[10px] uppercase tracking-widest text-white/40 font-medium">
                    <span>Subtotal</span>
                    <span className="text-white">{order.subtotal}</span>
                  </div>
                  <div className="flex justify-between text-[10px] uppercase tracking-widest text-white/40 font-medium">
                    <span>Shipping</span>
                    <span className="text-[#c5a059]">Managed (Free)</span>
                  </div>
                  <div className="flex justify-between text-[10px] uppercase tracking-widest text-white/40 font-medium">
                    <span>Tax (GST)</span>
                    <span className="text-white">{order.tax}</span>
                  </div>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold">Total</span>
                  <span className="text-2xl md:text-3xl font-light">{order.total}</span>
                </div>
              </div>

              {/* Destination */}
              <div className="orders-glass p-6 md:p-8 rounded-3xl">
                <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-6 flex items-center gap-3">
                  <MapPin size={15} className="text-white/30" />
                  Destination
                </h3>
                <p className="text-[11px] leading-relaxed uppercase tracking-[0.2em] font-light text-white/60">
                  {order.address.map((line, i) => (
                    <span key={i}>{line}{i < order.address.length - 1 && <br />}</span>
                  ))}
                </p>
              </div>

              {/* Payment */}
              <div className="orders-glass p-6 md:p-8 rounded-3xl">
                <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-6 flex items-center gap-3">
                  <CreditCard size={15} className="text-white/30" />
                  Transaction
                </h3>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-6 bg-white/[0.03] border border-white/10 rounded flex items-center justify-center px-1.5">
                    <span className="text-[8px] uppercase tracking-widest font-bold text-white/40">
                      {order.payment.brand}
                    </span>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] font-light">
                      {order.payment.brand} Ending in {order.payment.last4}
                    </p>
                    <p className="text-[9px] uppercase tracking-widest text-white/20 mt-0.5">
                      Authorized on {order.payment.date}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
