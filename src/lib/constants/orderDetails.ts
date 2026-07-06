/**
 * orderDetails.ts — DATA for the /order-details page (ported from
 * order-details.html).
 */

export interface OrderLineItem {
  name: string;
  spec: string;
  qty: string;
  price: string;
  img: string;
}

export const ORDER_DETAILS = {
  id: "#RC-721589-EX",
  date: "April 05, 2026",
  status: "Delivered & Inspected",
  items: [
    {
      name: "Statuario Signature Slab",
      spec: "Matte Finish • 2400x1200mm",
      qty: "02",
      price: "$6,400.00",
      img: "https://rceramica.com/products/tiles/marble-1.jpg",
    },
    {
      name: "Aurum Vessel Filler",
      spec: "24K Brushed Gold • Limited Series",
      qty: "01",
      price: "$4,250.00",
      img: "https://rceramica.com/products/faucets/gold-1.jpg",
    },
    {
      name: "Eclipse Floating Mirror",
      spec: "Backlit LED • Smoked Black Frame",
      qty: "01",
      price: "$1,800.00",
      img: "https://rceramica.com/products/accessories/mirror-1.jpg",
    },
  ] as OrderLineItem[],
  summary: {
    subtotal: "$12,450.00",
    shipping: "Managed (Free)",
    tax: "$0.00",
    total: "$12,450.00",
  },
  address: ["Winter Nightingale", "Avenue Montage 42, Suite 800", "Houston, TX 77002", "United States"],
  payment: { label: "Visa Ending in 8901", authorized: "Authorized on 04/05/26" },
  inspectionNote:
    "All marble slabs were inspected and verified for structural integrity upon arrival. Curation signatures provided by agent Marco V. on delivery.",
};
