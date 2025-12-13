const nextConfig = {
  reactStrictMode: true,
  typedRoutes: true,
  rewrites: () => [
    {
      source: "/.well-known/matrix/server",
      destination: "/matrix-server.json",
    },
  ],
};

export default nextConfig;
