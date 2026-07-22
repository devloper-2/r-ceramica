import Image from "next/image";
import Link from "next/link";
import type { SocialPost } from "@/lib/types";

/**
 * SocialFeed — a horizontally scrolling gallery of social posts plus a row of
 * social-platform links.
 *
 * REUSABLE: pass any list of `posts`. The heading text is configurable too.
 * The platform icons below are global brand links, so they live in this file.
 */

// ─── Brand icons (global — same on every page) ───────────────────────────────


interface SocialFeedProps {
  posts: SocialPost[];
  eyebrow?: string;
  heading?: string;
}

export default function SocialFeed({
  posts,
  eyebrow = "Digital Presence",
  heading = "Follow us on Social Media",
}: SocialFeedProps) {
  return (
    <section className="py-12 md:py-32 bg-[var(--color-bg-alt)] border-t border-white/5 overflow-hidden"
      aria-label="Follow R Ceramica on Social Media"
    >
      <div className="max-w-content mx-auto px-[var(--section-px)]">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-[9px] uppercase tracking-[0.5em] text-white/30 mb-4 font-medium">
            {eyebrow}
          </span>
          <h2 className="text-xl md:text-2xl font-display font-light text-white uppercase tracking-[0.2em]">
            {heading}
          </h2>
        </div>

        {/* Feed Gallery */}
        <div
          className="flex gap-4 md:gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scroll-smooth no-scrollbar"
          role="list"
          aria-label="Social media posts"
        >
          {posts.map((post) => (
            <Link
              key={post.id}
              href="/explore"
              role="listitem"
              aria-label={post.imageAlt}
              className="min-w-[280px] md:min-w-[320px] aspect-square bg-[var(--color-bg-card)] snap-center relative group/post overflow-hidden rounded-sm border border-white/5 flex-shrink-0 block"
            >
              <Image
                src={post.imageSrc}
                alt={post.imageAlt}
                fill
                sizes="320px"
                className="object-cover opacity-60 group-hover/post:opacity-80 transition-all duration-700 group-hover/post:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover/post:bg-black/20 transition-all duration-500 flex items-center justify-center">
                <span className="text-[9px] uppercase tracking-[0.4em] text-white opacity-0 group-hover/post:opacity-100 transition-all duration-500 translate-y-2 group-hover/post:translate-y-0">
                  View Collection
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
