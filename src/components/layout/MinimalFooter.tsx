/**
 * MinimalFooter — the slim copyright + legal footer used on the cart page
 * (mirrors cart.html). Full site footer lives in layout/Footer.tsx.
 * Placeholder links use plain <a href="#"> to avoid the next/link hash+query
 * hydration mismatch.
 */
export default function MinimalFooter() {
  return (
    <footer className="bg-black py-12 border-t border-white/5">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
        <p className="text-[9px] text-white/30 tracking-[0.4em] uppercase">
          © 2026 R Ceramica. Crafted with Excellence.
        </p>
        <div className="flex gap-8 md:gap-12 text-[9px] text-white/30 tracking-[0.4em] uppercase">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Shipping</a>
        </div>
      </div>
    </footer>
  );
}
