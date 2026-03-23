import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "healing-comfort-c04cbb783b.media.strapiapp.com",
      },
    ],
  },
};

export default nextConfig;