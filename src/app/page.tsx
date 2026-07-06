import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import ArchitecturalSpaces from "@/components/home/ArchitecturalSpaces";
import ProductCarousel from "@/components/home/ProductCarousel";
import BusinessSupport from "@/components/home/BusinessSupport";
import LegacySection from "@/components/home/LegacySection";
import SocialFeed from "@/components/home/SocialFeed";

export const metadata: Metadata = {
  title: "R Ceramica | Redefining Spaces",
  description:
    "Explore R Ceramica's premium collection of porcelain tiles, luxury bathrooms, and architectural surfaces. Redefining spaces through innovation and craftsmanship.",
  alternates: { canonical: "/" },
};

// JSON-LD for homepage
const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "R Ceramica — Redefining Spaces",
  url: "https://rceramica.com",
  description:
    "Premium porcelain and ceramic surfaces for architectural excellence.",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://rceramica.com" },
    ],
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <HeroSection />
      <ArchitecturalSpaces />
      <ProductCarousel />
      <BusinessSupport />
      <LegacySection />
      <SocialFeed />
    </>
  );
}
