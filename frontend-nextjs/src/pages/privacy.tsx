import Head from "next/head";
import Link from "next/link";
import type { GetStaticProps } from "next";
import { siteConfig } from "@/config/site";
import { api, sectionsByType, type ApiPage } from "@/lib/services/api";

const TITLE = `Privacy Policy | ${siteConfig.name}`;
const DESCRIPTION =
  "How R Ceramica collects, uses, and protects your personal information. We are committed to transparency and the highest standards of data privacy.";

const SECTIONS = [
  {
    id: "information-we-collect",
    heading: "Information We Collect",
    content: [
      {
        sub: "Information You Provide",
        body: "When you create an account, place an order, or contact our concierge team, we collect your name, mobile number, email address, shipping address, and payment information. For catalogue requests or studio appointments, we may also collect your company name and design brief.",
      },
      {
        sub: "Information Collected Automatically",
        body: "When you visit rceramica.com, we automatically receive your IP address, browser type, device identifiers, pages visited, and session duration. This data is collected via cookies and similar tracking technologies to improve performance and your browsing experience.",
      },
      {
        sub: "Information from Third Parties",
        body: "If you use social login or connect via WhatsApp Business, we receive basic profile information as permitted by those platforms. We may also receive updated delivery or address information from our logistics partners.",
      },
    ],
  },
  {
    id: "how-we-use",
    heading: "How We Use Your Information",
    content: [
      {
        sub: "Order Fulfilment",
        body: "We use your personal information to process transactions, arrange white-glove delivery, send order confirmations and tracking updates, and handle returns or inspections.",
      },
      {
        sub: "Personalised Experience",
        body: "We analyse browsing and purchase history to recommend collections, surface relevant new arrivals, and tailor your catalogue view to your aesthetic preferences.",
      },
      {
        sub: "Communication",
        body: "With your consent, we send product launches, exclusive previews, and event invitations via email or WhatsApp. You may unsubscribe at any time from any marketing communication.",
      },
      {
        sub: "Legal & Security",
        body: "We may use your data to comply with applicable laws and regulations, detect and prevent fraud, resolve disputes, and enforce our Terms of Service.",
      },
    ],
  },
  {
    id: "sharing",
    heading: "Information Sharing",
    content: [
      {
        sub: "We Do Not Sell Your Data",
        body: "R Ceramica does not sell, rent, or trade your personal information to third parties for their marketing purposes.",
      },
      {
        sub: "Service Providers",
        body: "We share information with trusted partners who assist us in operating our website and fulfilling orders — including payment processors (Razorpay / Stripe), logistics partners, and cloud infrastructure providers. These parties are contractually bound to keep your information confidential.",
      },
      {
        sub: "Legal Requirements",
        body: "We may disclose your information if required to do so by law, or if we believe such action is necessary to comply with a legal obligation, protect the rights or safety of R Ceramica, our customers, or others.",
      },
    ],
  },
  {
    id: "cookies",
    heading: "Cookies & Tracking",
    content: [
      {
        sub: "Essential Cookies",
        body: "These cookies are strictly necessary for the website to function — managing your session, maintaining your cart, and securing authentication. They cannot be disabled.",
      },
      {
        sub: "Analytics Cookies",
        body: "We use anonymised analytics to understand how visitors interact with our pages. No personally identifiable information is shared with analytics providers.",
      },
      {
        sub: "Preference Cookies",
        body: "These cookies remember your choices — such as preferred currency, language, or surface finish filters — so your next visit starts where you left off.",
      },
    ],
  },
  {
    id: "your-rights",
    heading: "Your Rights",
    content: [
      {
        sub: "Access & Portability",
        body: "You may request a copy of all personal data we hold about you, in a structured, machine-readable format, at any time.",
      },
      {
        sub: "Correction",
        body: "If any information we hold is inaccurate or incomplete, you have the right to request correction. You can update most information directly from your account dashboard.",
      },
      {
        sub: "Erasure",
        body: "You may request deletion of your personal data, subject to our legal obligations to retain certain records (such as transaction history for financial compliance). Deleted accounts cannot be recovered.",
      },
      {
        sub: "Withdrawal of Consent",
        body: "Where we process your data on the basis of consent, you may withdraw that consent at any time. This will not affect the lawfulness of processing carried out before withdrawal.",
      },
    ],
  },
  {
    id: "security",
    heading: "Data Security",
    content: [
      {
        sub: "Technical Safeguards",
        body: "All data in transit is encrypted with TLS 1.3. Payment data is handled by PCI-DSS certified processors and never stored on our servers. We conduct regular security audits and penetration tests.",
      },
      {
        sub: "Access Controls",
        body: "Access to customer data within R Ceramica is restricted on a strict need-to-know basis. All team members with data access undergo data-privacy training annually.",
      },
    ],
  },
  {
    id: "retention",
    heading: "Data Retention",
    content: [
      {
        sub: "How Long We Keep Data",
        body: "We retain your account information for as long as your account is active or as needed to provide services. Transaction records are retained for a minimum of 7 years to comply with financial regulations. Marketing preferences are reviewed and pruned annually.",
      },
    ],
  },
  {
    id: "contact",
    heading: "Contact & Grievance",
    content: [
      {
        sub: "Data Protection Officer",
        body: "For any privacy-related concern, data access request, or complaint, contact our Data Protection Officer at privacy@rceramica.com. We respond within 5 business days.",
      },
      {
        sub: "Grievance Officer",
        body: "In accordance with the Information Technology Act, 2000 and the rules thereunder, the name and contact details of our Grievance Officer are made available at the registered office address listed on the Contact page.",
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
    return { props: { page: await api.getPage("privacy") } };
  } catch {
    return { props: { page: null } };
  }
};

export default function PrivacyPage({ page }: { page: ApiPage | null }) {
  const legal: LegalContent = (page ? sectionsByType(page.sections).legal : null) ?? {};
  const sections = legal.sections ?? SECTIONS;
  const eyebrow = legal.eyebrow ?? "Legal";
  const titleLine1 = legal.titleLine1 ?? "Privacy";
  const titleLine2 = legal.titleLine2 ?? "Policy";
  const intro =
    legal.intro ??
    "We believe privacy is a fundamental right. This document explains how R Ceramica collects, uses, and protects your personal information.";
  const lastUpdated = legal.lastUpdated ?? "Last updated: January 2026";
  const footerNote =
    legal.footerNote ??
    "We may update this Privacy Policy periodically. Significant changes will be communicated via email or a notice on the website at least 30 days before taking effect.";

  return (
    <div className="page-privacy">
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={`${siteConfig.url}/privacy`} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content={siteConfig.ogImage} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteConfig.url}/privacy`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="robots" content="index,follow" />
      </Head>

      {/* ── Hero ── */}
      <section className="relative pt-48 pb-24 px-6 md:px-24 overflow-hidden">
        {/* Decorative grid lines */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-[#c5a059]/20 to-transparent" />

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
          <div className="flex items-center gap-3 text-[9px] uppercase tracking-[0.4em] text-white/20">
            <div className="w-4 h-px bg-[#c5a059]/40" />
            <span>{lastUpdated}</span>
          </div>
        </div>
      </section>

      {/* ── Table of Contents ── */}
      <section className="px-6 md:px-24 pb-16">
        <div className="max-w-[900px] mx-auto">
          <div className="privacy-glass rounded-2xl p-8 md:p-10">
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

      {/* ── Policy Sections ── */}
      <section className="px-6 md:px-24 pb-32">
        <div className="max-w-[900px] mx-auto space-y-0">
          {sections.map((section, idx) => (
            <div
              key={section.id}
              id={section.id}
              className="privacy-section border-t border-white/5 py-16 md:py-20 scroll-mt-32"
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

          {/* ── Footer note ── */}
          <div className="border-t border-white/5 pt-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-[0.4em] text-white/20">
                Changes to this policy
              </p>
              <p className="text-[12px] text-white/40 font-light max-w-lg leading-relaxed">
                {footerNote}
              </p>
            </div>
            <Link
              href="/contact"
              className="shrink-0 px-8 py-4 border border-white/10 text-[9px] uppercase tracking-[0.5em] text-white/60 hover:border-[#c5a059]/50 hover:text-white transition-all duration-500"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
