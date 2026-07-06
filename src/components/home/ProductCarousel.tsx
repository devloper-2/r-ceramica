"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import { CAROUSEL_SLIDES } from "@/lib/constants/home";

export default function ProductCarousel() {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const goTo = useCallback((index: number) => {
    setFading(true);
    setTimeout(() => {
      setCurrent(index);
      setFading(false);
    }, 500);
  }, []);

  const next = useCallback(
    () => goTo((current + 1) % CAROUSEL_SLIDES.length),
    [current, goTo]
  );
  const prev = useCallback(
    () => goTo((current - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length),
    [current, goTo]
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.src = CAROUSEL_SLIDES[current].videoSrc;
    video.load();
    video.play().catch(() => {});
  }, [current]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onEnded = () => next();
    video.addEventListener("ended", onEnded);
    return () => video.removeEventListener("ended", onEnded);
  }, [next]);

  const slide = CAROUSEL_SLIDES[current];

  return (
    <section
      className="w-full bg-[var(--color-bg)] overflow-hidden relative group h-[90vh] py-1"
      aria-label={`Product spotlight: ${slide.title}`}
      aria-roledescription="carousel"
    >
      {/* Background Video */}
      <div
        className="absolute inset-0 transition-opacity duration-[1500ms]"
        style={{ opacity: fading ? 0 : 1 }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover opacity-60 transition-transform duration-[4000ms] group-hover:scale-110"
          aria-hidden="true"
        >
          <source src={slide.videoSrc} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col md:flex-row items-center md:items-end justify-center md:justify-between px-6 md:px-24 pb-20 md:pb-32">
          {/* Content */}
          <div
            className="text-center md:text-left mb-12 md:mb-0 animate-fade-in-up"
            aria-live="polite"
            aria-atomic="true"
          >
            <SectionLabel text="Spotlight Collection" className="mb-4 block" />
            <h3 className="text-white font-display text-4xl md:text-7xl mb-6 font-light uppercase tracking-tight">
              {slide.title}
            </h3>
            <p className="text-white/40 text-[10px] md:text-[11px] tracking-[0.4em] uppercase">
              {slide.subtitle}
            </p>
          </div>

          <button className="text-white text-[11px] tracking-[0.4em] uppercase border-b border-white/20 pb-2 hover:border-white transition-all group/btn flex items-center gap-6">
            Discover Details
            <ArrowRight
              size={14}
              className="group-hover/btn:translate-x-3 transition-transform"
            />
          </button>
        </div>
      </div>

      {/* Prev / Next */}
      <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-8 right-4 md:right-8 flex justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <button
          onClick={prev}
          className="w-10 h-10 md:w-14 md:h-14 rounded-full border border-white/10 bg-black/40 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all pointer-events-auto"
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={next}
          className="w-10 h-10 md:w-14 md:h-14 rounded-full border border-white/10 bg-black/40 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all pointer-events-auto"
          aria-label="Next slide"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Dot Indicators */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 md:gap-6"
        role="tablist"
        aria-label="Carousel navigation"
      >
        {CAROUSEL_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            role="tab"
            aria-selected={i === current}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-0.5 transition-all duration-700 ${
              i === current
                ? "w-12 md:w-20 bg-white"
                : "w-8 md:w-12 bg-white/20"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
