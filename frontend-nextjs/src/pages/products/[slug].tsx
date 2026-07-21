import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  ChevronRight, ChevronLeft, ShoppingCart, Check, Minus, Plus, X, ImageOff,
} from "lucide-react";
import type { GetStaticPaths, GetStaticProps } from "next";
import { siteConfig } from "@/config/site";
import { api } from "@/lib/services/api";
import { addToCart } from "@/lib/services/cart";

// model-viewer web component type declaration
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string;
        alt?: string;
        "auto-rotate"?: boolean | string;
        "camera-controls"?: boolean | string;
        "shadow-intensity"?: string;
        ar?: boolean | string;
      };
    }
  }
}

const CURRENCY_SYMBOLS: Record<string, string> = { INR: "₹", USD: "$", EUR: "€" };

const MODEL_EXTS = ["glb", "gltf", "obj", "fbx", "stl"];
const IMAGE_EXTS = ["jpg", "jpeg", "png", "webp", "gif", "avif"];

function fileExt(url: string): string {
  return (url.split(".").pop() ?? "").toLowerCase();
}

// Common bathroom finish → approximate swatch colour
const FINISH_COLORS: Record<string, string> = {
  "Chrome": "#C4CDD6",
  "Polished Chrome": "#D0D8E0",
  "Black Chrome": "#3a3f47",
  "Black Matt": "#1E1E1E",
  "Blush Gold PVD": "#C8964A",
  "Blush Gold Bright PVD": "#D4A850",
  "Gold Bright PVD": "#CDA030",
  "Gold Matt PVD": "#B88A28",
  "White": "#F0EDE8",
  "Graphite": "#5A5F68",
  "Rose Gold": "#B76E79",
  "Antique Bronze": "#614E3C",
  "Brushed Nickel": "#8C9196",
  "Matte Black": "#1a1a1a",
};

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
  image_2d?: string | null;
  image_3d?: string | null;
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
  const images = product.images?.length ? product.images.map((i) => i.path) : [];
  const hasImages = images.length > 0;
  const ogImage = hasImages ? images[0] : `${siteConfig.url}${siteConfig.ogImage}`;
  const specs = product.specs && typeof product.specs === "object" ? product.specs : {};

  const [mainImg, setMainImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [inCart, setInCart] = useState(false);
  const [modal2D, setModal2D] = useState(false);
  const [modal3D, setModal3D] = useState(false);

  // Finish / colour variants — supports comma-separated list in specs.Finishes
  const finishList: string[] = specs.Finishes
    ? specs.Finishes.split(",").map((f) => f.trim()).filter(Boolean)
    : specs.Finish
    ? [specs.Finish]
    : [];
  const [selectedFinish, setSelectedFinish] = useState(finishList[0] ?? "");

  const sym = CURRENCY_SYMBOLS[product.currency] ?? product.currency;
  const priceFormatted = `${sym} ${Number(product.price).toLocaleString()}`;

  const TITLE = `${product.name} | ${siteConfig.name}`;
  const metaDesc = product.short_description || product.description || product.name;

  const handleAdd = () => {
    addToCart({ slug: product.slug, name: product.name, price: Number(product.price), image: images[0] ?? "", quantity: qty });
    setInCart(true);
  };

  // Specs table — exclude display-level keys shown individually above
  const tableSpecs = Object.entries(specs).filter(
    ([k]) => !["Code", "Finish", "Finishes"].includes(k)
  );

  // 2D / 3D assets from dedicated DB columns
  const img2D: string | undefined = product.image_2d ?? undefined;
  const img3D: string | undefined = product.image_3d ?? undefined;

  const ext3D = img3D ? fileExt(img3D) : "";
  const is3DModelFile = MODEL_EXTS.includes(ext3D);
  const is3DImageFile = IMAGE_EXTS.includes(ext3D);
  const isGltf = ext3D === "glb" || ext3D === "gltf";

  // Inject <model-viewer> CDN script once when a GLB/GLTF file is present
  useEffect(() => {
    if (!isGltf) return;
    const id = "model-viewer-script";
    if (!document.getElementById(id)) {
      const script = document.createElement("script");
      script.id = id;
      script.type = "module";
      script.src =
        "https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js";
      document.head.appendChild(script);
    }
  }, [isGltf]);

  return (
    <div className="page-product-detail bg-[#0a0a0a] text-white min-h-screen">
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={metaDesc ?? ""} />
        <link rel="canonical" href={`${siteConfig.url}/products/${product.slug}`} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={metaDesc ?? ""} />
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      {/* ── 2D Modal ── */}
      {modal2D && img2D && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm"
          onClick={() => setModal2D(false)}
        >
          <div
            className="bg-[#111] border border-white/10 p-6 w-full max-w-3xl mx-4 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModal2D(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center border border-white/15 text-white/50 hover:border-white/40 hover:text-white transition-all"
            >
              <X size={13} />
            </button>
            <p className="text-[9px] uppercase tracking-[0.5em] text-white/40 mb-1">Technical Drawing</p>
            <h3 className="text-base font-display font-semibold uppercase tracking-[0.06em] text-white mb-4">
              2D Image
            </h3>
            <div className="h-px bg-white/10 mb-5" />
            <div className="bg-white p-4">
              <Image
                src={img2D}
                alt="2D Technical Drawing"
                width={900}
                height={600}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* ── 3D Modal ── */}
      {modal3D && img3D && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm" onClick={() => setModal3D(false)} >
          <div className="bg-[#111] border border-white/10 p-6 w-full max-w-3xl mx-4 relative max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()} >
            <button onClick={() => setModal3D(false)} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center border border-white/15 text-white/50 hover:border-white/40 hover:text-white transition-all" >
              <X size={13} />
            </button>
            <p className="text-[9px] uppercase tracking-[0.5em] text-white/40 mb-1">3D Model</p>
            <h3 className="text-base font-display font-semibold uppercase tracking-[0.06em] text-white mb-4">
              {ext3D.toUpperCase()} — {product.name}
            </h3>
            <div className="h-px bg-white/10 mb-5" />

            {/* GLB / GLTF → interactive model-viewer */}
            {isGltf && (
              <div className="bg-[#1a1a1a] rounded overflow-hidden">
                {/* model-viewer is a web component loaded via CDN */}
                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                {/* @ts-ignore */}
                <model-viewer
                  src={img3D}
                  alt={`${product.name} 3D model`}
                  auto-rotate=""
                  camera-controls=""
                  shadow-intensity="1"
                  style={{ width: "100%", height: "460px", backgroundColor: "#1a1a1a" }}
                />
              </div>
            )}

            {/* OBJ / FBX / STL → download card */}
            {is3DModelFile && !isGltf && (
              <div className="bg-[#0e0e0e] border border-white/10 p-10 text-center">
                <p className="text-[38px] mb-4">📦</p>
                <p className="text-white/60 text-sm mb-1">{product.name}</p>
                <p className="text-[#c5a059] text-[9px] uppercase tracking-[0.4em] mb-6">
                  {ext3D.toUpperCase()} 3D Model
                </p>
                <a href={img3D} download className="inline-flex items-center gap-2 px-8 py-3 bg-[#c5a059] text-black text-[9px] uppercase tracking-[0.35em] font-bold hover:bg-white transition-colors">
                  Download 3D Model
                </a>
                <p className="text-white/25 text-[10px] mt-4">
                  Open with Blender, AutoCAD or any compatible 3D viewer
                </p>
              </div>
            )}

            {/* Legacy: old entry stored a render image in this field */}
            {is3DImageFile && !is3DModelFile && (
              <div className="bg-[#e8e8e8] p-4">
                <Image src={img3D} alt="3D Model View" width={900} height={600} className="w-full h-auto object-contain" />
              </div>
            )}
          </div>
        </div>
      )}

      <div className="pt-28 md:pt-36 pb-24">
        <div className="productfileter">

          {/* Breadcrumb */}
          <nav className="flex items-center flex-wrap gap-2 text-[9px] uppercase tracking-[0.25em] text-white/30 mb-8">
            <Link href="/explore" className="hover:text-white transition-colors">Explore</Link>
            {product.category_slug && (
              <>
                <ChevronRight size={9} />
                <Link href={`/explore/${product.category_slug}`} className="hover:text-white transition-colors">
                  {product.category_name}
                </Link>
              </>
            )}
            {product.category_slug && product.subcategory_slug && (
              <>
                <ChevronRight size={9} />
                <Link href={`/explore/${product.category_slug}/${product.subcategory_slug}`} className="hover:text-white transition-colors" >
                  {product.subcategory_name}
                </Link>
              </>
            )}
            <ChevronRight size={9} />
            <span className="text-white/60 truncate max-w-[240px]">{product.name}</span>
          </nav>

          {/* Main grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_460px] xl:grid-cols-[1fr_520px] gap-10 xl:gap-16 items-start">

            {/* ── Left: Gallery ── */}
            <div>
              <div className="flex gap-3">
                {/* Vertical thumbnails */}
                {images.length > 1 && (
                  <div className="flex flex-col gap-2 w-[68px] flex-shrink-0">
                    {images.map((src, i) => (
                      <button key={i} onClick={() => setMainImg(i)} className={`relative w-[68px] h-[68px] overflow-hidden border-2 transition-all flex-shrink-0 ${ i === mainImg ? "border-[#c5a059]" : "border-white/10 hover:border-white/30" }`} >
                        <Image src={src} alt="" fill sizes="68px" className="object-cover" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Main image — viewport-fitted height */}
                <div className="flex-1 relative bg-[#111] overflow-hidden group" style={{ height: "calc(100vh - 240px)", maxHeight: "720px", minHeight: "380px" }} >
                  {hasImages ? (
                    <>
                      <Image key={mainImg} src={images[mainImg]} alt={product.name} fill priority sizes="(max-width:1024px) 100vw, 55vw" className="object-cover transition-transform duration-[2s] group-hover:scale-[1.03]" />

                      {/* Prev / Next arrows */}
                      {images.length > 1 && (
                        <>
                          <button onClick={() => setMainImg((i) => (i - 1 + images.length) % images.length)} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/50 backdrop-blur flex  items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                            aria-label="Previous"
                          >
                            <ChevronLeft size={15} />
                          </button>
                          <button onClick={() => setMainImg((i) => (i + 1) % images.length)} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/50 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70" aria-label="Next" >
                            <ChevronRight size={15} />
                          </button>
                        </>
                      )}
                    </>
                  ) : (
                    /* No gallery images — branded placeholder */
                    <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-white/20 select-none">
                      <ImageOff size={54} strokeWidth={1} />
                      <span className="text-[10px] uppercase tracking-[0.35em]">No image available</span>
                    </div>
                  )}

                  {/* 2D / 3D overlay buttons — always visible */}
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    <button onClick={() => img2D && setModal2D(true)} className={`w-12 h-12 rounded-full border bg-black/70 backdrop-blur text-[9px] font-bold uppercase tracking-wider transition-all flex flex-col items-center justify-center gap-0.5 ${
                        img2D
                          ? "border-white/40 text-white hover:border-[#c5a059] hover:text-[#c5a059] cursor-pointer"
                          : "border-white/15 text-white/25 cursor-not-allowed"
                      }`}
                      title={img2D ? "View 2D Drawing" : "2D drawing not available"}
                    >
                      <span className="text-[10px] font-bold leading-none">2D</span>
                      <span className="text-[6px] uppercase tracking-[0.1em] leading-none opacity-70">View</span>
                    </button>
                    <button onClick={() => img3D && setModal3D(true)} className={`w-12 h-12 rounded-full border bg-black/70 backdrop-blur text-[9px] font-bold uppercase tracking-wider transition-all flex flex-col items-center justify-center gap-0.5 ${
                        img3D
                          ? "border-white/40 text-white hover:border-[#c5a059] hover:text-[#c5a059] cursor-pointer"
                          : "border-white/15 text-white/25 cursor-not-allowed"
                      }`}
                      title={img3D ? "View 3D Model" : "3D model not available"}
                    >
                      <span className="text-[10px] font-bold leading-none">3D</span>
                      <span className="text-[6px] uppercase tracking-[0.1em] leading-none opacity-70">View</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Right: Info panel ── */}
            <div className="rightpanel">

              {product.subcategory_name && (
                <p className="text-[9px] text-[#c5a059] uppercase tracking-[0.5em] font-medium mb-3">
                  {product.subcategory_name}
                </p>
              )}

              <h1 className="text-2xl md:text-[28px] font-display font-semibold uppercase tracking-[0.04em] leading-snug text-white mb-5">
                {product.name}
              </h1>

              <div className="h-px bg-white/10 mb-5" />

              {/* Info rows */}
              <div className="space-y-3 mb-5">
                {product.subcategory_name && (
                  <div className="flex gap-4 text-[11px]">
                    <span className="w-24 flex-shrink-0 text-white/35 uppercase tracking-[0.15em] text-[9px] pt-0.5">Range</span>
                    <span className="text-white/70">: {product.subcategory_name}</span>
                  </div>
                )}
                {specs.Code && (
                  <div className="flex gap-4 text-[11px]">
                    <span className="w-24 flex-shrink-0 text-white/35 uppercase tracking-[0.15em] text-[9px] pt-0.5">Code</span>
                    <span className="text-white/70 font-mono text-[10px]">: {specs.Code}</span>
                  </div>
                )}
                {(product.description || product.short_description) && (
                  <div className="flex gap-4 text-[11px]">
                    <span className="w-24 flex-shrink-0 text-white/35 uppercase tracking-[0.15em] text-[9px] pt-0.5">Description</span>
                    <span className="text-white/60 leading-relaxed">: {product.description || product.short_description}</span>
                  </div>
                )}
                <div className="flex gap-4 text-[11px]">
                  <span className="w-24 flex-shrink-0 text-white/35 uppercase tracking-[0.15em] text-[9px] pt-0.5">MRP</span>
                  <div>
                    <p className="text-2xl font-display font-light text-[#c5a059] tracking-tight leading-none">
                      : {priceFormatted}
                    </p>
                    <p className="text-[7px] text-white/25 uppercase tracking-[0.2em] mt-1">(Inclusive of all taxes)</p>
                  </div>
                </div>
              </div>

              <div className="h-px bg-white/10 mb-5" />

              {/* Colour / Finish swatches */}
              {finishList.length > 0 && (
                <div className="mb-5">
                  <p className="text-[9px] uppercase tracking-[0.3em] text-white/40 mb-3">
                    Finish:{" "}
                    <span className="text-white/70 normal-case tracking-normal">{selectedFinish}</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {finishList.map((finish) => (
                      <button
                        key={finish}
                        onClick={() => setSelectedFinish(finish)}
                        title={finish}
                        className={`w-9 h-9 border-2 transition-all ${
                          selectedFinish === finish
                            ? "border-[#c5a059] scale-110"
                            : "border-white/15 hover:border-white/40"
                        }`}
                        style={{ backgroundColor: FINISH_COLORS[finish] ?? "#555" }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {finishList.length > 0 && <div className="h-px bg-white/10 mb-5" />}

              {/* Qty + Add to Cart */}
              <div className="flex gap-3 mb-5">
                <div className="flex items-center border border-white/20 h-12 flex-shrink-0">
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-11 h-full flex items-center justify-center hover:bg-white/5 text-white/50 hover:text-white transition-colors" >
                    <Minus size={13} />
                  </button>
                  <input type="number" value={qty} onChange={(e) => setQty(Math.max(1, Number(e.target.value)))} className="w-10 h-full bg-transparent text-center text-sm text-white outline-none" />
                  <button onClick={() => setQty((q) => q + 1)} className="w-11 h-full flex items-center justify-center hover:bg-white/5 text-white/50 hover:text-white transition-colors" >
                    <Plus size={13} />
                  </button>
                </div>

                <button onClick={handleAdd} className={`flex-1 h-12 flex items-center justify-center gap-2 text-[9px] uppercase tracking-[0.35em] font-bold transition-all ${
                    inCart
                      ? "bg-[#c5a059] text-white"
                      : "bg-white text-black hover:bg-[#c5a059] hover:text-white"
                  }`}
                >
                  {inCart ? <Check size={13} /> : <ShoppingCart size={13} />}
                  {inCart ? "Added to Cart" : "Add to Cart"}
                </button>
              </div>

              {/* Specs table */}
              {tableSpecs.length > 0 && (
                <div className="border-t border-white/10">
                  <p className="text-[8px] uppercase tracking-[0.4em] text-white/30 py-4">Specifications</p>
                  <div>
                    {tableSpecs.map(([key, val]) => (
                      <div key={key} className="flex justify-between items-start py-3 border-b border-white/5 last:border-0 gap-4">
                        <span className="text-[8px] uppercase tracking-[0.15em] text-white/30 flex-shrink-0">{key}</span>
                        <span className="text-[9px] text-white/60 text-right">{String(val)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Disclaimer */}
              <div className="mt-5 pt-5 border-t border-white/10 space-y-2">
                <p className="text-[10px] uppercase tracking-[0.25em] text-white/40 mb-3 font-medium">Disclaimer</p>
                <p className="text-[11px] text-white/35 leading-relaxed">
                  • Colours &amp; sizes of product images shown on the website may vary in reality.
                </p>
                <p className="text-[11px] text-white/35 leading-relaxed">
                  • Prices are subject to change without notice at the time of supply.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section className="border-t border-white/5 productfileter py-20">
          <div className="flex justify-between items-end mb-10">
            <h2 className="text-xl md:text-3xl font-display font-light uppercase tracking-widest">You May Also Like</h2>
            {product.category_slug && product.subcategory_slug && (
              <Link
                href={`/explore/${product.category_slug}/${product.subcategory_slug}`}
                className="text-[8px] uppercase tracking-[0.4em] text-white/35 hover:text-white border-b border-white/10 pb-1 transition-colors"
              >
                View All
              </Link>
            )}
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p) => {
              const relSym = CURRENCY_SYMBOLS[p.currency] ?? p.currency;
              return (
                <Link
                  key={p.slug}
                  href={`/products/${p.slug}`}
                  className="group border border-white/10 hover:border-white/20 transition-colors bg-[#0e0e0e]"
                >
                  <div className="relative aspect-[4/5] bg-[#111] overflow-hidden">
                    {p.image ? (
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        sizes="(max-width:640px) 50vw,(max-width:1024px) 33vw,25vw"
                        className="object-cover transition-transform duration-1000 group-hover:scale-[1.05]"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/15">
                        <ImageOff size={32} strokeWidth={1} />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-[10px] font-display font-semibold uppercase tracking-[0.08em] group-hover:text-[#c5a059] transition-colors leading-snug mb-1">
                      {p.name}
                    </h3>
                    <p className="text-sm font-light text-[#c5a059]">
                      {relSym} {Number(p.price).toLocaleString()}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
