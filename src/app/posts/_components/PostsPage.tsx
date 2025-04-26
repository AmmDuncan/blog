'use client';

import Link from 'next/link';
import { BsArrowRight, BsChevronLeft, BsChevronRight } from 'react-icons/bs';

import { BlogPostList } from '@/app/_components/BlogPostList';
import { Post } from 'contentlayer/generated';
import { useState } from 'react';

export default function PostsPageComponent({
  activeCategory,
  otherCategoriesCountDict,
  posts,
}: {
  activeCategory: string | null;
  otherCategoriesCountDict: Record<string, number>;
  posts: Post[];
}) {
  // Pagination state
  const PAGE_SIZE = 8;
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(posts.length / PAGE_SIZE);
  const paginatedPosts = posts.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <main className="container mx-auto grid grid-cols-1 content-start items-start gap-x-12 gap-y-6 pb-20 md:grid-cols-3">
      <header className="col-span-full pb-8 pt-20">
        <h1 className="inline-flex items-center gap-3 font-serif text-5xl [text-wrap:balance] md:text-6xl">
          {activeCategory ? (
            <span
              className="underlined"
              style={{ '--underline-width': '50%' } as React.CSSProperties}
            >
              {activeCategory} Posts
            </span>
          ) : (
            <span>All Posts</span>
          )}
          <span className=" inline-grid place-items-center rounded-[50px] bg-grey-100/40 px-6 py-1.5 font-sans text-xl leading-[1.2] dark:bg-purple-100/20">
            {posts.length}
          </span>
        </h1>
      </header>

      <div className="col-span-2 flex flex-col">
        <BlogPostList posts={paginatedPosts} />

        {/* Pagination Controls */}
        <div className="col-span-full mt-4 flex justify-center gap-6 pb-8">
          <button
            className={`group flex items-center gap-2 rounded-full border border-transparent bg-transparent px-5 py-2 font-medium text-[var(--color-primary)] transition-colors duration-150 hover:bg-grey-100/40 hover:text-purple-600 dark:hover:bg-grey-900/40 ${page === 0 ? 'pointer-events-none opacity-40' : ''}`}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            aria-label="Show newer posts"
            type="button"
          >
            <BsChevronLeft
              size={18}
              className="transition-transform group-hover:-translate-x-1"
            />
            Newer Posts
          </button>
          <button
            className={`group flex items-center gap-2 rounded-full border border-transparent bg-transparent px-5 py-2 font-medium text-[var(--color-primary)] transition-colors duration-150 hover:bg-grey-100/40 hover:text-purple-600 dark:hover:bg-grey-900/40 ${page >= totalPages - 1 ? 'pointer-events-none opacity-40' : ''}`}
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            aria-label="Show older posts"
            type="button"
          >
            Older Posts
            <BsChevronRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        </div>
      </div>

      <div className="rounded-lg bg-grey-100/20 p-8 dark:bg-grey-200/5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b  border-[var(--color-cta-br)] pb-3">
          <h3 className="text-2xl font-semibold leading-[1.2]">
            Other Categories
          </h3>
          {!!activeCategory ? (
            <Link
              href="/posts"
              className="flex items-center gap-1 text-[var(--btn-foreground)] text-purple-300 transition-opacity hover:opacity-80"
              replace
            >
              View all <BsArrowRight size={18} />
            </Link>
          ) : (
            <span />
          )}
        </div>
        <ul className="space-y-3">
          {Object.entries(otherCategoriesCountDict).map(([tag, count]) => (
            <li key={tag}>
              <Link
                href={`?category=${encodeURIComponent(tag)}`}
                replace
                className="flex  items-start justify-between text-[var(--color-text)] transition-colors hover:text-[var(--color-primary)]"
              >
                {tag}{' '}
                <span className="ml-2 rounded-full bg-grey-200/20 px-3 py-1 text-xs text-gray-500 dark:bg-[var(--color-bg)]">
                  {count}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
