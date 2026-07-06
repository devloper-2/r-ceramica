import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import Footer from "@/components/layout/Footer";
import { siteConfig } from "@/config/site";

const TITLE = `Sign In | ${siteConfig.name}`;
const DESCRIPTION = "Access the exclusive R Ceramica architectural catalogue and manage your orders.";

/**
 * Login page → "/login" (ported from static-html/login.html). Cinematic split
 * layout, Tenor Sans display type. Demo auth: persists to localStorage and
 * redirects home (no real backend).
 */
export default function LoginPage() {
  const router = useRouter();
  const [mobile, setMobile] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userName", "Dev Patel");
    localStorage.setItem("userMobile", `+91${mobile}`);
    router.push("/");
  };

  return (
    <div className="page-login min-h-screen flex flex-col">
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={`${siteConfig.url}/login`} />
      </Head>

      {/* Ambient mobile background */}
      <div className="fixed inset-0 z-0 md:hidden opacity-20">
        <Image
          src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      {/* Overlay nav */}
      <nav className="absolute top-0 left-0 w-full z-50 py-8 px-8 md:px-16 flex justify-between items-center pointer-events-none">
        <Link href="/" className="pointer-events-auto">
          <Image
            src="https://rceramica.com/logo/logo.png"
            alt="R Ceramica"
            width={140}
            height={56}
            className="h-10 md:h-14 w-auto object-contain hover:opacity-80 transition-all"
            priority
          />
        </Link>
        <Link
          href="/"
          className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-white/40 hover:text-white transition-all flex items-center gap-2 pointer-events-auto"
        >
          <span className="material-symbols-outlined text-[14px]">arrow_back</span>
          <span className="hidden sm:inline">Back</span>
        </Link>
      </nav>

      <main className="flex-grow flex flex-col md:flex-row min-h-[calc(100vh-100px)] relative z-10">
        {/* Visual */}
        <div className="hidden md:block md:w-1/2 lg:w-3/5 relative overflow-hidden min-h-[600px]">
          <Image
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80"
            alt="Architecture"
            fill
            sizes="60vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
          <div className="absolute bottom-16 left-16 max-w-sm">
            <h2 className="font-tenor text-4xl font-light uppercase tracking-[0.2em] mb-4 text-white">
              Elevating <br />Spaces
            </h2>
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 leading-relaxed">
              Exquisite surfaces for the modern architectural masterpiece.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="w-full md:w-1/2 lg:w-2/5 min-h-[600px] flex items-center justify-center bg-[var(--color-bg)]/80 md:bg-[var(--color-bg)] backdrop-blur-sm md:backdrop-blur-none md:border-l border-white/5 relative">
          <div className="w-full max-w-[400px] px-10 flex flex-col justify-start md:justify-center pt-32 md:pt-0 pb-20 md:pb-0">
            <header className="mb-10 md:mb-12 text-center md:text-left">
              <h1 className="font-tenor text-4xl md:text-5xl font-light uppercase tracking-[0.15em] mb-4">
                Sign In
              </h1>
              <p className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-white/20 leading-relaxed mx-auto md:mx-0 max-w-[240px] md:max-w-none">
                Access the exclusive architectural catalogue
              </p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-8 md:space-y-10">
              <div className="group/input relative flex items-end">
                <div className="pb-4 border-b border-white/10 text-white/40 text-sm font-light tracking-[0.2em] pr-4">
                  +91
                </div>
                <div className="flex-grow relative">
                  <label
                    htmlFor="mobile"
                    className="absolute -top-6 left-0 text-[8px] md:text-[9px] uppercase tracking-[0.4em] text-white/20 group-focus-within/input:text-[var(--color-gold)] transition-all"
                  >
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    id="mobile"
                    required
                    maxLength={10}
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/[^0-9]/g, ""))}
                    className="login-input w-full bg-transparent border-b border-white/10 py-4 text-sm font-light tracking-[0.2em] outline-none transition-all focus:border-white/40"
                    placeholder="000 000 0000"
                  />
                </div>
              </div>

              <div className="group/input relative">
                <label
                  htmlFor="password"
                  className="absolute -top-6 left-0 text-[8px] md:text-[9px] uppercase tracking-[0.4em] text-white/20 group-focus-within/input:text-[var(--color-gold)] transition-all"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  required
                  className="login-input w-full bg-transparent border-b border-white/10 py-4 text-sm font-light tracking-[0.2em] outline-none transition-all focus:border-white/40"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-3.5 h-3.5 rounded-none border border-white/20 bg-transparent accent-[var(--color-gold)] cursor-pointer"
                  />
                  <span className="text-[9px] uppercase tracking-[0.3em] text-white/30 hover:text-white transition-colors">
                    Remember
                  </span>
                </label>
                <a href="#" className="text-[9px] uppercase tracking-[0.3em] text-white/30 hover:text-[var(--color-gold)] transition-colors">
                  Recovery
                </a>
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full py-5 md:py-6 bg-white text-black text-[10px] uppercase tracking-[0.5em] font-medium hover:bg-[var(--color-gold)] hover:text-white transition-all duration-700"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
