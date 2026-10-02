const nextConfig = {
  reactStrictMode: true,

  turbopack: {
    rules: {
      "*.svg": {
        as: "*.js",
        loaders: ["@svgr/webpack"],
      },
    },
  },
  typedRoutes: true,
};

export default nextConfig;
