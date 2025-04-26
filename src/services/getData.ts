import { allPosts } from 'contentlayer/generated';
import dayjs from 'dayjs';

export function getData(slug?: string) {
  const all = allPosts.sort((a, b) => {
    if (a.created_at > b.created_at) return -1;
    if (a.created_at < b.created_at) return 1;
    return 0;
  });

  const featured = allPosts.filter((post) => post.featured);

  const currentPost = slug
    ? allPosts.find((post) => post.slug === slug)
    : undefined;

  const categories = allPosts.reduce(
    (acc, post) => {
      const tags = post.tags || [];
      tags.forEach((tag) => {
        if (!acc[tag]) {
          acc[tag] = 0;
        }
        acc[tag]++;
      });
      return acc;
    },
    {} as Record<string, number>
  );

  return { all, featured, currentPost, categories };
}
