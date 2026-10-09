import type { NextConfig } from "next";

// Fully static site (out/): it can be hosted anywhere, no server needed.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
