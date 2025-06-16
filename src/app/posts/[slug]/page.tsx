import React, { useMemo } from 'react';

import * as cheerio from 'cheerio';

import { getData } from '@/services/getData';
import { SinglePostComponent } from '../_components/SinglePostPage';

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function getDescription(htmlString: string) {
  // Load the HTML string using cheerio
  const $ = cheerio.load(htmlString);

  // Get the text content
  return $('body').text().slice(0, 150) + '...';
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const { currentPost } = getData(slug);

  return {
    title: `${currentPost?.title} | Ammiel Yawson`,
    description: getDescription(currentPost?.body.html ?? ''),
    openGraph: {
      images: [
        process.env.NEXT_PUBLIC_BASE_URL ?? '' + currentPost?.feature_image!,
      ],
    },
  };
}

export default async function Slug({ params }: PageProps) {
  const { slug } = await params;
  const { currentPost } = getData(slug);

  return <SinglePostComponent currentPost={currentPost} />;
}
