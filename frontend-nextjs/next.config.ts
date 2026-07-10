import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
  key: "Content-Security-Policy",
  value: [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://checkout.razorpay.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "media-src 'self' blob: https:",
    "font-src 'self' data:",
    // https: covers the production API + Razorpay; localhost:8080 is the dev API (CI4)
    "connect-src 'self' https: http://localhost:8080",

    // ✅ Google Maps iframe + Razorpay checkout window
    "frame-src 'self' https://www.google.com https://maps.google.com https://www.google.com/maps https://api.razorpay.com https://checkout.razorpay.com",

    "frame-ancestors 'none'",
  ].join("; "),
},
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "rceramica.com" },
      { protocol: "https", hostname: "hindwarestg.blob.core.windows.net" },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
