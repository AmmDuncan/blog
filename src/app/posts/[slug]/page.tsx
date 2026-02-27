import React from 'react';

import { getData } from '@/services/getData';
import { SinglePostComponent } from '../_components/SinglePostPage';

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function getDescription(raw: string) {
  const text = raw
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]*`/g, '')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[([^\]]*)\]\(.*?\)/g, '$1')
    .replace(/#{1,6}\s/g, '')
    .replace(/[*_~>{}\[\]]/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/\n+/g, ' ')
    .trim();
  return text.slice(0, 150) + '...';
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const { currentPost } = getData(slug);

  return {
    title: `${currentPost?.title} | Ammiel Yawson`,
    description: getDescription(currentPost?.body.raw ?? ''),
    openGraph: {
      type: 'article',
      images: [
        (process.env.NEXT_PUBLIC_BASE_URL ?? '') + currentPost?.feature_image!,
      ],
    },
    twitter: {
      card: 'summary_large_image',
      images: [
        (process.env.NEXT_PUBLIC_BASE_URL ?? '') + currentPost?.feature_image!,
      ],
    },
  };
}

export default async function Slug({ params }: PageProps) {
  const { slug } = await params;
  const { currentPost } = getData(slug);

  return <SinglePostComponent currentPost={currentPost} />;
}
