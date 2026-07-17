import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ArrowLeft, MapPin, CreditCard, Package, Truck, Home, CheckCircle, Clock, ShoppingBag, XCircle } from "lucide-react";
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
  return new Intl.NumberFormat("en-IN", { style: "currency", currency, maximumFractionDigits: 0 }).format(Number(n));
}
function fmtDate(iso: string) {
  const d = new Date(iso.replace(" ", "T"));
  return isNaN(d.getTime()) ? iso : d.toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" });
}

/* ── Status tracker ────────────────────────────────────── */
const STEPS = [
  { key: "pending",   label: "Order Placed",       Icon: CheckCircle },
  { key: "paid",      label: "Payment Confirmed",  Icon: CreditCard },
  { key: "shipped",   label: "Shipped",            Icon: Package },
  { key: "transit",   label: "Out for Delivery",   Icon: Truck },
  { key: "delivered", label: "Delivered",          Icon: Home },
];
const STEP_INDEX: Record<string, number> = {
  pending: 0, paid: 1, shipped: 2, transit: 3, delivered: 4,
};

const STATUS_BADGE: Record<string, { label: string; cls: string }> = {
  paid:      { label: "Confirmed",        cls: "od-badge-blue" },
  pending:   { label: "Pending",          cls: "od-badge-yellow" },
  shipped:   { label: "Shipped",          cls: "od-badge-purple" },
  transit:   { label: "Out for Delivery", cls: "od-badge-orange" },
  delivered: { label: "Delivered",        cls: "od-badge-green" },
  cancelled: { label: "Cancelled",        cls: "od-badge-red" },
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
        if (res.status === 401) { router.replace(`/login?redirect=/orders/${id}`); return; }
        if (!res.ok) { setNotFound(true); return; }
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
      <div className="page-orders od-center-screen">
        <span className="od-spinner" />
      </div>
    );
  }
  if (notFound || !order) {
    return (
      <div className="page-orders od-center-screen" style={{ flexDirection: "column", gap: 24 }}>
        <XCircle size={40} style={{ color: "rgba(255,255,255,0.2)" }} />
        <p className="od-empty-title">Order not found</p>
        <Link href="/orders" className="od-back-link"><ArrowLeft size={14} /> Back to Orders</Link>
      </div>
    );
  }

  const stepIdx = order.status === "cancelled" ? -1 : (STEP_INDEX[order.status] ?? 1);
  const badge = STATUS_BADGE[order.status] ?? { label: order.status, cls: "od-badge-yellow" };
  const addr = order.shipping_address || {};
  const addressLines = [
    addr.name,
    addr.address,
    [addr.city, addr.state].filter(Boolean).join(", "),
    addr.zip,
    addr.phone ? `Ph: ${addr.phone}` : null,
  ].filter(Boolean) as string[];

  return (
    <div className="page-orders">
      <Head>
        <title>{`Order #${order.order_number} | R Ceramica`}</title>
        <meta name="description" content={`Order details for ${order.order_number} — R Ceramica.`} />
        <meta name="robots" content="noindex" />
      </Head>

      <main className="od-main">
        <div className="od-container">

          {/* ── Breadcrumb ── */}
          <nav className="od-breadcrumb orders-slide-up">
            <Link href="/orders" className="od-back-link">
              <ArrowLeft size={14} />
              My Orders
            </Link>
          </nav>

          {/* ── Page header ── */}
          <div className="od-header orders-slide-up">
            <div className="od-header-left">
              <h1 className="od-order-number">Order #{order.order_number}</h1>
              <p className="od-order-date">
                <Clock size={13} />
                Placed on {fmtDate(order.created_at)}
              </p>
            </div>
            <span className={`od-badge ${badge.cls}`}>{badge.label}</span>
          </div>

          {/* ── Status tracker ── */}
          {order.status !== "cancelled" ? (
            <div className="od-tracker-card orders-slide-up">
              <div className="od-tracker">
                {STEPS.map((step, i) => {
                  const done = i < stepIdx;
                  const active = i === stepIdx;
                  const { Icon } = step;
                  return (
                    <div key={step.key} className="od-track-item">
                      {i > 0 && <div className={`od-connector ${i <= stepIdx ? "od-connector-done" : ""}`} />}
                      <div className="od-step">
                        <div className={`od-step-icon ${done ? "od-step-done" : active ? "od-step-active" : "od-step-future"}`}>
                          <Icon size={16} />
                        </div>
                        <span className={`od-step-label ${done || active ? "od-step-label-active" : ""}`}>
                          {step.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="od-cancelled-banner orders-slide-up">
              <XCircle size={18} />
              This order has been cancelled.
            </div>
          )}

          {/* ── Main grid ── */}
          <div className="od-grid">

            {/* LEFT column */}
            <div className="od-col-left">

              {/* Items */}
              <div className="od-card">
                <div className="od-card-header">
                  <ShoppingBag size={16} />
                  <h2 className="od-card-title">Items Ordered ({order.items.length})</h2>
                </div>
                <div className="od-items-list">
                  {order.items.map((item, i) => (
                    <div key={i} className="od-item">
                      <div className="od-item-num">{String(i + 1).padStart(2, "0")}</div>
                      <div className="od-item-info">
                        <p className="od-item-name">{item.product_name}</p>
                        <p className="od-item-meta">
                          {fmt(item.unit_price, order.currency)} &times; {item.quantity} {item.quantity > 1 ? "pieces" : "piece"}
                        </p>
                      </div>
                      <div className="od-item-total">{fmt(item.line_total, order.currency)}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery address */}
              {addressLines.length > 0 && (
                <div className="od-card">
                  <div className="od-card-header">
                    <MapPin size={16} />
                    <h2 className="od-card-title">Delivery Address</h2>
                  </div>
                  <div className="od-address">
                    {addressLines.map((line, i) => (
                      <p key={i} className={i === 0 ? "od-address-name" : "od-address-line"}>{line}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT column */}
            <div className="od-col-right">

              {/* Price summary */}
              <div className="od-card">
                <div className="od-card-header">
                  <h2 className="od-card-title">Order Summary</h2>
                </div>
                <div className="od-summary-rows">
                  <div className="od-summary-row">
                    <span>Subtotal</span>
                    <span>{fmt(order.subtotal, order.currency)}</span>
                  </div>
                  <div className="od-summary-row">
                    <span>Shipping</span>
                    <span className={order.shipping > 0 ? "" : "od-free"}>
                      {order.shipping > 0 ? fmt(order.shipping, order.currency) : "Free"}
                    </span>
                  </div>
                  <div className="od-summary-row">
                    <span>Tax (GST)</span>
                    <span>{fmt(order.tax, order.currency)}</span>
                  </div>
                </div>
                <div className="od-summary-total">
                  <span>Total</span>
                  <span>{fmt(order.total, order.currency)}</span>
                </div>
              </div>

              {/* Payment */}
              <div className="od-card">
                <div className="od-card-header">
                  <CreditCard size={16} />
                  <h2 className="od-card-title">Payment</h2>
                </div>
                <div className="od-payment">
                  <div className="od-payment-provider">
                    <span className="od-payment-logo">{order.payment_provider ?? "—"}</span>
                    <span className="od-payment-label">
                      {order.payment_provider ? `Paid via ${order.payment_provider}` : "Payment pending"}
                    </span>
                  </div>
                  {order.payment_ref && (
                    <p className="od-payment-ref">Ref: {order.payment_ref}</p>
                  )}
                </div>
              </div>

              {/* CTA */}
              <Link href="/orders" className="od-cta-back">
                <ArrowLeft size={14} />
                Back to My Orders
              </Link>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
