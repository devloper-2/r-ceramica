import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ChevronRight, ChevronLeft, ChevronDown,
  ShoppingCart, Check, Minus, Plus,
} from "lucide-react";
import type { GetStaticPaths, GetStaticProps } from "next";
import { siteConfig } from "@/config/site";
import { api } from "@/lib/services/api";
import { addToCart } from "@/lib/services/cart";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=1200";

interface ProductImage { path: string; alt_text?: string | null }
interface Product {
  id: string | number;
  slug: string;
  name: string;
  short_description?: string | null;
  description?: string | null;
  price: number;
  currency: string;
  specs?: Record<string, string> | null;
  images?: ProductImage[];
  category_slug?: string | null;
  category_name?: string | null;
  subcategory_slug?: string | null;
  subcategory_name?: string | null;
}
interface RelatedItem { slug: string; name: string; price: number; currency: string; image?: string | null }

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const products = await api.getProducts();
    return {
      paths: products.map((p) => ({ params: { slug: p.slug } })),
      fallback: "blocking",
    };
  } catch {
    return { paths: [], fallback: "blocking" };
  }
};

export const getStaticProps: GetStaticProps<{ product: Product; related: RelatedItem[] }> = async ({ params }) => {
  const slug = String(params?.slug);
  try {
    const product = (await api.getProduct(slug)) as unknown as Product;

    let related: RelatedItem[] = [];
    if (product.subcategory_slug) {
      const siblings = await api.getProductsBySubcategory(product.subcategory_slug);
      related = siblings
        .filter((p) => p.slug !== product.slug)
        .slice(0, 4)
        .map((p) => ({ slug: p.slug, name: p.name, price: p.price, currency: p.currency, image: p.image }));
    }

    return { props: { product, related }, revalidate: 60 };
  } catch {
    return { notFound: true };
  }
};

export default function ProductDetailPage({ product, related }: { product: Product; related: RelatedItem[] }) {
  const images = product.images?.length ? product.images.map((i) => i.path) : [FALLBACK_IMAGE];
  const specs = product.specs && typeof product.specs === "object" ? product.specs : {};

  const [mainImg, setMainImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [inCart, setInCart] = useState(false);
  const [specsOpen, setSpecsOpen] = useState(true);

  const TITLE = `${product.name} | ${siteConfig.name}`;
  const description = product.short_description || product.description || product.name;
  const priceLabel = `${product.currency} ${Number(product.price).toLocaleString()}`;

  const handleAdd = () => {
    addToCart({ slug: product.slug, name: product.name, price: Number(product.price), image: images[0], quantity: qty });
    setInCart(true);
  };

  return (
    <div className="page-product-detail bg-[#0a0a0a] text-white">
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={description ?? ""} />
        <link rel="canonical" href={`${siteConfig.url}/products/${product.slug}`} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={description ?? ""} />
        <meta property="og:image" content={images[0]} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      {/* Breadcrumbs */}
      <div className="pt-36 md:pt-48 px-6 md:px-12 lg:px-24 max-w-[1720px] mx-auto">
        <div className="flex items-center flex-wrap gap-3 text-[10px] uppercase tracking-[0.2em] text-white/30 mb-12">
          <Link href="/explore" className="hover:text-white transition-colors">Explore</Link>
          {product.category_slug && (
            <>
              <ChevronRight size={10} />
              <Link href={`/explore/${product.category_slug}`} className="hover:text-white transition-colors">
                {product.category_name}
              </Link>
            </>
          )}
          {product.category_slug && product.subcategory_slug && (
            <>
              <ChevronRight size={10} />
              <Link href={`/explore/${product.category_slug}/${product.subcategory_slug}`} className="hover:text-white transition-colors">
                {product.subcategory_name}
              </Link>
            </>
          )}
          <ChevronRight size={10} />
          <span className="text-white/60">{product.name}</span>
        </div>
      </div>

      {/* Product */}
      <section className="max-w-[1720px] mx-auto px-6 md:px-12 lg:px-24 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-28">

          {/* Gallery */}
          <div className="flex flex-col gap-6">
            <div className="relative aspect-square bg-[#111] overflow-hidden group">
              <Image
                key={mainImg}
                src={images[mainImg]}
                alt={product.name}
                fill
                priority
                sizes="(max-width:1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-[1.5s] group-hover:scale-[1.04]"
              />
              {images.length > 1 && (
                <>
                  <button onClick={() => setMainImg((i) => (i - 1 + images.length) % images.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 backdrop-blur flex items-center justify-center hover:bg-black/70 transition-colors opacity-0 group-hover:opacity-100"
                    aria-label="Previous image"><ChevronLeft size={16} /></button>
                  <button onClick={() => setMainImg((i) => (i + 1) % images.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 backdrop-blur flex items-center justify-center hover:bg-black/70 transition-colors opacity-0 group-hover:opacity-100"
                    aria-label="Next image"><ChevronRight size={16} /></button>
                </>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {images.map((src, i) => (
                  <button key={i} onClick={() => setMainImg(i)}
                    className={`relative flex-shrink-0 w-20 h-20 overflow-hidden border transition-all ${i === mainImg ? "border-[#c5a059]" : "border-white/10 hover:border-white/30"}`}>
                    <Image src={src} alt="" fill sizes="80px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col gap-8">
            {product.subcategory_name && (
              <p className="text-[10px] uppercase tracking-[0.5em] text-[#c5a059] font-medium">
                {product.subcategory_name}
              </p>
            )}

            <h1 className="text-4xl md:text-5xl font-display font-light uppercase tracking-[0.05em] leading-tight">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-4">
              <span className="text-3xl font-display font-light text-white">{priceLabel}</span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-white/30">Incl. taxes</span>
            </div>

            {product.description && (
              <p className="text-white/50 text-sm leading-relaxed font-light">{product.description}</p>
            )}

            <div className="w-full h-px bg-white/5" />

            {/* Quantity + Add to Cart */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex md:flex-1 items-center justify-center border border-white/10 h-14">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-14 h-full flex items-center justify-center hover:bg-white/5 transition-colors text-white/60 hover:text-white"><Minus size={14} /></button>
                <input type="number" value={qty} onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
                  className="w-16 h-full bg-transparent text-center text-sm text-white outline-none" />
                <button onClick={() => setQty((q) => q + 1)}
                  className="w-14 h-full flex items-center justify-center hover:bg-white/5 transition-colors text-white/60 hover:text-white"><Plus size={14} /></button>
              </div>

              <button onClick={handleAdd}
                className={`h-14 flex md:flex-1 items-center cursor-pointer justify-center gap-3 text-[10px] uppercase tracking-[0.4em] font-bold transition-all ${inCart ? "bg-[#c5a059] text-white border border-[#c5a059]" : "bg-white text-black hover:bg-neutral-200"}`}>
                {inCart ? <Check size={14} /> : <ShoppingCart size={14} />}
                {inCart ? "Added to Cart" : "Add to Cart"}
              </button>
            </div>

            {/* Specs */}
            {Object.keys(specs).length > 0 && (
              <div className="border border-white/5">
                <button onClick={() => setSpecsOpen((o) => !o)}
                  className="w-full flex items-center justify-between px-6 py-5 hover:bg-white/[0.02] transition-colors group">
                  <span className="text-[11px] uppercase tracking-[0.25em] font-medium text-white/70 group-hover:text-white">Specifications</span>
                  <ChevronDown size={14} className={`text-white/40 transition-transform ${specsOpen ? "rotate-180" : ""}`} />
                </button>
                {specsOpen && (
                  <div className="px-6 pb-6 space-y-3 border-t border-white/5">
                    {Object.entries(specs).map(([key, val]) => (
                      <div key={key} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                        <span className="text-[9px] uppercase tracking-[0.25em] text-white/30">{key}</span>
                        <span className="text-[10px] uppercase tracking-[0.15em] text-white/70">{String(val)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-white/5 max-w-[1720px] mx-auto px-6 md:px-12 lg:px-24 py-24">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-2xl md:text-4xl font-display font-light uppercase tracking-widest">You May Also Like</h2>
            {product.category_slug && product.subcategory_slug && (
              <Link href={`/explore/${product.category_slug}/${product.subcategory_slug}`}
                className="text-[9px] uppercase tracking-[0.4em] text-white/40 hover:text-white border-b border-white/10 pb-1 transition-colors">View All</Link>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {related.map((p) => (
              <Link key={p.slug} href={`/products/${p.slug}`} className="group cursor-pointer">
                <div className="relative aspect-[4/5] bg-[#111] overflow-hidden mb-5">
                  <Image src={p.image || FALLBACK_IMAGE} alt={p.name} fill
                    sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,25vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-[1.06]" />
                </div>
                <h3 className="text-base font-display font-light uppercase tracking-[0.15em] group-hover:text-white/70 transition-colors">{p.name}</h3>
                <p className="text-[10px] text-white/40 mt-1">{p.currency} {Number(p.price).toLocaleString()}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
