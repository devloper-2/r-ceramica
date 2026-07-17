import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ArrowLeft, MapPin, CreditCard } from "lucide-react";
import { authHeader, isAuthenticated } from "@/lib/services/auth";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api/v1";

interface OrderItem {
  product_name: string;
  unit_price: number;
  quantity: number;
  line_total: number;
}
interface OrderDetail {
  order_number: string;
  status: string;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  currency: string;
  email: string;
  phone: string;
  payment_provider?: string | null;
  payment_ref?: string | null;
  created_at: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  shipping_address?: Record<string, any> | null;
  items: OrderItem[];
}

function fmt(n: number, currency = "INR") {
  const sym = currency === "INR" ? "₹" : currency + " ";
  return `${sym} ${Number(n).toLocaleString("en-IN")}`;
}
function fmtDate(iso: string) {
  const d = new Date(iso.replace(" ", "T"));
  return isNaN(d.getTime()) ? iso : d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

const STATUS_LABELS: Record<string, string> = {
  paid: "Paid", pending: "Pending", shipped: "Shipped",
  transit: "In Transit", delivered: "Delivered", cancelled: "Cancelled",
};

export default function OrderDetailsPage() {
  const router = useRouter();
  const { id } = router.query;
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;
    if (!isAuthenticated()) {
      router.replace(`/login?redirect=/orders/${id}`);
      return;
    }
    (async () => {
      try {
        const res = await fetch(`${API}/orders/${encodeURIComponent(String(id))}`, { headers: authHeader() });
        if (res.status === 401) {
          router.replace(`/login?redirect=/orders/${id}`);
          return;
        }
        if (!res.ok) {
          setNotFound(true);
          return;
        }
        const json = await res.json();
        setOrder(json.data as OrderDetail);
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, id]);

  if (loading) {
    return (
      <div className="page-orders min-h-screen flex items-center justify-center">
        <span className="w-6 h-6 border-2 border-white/20 border-t-[#c5a059] rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound || !order) {
    return (
      <div className="page-orders min-h-screen flex flex-col items-center justify-center gap-6">
        <p className="text-white/40 text-[10px] uppercase tracking-[0.4em]">Order not found</p>
        <Link href="/orders" className="text-[9px] uppercase tracking-[0.3em] text-[#c5a059] hover:text-white transition-colors">
          ← Back to Orders
        </Link>
      </div>
    );
  }

  const addr = order.shipping_address || {};
  const addressLines = [
    addr.name,
    addr.address,
    [addr.city, addr.state].filter(Boolean).join(", "),
    addr.zip,
    addr.phone ? `Phone: ${addr.phone}` : null,
  ].filter(Boolean) as string[];

  return (
    <div className="page-orders">
      <Head>
        <title>Acquisition Record #{order.order_number} | R Ceramica</title>
        <meta name="description" content={`Order details for ${order.order_number} — R Ceramica.`} />
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
                Order: #{order.order_number} &bull; {fmtDate(order.created_at)}
              </p>
            </div>
            <div className="flex items-center gap-3 py-2 px-5 bg-white/5 rounded-full border border-white/10 shrink-0">
              <div className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-medium">
                {STATUS_LABELS[order.status] ?? order.status}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">

            {/* ── Left: Items ── */}
            <div className="lg:col-span-8 space-y-6">
              <div className="orders-glass rounded-3xl overflow-hidden">
                <div className="p-6 md:p-8 border-b border-white/5">
                  <h2 className="text-[11px] font-medium uppercase tracking-widest text-white/60">
                    Curation Details
                  </h2>
                </div>

                {order.items.map((item, i) => (
                  <div key={i}
                    className={`p-6 md:p-8 flex gap-5 md:gap-6 items-center ${i < order.items.length - 1 ? "border-b border-white/5" : ""} ${i % 2 === 0 ? "bg-white/[0.01]" : ""}`}>
                    <div className="w-14 h-14 rounded-xl bg-[#c5a059]/10 border border-[#c5a059]/20 flex items-center justify-center shrink-0">
                      <span className="text-[#c5a059] text-sm font-display">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1 min-w-0">
                      <h3 className="text-sm md:text-base font-light mb-1 uppercase tracking-wider truncate">
                        {item.product_name}
                      </h3>
                      <div className="flex justify-between items-end">
                        <span className="text-[10px] text-white/40 uppercase tracking-widest font-medium">
                          {fmt(item.unit_price, order.currency)} × {String(item.quantity).padStart(2, "0")}
                        </span>
                        <span className="text-base md:text-lg font-light">{fmt(item.line_total, order.currency)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: Summary sidebar ── */}
            <div className="lg:col-span-4 space-y-6">

              {/* Financial summary */}
              <div className="orders-glass p-6 md:p-8 rounded-3xl">
                <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-8">Financial Summary</h3>
                <div className="space-y-4 mb-8 pb-8 border-b border-white/5">
                  <div className="flex justify-between text-[10px] uppercase tracking-widest text-white/40 font-medium">
                    <span>Subtotal</span>
                    <span className="text-white">{fmt(order.subtotal, order.currency)}</span>
                  </div>
                  <div className="flex justify-between text-[10px] uppercase tracking-widest text-white/40 font-medium">
                    <span>Shipping</span>
                    <span className="text-[#c5a059]">{order.shipping > 0 ? fmt(order.shipping, order.currency) : "Managed (Free)"}</span>
                  </div>
                  <div className="flex justify-between text-[10px] uppercase tracking-widest text-white/40 font-medium">
                    <span>Tax (GST)</span>
                    <span className="text-white">{fmt(order.tax, order.currency)}</span>
                  </div>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold">Total</span>
                  <span className="text-2xl md:text-3xl font-light">{fmt(order.total, order.currency)}</span>
                </div>
              </div>

              {/* Destination */}
              {addressLines.length > 0 && (
                <div className="orders-glass p-6 md:p-8 rounded-3xl">
                  <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-6 flex items-center gap-3">
                    <MapPin size={15} className="text-white/30" />
                    Destination
                  </h3>
                  <p className="text-[11px] leading-relaxed uppercase tracking-[0.2em] font-light text-white/60">
                    {addressLines.map((line, i) => (
                      <span key={i}>{line}{i < addressLines.length - 1 && <br />}</span>
                    ))}
                  </p>
                </div>
              )}

              {/* Payment */}
              <div className="orders-glass p-6 md:p-8 rounded-3xl">
                <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-6 flex items-center gap-3">
                  <CreditCard size={15} className="text-white/30" />
                  Transaction
                </h3>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-6 bg-white/[0.03] border border-white/10 rounded flex items-center justify-center px-1.5">
                    <span className="text-[8px] uppercase tracking-widest font-bold text-white/40">
                      {order.payment_provider ?? "—"}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-[0.2em] font-light truncate">
                      {order.payment_provider ? `Paid via ${order.payment_provider}` : "Payment"}
                    </p>
                    {order.payment_ref && (
                      <p className="text-[9px] uppercase tracking-widest text-white/20 mt-0.5 truncate">
                        Ref: {order.payment_ref}
                      </p>
                    )}
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
