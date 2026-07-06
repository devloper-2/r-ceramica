/**
 * tracking.ts — DATA for the /tracking page (ported from tracking.html).
 */

export interface TrackingStep {
  title: string;
  date: string;
  state: "completed" | "current" | "pending";
  note?: string;
}

export const TRACKING = {
  orderId: "#RC-892401-EX",
  status: "IN TRANSIT",
  eta: "May 18, 2026",
  steps: [
    { title: "Order Confirmed", date: "May 12, 10:45 AM", state: "completed" },
    { title: "Curation & Packing", date: "May 13, 02:20 PM", state: "completed" },
    {
      title: "Handed to Logistics",
      date: "May 15, 09:12 AM",
      state: "current",
      note: "Your selection has left our Milan facility. Our logistics partner is ensuring a delicate transport to your location.",
    },
    { title: "At Local Facility", date: "Pending...", state: "pending" },
  ] as TrackingStep[],
  delivery: ["Winter Nightingale", "Avenue Montage 42, Suite 800", "Houston, TX 77002"],
  concierge: ["Dedicated Agent: Marco V.", "Contact: concierge@rceramica.com", "Response Time: < 30 mins"],
};
