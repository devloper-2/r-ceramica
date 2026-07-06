import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

// ── Global stylesheets ────────────────────────────────────────────────────────
// In the Pages Router, global (non-module) CSS can ONLY be imported here in
// _app. So every page/component CSS file is registered in this one place.
import "@/styles/globals.css"; // Tailwind + Material Symbols + theme.css + base
import "@/styles/homepage.css";
import "@/styles/aboutpage.css";
import "@/styles/contactpage.css";
import "@/styles/tilespage.css";
import "@/styles/bathroomspage.css";
import "@/styles/cataloguepage.css";
import "@/styles/productspage.css";
import "@/styles/cartpage.css";
import "@/styles/checkoutpage.css";
import "@/styles/loginpage.css";
import "@/styles/orderspage.css";
import "@/styles/orderdetailspage.css";
import "@/styles/trackingpage.css";
import "@/components/css/navbar.css";
import "@/components/css/account-navbar.css";
import "@/components/css/footer.css";
import "@/components/css/whatsapp-button.css";

/**
 * Marketing routes that use the shared global chrome (Navbar + Footer +
 * WhatsApp). Every other route (cart, checkout, login, orders, order-details,
 * tracking) brings its own minimal chrome — matching the original mockups.
 */
const GLOBAL_CHROME = new Set([
  "/",
  "/about",
  "/contact",
  "/tiles",
  "/bathrooms",
  "/catalogue",
  "/products",
]);

/**
 * _app.tsx — wraps every page. Marketing pages get the shared Navbar/Footer;
 * account/commerce pages render bare and supply their own chrome.
 */
export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const useGlobalChrome = GLOBAL_CHROME.has(pathname);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0a0a0a" />
      </Head>

      {useGlobalChrome ? (
        <>
          <Navbar />
          <main id="main-content">
            <Component {...pageProps} />
          </main>
          <Footer />
          <WhatsAppButton />
        </>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
}
