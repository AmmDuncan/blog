'use client';

import { Post } from 'contentlayer/generated';
import * as cheerio from 'cheerio';
import { useMemo } from 'react';
import { Text } from '@/components';
import { PostBody } from '@/app/_components/PostBody';
import dayjs from 'dayjs';
import { SocialShare } from '@/app/_components/SocialShare';
import Image from 'next/image';
import { addIdsToHeadings } from './TableOfContents';

export function SinglePostComponent({ currentPost }: { currentPost?: Post }) {
  const htmlWithIds = useMemo(
    () => addIdsToHeadings(currentPost?.body.html ?? ''),
    [currentPost?.body.html]
  );

  // const tableOfContents = useMemo(
  //   () => extractTableOfContents(htmlWithIds),
  //   [htmlWithIds]
  // );
  return (
    <main>
      <header className="relative text-white">
        <div className="absolute left-0 top-0 z-[-1] h-4/5 w-full bg-purple-300 dark:bg-purple-300/80"></div>
        <div className="container top-40 mx-auto flex !max-w-[68ch] flex-col gap-4 pb-5 pt-16">
          <Text variant="h1" family="serif" weight="normal" className="top-12">
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
              src={currentPost?.feature_image!}
              alt={currentPost?.title!}
              fill
              className="object-cover"
            />
          </div>
          {/* Post Image::end */}
        </div>
      </header>

      <section className="container !max-w-[68ch] pb-8">
        <PostBody body={htmlWithIds} />
      </section>
    </main>
  );
}
