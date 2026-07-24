import type { MetadataRoute } from "next";
import { site } from "@/lib/config";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const base = site.url.replace(/\/$/, "");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/hero-lab/"],
    },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
