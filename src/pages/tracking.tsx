import Head from "next/head";
import Link from "next/link";
import { Check, MapPin, Headphones } from "lucide-react";

const STEPS = [
  {
    label: "Order Confirmed",
    time: "May 12, 10:45 AM",
    status: "done" as const,
  },
  {
    label: "Curation & Packing",
    time: "May 13, 02:20 PM",
    status: "done" as const,
  },
  {
    label: "Handed to Logistics",
    time: "May 15, 09:12 AM",
    status: "current" as const,
    note: "Your selection has left our facility. Our logistics partner is ensuring a delicate transport to your location.",
  },
  {
    label: "At Local Facility",
    time: null,
    status: "pending" as const,
  },
  {
    label: "Out for Delivery",
    time: null,
    status: "pending" as const,
  },
];

export default function TrackingPage() {
  return (
    <div className="page-tracking">
      <Head>
        <title>Track Your Order | R Ceramica</title>
        <meta name="description" content="Real-time order tracking for R Ceramica." />
        <meta name="robots" content="noindex" />
      </Head>

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-[900px] mx-auto">

          {/* Header */}
          <header className="mb-12 text-center">
            <p className="text-[9px] uppercase tracking-[0.5em] text-[#c5a059] mb-4">
              Live Update
            </p>
            <h1 className="text-4xl md:text-6xl font-display italic font-light uppercase tracking-tighter mb-4">
              Track Your Order
            </h1>
            <p className="text-[10px] uppercase tracking-[0.4em] text-white/30">
              Order: #RC-892401-EX
            </p>
          </header>

          {/* Status card */}
          <div className="tracking-glass p-8 md:p-12 rounded-3xl mb-6">

            {/* Status + ETA row */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-14 pb-10 border-b border-white/5">
              <div className="text-center md:text-left">
                <span className="text-[9px] uppercase tracking-widest text-white/30 block mb-2">Status</span>
                <h2 className="text-xl md:text-2xl font-light tracking-wider text-[#c5a059]">
                  In Transit
                </h2>
              </div>
              <div className="flex gap-8 md:gap-16 text-center">
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-white/30 block mb-2">Dispatched</span>
                  <p className="text-sm font-light tracking-wider">May 15, 2026</p>
                </div>
                <div className="w-px bg-white/5 self-stretch hidden md:block" />
                <div className="text-center md:text-right">
                  <span className="text-[9px] uppercase tracking-widest text-white/30 block mb-2">Expected Arrival</span>
                  <p className="text-sm font-light tracking-wider">May 18, 2026</p>
                </div>
              </div>
            </div>

            {/* Vertical timeline */}
            <div className="space-y-0 relative">
              {/* Connector line */}
              <div className="absolute left-[11px] top-3 bottom-3 w-px bg-white/8" />

              {STEPS.map((step, i) => (
                <div key={i} className="flex gap-6 relative pb-10 last:pb-0">
                  {/* Node */}
                  {step.status === "done" && (
                    <div className="w-6 h-6 rounded-full bg-[#c5a059] flex items-center justify-center shrink-0 z-10">
                      <Check size={11} strokeWidth={2.5} className="text-black" />
                    </div>
                  )}
                  {step.status === "current" && (
                    <div className="w-6 h-6 rounded-full border-2 border-[#c5a059] bg-[#0a0a0a] flex items-center justify-center shrink-0 z-10">
                      <div className="w-2 h-2 rounded-full bg-[#c5a059] animate-pulse" />
                    </div>
                  )}
                  {step.status === "pending" && (
                    <div className="w-6 h-6 rounded-full border border-white/10 bg-[#0a0a0a] shrink-0 z-10" />
                  )}

                  {/* Content */}
                  <div className={step.status === "pending" ? "opacity-25" : ""}>
                    <h4 className={`text-[11px] uppercase tracking-widest font-semibold mb-1 ${step.status === "current" ? "text-[#c5a059]" : ""}`}>
                      {step.label}
                    </h4>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest">
                      {step.time ?? "Pending…"}
                    </p>
                    {step.note && (
                      <p className="mt-4 text-[10px] text-white/70 p-4 bg-white/5 rounded-xl border border-white/5 leading-relaxed max-w-sm">
                        {step.note}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Details grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="tracking-glass p-6 rounded-2xl">
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4 flex items-center gap-2">
                <MapPin size={13} className="text-white/30" />
                Delivery Point
              </h3>
              <p className="text-[11px] leading-relaxed uppercase tracking-widest font-light text-white/80">
                Winter Nightingale<br />
                Avenue Montage 42, Suite 800<br />
                Houston, TX 77002
              </p>
            </div>

            <div className="tracking-glass p-6 rounded-2xl">
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4 flex items-center gap-2">
                <Headphones size={13} className="text-white/30" />
                Concierge
              </h3>
              <p className="text-[11px] leading-relaxed uppercase tracking-widest font-light text-white/80">
                Dedicated Agent: Marco V.<br />
                Contact: concierge@rceramica.com<br />
                Response Time: &lt; 30 mins
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link href="/"
              className="text-[10px] uppercase tracking-[0.4em] text-white/30 hover:text-white transition-colors">
              Return to Home
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
}
