import Head from "next/head";
import Image from "next/image";
import { MapPin, CreditCard, ShieldCheck } from "lucide-react";
import AccountNavbar from "@/components/layout/AccountNavbar";
import { ORDER_DETAILS } from "@/lib/constants/orderDetails";
import { PAYMENT_LOGOS } from "@/lib/constants/cart";
import { siteConfig } from "@/config/site";

const TITLE = `Acquisition Details | ${siteConfig.name}`;

/**
 * Order details page → "/order-details" (ported from order-details.html).
 */
export default function OrderDetailsPage() {
  const o = ORDER_DETAILS;
  return (
    <div className="page-order-details font-jakarta min-h-screen">
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content="Your R Ceramica acquisition record and delivery details." />
        <link rel="canonical" href={`${siteConfig.url}/order-details`} />
        <meta name="robots" content="noindex" />
      </Head>

      <AccountNavbar rightLink={{ label: "Return to History", href: "/orders" }} showCart={false} />

      <main className="pt-32 md:pt-48 pb-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-[1000px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 px-4">
            <div>
              <h1 className="font-serif italic text-4xl md:text-6xl mb-4">Acquisition Record</h1>
              <p className="text-[10px] md:text-[11px] uppercase tracking-[0.4em] text-white/30">
                Order: {o.id} • {o.date}
              </p>
            </div>
            <div className="flex items-center gap-4 py-2 px-6 bg-white/5 rounded-full border border-white/10">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-medium">{o.status}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
            {/* Items */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden">
                <div className="p-6 md:p-8 border-b border-white/5">
                  <h2 className="text-lg font-light uppercase tracking-widest">Curation Details</h2>
                </div>
                {o.items.map((item, i) => (
                  <div
                    key={item.name}
                    className={`p-6 md:p-8 flex gap-6 ${i < o.items.length - 1 ? "border-b border-white/5" : ""} ${
                      i === 0 ? "bg-white/[0.01]" : ""
                    }`}
                  >
                    <div className="w-24 h-24 md:w-32 md:h-32 bg-white/5 rounded-xl overflow-hidden shrink-0 relative">
                      <Image src={item.img} alt={item.name} fill sizes="128px" className="object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <h3 className="text-sm md:text-base font-light mb-1 uppercase tracking-wider">{item.name}</h3>
                        <p className="text-[10px] text-white/30 uppercase tracking-widest">{item.spec}</p>
                      </div>
                      <div className="flex justify-between items-end">
                        <span className="text-[10px] text-white/40 uppercase tracking-widest font-medium">Qty: {item.qty}</span>
                        <span className="text-lg font-light">{item.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-8 rounded-3xl bg-[var(--color-gold)]/5 border border-white/10">
                <div className="flex gap-4 items-start">
                  <ShieldCheck className="text-[var(--color-gold)] shrink-0" size={20} />
                  <div>
                    <h4 className="text-[10px] uppercase tracking-widest font-bold text-[var(--color-gold)] mb-2">
                      Post-Delivery Inspection Report
                    </h4>
                    <p className="text-xs text-white/60 leading-relaxed font-light">{o.inspectionNote}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl">
                <h3 className="text-xs uppercase tracking-[0.3em] font-bold mb-8">Financial Summary</h3>
                <div className="space-y-4 mb-8 pb-8 border-b border-white/5">
                  <SummaryRow label="Subtotal" value={o.summary.subtotal} />
                  <SummaryRow label="Shipping" value={o.summary.shipping} accent />
                  <SummaryRow label="Tax (0%)" value={o.summary.tax} />
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-bold">Total Acquisition</span>
                  <span className="text-3xl font-light">{o.summary.total}</span>
                </div>
              </div>

              <div className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl">
                <h3 className="text-xs uppercase tracking-[0.3em] font-bold mb-6 flex items-center gap-3">
                  <MapPin size={16} className="text-white/40" /> Destination
                </h3>
                <p className="text-[11px] leading-relaxed uppercase tracking-[0.2em] font-light text-white/60">
                  {o.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </div>

              <div className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl">
                <h3 className="text-xs uppercase tracking-[0.3em] font-bold mb-6 flex items-center gap-3">
                  <CreditCard size={16} className="text-white/40" /> Transaction
                </h3>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-6 bg-white/[0.03] border border-white/10 rounded flex items-center justify-center p-1">
                    <Image src={PAYMENT_LOGOS[0].src} alt="Visa" width={24} height={8} className="h-2 w-auto grayscale opacity-50" />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] font-light">{o.payment.label}</p>
                    <p className="text-[9px] uppercase tracking-widest text-white/20">{o.payment.authorized}</p>
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

function SummaryRow({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex justify-between text-[10px] uppercase tracking-widest text-white/40 font-medium">
      <span>{label}</span>
      <span className={accent ? "text-[var(--color-gold)]" : "text-white"}>{value}</span>
    </div>
  );
}
