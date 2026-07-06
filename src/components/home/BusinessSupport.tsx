import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Card {
  title: string;
  description: string;
  linkLabel: string;
  href: string;
  inverted?: boolean;
  icon: React.ReactNode;
}

const InstitutionalIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/>
    <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/>
    <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/>
    <path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/>
  </svg>
);

const GlobalIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10"/>
    <path d="M2 12h20"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

const SupportIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z"/>
    <path d="M21 16v2a4 4 0 0 1-4 4h-5"/>
  </svg>
);

const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect width="14" height="20" x="5" y="2" rx="2" ry="2"/>
    <path d="M12 18h.01"/><path d="M12 7v6"/><path d="m9 10 3 3 3-3"/>
  </svg>
);

const CARDS: Card[] = [
  {
    title: "Institutional\nBusiness",
    description: "Project solutions for institutional & business clients",
    linkLabel: "Explore Projects",
    href: "#",
    icon: <InstitutionalIcon />,
  },
  {
    title: "International\nBusiness",
    description: "Our global footprint and operational countries",
    linkLabel: "Global Reach",
    href: "#",
    icon: <GlobalIcon />,
  },
  {
    title: "Service &\nSupport",
    description: "Installation assistance and technical requests",
    linkLabel: "Connect Now",
    href: "/contact",
    icon: <SupportIcon />,
  },
  {
    title: "Download\nService App",
    description: "Manage your space from your fingertips",
    linkLabel: "Download Now",
    href: "#",
    inverted: true,
    icon: <DownloadIcon />,
  },
];

export default function BusinessSupport() {
  return (
    <section
      className="py-24 md:py-32 bg-[var(--color-bg)] border-t border-white/5"
      aria-label="Business services and support"
    >
      <div className="max-w-content mx-auto px-[var(--section-px)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {CARDS.map((card) => (
            <article
              key={card.linkLabel}
              className={`group flex flex-col items-center text-center p-8 rounded-sm transition-all duration-500 ${
                card.inverted
                  ? "bg-white text-black"
                  : "border border-white/5 hover:border-white/20"
              }`}
            >
              <div
                className={`w-16 h-16 mb-8 flex items-center justify-center transition-colors duration-500 ${
                  card.inverted
                    ? "text-black/40 group-hover:text-black"
                    : "text-white/40 group-hover:text-white"
                }`}
              >
                {card.icon}
              </div>
              <h3
                className={`text-xl md:text-2xl font-display font-light mb-4 uppercase tracking-wider whitespace-pre-line ${
                  card.inverted ? "text-black" : "text-white"
                }`}
              >
                {card.title}
              </h3>
              <p
                className={`text-[10px] mb-8 uppercase tracking-[0.2em] leading-relaxed max-w-[200px] ${
                  card.inverted ? "text-black/40" : "text-white/40"
                }`}
              >
                {card.description}
              </p>
              <Link
                href={card.href}
                className={`text-[9px] uppercase tracking-[0.3em] flex items-center gap-2 transition-colors ${
                  card.inverted
                    ? "font-bold text-black border-b border-black/20 hover:border-black"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {card.linkLabel}
                {!card.inverted && <ArrowRight size={12} aria-hidden="true" />}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
