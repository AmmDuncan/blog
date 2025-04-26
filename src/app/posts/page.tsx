import { getFilteredData } from '@/services/getData';
import { Post } from 'contentlayer/generated';
import PostsPageComponent from './_components/PostsPage';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ category: string }>;
}) {
  const { category } = await searchParams;
  const { filteredPosts, otherCategoriesCountDict } = getFilteredData({
    tag: category,
  });

  return (
    <PostsPageComponent
      activeCategory={category}
      otherCategoriesCountDict={otherCategoriesCountDict}
      posts={filteredPosts}
    />
  );
}
