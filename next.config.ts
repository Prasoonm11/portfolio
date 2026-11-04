import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  experimental: {
    // Prevent Turbopack from running away with system RAM
    turbopackMemoryLimit: 1024 * 1024 * 1024, // 1 GB cap
  },
};

export default nextConfig;

