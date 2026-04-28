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
};

export default nextConfig;
