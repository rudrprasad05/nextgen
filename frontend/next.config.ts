import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "bucket.procyonfiji.com", // your own domain
      "mctechfiji.s3.us-east-1.amazonaws.com",
    ],
  },
  output: "standalone",
  reactStrictMode: false,
};

export default nextConfig;
