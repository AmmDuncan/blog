import { getFilteredData } from '@/services/getData';
import PostsPageComponent from './_components/PostsPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Posts | Ammiel Yawson',
  description:
    "Read Ammiel Yawson's thoughts on web development and more. A collection of blog posts about software development.",
  keywords: ['web development', 'software development', 'blog', 'web'],
};

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
