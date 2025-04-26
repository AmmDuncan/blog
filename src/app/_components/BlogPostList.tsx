import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dayjs from 'dayjs';
import { getPostDescription } from '@/utils/post';
import { BlogPostItem } from './BlogPostItem';

interface BlogPostListProps {
  posts: any[];
}

export const BlogPostList: React.FC<BlogPostListProps> = ({ posts }) => (
  <section className="flex flex-col gap-12 md:col-span-2">
    {posts.map((post) => (
      <BlogPostItem key={post.slug} post={post} />
    ))}
  </section>
);
