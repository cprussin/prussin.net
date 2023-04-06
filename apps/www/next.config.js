const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    typedRoutes: true,
  },
  rewrites: () => [{
    source: "/.well-known/matrix/server",
    destination: "/matrix-server.json"
  }]
};

export default nextConfig;
