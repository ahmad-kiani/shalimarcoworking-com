import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Stop `next dev` from writing an AGENTS.md file into the project.
  agentRules: false,
  cacheComponents: true,
  partialPrefetching: true,
  // Old Wix URLs, so existing links and search results still land somewhere useful.
  redirects() {
    return [
      { source: "/english-privacy-policy", destination: "/privacy-policy", permanent: true },
      { source: "/about-us", destination: "/#about", permanent: true },
      { source: "/services", destination: "/#amenities", permanent: true },
      { source: "/locations", destination: "/#location", permanent: true },
      { source: "/contact-us", destination: "/#contact", permanent: true },
    ];
  },
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
