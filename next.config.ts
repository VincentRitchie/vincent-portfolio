import type { NextConfig } from "next";

const isStaticExport = process.env.STATIC_EXPORT === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: isStaticExport ? "export" : "standalone",
  ...(basePath ? { basePath } : {}),
  ...(isStaticExport ? { trailingSlash: true } : {}),
  images: { unoptimized: isStaticExport },
  typescript: { ignoreBuildErrors: true },
  reactStrictMode: false,
};

export default nextConfig;
