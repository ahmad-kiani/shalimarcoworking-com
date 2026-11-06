import type { NextConfig } from "next";
import { chatLink, tourLink, whatsapp, whatsappLink } from "./src/content/site";

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
      // Our short WhatsApp links (site buttons, Instagram bio). Not permanent, so a change of number or message in
      // site.ts reaches people whose browser already followed them.
      { source: tourLink, destination: whatsappLink(whatsapp.tourMessage), permanent: false },
      { source: chatLink, destination: whatsappLink(), permanent: false },
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
