"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Search, ShoppingCart, Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants/navigation";

interface AccountNavbarProps {
  /** Left-side "back" link (e.g. Continue Shopping → /products). */
  backHref?: string;
  backLabel?: string;
  /** Right-side text link (e.g. Return to History → /orders). */
  rightLink?: { label: string; href: string };
  showSearch?: boolean;
  showCart?: boolean;
  cartCount?: number;
  /** Show the mobile hamburger + drawer (uses the global NAV_LINKS). */
  showMenu?: boolean;
}

/**
 * AccountNavbar — the minimal, centered-logo navbar used by the account /
 * commerce pages (cart, orders, order-details, tracking). Mirrors the original
 * static mockups: a back or menu control on the left, the logo centered, and a
 * few tools + an auth-aware account dropdown on the right.
 */
export default function AccountNavbar({
  backHref,
  backLabel = "Back",
  rightLink,
  showSearch = false,
  showCart = true,
  cartCount = 0,
  showMenu = false,
}: AccountNavbarProps) {
  const [loginOpen, setLoginOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    setIsAuth(localStorage.getItem("isAuthenticated") === "true");
    setUserName(localStorage.getItem("userName") || "");
  }, []);

  useEffect(() => {
    const close = () => setLoginOpen(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const logout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userName");
    localStorage.removeItem("userMobile");
    setIsAuth(false);
    setUserName("");
    setLoginOpen(false);
  };

  return (
    <>
      <nav
        id="navbar"
        className="account-navbar fixed top-0 left-0 w-full z-50 transition-all duration-500 bg-[var(--color-bg)]/90 backdrop-blur-xl border-b border-white/5"
        role="navigation"
        aria-label="Account navigation"
      >
        <div className="relative flex justify-between items-center px-4 md:px-12 h-20 md:h-28">
          {/* Left slot */}
          <div className="flex-1 flex items-center">
            {backHref ? (
              <Link
                href={backHref}
                className="flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] opacity-60 hover:opacity-100 transition-opacity"
              >
                <ArrowLeft size={14} />
                <span className="hidden sm:inline">{backLabel}</span>
                <span className="sm:hidden">Back</span>
              </Link>
            ) : showMenu ? (
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden text-white p-2 -ml-2"
                aria-label="Open menu"
                aria-expanded={mobileOpen}
              >
                <Menu size={24} />
              </button>
            ) : null}
          </div>

          {/* Centered logo */}
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
            <Link href="/" aria-label="R Ceramica Home">
              <Image
                src="https://rceramica.com/logo/logo.png"
                alt="R Ceramica Logo"
                width={160}
                height={64}
                className="h-8 md:h-16 w-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* Right tools */}
          <div className="flex-1 flex justify-end items-center gap-5 md:gap-8 relative z-20">
            {rightLink && (
              <Link
                href={rightLink.href}
                className="hidden lg:block text-[10px] uppercase tracking-[0.4em] opacity-40 hover:opacity-100 transition-opacity"
              >
                {rightLink.label}
              </Link>
            )}

            {showSearch && (
              <Link
                href="/products"
                className="flex items-center text-white/80 hover:text-white transition-colors"
                aria-label="Browse products"
              >
                <span className="material-symbols-outlined font-light text-2xl">
                  search
                </span>
              </Link>
            )}

            {showCart && (
              <Link
                href="/cart"
                className="relative flex items-center text-white/80 hover:text-white transition-colors"
                aria-label="Shopping cart"
              >
                <ShoppingCart size={22} strokeWidth={1.2} />
                <span className="absolute -top-2 -right-3 bg-white text-black text-[8px] md:text-[9px] font-bold w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              </Link>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                setLoginOpen((v) => !v);
              }}
              className="focus:outline-none flex items-center"
              aria-label={isAuth ? "My account" : "Sign in"}
              aria-expanded={loginOpen}
            >
              <span
                className="material-symbols-outlined font-light text-2xl md:text-3xl transition-colors"
                style={{ color: isAuth ? "var(--color-gold)" : undefined }}
              >
                account_circle
              </span>
            </button>
          </div>
        </div>

        {/* Account dropdown */}
        {loginOpen && (
          <div
            className="absolute right-4 md:right-12 top-[80px] md:top-[96px] w-56 bg-black/60 backdrop-blur-2xl border border-white/10 p-1.5 rounded-sm shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)] z-[110]"
            onClick={(e) => e.stopPropagation()}
          >
            {!isAuth ? (
              <Link
                href="/login"
                className="block w-full text-left px-6 py-5 text-[10px] text-white/80 hover:text-white hover:bg-white/10 transition-all uppercase tracking-[0.3em] font-medium"
              >
                Sign In
              </Link>
            ) : (
              <>
                <div className="px-6 py-4 border-b border-white/5">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white font-medium truncate">
                    {userName}
                  </p>
                </div>
                <Link
                  href="/orders"
                  className="flex items-center gap-3 w-full text-left px-6 py-4 text-[10px] text-white/60 hover:text-[var(--color-gold)] hover:bg-white/5 transition-all uppercase tracking-[0.3em] font-medium"
                >
                  <span className="material-symbols-outlined text-[18px]">receipt_long</span>
                  Orders
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center gap-3 w-full text-left px-6 py-4 text-[10px] text-white/80 hover:text-white hover:bg-white/10 transition-all uppercase tracking-[0.3em] font-medium"
                >
                  <span className="material-symbols-outlined text-[18px]">logout</span>
                  Sign Out
                </button>
              </>
            )}
          </div>
        )}
      </nav>

      {/* Mobile drawer */}
      {showMenu && (
        <div
          className={`fixed inset-0 bg-[var(--color-bg)] z-[500] flex flex-col p-8 overflow-y-auto transition-all duration-500 ${
            mobileOpen ? "mobile-menu-enter" : "mobile-menu-exit"
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="flex justify-between items-center mb-12">
            <Image
              src="https://rceramica.com/logo/logo.png"
              alt="R Ceramica"
              width={120}
              height={48}
              className="h-12 w-auto"
            />
            <button
              onClick={() => setMobileOpen(false)}
              className="text-white hover:text-gray-400 transition-colors"
              aria-label="Close menu"
            >
              <X size={32} />
            </button>
          </div>
          <nav className="flex flex-col space-y-1 gap-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-xl font-light tracking-widest py-3 border-b border-white/5 uppercase hover:text-gray-400 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {isAuth ? (
              <Link
                href="/orders"
                onClick={() => setMobileOpen(false)}
                className="text-xl font-light tracking-widest py-3 border-b border-white/5 uppercase text-[var(--color-gold)]"
              >
                My Orders
              </Link>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="text-xl font-light tracking-widest py-3 border-b border-white/5 uppercase hover:text-gray-400 transition-colors"
              >
                Sign In
              </Link>
            )}
          </nav>
        </div>
      )}
    </>
  );
}
