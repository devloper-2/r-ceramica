import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, FormEvent, ChangeEvent } from "react";
import { ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleMobileInput(e: ChangeEvent<HTMLInputElement>) {
    setMobile(e.target.value.replace(/\D/g, "").slice(0, 10));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      if (typeof window !== "undefined") {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userMobile", "+91" + mobile);
      }
      router.push("/");
    }, 600);
  }

  return (
    <div className="page-login">
      <Head>
        <title>Sign In | R Ceramica — Luxury Surfaces</title>
        <meta name="description" content="Sign in to access the exclusive R Ceramica architectural catalogue." />
        <meta name="robots" content="noindex" />
      </Head>

      {/* Mobile ambient background */}
      <div className="fixed inset-0 z-0 md:hidden opacity-20 pointer-events-none">
        <Image
          src="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      {/* Nav overlay */}
      <nav className="absolute top-0 left-0 w-full z-50 py-8 px-8 md:px-16 flex justify-between items-center pointer-events-none">
        <Link href="/" className="pointer-events-auto group">
          <Image
            src="https://rceramica.com/logo/logo.png"
            alt="R Ceramica"
            width={140}
            height={56}
            className="h-10 md:h-14 w-auto object-contain transition-opacity group-hover:opacity-70"
            priority
          />
        </Link>
        <Link
          href="/"
          className="pointer-events-auto flex items-center gap-2 text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-white/40 hover:text-white transition-colors"
        >
          <ArrowLeft size={13} />
          <span>Back</span>
        </Link>
      </nav>

      {/* Main split layout */}
      <main className="flex flex-col md:flex-row min-h-screen relative z-10">

        {/* Left: Cinematic image (desktop only) */}
        <div className="hidden md:block md:w-1/2 lg:w-3/5 relative overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80"
            alt="Architecture"
            fill
            sizes="60vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
          <div className="absolute bottom-16 left-16 max-w-sm">
            <h2 className="text-4xl font-display font-light uppercase tracking-[0.2em] mb-4 leading-tight">
              Elevating<br />Spaces
            </h2>
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 leading-relaxed">
              Exquisite surfaces for the modern architectural masterpiece.
            </p>
          </div>
        </div>

        {/* Right: Login form */}
        <div className="w-full md:w-1/2 lg:w-2/5 min-h-screen flex items-center justify-center bg-[#0a0a0a]/80 md:bg-[#0a0a0a] backdrop-blur-sm md:backdrop-blur-none md:border-l border-white/5 relative">

          {/* Decorative accent line */}
          <div className="absolute top-1/2 left-0 w-32 h-px bg-gradient-to-r from-[#c5a059]/40 to-transparent -translate-x-1/2 hidden lg:block" />

          <div className="w-full max-w-[400px] px-10 pt-36 pb-20 md:pt-0 md:pb-0 flex flex-col justify-center">

            <header className="mb-10 md:mb-12 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-display font-light uppercase tracking-[0.15em] mb-4">
                Sign In
              </h1>
              <p className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-white/20 leading-relaxed">
                Access the exclusive<br className="hidden md:block" /> architectural catalogue
              </p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-8 md:space-y-10">

              {/* Mobile number */}
              <div className="group/input relative flex items-end">
                <div className="pb-4 border-b border-white/10 text-white/40 text-sm font-light tracking-[0.2em] pr-4 shrink-0">
                  +91
                </div>
                <div className="flex-1 relative">
                  <label
                    htmlFor="mobile"
                    className="absolute -top-6 left-0 text-[8px] md:text-[9px] uppercase tracking-[0.4em] text-white/20 group-focus-within/input:text-[#c5a059] transition-colors"
                  >
                    Mobile Number
                  </label>
                  <input
                    id="mobile"
                    type="tel"
                    inputMode="numeric"
                    required
                    placeholder="000 000 0000"
                    maxLength={10}
                    value={mobile}
                    onChange={handleMobileInput}
                    className="login-underline-input"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="group/input relative">
                <label
                  htmlFor="password"
                  className="absolute -top-6 left-0 text-[8px] md:text-[9px] uppercase tracking-[0.4em] text-white/20 group-focus-within/input:text-[#c5a059] transition-colors"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="login-underline-input"
                />
              </div>

              {/* Remember + Recovery */}
              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-3 cursor-pointer group/rem">
                  <div
                    className={`w-3.5 h-3.5 border transition-all cursor-pointer flex items-center justify-center
                      ${remember ? "border-[#c5a059] bg-[#c5a059]" : "border-white/20 bg-transparent"}`}
                    onClick={() => setRemember(!remember)}
                  >
                    {remember && (
                      <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                        <path d="M1 3l2 2 4-4" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <span className="text-[9px] uppercase tracking-[0.3em] text-white/30 group-hover/rem:text-white transition-colors">
                    Remember
                  </span>
                </label>
                <Link
                  href="/contact"
                  className="text-[9px] uppercase tracking-[0.3em] text-white/30 hover:text-[#c5a059] transition-colors"
                >
                  Recovery
                </Link>
              </div>

              {/* Submit */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-5 md:py-6 bg-white text-black text-[10px] uppercase tracking-[0.5em] font-medium hover:bg-[#c5a059] hover:text-white transition-all duration-700 shadow-[0_20px_40px_-15px_rgba(255,255,255,0.1)] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <span className="flex items-center justify-center gap-3">
                      <span className="w-3.5 h-3.5 border border-black/30 border-t-black rounded-full animate-spin" />
                      Signing In…
                    </span>
                  ) : (
                    "Login"
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

LoginPage.noLayout = true;
