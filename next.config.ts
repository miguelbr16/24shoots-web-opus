import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // LAN/mobile dev: allow requests from local network IPs (see Next.js allowedDevOrigins)
  allowedDevOrigins: ["192.168.1.91", "192.168.*"],
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.instagram.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
