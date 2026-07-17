"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Search, ShoppingCart, ArrowRight } from "lucide-react";
import { NAV_LINKS, LANGUAGES } from "@/lib/services/site-data";
import {
  isAuthenticated as checkAuth,
  getCustomer,
  logout as authLogout,
  AUTH_EVENT,
} from "@/lib/services/auth";
import { cartCount, CART_EVENT } from "@/lib/services/cart";

/* ── Searchable site index ─────────────────────────────────────────────── */
const SEARCH_INDEX = [
  { title: "Home",           href: "/",          cat: "Page",    keywords: "home landing" },
  { title: "About Us",       href: "/about",     cat: "Page",    keywords: "about story heritage brand" },
  { title: "Explore",        href: "/explore",   cat: "Page",    keywords: "explore tiles collections surfaces categories" },
  { title: "Catalogue",      href: "/catalogue", cat: "Page",    keywords: "catalogue download brochure" },
  { title: "Contact Us",     href: "/contact",   cat: "Page",    keywords: "contact support enquiry" },
  { title: "Cart",           href: "/cart",      cat: "Page",    keywords: "cart shopping bag checkout" },
  { title: "Track Order",    href: "/tracking",  cat: "Account", keywords: "track order delivery status" },
  { title: "My Orders",      href: "/orders",    cat: "Account", keywords: "orders history acquisitions" },
  { title: "Sign In",        href: "/login",     cat: "Account", keywords: "login sign in account" },
  // Explore collections
  { title: "Tiles",          href: "/explore/tiles",        cat: "Collection", keywords: "tiles architectural surfaces floor wall slabs" },
  { title: "Showers",        href: "/explore/showers",      cat: "Collection", keywords: "showers rain hand panels luxury" },
  { title: "Faucets",        href: "/explore/faucets",      cat: "Collection", keywords: "faucets mixers taps artisan" },
  { title: "Sanitaryware",   href: "/explore/sanitaryware", cat: "Collection", keywords: "sanitaryware water closets wc urinals" },
  { title: "Basins",         href: "/explore/basins",       cat: "Collection", keywords: "basins vessel countertop wall hung" },
  { title: "FRP Manhole",    href: "/explore/frp-manhole",  cat: "Collection", keywords: "frp manhole covers infrastructure" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
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
  const [count, setCount] = useState(0);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Read persisted auth + cart state AFTER mount — running this only on the
  // client keeps server/client initial HTML identical (no hydration mismatch).
  // Re-sync whenever auth or cart changes (events fired by the services), and
  // on cross-tab `storage` events.
  useEffect(() => {
    const syncAuth = () => {
      setIsAuth(checkAuth());
      setUserName(getCustomer()?.name || "");
    };
    const syncCart = () => setCount(cartCount());
    syncAuth();
    syncCart();
    window.addEventListener(AUTH_EVENT, syncAuth);
    window.addEventListener(CART_EVENT, syncCart);
    window.addEventListener("storage", () => { syncAuth(); syncCart(); });
    return () => {
      window.removeEventListener(AUTH_EVENT, syncAuth);
      window.removeEventListener(CART_EVENT, syncCart);
    };
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

  // Close search on route change
  useEffect(() => { closeSearch(); }, [pathname, closeSearch]);

  // ESC key closes search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeSearch(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeSearch]);

  // Live search results
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (q.length < 2) return [];
    return SEARCH_INDEX.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.keywords.toLowerCase().includes(q)
    ).slice(0, 8);
  }, [searchQuery]);

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (searchResults.length > 0) {
      router.push(searchResults[0].href);
      closeSearch();
    }
  }

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
    authLogout();
    setIsAuth(false);
    setUserName("");
    setLoginOpen(false);
    router.push("/");
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
       {/* ── Header Row ── */}
<div className="relative flex items-center justify-between p-5">

  {/* Mobile Menu */}
  <div className="lg:hidden w-1/5">
    <button
      onClick={() => setMobileOpen(true)}
      className="text-white hover:text-white/80 transition-colors p-2 -ml-2"
      aria-label="Open navigation menu"
    >
      <Menu size={24} />
    </button>
  </div>
<Link href="/" aria-label="R Ceramica Home" className="lg:hidden">
      <Image
        src="/images/logo.webp"
        alt="R Ceramica Logo"
        width={160}
        height={64}
        className="h-10 w-auto object-contain"
        priority
      />
    </Link>
  {/* Desktop Logo */}
  <div className="hidden lg:flex flex-1 items-center">
    <Link href="/" aria-label="R Ceramica Home">
      <Image
        src="/images/logo.webp"
        alt="R Ceramica Logo"
        width={160}
        height={64}
        className="h-16 w-auto object-contain"
        priority
      />
    </Link>
  </div>

  {/* Desktop Navigation */}
  <div className="hidden globalheader lg:flex flex-1 justify-center items-center gap-12 xl:gap-16 text-[11px] uppercase tracking-[0.3em] font-medium text-white/80">
    <ul>
  {NAV_LINKS.map((link) => {
    const isActive = pathname === link.href;

    return (
      <li key={link.href}>
        <Link
          href={link.href}
          className={`relative transition-colors ${
            isActive
              ? "text-white after:absolute after:left-0 after:-bottom-1 after:w-full after:h-px after:bg-white after:content-['']"
              : "hover:text-white"
          }`}
        >
          {link.label.toUpperCase()}
        </Link>
      </li>
    );
  })}
</ul>
  </div>

  {/* Desktop Right Tools */}
  <div className="hidden lg:flex flex-1 justify-end items-center gap-10">

    {/* Search */}
    <button
      onClick={openSearch}
      className="group"
      aria-label="Search collection"
    >
      <span className="material-symbols-outlined font-light text-3xl text-white/80 group-hover:text-white transition-colors">
        search
      </span>
    </button>

    {/* Cart */}
    <Link
      href="/cart"
      className="group relative"
      aria-label="Shopping cart"
    >
      <ShoppingCart
        size={28}
        strokeWidth={1.2}
        className="text-white/80 group-hover:text-white transition-all"
      />

      {count > 0 && (
        <span className="absolute -top-2 -right-3 bg-[var(--color-gold)] text-black text-[9px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
          {count}
        </span>
      )}
    </Link>

    {/* Language */}
    <button
      onClick={handleLangClick}
      className="hover:text-white transition-colors"
      aria-expanded={langOpen}
    >
      <span className="text-[12px] font-medium uppercase tracking-[0.2em] opacity-80">
        {activeLang}
      </span>
    </button>

    {/* Account */}
    <button
      onClick={handleLoginClick}
      className="hover:text-white transition-colors"
      aria-expanded={loginOpen}
    >
      <span
        className="material-symbols-outlined font-light text-3xl"
        style={{ color: isAuth ? "var(--color-gold)" : undefined }}
      >
        account_circle
      </span>
    </button>
  </div>

  {/* Mobile Right Icons */}
  <div className="lg:hidden flex items-center gap-6">
    <button onClick={openSearch} aria-label="Search">
      <Search
        size={22}
        strokeWidth={1.5}
        className="text-white/80"
      />
    </button>

    <Link href="/cart" className="relative" aria-label="Cart">
      <ShoppingCart
        size={22}
        strokeWidth={1.2}
        className="text-white/80"
      />

      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-[var(--color-gold)] text-black text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
          {count}
        </span>
      )}
    </Link>
  </div>

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

      {/* ── Search Overlay ── */}
      {searching && (
        <div
          className="fixed inset-0 z-[600] bg-black/95 backdrop-blur-xl flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="Search"
        >
          {/* Top bar */}
          <div className="flex items-center px-6 md:px-16 h-20 md:h-28 border-b border-white/5">
            <Search size={20} className="text-white/30 shrink-0 mr-5" />
            <form onSubmit={handleSearchSubmit} className="flex-1">
              <input
                ref={searchInputRef}
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search collections, products, pages…"
                className="w-full bg-transparent text-white text-lg md:text-2xl font-light tracking-wide outline-none placeholder:text-white/20"
                autoComplete="off"
              />
            </form>
            <button
              onClick={closeSearch}
              className="ml-6 text-white/40 hover:text-white transition-colors"
              aria-label="Close search"
            >
              <X size={24} />
            </button>
          </div>

          {/* Results */}
          <div className="flex-1 overflow-y-auto px-6 md:px-16 py-10">
            {searchQuery.trim().length < 2 ? (
              /* Quick links shown before typing */
              <div>
                <p className="text-[9px] uppercase tracking-[0.5em] text-white/50 mb-8">Quick Links</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: "Home",      href: "/"          },
                    { label: "Explore",   href: "/explore"   },
                    { label: "Catalogue", href: "/catalogue" },
                    { label: "About Us",  href: "/about"     },
                    { label: "Contact",   href: "/contact"   },
                    { label: "Cart",      href: "/cart"      },
                    { label: "My Orders", href: "/orders"    },
                    { label: "Track Order", href: "/tracking" },
                  ].map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      onClick={closeSearch}
                      className="flex items-center justify-between px-5 py-4 border border-white/10 rounded-xl text-[10px] uppercase tracking-[0.3em] text-white/60 hover:text-white hover:border-white/30 transition-all group"
                    >
                      {l.label}
                      <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  ))}
                </div>
              </div>
            ) : searchResults.length === 0 ? (
              <div className="text-center py-24">
                <p className="text-white/60 text-[11px] uppercase tracking-[0.4em]">No results for &ldquo;{searchQuery}&rdquo;</p>
                <Link href="/products" onClick={closeSearch} className="mt-8 inline-block text-[9px] uppercase tracking-[0.4em] text-[#c5a059] hover:text-white transition-colors font-medium">
                  Browse all products →
                </Link>
              </div>
            ) : (
              <div>
                <p className="text-[9px] uppercase tracking-[0.5em] text-white/50 mb-8">
                  {searchResults.length} result{searchResults.length !== 1 ? "s" : ""} for &ldquo;{searchQuery}&rdquo;
                </p>
                <div className="space-y-2">
                  {searchResults.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeSearch}
                      className="flex items-center justify-between px-6 py-5 border border-white/5 rounded-xl hover:border-[#c5a059]/40 hover:bg-[#c5a059]/5 transition-all group"
                    >
                      <div className="flex items-center gap-5">
                        <span className="text-[8px] uppercase tracking-[0.3em] text-white/50 w-16 shrink-0">{item.cat}</span>
                        <span className="text-sm font-light tracking-wider text-white/80 group-hover:text-white transition-colors">
                          {item.title}
                        </span>
                      </div>
                      <ArrowRight size={14} className="text-white/20 group-hover:text-[#c5a059] group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

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
            src="/images/logo.webp"
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
              className={`text-1xl font-light tracking-widest py-3 border-b border-white/5 uppercase transition-colors ${
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
              className="text-1xl font-light tracking-widest hover:text-gray-400 py-3 border-b border-white/5 uppercase transition-colors"
            >
              Sign In
            </Link>
          ) : (
            <div className="py-4 border-b border-white/5">
              <div className="flex items-center gap-3">
                <span className="text-1xl font-light tracking-widest text-white uppercase truncate">
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
