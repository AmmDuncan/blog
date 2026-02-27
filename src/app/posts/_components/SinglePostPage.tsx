'use client';

import { Post } from 'contentlayer/generated';
import { Text } from '@/components';
import { PostBody } from '@/app/_components/PostBody';
import dayjs from 'dayjs';
import { SocialShare } from '@/app/_components/SocialShare';
import Image from 'next/image';

import { DiscussionEmbed } from 'disqus-react';
import { useTheme } from '@/context/theme';
import { usePostImage } from '@/hooks/usePostImage';
import { TableOfContents } from './TableOfContents';
import { FloatingToc } from './FloatingToc';
import { ReadingCustomizer } from '@/components/common/ReadingCustomizer';

export function SinglePostComponent({ currentPost }: { currentPost?: Post }) {
  const { theme } = useTheme();
  const { featureImage } = usePostImage(currentPost);

  return (
    <main>
      <header className="relative text-white">
        <div className="absolute left-0 top-0 z-[-1] h-4/5 w-full bg-purple-300 dark:bg-purple-300/80"></div>
        <div
          className="container top-40 mx-auto flex flex-col gap-4 pb-5 pt-16"
          style={{ maxWidth: 'var(--reading-content-width)' }}
        >
          <Text
            variant="h1"
            asVariant
            family="serif"
            weight="normal"
            className="top-12"
          >
            {currentPost?.title}
          </Text>

          <div className="flex flex-wrap items-center justify-between opacity-70">
            {/* Author */}
            <div className={'w-full md:w-auto'}>By {currentPost?.author}</div>
            {/* Author::end */}

            {/* Date and time */}
            <div className="flex h-8 items-center gap-2 text-center">
              <span className={''}>
                {dayjs(currentPost?.created_at).format('DD MMMM YYYY')}
              </span>
              <span className={'-mt-[28px] h-6 text-5xl leading-none'}>
                &middot;
              </span>
              <span className="time">
                {currentPost?.reading_time} min
                {currentPost?.reading_time! > 1 ? 's' : null} read
              </span>
            </div>
            {/* Date and time::end  */}

            {/*  Social share */}
            <SocialShare />
            {/*  Social share::end  */}
          </div>

          {/* Post Image */}
          <div className="relative mt-4 w-full pt-[60%]">
            <Text className="absolute -top-5 left-6 z-10 rounded-lg bg-white p-1 px-4 text-sm text-purple shadow">
              {currentPost?.primary_tag}
            </Text>

            <Image
              src={featureImage!}
              alt={currentPost?.title!}
              fill
              className="object-cover"
            />
          </div>
          {currentPost?.image_attribution && (
            <p className="mt-2 text-right text-xs opacity-50">
              {currentPost.image_attribution}
            </p>
          )}
          {/* Post Image::end */}
        </div>
      </header>

      <TableOfContents raw={currentPost?.body.raw ?? ''} />
      <FloatingToc raw={currentPost?.body.raw ?? ''} />
      <ReadingCustomizer />

      <section
        className="container pb-8"
        style={{ maxWidth: 'var(--reading-content-width)' }}
      >
        <PostBody code={currentPost?.body.code ?? ''} />
      </section>

      <section
        className="container pb-8"
        style={{ maxWidth: 'var(--reading-content-width)' }}
      >
        <DiscussionEmbed
          key={theme}
          shortname="ammiels-blog"
          config={{
            url: `https://blog.ammielyawson.com/posts/${currentPost?.slug}`,
            identifier: currentPost?.slug,
            title: currentPost?.title,
          }}
        />
      </section>
    </main>
  );
}
