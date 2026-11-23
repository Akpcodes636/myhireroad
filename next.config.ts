import type { NextConfig } from "next";

// Blog cover images uploaded in the admin are stored in Supabase Storage.
function supabaseImageHost(): string | undefined {
  try {
    return new URL(process.env.NEXT_PUBLIC_SUPABASE_URL ?? "").hostname;
  } catch {
    return undefined;
  }
}
const imageHost = supabaseImageHost();

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: imageHost
      ? [
          {
            protocol: "https",
            hostname: imageHost,
            pathname: "/storage/v1/object/public/blog-images/**",
          },
        ]
      : [],
  },
  experimental: {
    agentFeedback: true,
    agentUpgrade: "security",
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
