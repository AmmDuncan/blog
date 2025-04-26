import React from 'react';
import { BlogHeader } from './_components/BlogHeader';
import { BlogPostList } from './_components/BlogPostList';
import { BlogCategories } from './_components/BlogCategories';
import { getData } from '@/services/getData';

export default function Home() {
  const { all, categoriesCountDict } = getData();
  const recentlyAdded = all.slice(0, 5);

  return (
    <main className="min-h-screen font-sans">
      <BlogHeader />
      <div className="container mx-auto grid grid-cols-1 gap-12 pb-20 md:grid-cols-3">
        <BlogPostList posts={recentlyAdded} />
        <aside className="flex flex-col gap-10">
          <BlogCategories categories={categoriesCountDict} />
        </aside>
      </div>
    </main>
  );
}
