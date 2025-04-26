import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dayjs from 'dayjs';
import { getPostDescription } from '@/utils/post';

interface BlogPostListProps {
  posts: any[];
}

export const BlogPostList: React.FC<BlogPostListProps> = ({ posts }) => (
  <section className="flex flex-col gap-12 md:col-span-2">
    {posts.map((post) => (
      <article
        key={post.slug}
        className="grid grid-flow-row grid-cols-[100%] gap-6 border-b border-[var(--color-cta-br)] pb-12 lg:grid-cols-[250px_3fr] lg:grid-rows-1"
      >
        <div className="relative h-full min-h-[200px] overflow-hidden rounded-lg sm:min-h-[250px]">
          <Image
            src={post.feature_image}
            alt={post.title}
            fill
            className="h-auto w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="flex flex-col">
          <div className="mb-2 flex items-center gap-3 text-sm">
            <span className="rounded bg-grey-300 px-2 py-0.5 font-medium text-white">
              {post.tags?.[0]}
            </span>
            <span className="text-grey-700 dark:text-grey-200">
              {dayjs(post.created_at).format('YYYY-MM-DD')}
            </span>
          </div>
          <h2 className="mb-4 font-serif text-4xl leading-[1.1] md:text-5xl">
            <Link
              href={`/posts/${post.slug}`}
              className="text-[var(--btn-foreground)] transition-opacity hover:text-[var(--color-primary)]"
            >
              {post.title}
            </Link>
          </h2>
          <p className="mb-4 text-gray-500">
            {getPostDescription(post.body.html)}
          </p>
          <Link
            href={`/posts/${post.slug}`}
            className="inline-block font-medium text-[var(--btn-foreground)] transition-opacity hover:opacity-80"
          >
            Read more →
          </Link>
        </div>
      </article>
    ))}
  </section>
);
