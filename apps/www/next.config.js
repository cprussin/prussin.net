const nextConfig = {
  // Matrix servers fetch this from the apex, and a failed fetch falls back to
  // prussin.net:8448 (not the homeserver), so it must not redirect and should
  // be cached instead of re-fetched every few minutes.
  headers: () => [
    {
      headers: [{ key: "Cache-Control", value: "public, max-age=86400" }],
      source: "/.well-known/matrix/:path*",
    },
  ],
  reactStrictMode: true,
  // Replaces the Vercel domain-level apex redirect, which can't exempt paths.
  redirects: () => [
    {
      destination: "https://www.prussin.net/:path*",
      has: [{ type: "host", value: "prussin.net" }],
      permanent: true,
      source: "/:path((?!\\.well-known/).*)",
    },
  ],
  rewrites: () => [
    {
      destination: "/matrix-server.json",
      source: "/.well-known/matrix/server",
    },
  ],
  typedRoutes: true,
};

export default nextConfig;
