const nextConfig = {
  // Matrix servers re-fetch this whenever their cache expires, and a failed
  // fetch falls back to prussin.net:8448 (Vercel, not the homeserver), so let
  // them cache it for a day.
  headers: () => [
    {
      headers: [{ key: "Cache-Control", value: "public, max-age=86400" }],
      source: "/.well-known/matrix/:path*",
    },
  ],
  reactStrictMode: true,
  rewrites: () => [
    {
      destination: "/matrix-server.json",
      source: "/.well-known/matrix/server",
    },
  ],
  typedRoutes: true,
};

export default nextConfig;
