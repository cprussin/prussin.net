const nextConfig = {
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
