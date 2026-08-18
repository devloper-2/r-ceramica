import Image from "next/image";
import Link from "next/link";
import type { SocialPost } from "@/lib/types";

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
    <section
      className="social-feed-section"
      aria-label="Follow R Ceramica on Social Media"
    >
      {/* Decorative background */}
      <div className="social-feed-noise" />
      <div className="social-feed-glow social-feed-glow-left" />
      <div className="social-feed-glow social-feed-glow-right" />

      <div className="social-feed-container">
        {/* ───────────────── HEADER ───────────────── */}
        <div className="social-feed-header">
          <div className="social-feed-eyebrow">
            <span className="social-feed-eyebrow-line" />
            <span>{eyebrow}</span>
            <span className="social-feed-eyebrow-line" />
          </div>

          <h2 className="social-feed-title">
            <span className="social-feed-title-word">Follow us</span>
            <span className="social-feed-title-word social-feed-title-muted">
              on Social Media
            </span>
          </h2>

          <p className="social-feed-description">
            A glimpse into our world of refined spaces, timeless surfaces and
            modern living.
          </p>
        </div>

        {/* ───────────────── GALLERY ───────────────── */}
        <div className="social-feed-gallery-wrapper">
          {/* Left fade */}
          <div
            className="social-feed-edge social-feed-edge-left"
            aria-hidden="true"
          />

          {/* Right fade */}
          <div
            className="social-feed-edge social-feed-edge-right"
            aria-hidden="true"
          />

          <div
            className="social-feed-gallery"
            role="list"
            aria-label="Social media posts"
          >
            {posts.map((post, index) => {
              const isVideo = /\.(mp4|webm|mov)(\?.*)?$/i.test(post.imageSrc);

              return (
                <Link
                  key={post.id}
                  href="/explore"
                  role="listitem"
                  aria-label={post.imageAlt}
                  className={`social-card social-card-${index % 5}`}
                >
                  <div className="social-card-media">
                    {isVideo ? (
                      <video
                        src={post.imageSrc}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="social-card-image"
                      />
                    ) : (
                      <Image
                        src={post.imageSrc}
                        alt={post.imageAlt}
                        fill
                        sizes="(max-width: 640px) 76vw, 320px"
                        className="social-card-image"
                      />
                    )}

                    <div className="social-card-overlay" />

                    <div className="social-card-number">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="social-card-icon">
                      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path
                          d="M7 17L17 7"
                          stroke="currentColor"
                          strokeWidth="1.3"
                        />
                        <path
                          d="M8 7H17V16"
                          stroke="currentColor"
                          strokeWidth="1.3"
                        />
                      </svg>
                    </div>

                    <div className="social-card-content">
                      <span className="social-card-label">R Ceramica</span>

                      <span className="social-card-action">
                        Explore Collection
                      </span>
                    </div>

                    <div className="social-card-line" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* ───────────────── BOTTOM ───────────────── */}
        <div className="social-feed-bottom">
          <div className="social-feed-scroll">
            <span className="social-feed-scroll-dot" />
            <span>Scroll to explore</span>
          </div>

          <div className="social-feed-platforms">
            <span>Instagram</span>
            <span className="social-feed-divider" />
            <span>Pinterest</span>
            <span className="social-feed-divider" />
            <span>Facebook</span>
          </div>

          <div className="social-feed-progress">
            <span />
          </div>
        </div>
      </div>
    </section>
  );
}
