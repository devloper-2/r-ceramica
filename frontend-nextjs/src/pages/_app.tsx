import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import ErrorBoundary from "@/components/layout/ErrorBoundary";
import { outfit, inter } from "@/lib/fonts";


// ── Global stylesheets ────────────────────────────────────────────────────────
// In the Pages Router, global (non-module) CSS can ONLY be imported here in
// _app. So every page/component CSS file is registered in this one place.
import "@/styles/globals.css"; // Tailwind + Material Symbols + theme.css + base
import "@/styles/homepage.css";
import "@/styles/aboutpage.css";
import "@/styles/contactpage.css";
import "@/styles/explorepage.css";
import "@/styles/bathroomspage.css";
import "@/styles/productspage.css";
import "@/styles/productdetailpage.css";
import "@/styles/cartpage.css";
import "@/styles/cataloguepage.css";
import "@/styles/checkoutpage.css";
import "@/styles/loginpage.css";
import "@/styles/trackingpage.css";
import "@/styles/orderspage.css";
import "@/styles/privacypage.css";
import "@/styles/termspage.css";
import "@/components/css/navbar.css";
import "@/components/css/footer.css";
import "@/components/css/whatsapp-button.css";


/**
 * _app.tsx — wraps every page with the shared chrome (Navbar/Footer/WhatsApp).
 * Replaces the App Router layout.tsx.
 */
type PageWithLayout = typeof import("react").Component & { noLayout?: boolean };

export default function App({ Component, pageProps }: AppProps) {
  const noLayout = (Component as unknown as PageWithLayout).noLayout === true;
  // Keying by path remounts the boundary on navigation, so a single broken
  // page does not leave the visitor stuck on the error screen.
  const { asPath } = useRouter();
  const page = (
    <ErrorBoundary key={asPath}>
      <Component {...pageProps} />
    </ErrorBoundary>
  );

  return (
    <main className={`${outfit.variable} ${inter.variable}`}>
  <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#0a0a0a" />
    <link rel="icon" type="image/png" href="/images/favicon.png" />
  </Head>

  {noLayout ? (
    page
  ) : (
    <>
      <Navbar />
      <main id="main-content">{page}</main>
      <Footer />
      <WhatsAppButton />
    </>
  )}
</main>
  );
}
