import type { MetadataRoute } from "next";
import { listicles } from "@/content/listicles";
import { reasonsPages } from "@/content/reasons";
import { siteUrl } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/privacy-policy", "/accessibility-statement", ...[...listicles, ...reasonsPages].filter((l) => l.index).map((l) => `/pages/${l.slug}`)];
  return paths.map((p) => ({ url: new URL(p, siteUrl).toString() }));
}
