import Button from "@/components/ui/Button";

export default function HeroSection() {
  return (
    <header
      className="relative h-screen w-full flex items-center justify-center pt-20 md:pt-24 overflow-hidden bg-[#080808]"
      aria-label="Hero — Redefining Spaces"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover object-center opacity-80 hover:scale-105 transition-transform duration-[2000ms]"
          aria-hidden="true"
        >
          <source
            src="https://hindwarestg.blob.core.windows.net/container1/products/ae5eb07a-52f8-45fa-98ea-c427f8dde36f.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-black/40 hover:bg-black/20 transition-all duration-1000" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-content w-full mx-auto px-6 md:px-16 flex flex-col items-center justify-center text-center animate-fade-in-up">
        <h1 className="text-4xl md:text-7xl font-display tracking-[0.3em] font-light text-white uppercase drop-shadow-2xl">
          Redefining Spaces
        </h1>
        <div className="mt-8 w-16 h-px bg-white/40 mx-auto mb-10" role="presentation" />
        <Button as="link" href="/tiles" variant="outline" size="md">
          Explore Collection
        </Button>
      </div>
    </header>
  );
}
