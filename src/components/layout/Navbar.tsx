"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Search, ShoppingCart } from "lucide-react";
import { NAV_LINKS, LANGUAGES } from "@/lib/constants/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searching, setSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [langOpen, setLangOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [activeLang, setActiveLang] = useState("EN");
  // Start with SSR-safe defaults so the server and first client render match;
  // the persisted values are loaded in a useEffect after mount (see below).
  const [isAuth, setIsAuth] = useState(false);
  const [userName, setUserName] = useState("");

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Read persisted auth state AFTER mount — running this only on the client
  // keeps server/client initial HTML identical and avoids hydration mismatch.
  useEffect(() => {
    setIsAuth(localStorage.getItem("isAuthenticated") === "true");
    setUserName(localStorage.getItem("userName") || "");
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Close dropdowns on outside click
  useEffect(() => {
    const close = () => {
      setLangOpen(false);
      setLoginOpen(false);
    };
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  const openSearch = useCallback(() => {
    setSearching(true);
    setLangOpen(false);
    setTimeout(() => searchInputRef.current?.focus(), 100);
  }, []);

  const closeSearch = useCallback(() => {
    setSearching(false);
    setSearchQuery("");
    searchInputRef.current?.blur();
  }, []);

  const handleLangClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLangOpen((v) => !v);
    setLoginOpen(false);
  };

  const handleLoginClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLoginOpen((v) => !v);
    setLangOpen(false);
  };

  const logout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userName");
    localStorage.removeItem("userMobile");
    setIsAuth(false);
    setUserName("");
    setLoginOpen(false);
  };

  const navbarClass = [
    "site-navbar fixed top-0 left-0 w-full z-50 transition-all duration-500 font-sans font-light",
    scrolled ? "is-scrolled backdrop-blur-xl border-b border-white/5" : "",
    searching ? "is-searching" : "",
    searching && searchQuery ? "has-query" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <nav id="navbar" className={navbarClass} role="navigation" aria-label="Main navigation">
        {/* ── Top Row ── */}
        <div className="relative flex justify-between items-center px-4 md:px-12 h-20 md:h-32 lg:h-36">

          {/* Desktop Left Spacer */}
          <div id="nav-left" className="flex-1 hidden lg:flex items-center relative z-20" />

          {/* Mobile: Hamburger */}
          <div id="mobile-menu-btn" className="flex-1 lg:hidden flex items-center relative z-[60] transition-opacity duration-300">
            <button
              onClick={() => setMobileOpen(true)}
              className="text-white hover:text-white/80 transition-colors p-2 -ml-2"
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
            >
              <Menu size={24} />
            </button>
          </div>

          {/* Centred Logo */}
          <div
            id="logo-container"
            className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-700"
          >
            <Link href="/" className="pointer-events-auto" aria-label="R Ceramica Home">
              <Image
                id="navbar-logo"
                src="https://rceramica.com/logo/logo.png"
                alt="R Ceramica Logo"
                width={160}
                height={64}
                className="h-10 md:h-16 w-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* Right Tools */}
          <div id="nav-right" className="flex-1 flex justify-end items-center relative z-20">
            {/* Desktop Icons */}
            <div className="hidden lg:flex items-center gap-10">
              <button
                onClick={openSearch}
                className="flex items-center cursor-pointer group"
                aria-label="Search collection"
              >
                <span className="material-symbols-outlined font-light text-3xl text-white/80 group-hover:text-white transition-colors">
                  search
                </span>
              </button>

              <Link href="/cart" className="flex items-center hover:text-white/80 transition-colors group" aria-label="Shopping cart">
                <div className="relative">
                  <ShoppingCart size={28} strokeWidth={1.2} className="text-white/80 group-hover:text-white group-hover:scale-110 transition-all" />
                  <span className="absolute -top-2 -right-3 bg-white text-black text-[9px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    0
                  </span>
                </div>
              </Link>

              <button
                onClick={handleLangClick}
                className="hover:text-white/80 transition-colors focus-visible:outline-none"
                aria-label="Change language"
                aria-expanded={langOpen}
              >
                <span className="text-[12px] font-medium uppercase tracking-[0.2em] opacity-80">
                  {activeLang}
                </span>
              </button>

              <button
                onClick={handleLoginClick}
                className="hover:text-white/80 transition-colors focus-visible:outline-none"
                aria-label={isAuth ? "My account" : "Sign in"}
                aria-expanded={loginOpen}
              >
                <span
                  className="material-symbols-outlined font-light text-3xl transition-colors"
                  style={{ color: isAuth ? "var(--color-gold)" : undefined }}
                >
                  account_circle
                </span>
              </button>
            </div>

            {/* Mobile Icons */}
            <div className="lg:hidden flex items-center gap-6">
              <button onClick={openSearch} aria-label="Search" className="flex items-center">
                <Search size={22} strokeWidth={1.5} className="text-white/80" />
              </button>
              <Link href="/cart" className="relative" aria-label="Cart">
                <ShoppingCart size={22} strokeWidth={1.2} className="text-white/80" />
                <span className="absolute -top-2 -right-2 bg-white text-black text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  0
                </span>
              </Link>
            </div>
          </div>

          {/* Search Overlay */}
          <div
            id="nav-center"
            className="absolute inset-0 flex justify-center items-center pointer-events-none px-12"
          >
            <div
              id="search-input-container"
              className="w-full max-w-xl opacity-0 pointer-events-none translate-y-4 transition-all duration-500 relative"
            >
              <div className="flex items-center w-full relative pointer-events-auto">
                <input
                  ref={searchInputRef}
                  type="search"
                  id="search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="SEARCH THE COLLECTION..."
                  autoComplete="off"
                  className="w-full bg-transparent border-b border-white text-white text-xs md:text-sm font-display font-light placeholder:text-white/30 focus:outline-none transition-all py-1.5 px-1 text-center uppercase tracking-[0.3em]"
                  aria-label="Search products"
                />
                <button
                  onClick={closeSearch}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-all hover:scale-110"
                  aria-label="Close search"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Search Results */}
              <div
                id="search-results-container"
                className="absolute bg-black/40 backdrop-blur-xl border border-white/10 rounded-sm overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.9)] z-50"
                role="listbox"
                aria-label="Search suggestions"
              >
                <div className="max-h-[70vh] overflow-y-auto p-4 md:p-6 space-y-8">
                  <div>
                    <h4 className="text-[8px] md:text-[9px] uppercase tracking-[0.4em] text-white/20 mb-4 font-bold flex items-center gap-3">
                      <span>Suggested</span>
                      <div className="flex-1 h-px bg-white/5" />
                    </h4>
                    <div className="space-y-1">
                      {[
                        { name: "Pietra Grey Slabs", type: "High Gloss Porcelain", href: "#" },
                        { name: "Calacatta Gold", type: "Marble Selection", href: "#" },
                      ].map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="group flex items-center gap-4 p-2 hover:bg-white/5 transition-all rounded-sm"
                        >
                          <div className="w-12 h-12 bg-white/5 overflow-hidden rounded-sm flex items-center justify-center">
                            <span className="text-white/10 text-xs">✦</span>
                          </div>
                          <div className="flex-1">
                            <div className="text-[10px] md:text-xs font-medium text-white/80 group-hover:text-white transition-colors tracking-widest uppercase">
                              {item.name}
                            </div>
                            <div className="text-[8px] text-white/30 uppercase tracking-[0.2em] mt-0.5">
                              {item.type}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-[8px] md:text-[9px] uppercase tracking-[0.4em] text-white/20 mb-4 font-bold flex items-center gap-3">
                      <span>Quick Search</span>
                      <div className="flex-1 h-px bg-white/5" />
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {["New Arrivals", "Technical"].map((tag) => (
                        <Link
                          key={tag}
                          href="#"
                          className="text-[9px] text-white/50 hover:text-white border border-white/5 hover:border-white/20 px-3 py-1 rounded-full transition-all uppercase tracking-widest bg-white/[0.02]"
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="bg-white/[0.02] border-t border-white/5 p-3 text-center">
                  <Link href="#" className="text-[8px] uppercase tracking-[0.3em] text-white/20 hover:text-white transition-colors">
                    View All Results
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Desktop Nav Links ── */}
        <div
          id="desktop-nav-links"
          className="hidden lg:flex justify-center items-center py-4 border-t border-white/5 space-x-12 xl:space-x-16 text-[11px] uppercase tracking-[0.3em] font-medium text-white/80 transition-all duration-500"
        >
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative transition-colors ${
                  isActive
                    ? "text-white after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-px after:bg-white"
                    : "hover:text-white"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {link.label.toUpperCase()}
              </Link>
            );
          })}
        </div>

        {/* ── Language Dropdown ── */}
        {langOpen && (
          <div
            className="absolute right-4 md:right-12 top-[80px] md:top-[128px] lg:top-[144px] w-48 bg-black/40 backdrop-blur-xl border border-white/10 p-2 rounded-sm shadow-2xl z-[110]"
            onClick={(e) => e.stopPropagation()}
            role="listbox"
            aria-label="Language selector"
          >
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setActiveLang(lang.code);
                  setLangOpen(false);
                }}
                role="option"
                aria-selected={activeLang === lang.code}
                className="w-full text-left px-5 py-3 text-[10px] text-white/70 hover:text-white hover:bg-white/10 transition-all flex justify-between items-center uppercase tracking-[0.25em] font-medium"
              >
                {lang.label}
                {activeLang === lang.code && (
                  <div className="w-1.5 h-1.5 bg-white rounded-full" />
                )}
              </button>
            ))}
          </div>
        )}

        {/* ── Login Dropdown ── */}
        {loginOpen && (
          <div
            className="absolute right-4 md:right-12 top-[80px] md:top-[128px] lg:top-[144px] w-56 bg-black/60 backdrop-blur-2xl border border-white/10 p-1.5 rounded-sm shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)] z-[110]"
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

      {/* ── Mobile Drawer ── */}
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

        <nav className="flex flex-col space-y-1 gap-2 mb-12">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`text-xl font-light tracking-widest py-3 border-b border-white/5 uppercase transition-colors ${
                pathname === link.href ? "text-[var(--color-gold)]" : "hover:text-gray-400"
              }`}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
          {!isAuth ? (
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="text-xl font-light tracking-widest hover:text-gray-400 py-3 border-b border-white/5 uppercase transition-colors"
            >
              Sign In
            </Link>
          ) : (
            <div className="py-4 border-b border-white/5">
              <div className="flex items-center gap-3">
                <span className="text-xl font-light tracking-widest text-white uppercase truncate">
                  {userName}
                </span>
                <button
                  onClick={logout}
                  className="text-white/40 hover:text-white transition-colors"
                  aria-label="Sign out"
                >
                  <span className="material-symbols-outlined text-[20px]">logout</span>
                </button>
              </div>
            </div>
          )}
        </nav>
      </div>
    </>
  );
}
