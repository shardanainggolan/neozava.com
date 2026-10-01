import type { NextConfig } from "next";
import { API_HOSTNAME } from "./lib/config";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: API_HOSTNAME,
      },
      {
				protocol: 'https',
				hostname: 'article.neozava.com',
				pathname: '/wp-content/uploads/**',
			},
    ],
  },
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
