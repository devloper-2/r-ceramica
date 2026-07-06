/**
 * contact.ts — DATA for the /contact page (ported from contact.html).
 */

export interface Office {
  title: string;
  address: string;
  contacts: { label: string; href: string }[];
}

export const CONTACT_HERO = {
  eyebrow: "Connectivity",
  title: "Get In Touch",
  description:
    "Experience architectural excellence first hand. Our consultants are ready to assist your vision.",
  image:
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80",
};

export const PROJECT_TYPES = [
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
  { value: "industrial", label: "Industrial" },
  { value: "dealer", label: "Dealer Inquiry" },
];

export const CONTACT_OFFICES: Office[] = [
  {
    title: "Corporate Headquarter",
    address:
      "Opp. Ceramic City, Lalpar, 8-A National Highway, Morbi-363642, Gujarat, India.",
    contacts: [
      { label: "+91 94274 10127", href: "tel:+919427410127" },
      { label: "+91 99985 28523", href: "tel:+919998528523" },
    ],
  },
  {
    title: "Experience Center",
    address:
      "Luxury Hub, S.G. Highway, Near Thaltej Cross Roads, Ahmedabad-380054, Gujarat.",
    contacts: [
      { label: "+91 98765 43210", href: "tel:+919876543210" },
      { label: "info@rceramica.com", href: "mailto:info@rceramica.com" },
    ],
  },
  {
    title: "International Desk",
    address: "Suite 1204, Architecture Tower, Business Bay, Dubai, UAE.",
    contacts: [{ label: "+971 50 123 4567", href: "tel:+971501234567" }],
  },
  {
    title: "Logistic Hub",
    address: "Plot 45, Port Industrial Park, Mundra SEZ, Kutch, Gujarat.",
    contacts: [{ label: "+91 99985 28523", href: "tel:+919998528523" }],
  },
];

export const MAP_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3674.341398862413!2d70.86484401150337!3d22.810253824050278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39598dcd562cce57%3A0xfc120b911b2d75ab!2sR%20CERAMICA!5e0!3m2!1sen!2sin!4v1714896000000!5m2!1sen!2sin";
