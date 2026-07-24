import type { MetadataRoute } from "next";
import { site, pillars } from "@/lib/config";
import { getAllPosts } from "@/lib/posts";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/creditos/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  const pillarPages: MetadataRoute.Sitemap = Object.values(pillars).map((p) => ({
    url: `${base}${p.path}/`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const postPages: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${base}/blog/${post.slug}/`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...pillarPages, ...postPages];
}
