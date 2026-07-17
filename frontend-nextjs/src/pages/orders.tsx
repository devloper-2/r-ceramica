import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { authHeader, isAuthenticated } from "@/lib/services/auth";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api/v1";

interface OrderSummary {
  order_number: string;
  status: string;
  total: number;
  currency: string;
  created_at: string;
}

function fmt(n: number, currency = "INR") {
  const sym = currency === "INR" ? "₹" : currency + " ";
  return `${sym} ${Number(n).toLocaleString("en-IN")}`;
}

function fmtDate(iso: string) {
  const d = new Date(iso.replace(" ", "T"));
  return isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

const STATUS_LABELS: Record<string, string> = {
  paid: "Paid", pending: "Pending", shipped: "Shipped",
  transit: "In Transit", delivered: "Delivered", cancelled: "Cancelled",
};

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/login?redirect=/orders");
      return;
    }
    (async () => {
      try {
        const res = await fetch(`${API}/orders`, { headers: authHeader() });
        if (res.status === 401) {
          router.replace("/login?redirect=/orders");
          return;
        }
        const json = await res.json();
        if (!res.ok) throw new Error(json?.message || "Could not load your orders.");
        setOrders(json.data as OrderSummary[]);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Could not load your orders.");
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

          {loading && (
            <div className="py-24 flex justify-center">
              <span className="w-6 h-6 border-2 border-white/20 border-t-[#c5a059] rounded-full animate-spin" />
            </div>
          )}

          {!loading && error && (
            <div className="py-16 text-center text-red-400/70 text-[11px] uppercase tracking-[0.3em]">
              {error}
            </div>
          )}

          {!loading && !error && orders.length === 0 && (
            <div className="py-24 flex flex-col items-center gap-6 text-center border border-white/5 rounded-2xl">
              <p className="text-lg font-display font-light uppercase tracking-widest">No orders yet</p>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">Your acquisitions will appear here</p>
              <Link href="/explore"
                className="mt-2 px-8 py-4 bg-white text-black text-[9px] uppercase tracking-[0.4em] font-bold hover:bg-[#c5a059] hover:text-white transition-colors rounded-full">
                Browse Collections
              </Link>
            </div>
          )}

          <div className="space-y-6">
            {orders.map((order) => {
              const active = ["paid", "pending", "shipped", "transit"].includes(order.status);
              return (
                <div key={order.order_number} className="order-card orders-glass p-6 md:p-10 rounded-2xl">
                  <div className="flex flex-col md:flex-row justify-between gap-8 items-start md:items-center">

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <span className={`text-[9px] uppercase tracking-[0.3em] font-bold px-3 py-1 rounded-full
                          ${active ? "bg-[#c5a059]/10 text-[#c5a059]" : "bg-white/5 text-white/40"}`}>
                          {STATUS_LABELS[order.status] ?? order.status}
                        </span>
                        <span className="text-[9px] uppercase tracking-[0.3em] text-white/30">
                          #{order.order_number}
                        </span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-light mb-2">Order {order.order_number}</h3>
                      <p className="text-[10px] uppercase tracking-widest text-white/30">
                        Ordered on {fmtDate(order.created_at)}
                      </p>
                    </div>

                    <div className="flex flex-col items-start md:items-end gap-5 w-full md:w-auto">
                      <div className="md:text-right">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-white/20 block mb-1">
                          Acquisition Total
                        </span>
                        <span className="text-2xl md:text-3xl font-light">{fmt(order.total, order.currency)}</span>
                      </div>

                      <Link href={`/orders/${order.order_number}`}
                        className="w-full md:w-auto px-10 py-4 border border-white/10 text-white/60 text-[9px] font-bold uppercase tracking-[0.3em] rounded-full transition-all hover:bg-white hover:text-black text-center">
                        Order Details
                      </Link>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-20 text-center">
            <Link href="/explore"
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
