import type { MetadataRoute } from "next";
import { getAllPosts } from "../lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://simplyciety.com";
  const now = new Date();
  const posts = getAllPosts().map((p) => ({
    url: `${base}/insights/${p.slug}`,
    lastModified: p.date ? new Date(p.date) : now,
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));
  return [
    { url: base, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/datasimplr`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${base}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/ceo`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/forum`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${base}/diagnosis`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/insights`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    ...posts,
  ];
}
