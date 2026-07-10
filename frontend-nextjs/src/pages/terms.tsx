import Head from "next/head";
import Link from "next/link";
import type { GetStaticProps } from "next";
import { siteConfig } from "@/config/site";
import { api, sectionsByType, type ApiPage } from "@/lib/services/api";

const TITLE = `Terms & Conditions | ${siteConfig.name}`;
const DESCRIPTION =
  "The terms and conditions governing your use of R Ceramica's website, products, and services. Please read carefully before placing an order.";

const SECTIONS = [
  {
    id: "acceptance",
    heading: "Acceptance of Terms",
    content: [
      {
        sub: "Agreement to Terms",
        body: "By accessing or using the R Ceramica website (rceramica.com), placing an order, or engaging with our concierge services, you confirm that you have read, understood, and agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree, please discontinue use of our services immediately.",
      },
      {
        sub: "Eligibility",
        body: "You must be at least 18 years of age to place an order or create an account. By using our services, you represent that you are of legal age and have the legal capacity to enter into a binding agreement.",
      },
      {
        sub: "Amendments",
        body: "R Ceramica reserves the right to update or modify these Terms at any time. Material changes will be notified via email or a banner on the website at least 30 days prior to taking effect. Continued use of our services after the effective date constitutes acceptance of the revised Terms.",
      },
    ],
  },
  {
    id: "products-orders",
    heading: "Products & Orders",
    content: [
      {
        sub: "Product Descriptions",
        body: "We make every effort to display product images, finishes, and specifications as accurately as possible. However, colours and textures may appear differently depending on your display device. Physical samples are available upon request through our studio concierge and are strongly recommended before placing large-volume orders.",
      },
      {
        sub: "Pricing",
        body: "All prices are listed in Indian Rupees (INR) and are inclusive of applicable taxes unless stated otherwise. Prices are subject to change without notice. The price applicable to your order is the price confirmed at checkout at the time of purchase.",
      },
      {
        sub: "Order Confirmation",
        body: "An order is confirmed only upon receipt of our written confirmation email and successful payment processing. We reserve the right to cancel or refuse any order at our sole discretion, including cases of suspected fraud, pricing errors, or unavailability of stock.",
      },
      {
        sub: "Custom & Made-to-Order Items",
        body: "Custom finishes, large-format cuts, or made-to-order pieces are non-refundable once production has commenced. Lead times for custom items are communicated at the time of order and are estimates only — R Ceramica shall not be liable for delays caused by manufacturing or logistics constraints.",
      },
    ],
  },
  {
    id: "payment",
    heading: "Payment",
    content: [
      {
        sub: "Accepted Methods",
        body: "We accept major credit and debit cards (Visa, Mastercard, American Express), UPI, net banking, and select BNPL options. All transactions are processed through PCI-DSS certified payment gateways. R Ceramica does not store your card details.",
      },
      {
        sub: "Payment Security",
        body: "All payment transactions are encrypted using TLS and processed by our certified payment partners. In the event of a payment failure, no funds will be debited. If you experience a discrepancy between your bank statement and our records, please contact our concierge within 7 days.",
      },
      {
        sub: "GST & Taxes",
        body: "Applicable Goods and Services Tax (GST) will be levied as per the prevailing rate under Indian tax law. For B2B purchases, please provide your GSTIN at checkout to receive a tax invoice. R Ceramica is not responsible for any customs duties or import taxes applicable to international shipments.",
      },
    ],
  },
  {
    id: "delivery",
    heading: "Delivery & Logistics",
    content: [
      {
        sub: "Delivery Areas",
        body: "We deliver across India and to select international destinations through our authorised logistics partners. Delivery timelines are estimates and may vary based on product availability, location, and logistics conditions. R Ceramica will not be held liable for delays caused by third-party logistics providers, natural events, or governmental actions.",
      },
      {
        sub: "White-Glove Service",
        body: "Premium white-glove delivery, including placement, unpacking, and on-site inspection, is available in select cities. This service must be selected at checkout and is subject to an additional fee. Our team will contact you to schedule a delivery window once your order is dispatched.",
      },
      {
        sub: "Risk of Loss",
        body: "Risk of loss and title for products pass to you upon delivery to the shipping address provided. Please inspect all deliveries at the time of receipt. Any damage or shortage must be reported in writing within 48 hours of delivery; claims made after this window may not be accepted.",
      },
    ],
  },
  {
    id: "returns",
    heading: "Returns & Refunds",
    content: [
      {
        sub: "Return Window",
        body: "Eligible items may be returned within 7 days of delivery in their original, unopened packaging, accompanied by the original invoice. Returns are not accepted for items that have been installed, altered, cut, or used in any way.",
      },
      {
        sub: "Non-Returnable Items",
        body: "Custom-ordered or made-to-order products, items on clearance, sample tiles, digital downloads (such as technical drawings or BIM files), and products showing signs of misuse or damage not attributable to R Ceramica are not eligible for return.",
      },
      {
        sub: "Refund Process",
        body: "Once a return is received and inspected, we will notify you of the approval or rejection of your refund. Approved refunds are processed to the original payment method within 7–10 business days. Shipping costs for returns are borne by the customer unless the return is due to a manufacturing defect or our error.",
      },
      {
        sub: "Defective Products",
        body: "If you receive a defective or incorrect item, contact our concierge immediately with photographic evidence. We will arrange a replacement or full refund at no additional cost. Our liability in all cases is limited to the value of the defective product purchased.",
      },
    ],
  },
  {
    id: "intellectual-property",
    heading: "Intellectual Property",
    content: [
      {
        sub: "Our Content",
        body: "All content on rceramica.com — including but not limited to text, photography, videos, 3D renders, collection names, product codes, and the R Ceramica brand identity — is the exclusive property of R Ceramica or its licensors and is protected by applicable intellectual property laws.",
      },
      {
        sub: "Permitted Use",
        body: "You may access and view content on our website for personal, non-commercial purposes only. You may not reproduce, distribute, republish, or create derivative works from any of our content without our prior written consent.",
      },
      {
        sub: "Trade Marks",
        body: "R Ceramica, the R Ceramica logo, and all associated product collection names are registered or unregistered trade marks of R Ceramica. Use of these marks without our express written permission is strictly prohibited.",
      },
    ],
  },
  {
    id: "user-conduct",
    heading: "User Conduct",
    content: [
      {
        sub: "Prohibited Activities",
        body: "You agree not to use our website or services to: violate any applicable law or regulation; upload or transmit harmful, offensive, or unlawful content; attempt to gain unauthorised access to our systems; engage in scraping, data mining, or automated data collection without our written consent; or impersonate any person or entity.",
      },
      {
        sub: "Account Responsibility",
        body: "You are responsible for maintaining the confidentiality of your account credentials. Any activity conducted through your account is your sole responsibility. Notify our team immediately if you suspect unauthorised access to your account.",
      },
    ],
  },
  {
    id: "limitation-liability",
    heading: "Limitation of Liability",
    content: [
      {
        sub: "Disclaimer",
        body: "Our website and services are provided on an 'as is' basis. To the fullest extent permitted by law, R Ceramica disclaims all warranties, express or implied, including merchantability, fitness for a particular purpose, and non-infringement.",
      },
      {
        sub: "Liability Cap",
        body: "In no event shall R Ceramica, its directors, employees, or affiliates be liable for any indirect, incidental, consequential, special, or punitive damages arising out of your use of our products or services. Our total aggregate liability for any claim shall not exceed the total amount paid by you for the specific order giving rise to the claim.",
      },
      {
        sub: "Force Majeure",
        body: "R Ceramica shall not be liable for any failure or delay in performance due to causes beyond our reasonable control, including natural disasters, pandemics, government actions, labour disputes, or failures of third-party service providers.",
      },
    ],
  },
  {
    id: "governing-law",
    heading: "Governing Law & Disputes",
    content: [
      {
        sub: "Jurisdiction",
        body: "These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of Morbi, Gujarat, India.",
      },
      {
        sub: "Dispute Resolution",
        body: "We encourage you to contact our concierge in the first instance to resolve any concerns informally. If a dispute cannot be resolved amicably within 30 days, either party may pursue formal legal remedies as provided under applicable law.",
      },
      {
        sub: "Severability",
        body: "If any provision of these Terms is found to be invalid or unenforceable by a court of competent jurisdiction, the remaining provisions shall continue in full force and effect.",
      },
    ],
  },
];

interface LegalContent {
  eyebrow?: string;
  titleLine1?: string;
  titleLine2?: string;
  intro?: string;
  lastUpdated?: string;
  footerNote?: string;
  sections?: typeof SECTIONS;
}

export const getStaticProps: GetStaticProps<{ page: ApiPage | null }> = async () => {
  try {
    return { props: { page: await api.getPage("terms") } };
  } catch {
    return { props: { page: null } };
  }
};

export default function TermsPage({ page }: { page: ApiPage | null }) {
  const legal: LegalContent = (page ? sectionsByType(page.sections).legal : null) ?? {};
  const sections = legal.sections ?? SECTIONS;
  const eyebrow = legal.eyebrow ?? "Legal";
  const titleLine1 = legal.titleLine1 ?? "Terms &";
  const titleLine2 = legal.titleLine2 ?? "Conditions";
  const intro =
    legal.intro ??
    "Please read these terms carefully before using our website, placing an order, or engaging with R Ceramica's concierge services.";
  const lastUpdated = legal.lastUpdated ?? "Last updated: January 2026";
  const footerNote =
    legal.footerNote ??
    "Our concierge team is available to clarify any aspect of our terms before you place an order. We are committed to full transparency.";

  return (
    <div className="page-terms">
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={`${siteConfig.url}/terms`} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta name="robots" content="index,follow" />
      </Head>

      {/* ── Hero ── */}
      <section className="relative pt-48 pb-24 px-6 md:px-24 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-[#c5a059]/20 to-transparent" />

        <div className="max-w-[900px] mx-auto relative">
          <span className="text-[10px] uppercase tracking-[0.6em] text-[#c5a059] mb-6 block font-medium">
            {eyebrow}
          </span>
          <h1 className="text-5xl md:text-7xl font-display font-light uppercase tracking-tighter mb-8 leading-[0.9]">
            {titleLine1}<br />
            <span className="italic font-light">{titleLine2}</span>
          </h1>
          <p className="text-white/40 text-xs md:text-sm uppercase tracking-[0.3em] font-light max-w-xl leading-relaxed mb-10">
            {intro}
          </p>
          <div className="flex flex-wrap gap-8 text-[9px] uppercase tracking-[0.4em] text-white/20">
            <div className="flex items-center gap-3">
              <div className="w-4 h-px bg-[#c5a059]/40" />
              <span>{lastUpdated}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-px bg-white/10" />
              <span>Effective: January 01, 2026</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Table of Contents ── */}
      <section className="px-6 md:px-24 pb-16">
        <div className="max-w-[900px] mx-auto">
          <div className="terms-glass rounded-2xl p-8 md:p-10">
            <h2 className="text-[10px] uppercase tracking-[0.5em] text-white/30 font-medium mb-6">
              Contents
            </h2>
            <ol className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="flex items-center gap-3 group text-[10px] uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors"
                  >
                    <span className="text-[#c5a059]/60 font-mono tabular-nums w-5 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform">
                      {s.heading}
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── Terms Sections ── */}
      <section className="px-6 md:px-24 pb-32">
        <div className="max-w-[900px] mx-auto space-y-0">
          {sections.map((section, idx) => (
            <div
              key={section.id}
              id={section.id}
              className="terms-section border-t border-white/5 py-16 md:py-20 scroll-mt-32"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
                {/* Section number + heading */}
                <div className="md:col-span-4">
                  <div className="md:sticky md:top-40">
                    <span className="text-[10px] font-mono text-[#c5a059]/40 tracking-widest block mb-4">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <h2 className="text-xl md:text-2xl font-display font-light uppercase tracking-[0.15em] text-white leading-tight">
                      {section.heading}
                    </h2>
                  </div>
                </div>

                {/* Sub-sections */}
                <div className="md:col-span-8 space-y-8">
                  {section.content.map((item) => (
                    <div key={item.sub} className="space-y-3">
                      <h3 className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] font-semibold text-[#c5a059]">
                        {item.sub}
                      </h3>
                      <p className="text-white/55 text-sm md:text-[13px] leading-[1.9] font-light">
                        {item.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* ── Footer strip ── */}
          <div className="border-t border-white/5 pt-16">
            <div className="terms-glass rounded-2xl p-8 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
              <div className="space-y-3">
                <h3 className="text-[10px] uppercase tracking-[0.5em] text-white/30 font-medium">
                  Questions about these terms?
                </h3>
                <p className="text-[12px] text-white/40 font-light max-w-lg leading-relaxed">
                  {footerNote}
                </p>
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#c5a059]/60">
                  legal@rceramica.com
                </p>
              </div>
              <div className="flex flex-col gap-3 shrink-0">
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-white text-black text-[9px] uppercase tracking-[0.5em] font-medium hover:bg-[#c5a059] hover:text-white transition-all duration-500 text-center"
                >
                  Contact Us
                </Link>
                <Link
                  href="/privacy"
                  className="px-8 py-4 border border-white/10 text-[9px] uppercase tracking-[0.5em] text-white/50 hover:border-[#c5a059]/50 hover:text-white transition-all duration-500 text-center"
                >
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
