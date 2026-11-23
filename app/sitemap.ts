import type { MetadataRoute } from "next";
import { getPublishedPosts, siteUrl } from "@/lib/blog";

const baseUrl = siteUrl;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Posts appear here once they are live (drafts and scheduled posts are left out).
  const posts = await getPublishedPosts();

  return [
    {
      url: baseUrl,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: posts[0]?.updatedAt,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: `${baseUrl}/terms`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
