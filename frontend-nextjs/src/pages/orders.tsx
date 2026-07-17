import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ArrowRight, Package, Clock, ChevronRight, ShoppingBag } from "lucide-react";
import { authHeader, isAuthenticated } from "@/lib/services/auth";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api/v1";

interface OrderSummary {
  order_number: string;
  status: string;
  total: number;
  currency: string;
  created_at: string;
  item_count?: number;
}

function fmt(n: number, currency = "INR") {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency, maximumFractionDigits: 0 }).format(Number(n));
}

function fmtDate(iso: string) {
  const d = new Date(iso.replace(" ", "T"));
  return isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" });
}

const STATUS_BADGE: Record<string, { label: string; cls: string }> = {
  paid:      { label: "Confirmed",        cls: "od-badge-blue" },
  pending:   { label: "Pending",          cls: "od-badge-yellow" },
  shipped:   { label: "Shipped",          cls: "od-badge-purple" },
  transit:   { label: "Out for Delivery", cls: "od-badge-orange" },
  delivered: { label: "Delivered",        cls: "od-badge-green" },
  cancelled: { label: "Cancelled",        cls: "od-badge-red" },
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
        if (res.status === 401) { router.replace("/login?redirect=/orders"); return; }
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
        <title>My Orders | R Ceramica</title>
        <meta name="description" content="Track and manage your orders — R Ceramica." />
        <meta name="robots" content="noindex" />
      </Head>

      <main className="od-main">
        <div className="od-container">

          <header className="od-list-header orders-slide-up">
            <div>
              <h1 className="od-list-title">My Orders</h1>
              <p className="od-list-subtitle">Track, view, and manage your purchases</p>
            </div>
          </header>

          {/* Loading */}
          {loading && (
            <div className="od-center-screen" style={{ minHeight: 300 }}>
              <span className="od-spinner" />
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="od-empty-state">
              <Package size={40} style={{ color: "rgba(255,255,255,0.15)" }} />
              <p className="od-empty-title">Something went wrong</p>
              <p className="od-empty-sub">{error}</p>
            </div>
          )}

          {/* Empty */}
          {!loading && !error && orders.length === 0 && (
            <div className="od-empty-state">
              <ShoppingBag size={40} style={{ color: "rgba(255,255,255,0.15)" }} />
              <p className="od-empty-title">No orders yet</p>
              <p className="od-empty-sub">Your purchases will appear here once you place an order.</p>
              <Link href="/explore" className="od-browse-btn">
                Browse Collections
                <ArrowRight size={14} />
              </Link>
            </div>
          )}

          {/* Order list */}
          {!loading && !error && orders.length > 0 && (
            <div className="od-list">
              {orders.map((order) => {
                const badge = STATUS_BADGE[order.status] ?? { label: order.status, cls: "od-badge-yellow" };
                return (
                  <Link key={order.order_number} href={`/orders/${order.order_number}`} className="od-list-card order-card orders-glass">
                    <div className="od-list-card-left">
                      <div className="od-list-icon">
                        <Package size={20} />
                      </div>
                      <div className="od-list-info">
                        <div className="od-list-top">
                          <span className="od-list-number">#{order.order_number}</span>
                          <span className={`od-badge ${badge.cls}`}>{badge.label}</span>
                        </div>
                        <p className="od-list-date">
                          <Clock size={12} />
                          Placed on {fmtDate(order.created_at)}
                        </p>
                      </div>
                    </div>
                    <div className="od-list-card-right">
                      <span className="od-list-total">{fmt(order.total, order.currency)}</span>
                      <span className="od-list-arrow">
                        View Details <ChevronRight size={14} />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          <div className="od-list-footer">
            <Link href="/explore" className="od-back-link">
              <span>Explore Collections</span>
              <ArrowRight size={14} />
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
}
