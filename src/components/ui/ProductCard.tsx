"use client";

import { useState } from "react";
import Image from "next/image";
import { ShoppingCart, Minus, Plus } from "lucide-react";

export interface ProductCardData {
  id: number;
  name: string;
  collection: string;
  code: string;
  /** Pre-formatted price string, e.g. "12,450" or "450 / sqft". */
  price: string;
  img: string;
  badge?: string;
}

/**
 * ProductCard — a single product tile with an in-card add-to-cart quantity
 * stepper (demo/local state, mirroring products.html). Used by the /products
 * grid.
 */
export default function ProductCard({ product }: { product: ProductCardData }) {
  const [qty, setQty] = useState(0);

  return (
    <div className="product-card group">
      <div className="relative aspect-[4/5] bg-[var(--color-bg-card)] overflow-hidden mb-8">
        <Image
          src={product.img}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 25vw"
          className="product-img object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
        />
        <div className="absolute top-6 left-6 flex flex-col gap-2">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 px-3 py-1 text-[8px] uppercase tracking-[0.2em] font-medium text-white/80">
            {product.badge ?? "New Arrival"}
          </div>
        </div>
      </div>

      <div className="space-y-6 text-center px-4">
        <div className="space-y-2">
          <p className="text-[9px] text-[var(--color-gold)] uppercase tracking-[0.4em] font-medium">
            {product.collection} Series
          </p>
          <h3 className="text-lg md:text-xl font-display font-light uppercase tracking-[0.15em] group-hover:text-white/80 transition-colors">
            {product.name}
          </h3>
          <p className="text-[10px] text-white/30 uppercase tracking-[0.2em]">{product.code}</p>
          <p className="text-sm font-sans tracking-[0.1em] text-white/80 mt-2">₹ {product.price}</p>
        </div>

        <div className="flex flex-col gap-3 pt-2">
          {qty === 0 ? (
            <button
              onClick={() => setQty(1)}
              className="w-full py-4 bg-white text-black text-[9px] uppercase tracking-[0.4em] font-bold hover:bg-neutral-200 transition-all flex items-center justify-center gap-3"
            >
              <ShoppingCart size={14} />
              Add to Cart
            </button>
          ) : (
            <div className="flex items-center justify-between bg-white text-black h-12 px-4 shadow-xl">
              <button
                onClick={() => setQty((q) => Math.max(0, q - 1))}
                className="w-10 h-full flex items-center justify-center hover:bg-neutral-100 transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus size={12} />
              </button>
              <span className="text-[10px] font-bold tracking-[0.2em]">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="w-10 h-full flex items-center justify-center hover:bg-neutral-100 transition-colors"
                aria-label="Increase quantity"
              >
                <Plus size={12} />
              </button>
            </div>
          )}
          <button className="w-full py-4 border border-white/10 text-white/60 text-[9px] uppercase tracking-[0.4em] hover:bg-white/5 hover:text-white transition-all">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
