'use client';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Text } from '@/components';
import { getData } from '@/services/getData';
import { cn } from '@/libs';

import { Post } from 'contentlayer/generated';

dayjs.extend(relativeTime);

export function Featured() {
  const router = useRouter();

  const { featured } = getData();
  const [top, ...rest] = featured.slice(0, 4);

  return (
    <section className="mb-8 py-4">
      <div className="container">
        <header className="mb-6 border-b border-b-gray-200 py-2">
          <Text variant="h2" as="h2" family="serif" className="">
            Featured
          </Text>
        </header>

        <div className="isolate grid grid-rows-[25rem_1fr] gap-8 gap-y-14 md:grid-cols-12 lg:grid-rows-1">
          {/* Screen */}
          <div
            className="group relative cursor-pointer md:col-span-6 lg:col-span-7"
            onClick={() => router.push(`/posts/${top.slug}`)}
          >
            <div className="relative h-[min(100vw,85%)] w-full transition-transform duration-300 group-hover:scale-[0.99] md:h-[min(75vw,85%)]">
              <Image
                src={top.feature_image}
                layout="fill"
                className="object-cover"
                alt={top.title}
              />
            </div>
            <div className="absolute bottom-0 left-1/2 z-10 mx-auto -mt-[10%] w-10/12 -translate-x-1/2 rounded-lg bg-white p-8 shadow-xl transition-all duration-300 group-hover:scale-[1.02] group-hover:bg-gradient-to-b group-hover:ring-2 group-hover:ring-purple">
              <Text className="absolute -top-5 rounded-lg bg-purple p-2 px-4 text-white">
                {top.primary_tag}
              </Text>
              <Text
                family={'serif'}
                variant="h3"
                className="mb-1 text-grey-400"
                weight="bold"
              >
                {top.title}
              </Text>
              <Text className="text-grey-300/50">
                {dayjs(top.created_at).fromNow()}
              </Text>
            </div>
          </div>
          {/* Screen::end */}

          <div className="grid items-start gap-6 md:col-span-6 md:gap-5 lg:col-span-5">
            {rest.map((post, i) => (
              <FlatCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FlatCard({ post, active }: { post: Post; active?: boolean }) {
  return (
    <Link href={`/posts/${post.slug}`}>
      <article
        className={cn(
          'z-10 flex h-full items-stretch rounded p-1 transition-all duration-300 hover:scale-[1.02] hover:bg-white hover:shadow-xl hover:ring-2 hover:ring-purple',
          {
            ['bg-white shadow-xl ring-2 ring-purple']: active,
          }
        )}
      >
        <div className="relative block min-h-[100px] w-24 min-w-[100px] overflow-hidden rounded-sm lg:h-32 lg:w-32 lg:min-w-[128px]">
          <Image
            className="object-cover"
            fill
            alt=""
            src={post.feature_image}
          />
        </div>

        <div className={'flex flex-col gap-2 p-5'}>
          <Text className="line-clamp-2">{post.title}</Text>
          <Text variant="span" className="text-grey-400/50">
            {dayjs(post.created_at).fromNow()}
          </Text>
        </div>
      </article>
    </Link>
  );
}
