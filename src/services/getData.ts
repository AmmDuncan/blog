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

  return { all, featured, currentPost };
}
