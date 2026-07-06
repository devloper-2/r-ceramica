import Head from "next/head";
import Link from "next/link";
import { Check, MapPin, Headphones } from "lucide-react";
import AccountNavbar from "@/components/layout/AccountNavbar";
import { TRACKING } from "@/lib/constants/tracking";
import { siteConfig } from "@/config/site";

const TITLE = `Track Your Order | ${siteConfig.name}`;

/**
 * Tracking page → "/tracking" (ported from tracking.html).
 */
export default function TrackingPage() {
  return (
    <div className="page-tracking font-jakarta min-h-screen">
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content="Track your R Ceramica order in real time." />
        <link rel="canonical" href={`${siteConfig.url}/tracking`} />
        <meta name="robots" content="noindex" />
      </Head>

      <AccountNavbar showSearch showCart cartCount={0} />

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-[900px] mx-auto">
          <header className="mb-12 text-center">
            <h1 className="font-serif italic text-4xl md:text-6xl mb-4 uppercase tracking-tighter">Track Your Order</h1>
            <p className="text-[10px] uppercase tracking-[0.4em] text-white/30">Order: {TRACKING.orderId}</p>
          </header>

          {/* Status card */}
          <div className="bg-white/[0.02] border border-white/5 p-8 md:p-12 rounded-3xl mb-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
              <div className="text-center md:text-left">
                <span className="text-[9px] uppercase tracking-widest text-white/30 block mb-1">Status</span>
                <h2 className="text-2xl font-light text-[var(--color-gold)]">{TRACKING.status}</h2>
              </div>
              <div className="text-center md:text-right">
                <span className="text-[9px] uppercase tracking-widest text-white/30 block mb-1">Expected Arrival</span>
                <h2 className="text-2xl font-light">{TRACKING.eta}</h2>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-10 relative">
              <div className="absolute left-3 top-2 bottom-2 w-px bg-white/10" />
              {TRACKING.steps.map((step) => (
                <div key={step.title} className="flex gap-6 relative">
                  {step.state === "completed" ? (
                    <div className="w-6 h-6 rounded-full bg-[var(--color-gold)] flex items-center justify-center shrink-0">
                      <Check size={12} className="text-black" />
                    </div>
                  ) : step.state === "current" ? (
                    <div className="w-6 h-6 rounded-full border-2 border-[var(--color-gold)] bg-[var(--color-bg)] flex items-center justify-center shrink-0">
                      <div className="w-2 h-2 rounded-full bg-[var(--color-gold)] animate-pulse" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full border border-white/10 bg-[var(--color-bg)] shrink-0" />
                  )}
                  <div className={step.state === "pending" ? "opacity-30" : ""}>
                    <h4
                      className={`text-xs uppercase tracking-widest font-semibold mb-1 ${
                        step.state === "current" ? "text-[var(--color-gold)]" : ""
                      }`}
                    >
                      {step.title}
                    </h4>
                    <p className={`text-[10px] uppercase tracking-widest ${step.state === "pending" ? "italic" : "text-white/40"}`}>
                      {step.date}
                    </p>
                    {step.note && (
                      <p className="mt-4 text-[10px] text-white p-4 bg-white/5 rounded-xl border border-white/5">
                        {step.note}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4 flex items-center gap-2">
                <MapPin size={14} /> Delivery Point
              </h3>
              <p className="text-xs leading-relaxed uppercase tracking-widest font-light">
                {TRACKING.delivery.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </div>
            <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4 flex items-center gap-2">
                <Headphones size={14} /> Concierge
              </h3>
              <p className="text-xs leading-relaxed uppercase tracking-widest font-light">
                {TRACKING.concierge.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link href="/" className="text-[10px] uppercase tracking-[0.4em] text-white/30 hover:text-white transition-colors">
              Return to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
