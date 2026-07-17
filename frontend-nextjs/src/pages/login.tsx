import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect, useRef, FormEvent, ChangeEvent } from "react";
import { ArrowLeft } from "lucide-react";
import { login, register, googleLogin } from "@/lib/services/auth";

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare global {
  interface Window {
    google?: any;
  }
}

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
  const [googleReady, setGoogleReady] = useState(false);
  const [googleFailed, setGoogleFailed] = useState(false);
  const googleBtnRef = useRef<HTMLDivElement>(null);

  function redirectTarget() {
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
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
      setSubmitting(false);
    }
  }

  // ── Google Identity Services ─────────────────────────────────────────────
  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) return;
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
            setError(
              err instanceof Error ? err.message : "Google sign-in failed.",
            );
            setSubmitting(false);
          }
        },
      });
      googleBtnRef.current.innerHTML = "";
      window.google.accounts.id.renderButton(googleBtnRef.current, {
        theme: "filled_black",
        size: "large",
        width: 360,
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
        <title>{`${isRegister ? "Create Account" : "Sign In"} | R Ceramica`}</title>
        <meta name="description" content="Sign in to access the exclusive R Ceramica architectural catalogue." />
        <meta name="robots" content="noindex" />
      </Head>

      <main className="lp-layout">
        {/* ── Left: Cinematic image (60%) ── */}
        <div className="lp-left">
          <Link href="/" className="lp-back-left">
            <ArrowLeft size={12} />
            Back
          </Link>

          <Image src="/images/contacherobg.webp" alt="R Ceramica Architecture" fill sizes="60vw" className="object-cover" priority />
          <div className="lp-left-overlay" />

          <div className="lp-left-text">
            <p className="lp-left-eyebrow">R Ceramica</p>
            <h2 className="lp-left-heading">
              Elevating <br /> Spaces
            </h2>
            <p className="lp-left-sub">
              Exquisite surfaces for the modern architectural masterpiece.
            </p>
          </div>
        </div>

        {/* ── Right: Auth panel (40%) ── */}
        <div className="lp-right">
          {/* Mobile back */}
          <div className="lp-mobile-back">
            <Link href="/" className="lp-back-left">
              <ArrowLeft size={12} />
              Back to Home
            </Link>
          </div>

          {/* Logo — centered, top */}
          <div className="lp-logo-wrap">
            <Link href="/">
              <Image src="/images/logo.webp" alt="R Ceramica" width={180} height={72} className="h-16 w-auto object-contain" priority />
            </Link>
          </div>

          {/* Form area */}
          <div className="lp-form-area">
            <div className="lp-tabs">
              {(
                [
                  ["login", "Sign In"],
                  ["register", "Create Account"],
                ] as const
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    setMode(value);
                    setError(null);
                  }}
                  className={`lp-tab ${mode === value ? "lp-tab-active" : "lp-tab-inactive"}`}
                >
                  {label}
                </button>
              ))}
            </div>
            {error && (
              <div className="lp-error">
                <span className="lp-error-bar" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="lp-form">
              {/* Full name (register) */}
              {isRegister && (
                <div className="lp-field">
                  <label htmlFor="name" className="lp-label">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="Your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="login-underline-input"
                  />
                </div>
              )}

              {/* Mobile */}
              <div className="lp-field">
                <label htmlFor="mobile" className="lp-label">
                  Mobile Number
                </label>
                <div className="lp-phone-row">
                  <span className="lp-phone-code">+91</span>
                  <input
                    id="mobile"
                    type="tel"
                    inputMode="numeric"
                    required
                    placeholder="00000 00000"
                    maxLength={10}
                    value={mobile}
                    onChange={handleMobileInput}
                    className="login-underline-input"
                  />
                </div>
              </div>

              {/* Email (register) */}
              {isRegister && (
                <div className="lp-field">
                  <label htmlFor="email" className="lp-label">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="you@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="login-underline-input"
                  />
                </div>
              )}

              {/* Password */}
              <div className="lp-field">
                <label htmlFor="password" className="lp-label">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="login-underline-input"
                />
              </div>

              {/* Remember + Recovery */}
              {!isRegister && (
                <div className="lp-remember-row">
                  <label
                    className="lp-remember"
                    onClick={() => setRemember(!remember)}
                  >
                    <div className={`lp-checkbox ${remember ? "lp-checkbox-on" : ""}`}
                    >
                      {remember && (
                        <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                          <path d="M1 3l2 2 4-4" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    Remember me
                  </label>
                  <Link href="/contact" className="lp-recovery">
                    Forgot password?
                  </Link>
                </div>
              )}

              {/* Submit */}
              <button type="submit" disabled={submitting} className="lp-submit">
                {submitting ? (
                  <span className="lp-submit-loading">
                    <span className="lp-btn-spinner" />
                    {isRegister ? "Creating account…" : "Signing in…"}
                  </span>
                ) : isRegister ? (
                  "Create Account"
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="lp-divider">
              <div className="lp-divider-line" />
              <span className="lp-divider-text">or continue with</span>
              <div className="lp-divider-line" />
            </div>

            {/* Google button — real GSI renders here */}
            {GOOGLE_CLIENT_ID && (
              <div ref={googleBtnRef} className="lp-google-real" />
            )}

            {/* Fallback shown while GSI loads, or when not configured */}
            {(!GOOGLE_CLIENT_ID || !googleReady) && (
              <div className="lp-google-wrap">
                <button
                  type="button"
                  disabled={!!GOOGLE_CLIENT_ID && !googleFailed}
                  className="lp-google-btn"
                >
                  <span className="lp-google-icon-box">
                    <GoogleGlyph />
                  </span>
                  <span className="lp-google-label">Continue with Google</span>
                  {!GOOGLE_CLIENT_ID && (
                    <span className="lp-google-badge">Soon</span>
                  )}
                </button>
                {GOOGLE_CLIENT_ID && (
                  <p className="lp-google-status">
                    {googleFailed
                      ? "Google unavailable — use mobile + password"
                      : "Loading Google…"}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function GoogleGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

LoginPage.noLayout = true;
