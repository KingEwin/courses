import type { NextConfig } from "next";

const nextConfig = {
    images: {
        remotePatterns: [{ hostname: "**" }],
    },
};

export default nextConfig;
