import { Html, Head, Main, NextScript } from "next/document";
import { inter, outfit, playfair, jakarta, tenor } from "@/lib/fonts";
import { organizationSchema, websiteSchema } from "@/lib/schemas";

/**
 * _document.tsx — wraps every page's HTML shell (Pages Router).
 * Replaces the App Router root <html>/<body> from the old layout.tsx.
 * Site-wide JSON-LD and the font CSS variables live here.
 */
export default function Document() {
  return (
    <Html
      lang="en"
      className={`${inter.variable} ${outfit.variable} ${playfair.variable} ${jakarta.variable} ${tenor.variable}`}
    >
      <Head>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </Head>
      <body className="bg-[var(--color-bg)] text-white font-sans font-light antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
