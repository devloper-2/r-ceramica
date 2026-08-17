import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  useState,
  useEffect,
  useRef,
  FormEvent,
  ChangeEvent,
} from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { login, register, googleLogin } from "@/lib/services/auth";

const GOOGLE_CLIENT_ID =
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";

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

  const isRegister = mode === "register";

  /* ============================================================
     REDIRECT
     ============================================================ */

  function redirectTarget() {
    const r = router.query.redirect;

    return typeof r === "string" && r.startsWith("/")
      ? r
      : "/";
  }

  /* ============================================================
     MOBILE INPUT
     ============================================================ */

  function handleMobileInput(
    e: ChangeEvent<HTMLInputElement>
  ) {
    setMobile(
      e.target.value
        .replace(/\D/g, "")
        .slice(0, 10)
    );
  }

  /* ============================================================
     MODE CHANGE
     ============================================================ */

  function changeMode(nextMode: Mode) {
    if (nextMode === mode) return;

    setError(null);

    setMode(nextMode);

    /*
     * Don't clear the form values.
     * This makes the animation feel smoother
     * and prevents accidental data loss.
     */
  }

  /* ============================================================
     SUBMIT
     ============================================================ */

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    setError(null);
    setSubmitting(true);

    try {
      if (mode === "login") {
        await login(mobile, password);
      } else {
        await register({
          name,
          phone: mobile,
          email,
          password,
        });
      }

      router.push(redirectTarget());
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );

      setSubmitting(false);
    }
  }

  /* ============================================================
     GOOGLE LOGIN
     ============================================================ */

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) {
      return;
    }

    const SCRIPT_ID = "google-gsi";

    function init() {
      if (
        !window.google ||
        !googleBtnRef.current
      ) {
        return;
      }

      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,

        callback: async (resp: any) => {
          setError(null);
          setSubmitting(true);

          try {
            await googleLogin(resp.credential);

            router.push(redirectTarget());
          } catch (err) {
            setError(
              err instanceof Error
                ? err.message
                : "Google sign-in failed."
            );

            setSubmitting(false);
          }
        },
      });

      if (googleBtnRef.current) {
        googleBtnRef.current.innerHTML = "";
      }

      window.google.accounts.id.renderButton(
        googleBtnRef.current,
        {
          theme: "filled_black",
          size: "large",
          width: 360,
          text: "continue_with",
          shape: "rectangular",
        }
      );

      setGoogleReady(true);
    }

    if (
      document.getElementById(SCRIPT_ID)
    ) {
      init();
    } else {
      const script =
        document.createElement("script");

      script.id = SCRIPT_ID;
      script.src =
        "https://accounts.google.com/gsi/client";

      script.async = true;
      script.defer = true;

      script.onload = init;

      script.onerror = () =>
        setGoogleFailed(true);

      document.body.appendChild(script);
    }

    const timeout = setTimeout(() => {
      setGoogleReady((ready) => {
        if (!ready) {
          setGoogleFailed(true);
        }

        return ready;
      });
    }, 4000);

    return () => {
      clearTimeout(timeout);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  /* ============================================================
     PAGE
     ============================================================ */

  return (
    <div className="page-login">

      <Head>
        <title>
          {isRegister
            ? "Create Account"
            : "Sign In"}{" "}
          | R Ceramica
        </title>

        <meta
          name="description"
          content="Sign in to access the exclusive R Ceramica architectural catalogue."
        />

        <meta
          name="robots"
          content="noindex"
        />
      </Head>


      <main
        className={`lp-layout ${
          isRegister
            ? "lp-register-mode"
            : "lp-login-mode"
        }`}
      >

        {/* ======================================================
            BACK TO HOME
        ======================================================= */}

        <Link
          href="/"
          className="lp-back"
        >
          <ArrowLeft size={13} />

          <span>Back to Home</span>
        </Link>


        <div className="lp-stage">


          {/* ====================================================
              VISUAL PANEL
              Desktop: Right side
              Mobile: ALWAYS TOP
          ===================================================== */}

          <section className="lp-visual-panel">

            <Image
              src="/images/contacherobg.webp"
              alt="R Ceramica Architecture"
              fill
              sizes="(max-width: 767px) 100vw, 50vw"
              className="lp-visual-image"
              priority
            />

            <div className="lp-visual-overlay" />

            <div className="lp-visual-grain" />


            <div className="lp-visual-content">

              <div className="lp-visual-top">
                {/* <span className="lp-visual-brand">
                  R Ceramica
                </span> */}

                {/* <span className="lp-visual-number">
                  {isRegister
                    ? "02"
                    : "01"}
                </span> */}
              </div>
              <div className="lp-visual-bottom">

                <span className="lp-visual-eyebrow">
                  {isRegister
                    ? "Exclusive Membership"
                    : "Surface Studio"}
                </span>
                <div
                  key={mode}
                  className="lp-visual-copy"
                >

                  <h2>
                    {isRegister ? (
                      <>
                        Discover
                        <br />
                        <strong>
                          R Ceramica.
                        </strong>
                      </>
                    ) : (
                      <>
                        Welcome
                        <br />
                        <strong>
                          Back.
                        </strong>
                      </>
                    )}
                  </h2>
                  <p>
                    {isRegister
                      ? "Create your account and discover surfaces designed to transform architecture into timeless experiences."
                      : "Your space is waiting. Continue your journey through exceptional surfaces, textures and architectural possibilities."}
                  </p>
                </div>
                {/* Desktop switch */}
                <button
                    type="button"
                    className="lp-visual-switch"
                    onClick={() =>
                      changeMode(
                        isRegister ? "login" : "register"
                      )
                    }
                  >
                    {isRegister ? (
                      <>
                        <ArrowLeft size={15} />
                        <span>Already a member? Sign In</span>
                      </>
                    ) : (
                      <>
                        <span>New to R Ceramica? Create Account</span>
                        <ArrowRight size={15} />
                      </>
                    )}
                  </button>
              </div>
            </div>
          </section>

          {/* ====================================================
              FORM PANEL
              Desktop: Left / Right depending mode
              Mobile: ALWAYS BELOW IMAGE
          ===================================================== */}
          <section className="lp-form-panel">
            <div className="lp-form-inner">

              {/* =================================================
                  LOGO
              ================================================== */}

              <div className="lp-logo-wrap">
                <Link href="/">
                  <Image
                    src="/images/logo.webp"
                    alt="R Ceramica"
                    width={180}
                    height={72}
                    className="lp-logo"
                    priority
                  />
                </Link>
              </div>

              {/* =================================================
                  HEADING
              ================================================== */}
              <div
                key={mode}
                className="lp-form-heading"
              >
                <span className="lp-kicker">
                  {isRegister
                    ? "Create Account"
                    : "Account Access"}
                </span>
                <h1>
                  {isRegister
                    ? "Create Your Account"
                    : "Sign In"}
                </h1>
                <p>
                  {isRegister
                    ? "Join R Ceramica to explore refined architectural collections."
                    : "Enter your credentials to continue your R Ceramica experience."}
                </p>
              </div>

              {/* =================================================
                  ERROR
              ================================================== */}
              {error && (
                <div className="lp-error">
                  <span className="lp-error-bar" />
                  <span>
                    {error}
                  </span>
                </div>
              )}

              {/* =================================================
                  FORM
              ================================================== */}
              <form
                onSubmit={handleSubmit}
                className="lp-form"
              >
                <div className="lp-form-fields">
                  {/* FULL NAME */}
                  {isRegister && (
                    <div className="lp-field lp-field-half">
                      <label
                        htmlFor="name"
                        className="lp-label"
                      >
                        Full Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder="Your full name"
                        value={name}
                        onChange={(e) =>
                          setName(
                            e.target.value
                          )
                        }
                        className="login-underline-input"
                      />
                    </div>
                  )}
                  {/* MOBILE */}
                  <div
                    className={`lp-field ${
                      isRegister
                        ? "lp-field-half"
                        : "lp-field-full"
                    }`}
                  >
                    <label
                      htmlFor="mobile"
                      className="lp-label"
                    >
                      Mobile Number
                    </label>
                    <div className="lp-phone-row">
                      <span className="lp-phone-code">
                        +91
                      </span>
                      <input
                        id="mobile"
                        type="tel"
                        inputMode="numeric"
                        autoComplete="tel"
                        required
                        placeholder="00000 00000"
                        maxLength={10}
                        value={mobile}
                        onChange={
                          handleMobileInput
                        }
                        className="login-underline-input"
                      />
                    </div>
                  </div>

                  {/* EMAIL */}
                  {isRegister && (
                    <div className="lp-field lp-field-full">

                      <label
                        htmlFor="email"
                        className="lp-label"
                      >
                        Email Address
                      </label>

                      <input
                        id="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="you@email.com"
                        value={email}
                        onChange={(e) =>
                          setEmail(
                            e.target.value
                          )
                        }
                        className="login-underline-input"
                      />
                    </div>
                  )}

                  {/* PASSWORD */}
                  <div className="lp-field lp-field-full">
                    <label
                      htmlFor="password"
                      className="lp-label"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      required
                      minLength={6}
                      autoComplete={
                        isRegister
                          ? "new-password"
                          : "current-password"
                      }
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) =>
                        setPassword(
                          e.target.value
                        )
                      }
                      className="login-underline-input"
                    />
                  </div>
                </div>

                {/* =================================================
                    REMEMBER
                ================================================== */}
                {!isRegister && (
                  <div className="lp-remember-row">
                    <label
                      className="lp-remember"
                      onClick={() =>
                        setRemember(
                          !remember
                        )
                      }
                    >
                      <span
                        className={`lp-checkbox ${
                          remember
                            ? "lp-checkbox-on"
                            : ""
                        }`}
                      >
                        {remember && (
                          <svg
                            width="8"
                            height="6"
                            viewBox="0 0 8 6"
                            fill="none"
                          >
                            <path
                              d="M1 3l2 2 4-4"
                              stroke="black"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </span>
                      Remember me
                    </label>
                    <Link
                      href="/contact"
                      className="lp-recovery"
                    >
                      Forgot password?
                    </Link>
                  </div>
                )}
                {/* =================================================
                    SUBMIT
                ================================================== */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="lp-submit"
                >
                  {submitting ? (
                    <span className="lp-submit-loading">
                      <span className="lp-btn-spinner" />
                      {isRegister
                        ? "Creating account…"
                        : "Signing in…"}
                    </span>
                  ) : isRegister ? (
                    "Create Account"
                  ) : (
                    "Sign In"
                  )}
                </button>
              </form>
              {/* =================================================
                  GOOGLE DIVIDER
              ================================================== */}
              <div className="lp-divider">
                <div className="lp-divider-line" />
                <span className="lp-divider-text">
                  {isRegister
                    ? "Or create with"
                    : "Or continue with"}
                </span>
                <div className="lp-divider-line" />
              </div>
              {/* =================================================
                  GOOGLE REAL BUTTON
              ================================================== */}

              {GOOGLE_CLIENT_ID && (
                <div
                  ref={googleBtnRef}
                  className="lp-google-real"
                />
              )}
              {/* =================================================
                  GOOGLE FALLBACK
              ================================================== */}

              {(!GOOGLE_CLIENT_ID ||
                !googleReady) && (
                <div className="lp-google-wrap">
                  <button
                    type="button"
                    disabled={
                      !!GOOGLE_CLIENT_ID &&
                      !googleFailed
                    }
                    className="lp-google-btn"
                  >
                    <span className="lp-google-icon-box">
                      <GoogleGlyph />
                    </span>
                    <span className="lp-google-label">
                      Continue with Google
                    </span>
                    {!GOOGLE_CLIENT_ID && (
                      <span className="lp-google-badge">
                        Soon
                      </span>
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

              {/* =================================================
                  MOBILE / FORM SWITCH
              ================================================== */}
              <div className="lp-switch">
                <span>
                  {isRegister
                    ? "Already have an account?"
                    : "Don't have an account?"}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    changeMode(
                      isRegister
                        ? "login"
                        : "register"
                    )
                  }
                >
                  {isRegister
                    ? "Sign In"
                    : "Create Account"}
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}


/* ============================================================
   GOOGLE ICON
   ============================================================ */

function GoogleGlyph() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 48 48"
      aria-hidden="true"
    >
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}

LoginPage.noLayout = true;