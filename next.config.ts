import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:30", "127.0.0.1:30"],
    }
  }
};

export default nextConfig;
