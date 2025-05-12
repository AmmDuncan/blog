import { allPosts } from 'contentlayer/generated';
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // Base URL from environment variable
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || 'https://blog.ammielyawson.com';

  // Get all blog posts
  const posts = allPosts.map((post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: new Date(post.created_at),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  // Add static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/posts`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
  ];

  return [...staticPages, ...posts];
}
