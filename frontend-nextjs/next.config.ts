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
    // accounts.google.com + gstatic serve the Google Identity Services (Sign-In) script
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://checkout.razorpay.com https://ajax.googleapis.com https://accounts.google.com https://www.gstatic.com",
    "style-src 'self' 'unsafe-inline' https://accounts.google.com",
    "img-src 'self' data: blob: https:",
    "media-src 'self' blob: https:",
    "font-src 'self' data:",
    // https: covers the production API + Razorpay; localhost:8080 is the dev API (CI4)
    "connect-src 'self' https: http://localhost:8080",

    // ✅ Google Maps iframe + Google Sign-In iframe + Razorpay checkout window
    "frame-src 'self' https://www.google.com https://maps.google.com https://www.google.com/maps https://accounts.google.com https://api.razorpay.com https://checkout.razorpay.com",

    "frame-ancestors 'none'",
  ].join("; "),
},
];

const isExport = process.env.STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  ...(isExport && { output: "export" }),
  // Emit out/explore/tiles/index.html instead of out/explore/tiles.html.
  //
  // Without this the export writes BOTH a file `explore/tiles.html` and a
  // directory `explore/tiles/` (holding the subcategory pages). Apache resolves
  // /explore/tiles to the directory, DirectorySlash redirects to
  // /explore/tiles/, there is no index.html inside, and the request 403s.
  // Giving every route its own directory + index.html removes the collision.
  trailingSlash: true,
   async rewrites() {
    return [
      {
        source: "/uploads/:path*",
        destination: "http://localhost:8080/uploads/:path*",
      },
    ];
  },
  images: isExport
    ? { unoptimized: true }
    : {
        remotePatterns: [
          { protocol: "https", hostname: "images.unsplash.com" },
          { protocol: "https", hostname: "rceramica.com" },
          { protocol: "https", hostname: "admin.rceramica.com" },
          { protocol: "https", hostname: "hindwarestg.blob.core.windows.net" },
          // Admin-uploaded media in local dev (CI4 base_url → localhost:8080).
          // NOTE: an omitted `port` matches ONLY the default port, so the CI4
          // dev port must be listed explicitly or next/image returns HTTP 400
          // ("url parameter is not allowed").
          { protocol: "http", hostname: "localhost", port: "8080" },
          { protocol: "http", hostname: "127.0.0.1", port: "8080" },
        ],
        formats: ["image/avif", "image/webp"],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920],
        // Next 16 refuses to optimize images whose host resolves to a private IP
        // (SSRF protection). The CI4 backend is localhost:8080 in local dev, so
        // allow it in development ONLY — production serves media from the public
        // admin.rceramica.com host and must keep the protection enabled.
        ...(process.env.NODE_ENV !== "production" && { dangerouslyAllowLocalIP: true }),
      },
  ...(isExport
    ? {}
    : {
        async headers() {
          return [{ source: "/(.*)", headers: securityHeaders }];
        },
      }),
  // Build with a single worker. The content API runs on shared hosting whose
  // MySQL refuses new connections once a few land at once (mysqli "Operation
  // not permitted" -> CodeIgniter 500). Three parallel workers generating 70+
  // pages reliably tripped that limit and failed the export. One worker is
  // slower but keeps the build inside the host's connection budget.
  experimental: {
    cpus: 1,
    workerThreads: false,
  },
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
