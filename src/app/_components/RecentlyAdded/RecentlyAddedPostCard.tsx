import { Text } from '@/components';
import { Post } from 'contentlayer/generated';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';

export function RecentlyAddedPostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/posts/${post.slug}`}
      className="group grid cursor-pointer grid-rows-[repeat(2,max-content)] gap-2 p-1 transition-all duration-300 md:grid-cols-[130px_auto] md:grid-rows-1 md:hover:scale-[1.02] md:hover:bg-white md:hover:shadow-lg lg:grid-cols-[160px_auto]"
    >
      <div className="relative w-full pt-[40%] md:h-[172px] md:pt-0">
        <Image
          src={post.feature_image}
          alt={post.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-2 md:py-3 md:pl-2 lg:pr-5">
        <div className="flex items-center gap-2 text-xs">
          <span className="flex h-6 items-center rounded-md bg-gray-600 px-2 text-white">
            {post.primary_tag}
          </span>
          <span>{dayjs(post.created_at).format('DD MMMM, YYYY')}</span>
        </div>

        <Text
          variant="h5"
          weight="semibold"
          className="line-clamp-1 text-gray-900 group-hover:underline"
        >
          {post.title}
        </Text>

        <Text variant="p" className="line-clamp-3">
          {getFirstParagraph(post.body.html)}
        </Text>
      </div>
    </Link>
  );
}

function getFirstParagraph(body: string) {
  const match = body.match(/<p>(.*?)<\/p>/);
  return match ? match[1].replace(/<[^>]*>/g, '') : '';
}
