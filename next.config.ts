import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000"],
    },
  },
  async rewrites() {
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "");
    return backendUrl
      ? [{ source: "/api/:path*", destination: `${backendUrl}/:path*` }]
      : [];
  },
};

export default nextConfig;
