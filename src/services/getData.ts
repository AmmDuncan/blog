import { allPosts, Post } from 'contentlayer/generated';
import dayjs from 'dayjs';

function extractUniqueCategories(posts: Post[]) {
  return Array.from(new Set(posts.flatMap((post) => post.tags || [])));
}

function getCategoriesCount(posts: Post[], categories?: string[]) {
  if (categories) {
    return categories.reduce(
      (acc, tag) => {
        acc[tag] = posts.filter((post) => post.tags?.includes(tag)).length;
        return acc;
      },
      {} as Record<string, number>
    );
  }
  return posts.reduce<Record<string, number>>((acc, post) => {
    (post.tags || []).forEach((tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {});
}

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

  const categories = extractUniqueCategories(allPosts);

  const categoriesCountDict = getCategoriesCount(allPosts, categories);

  return { all, featured, currentPost, categories, categoriesCountDict };
}

export function getFilteredData({ tag }: { tag: string | null }) {
  const all = allPosts.sort((a, b) => {
    if (a.created_at > b.created_at) return -1;
    if (a.created_at < b.created_at) return 1;
    return 0;
  });

  const filteredPosts = tag
    ? all.filter((post) => post.tags?.includes(tag))
    : all;

  const categories = extractUniqueCategories(all);
  const otherCategories = categories.filter((c) => c !== tag);
  const categoriesCountDict = getCategoriesCount(all, otherCategories);

  return {
    filteredPosts,
    otherCategories,
    otherCategoriesCountDict: categoriesCountDict,
  };
}
