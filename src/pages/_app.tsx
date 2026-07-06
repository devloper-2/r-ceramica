import type { AppProps } from "next/app";
import Head from "next/head";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

// ── Global stylesheets ────────────────────────────────────────────────────────
// In the Pages Router, global (non-module) CSS can ONLY be imported here in
// _app. So every page/component CSS file is registered in this one place.
import "@/styles/globals.css"; // Tailwind + Material Symbols + theme.css + base
import "@/styles/homepage.css";
import "@/styles/aboutpage.css";
import "@/components/css/navbar.css";
import "@/components/css/footer.css";
import "@/components/css/whatsapp-button.css";

/**
 * _app.tsx — wraps every page with the shared chrome (Navbar/Footer/WhatsApp).
 * Replaces the App Router layout.tsx.
 */
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0a0a0a" />
      </Head>
      <Navbar />
      <main id="main-content">
        <Component {...pageProps} />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
