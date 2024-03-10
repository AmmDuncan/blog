import React from 'react';

import * as cheerio from 'cheerio';
import Image from 'next/image';
import dayjs from 'dayjs';

import { getData } from '@/services/getData';
import { Text } from '@/components';
import { SocialShare } from '@/app/_components/SocialShare';
import { PostBody } from '@/app/_components/PostBody';

type PageProps = {
  params: {
    slug: string;
  };
};

function getDescription(htmlString: string) {
  // Load the HTML string using cheerio
  const $ = cheerio.load(htmlString);

  // Get the text content
  return $('body').text().slice(0, 150) + '...';
}

export function generateMetadata({ params }: PageProps) {
  const { slug } = params;
  const { currentPost } = getData(slug);

  return {
    title: `${currentPost?.title} | Ammiel Yawson`,
    description: getDescription(currentPost?.body.html ?? ''),
    openGraph: {
      images: [process.env.NEXT_PUBLIC_BASE_URL + currentPost?.feature_image!],
    },
  };
}

export default function Slug({ params }: PageProps) {
  const { slug } = params;
  const { currentPost } = getData(slug);

  return (
    <main>
      <header className="text-balance bg-gradient-to-r from-purple-500 to-purple-400 text-white">
        <div className="container top-40 mx-auto flex !max-w-[68ch] flex-col gap-4 py-16 pb-[30%]">
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
        </div>
      </header>
      <section className="container -mt-[29%] !max-w-[68ch] py-8">
        <div className="relative mb-8 w-full pt-[60%]">
          <Text className="absolute -top-5 left-6 z-10 rounded-lg bg-white p-2 px-4 text-purple shadow">
            {currentPost?.primary_tag}
          </Text>

          <Image
            src={currentPost?.feature_image!}
            alt={currentPost?.title!}
            fill
            className="object-cover"
          />
        </div>
        <PostBody body={currentPost?.body.html ?? ''} />
      </section>
    </main>
  );
}
