const nextConfig = {
  reactStrictMode: true,
  rewrites: () => [
    {
      source: "/.well-known/matrix/server",
      destination: "/matrix-server.json",
    },
  ],
};

export default nextConfig;
