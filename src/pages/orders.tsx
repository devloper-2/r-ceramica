import Head from "next/head";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const ORDERS = [
  {
    id: "RC-892401-EX",
    name: "Winter Nightingale Selection",
    date: "May 12, 2026",
    items: 2,
    total: "₹ 34,850",
    status: "transit" as const,
    statusLabel: "In Transit",
  },
  {
    id: "RC-721589-EX",
    name: "Minimalist Office Suite",
    date: "April 05, 2026",
    items: 4,
    total: "₹ 1,03,400",
    status: "delivered" as const,
    statusLabel: "Delivered",
  },
];

export default function OrdersPage() {
  return (
    <div className="page-orders">
      <Head>
        <title>Your Acquisitions | R Ceramica</title>
        <meta name="description" content="Order history and curation records — R Ceramica." />
        <meta name="robots" content="noindex" />
      </Head>

      <main className="pt-40 md:pt-48 pb-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-[1200px] mx-auto">

          <header className="mb-16 orders-slide-up">
            <h1 className="text-4xl md:text-6xl font-display italic font-light mb-4">
              Your Acquisitions
            </h1>
            <p className="text-[10px] md:text-[11px] uppercase tracking-[0.4em] text-white/30">
              Order History &amp; Curation Records
            </p>
          </header>

          <div className="space-y-6">
            {ORDERS.map((order) => (
              <div key={order.id} className="order-card orders-glass p-6 md:p-10 rounded-2xl">
                <div className="flex flex-col md:flex-row justify-between gap-8 items-start md:items-center">

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`text-[9px] uppercase tracking-[0.3em] font-bold px-3 py-1 rounded-full
                        ${order.status === "transit"
                          ? "bg-[#c5a059]/10 text-[#c5a059]"
                          : "bg-white/5 text-white/40"}`}>
                        {order.statusLabel}
                      </span>
                      <span className="text-[9px] uppercase tracking-[0.3em] text-white/30">
                        #{order.id}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-light mb-2">{order.name}</h3>
                    <p className="text-[10px] uppercase tracking-widest text-white/30">
                      Ordered on {order.date} &bull; {order.items} Items
                    </p>
                  </div>

                  <div className={`flex flex-col items-start md:items-end gap-5 w-full md:w-auto ${order.status === "delivered" ? "opacity-70" : ""}`}>
                    <div className="md:text-right">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-white/20 block mb-1">
                        Acquisition Total
                      </span>
                      <span className="text-2xl md:text-3xl font-light">{order.total}</span>
                    </div>

                    {order.status === "transit" ? (
                      <Link href="/tracking"
                        className="w-full md:w-auto px-10 py-4 bg-white text-black text-[9px] font-bold uppercase tracking-[0.3em] rounded-full transition-all hover:bg-[#c5a059] hover:text-white text-center">
                        Track Order
                      </Link>
                    ) : (
                      <Link href="/orders/RC-721589-EX"
                        className="w-full md:w-auto px-10 py-4 border border-white/10 text-white/60 text-[9px] font-bold uppercase tracking-[0.3em] rounded-full transition-all hover:bg-white hover:text-black text-center">
                        Order Details
                      </Link>
                    )}
                  </div>

                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <Link href="/products"
              className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-white/30 hover:text-white transition-colors">
              <span>Explore New Collections</span>
              <ArrowRight size={14} />
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
}
