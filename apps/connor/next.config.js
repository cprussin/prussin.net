const nextConfig = {
  reactStrictMode: true,

  experimental: {
    appDir: true,
    typedRoutes: true,
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

export default nextConfig;
