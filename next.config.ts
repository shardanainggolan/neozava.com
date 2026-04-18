import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "backend.neozava.com",
      },
      {
				protocol: 'https',
				hostname: 'article.neozava.com',
				pathname: '/wp-content/uploads/**',
			},
    ],
  },
};

export default nextConfig;
