import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect, useRef, FormEvent, ChangeEvent } from "react";
import { ArrowLeft } from "lucide-react";
import { login, register, googleLogin } from "@/lib/services/auth";

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare global { interface Window { google?: any } }

type Mode = "login" | "register";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Google button lifecycle — so a blocked/slow GSI script never leaves a blank gap.
  const [googleReady, setGoogleReady] = useState(false);
  const [googleFailed, setGoogleFailed] = useState(false);
  const googleBtnRef = useRef<HTMLDivElement>(null);

  /** Where to go after a successful sign-in (?redirect=…), default home. */
  function redirectTarget(): string {
    const r = router.query.redirect;
    return typeof r === "string" && r.startsWith("/") ? r : "/";
  }

  function handleMobileInput(e: ChangeEvent<HTMLInputElement>) {
    setMobile(e.target.value.replace(/\D/g, "").slice(0, 10));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      if (mode === "login") {
        await login(mobile, password);
      } else {
        await register({ name, phone: mobile, email, password });
      }
      router.push(redirectTarget());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  // ── Google Identity Services ────────────────────────────────────────────
  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) return; // not configured → static fallback button
    const SCRIPT_ID = "google-gsi";

    function init() {
      if (!window.google || !googleBtnRef.current) return;
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        callback: async (resp: any) => {
          setError(null);
          setSubmitting(true);
          try {
            await googleLogin(resp.credential);
            router.push(redirectTarget());
          } catch (err) {
            setError(err instanceof Error ? err.message : "Google sign-in failed.");
            setSubmitting(false);
          }
        },
      });
      googleBtnRef.current.innerHTML = "";
      window.google.accounts.id.renderButton(googleBtnRef.current, {
        theme: "filled_black",
        size: "large",
        width: 320,
        text: "continue_with",
        shape: "rectangular",
      });
      setGoogleReady(true);
    }

    if (document.getElementById(SCRIPT_ID)) {
      init();
    } else {
      const s = document.createElement("script");
      s.id = SCRIPT_ID;
      s.src = "https://accounts.google.com/gsi/client";
      s.async = true;
      s.defer = true;
      s.onload = init;
      s.onerror = () => setGoogleFailed(true);
      document.body.appendChild(s);
    }

    // If Google hasn't painted a button shortly, surface a fallback rather
    // than leaving an empty gap (blocked script, offline, origin mismatch…).
    const t = setTimeout(() => {
      setGoogleReady((ready) => {
        if (!ready) setGoogleFailed(true);
        return ready;
      });
    }, 4000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  const isRegister = mode === "register";

  return (
    <div className="page-login">
      <Head>
        <title>{`${isRegister ? "Create Account" : "Sign In"} | R Ceramica — Luxury Surfaces`}</title>
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

        {/* Right: Auth form */}
        <div className="w-full md:w-1/2 lg:w-2/5 min-h-screen flex items-center justify-center bg-[#0a0a0a]/80 md:bg-[#0a0a0a] backdrop-blur-sm md:backdrop-blur-none md:border-l border-white/5 relative">

          {/* Decorative accent line */}
          <div className="absolute top-1/2 left-0 w-32 h-px bg-gradient-to-r from-[#c5a059]/40 to-transparent -translate-x-1/2 hidden lg:block" />

          <div className="w-full max-w-[400px] px-10 pt-32 pb-16 md:pt-0 md:pb-0 flex flex-col justify-center">

            <header className="mb-8 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-display font-light uppercase tracking-[0.15em] mb-4">
                {isRegister ? "Create Account" : "Sign In"}
              </h1>
              <p className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-white/20 leading-relaxed">
                {isRegister
                  ? "Join the exclusive architectural catalogue"
                  : "Access the exclusive architectural catalogue"}
              </p>
            </header>

            {/* Sign In / Create Account switch */}
            <div className="grid grid-cols-2 p-1 border border-white/10 rounded-full mb-9">
              {([
                ["login", "Sign In"],
                ["register", "Create Account"],
              ] as const).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => { setMode(value); setError(null); }}
                  className={`py-3 rounded-full text-[9px] uppercase tracking-[0.3em] font-bold transition-all ${
                    mode === value
                      ? "bg-[#c5a059] text-white shadow-lg shadow-[#c5a059]/20"
                      : "text-white/40 hover:text-white"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {error && (
              <div className="mb-6 p-3 rounded-md border border-red-500/30 bg-red-500/10 text-red-300 text-[11px] tracking-wide">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">

              {/* Name (register only) */}
              {isRegister && (
                <div className="group/input relative">
                  <label htmlFor="name" className="absolute -top-6 left-0 text-[8px] md:text-[9px] uppercase tracking-[0.4em] text-white/20 group-focus-within/input:text-[#c5a059] transition-colors">
                    Full Name
                  </label>
                  <input id="name" type="text" required placeholder="Your name"
                    value={name} onChange={(e) => setName(e.target.value)}
                    className="login-underline-input" />
                </div>
              )}

              {/* Mobile number */}
              <div className="group/input relative flex items-end">
                <div className="pb-4 border-b border-white/10 text-white/40 text-sm font-light tracking-[0.2em] pr-4 shrink-0">
                  +91
                </div>
                <div className="flex-1 relative">
                  <label htmlFor="mobile" className="absolute -top-6 left-0 text-[8px] md:text-[9px] uppercase tracking-[0.4em] text-white/20 group-focus-within/input:text-[#c5a059] transition-colors">
                    Mobile Number
                  </label>
                  <input id="mobile" type="tel" inputMode="numeric" required
                    placeholder="000 000 0000" maxLength={10}
                    value={mobile} onChange={handleMobileInput}
                    className="login-underline-input" />
                </div>
              </div>

              {/* Email (register only) */}
              {isRegister && (
                <div className="group/input relative">
                  <label htmlFor="email" className="absolute -top-6 left-0 text-[8px] md:text-[9px] uppercase tracking-[0.4em] text-white/20 group-focus-within/input:text-[#c5a059] transition-colors">
                    Email Address
                  </label>
                  <input id="email" type="email" required placeholder="you@email.com"
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    className="login-underline-input" />
                </div>
              )}

              {/* Password */}
              <div className="group/input relative">
                <label htmlFor="password" className="absolute -top-6 left-0 text-[8px] md:text-[9px] uppercase tracking-[0.4em] text-white/20 group-focus-within/input:text-[#c5a059] transition-colors">
                  Password
                </label>
                <input id="password" type="password" required
                  placeholder="••••••••" minLength={6}
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  className="login-underline-input" />
              </div>

              {/* Remember + Recovery (login only) */}
              {!isRegister && (
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
                  <Link href="/contact" className="text-[9px] uppercase tracking-[0.3em] text-white/30 hover:text-[#c5a059] transition-colors">
                    Recovery
                  </Link>
                </div>
              )}

              {/* Submit */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-5 md:py-6 bg-white text-black text-[10px] uppercase tracking-[0.5em] font-medium hover:bg-[#c5a059] hover:text-white transition-all duration-700 shadow-[0_20px_40px_-15px_rgba(255,255,255,0.1)] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <span className="flex items-center justify-center gap-3">
                      <span className="w-3.5 h-3.5 border border-black/30 border-t-black rounded-full animate-spin" />
                      {isRegister ? "Creating…" : "Signing In…"}
                    </span>
                  ) : (
                    isRegister ? "Create Account" : "Login"
                  )}
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-[8px] uppercase tracking-[0.4em] text-white/20">Or</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Google Sign-In — the real GSI button renders into this div. */}
            {GOOGLE_CLIENT_ID && (
              <div ref={googleBtnRef} className="flex justify-center" />
            )}

            {/* Fallback whenever the real button isn't showing (not configured,
                script blocked, offline, or origin not whitelisted). */}
            {(!GOOGLE_CLIENT_ID || !googleReady) && (
              <>
                <button
                  type="button"
                  disabled
                  className="w-full py-4 border border-white/15 bg-white/[0.03] text-white/40 text-[10px] uppercase tracking-[0.35em] flex items-center justify-center gap-3 cursor-not-allowed rounded-sm"
                >
                  <GoogleGlyph />
                  Continue with Google
                </button>
                <p className="text-center text-[8px] uppercase tracking-[0.25em] text-white/25 mt-3">
                  {!GOOGLE_CLIENT_ID
                    ? "Google login not configured yet"
                    : googleFailed
                    ? "Google unavailable — use mobile + password"
                    : "Loading Google…"}
                </p>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function GoogleGlyph() {
  return (
    <svg width="15" height="15" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

LoginPage.noLayout = true;
