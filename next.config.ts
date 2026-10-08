import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // 90 is used for the hero photo; everything else uses the default 75.
  images: { qualities: [75, 90] },
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
