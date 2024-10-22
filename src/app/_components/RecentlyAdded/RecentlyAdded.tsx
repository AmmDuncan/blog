import { Text } from '@/components';
import { getData } from '@/services/getData';
import { RecentlyAddedPostCard } from './RecentlyAddedPostCard';

export const RecentlyAdded = () => {
  const { all } = getData();
  const recentlyAdded = all.slice(0, 10);

  return (
    <div className="">
      <header className="mb-6 border-b border-b-gray-200 py-2">
        <Text variant="h2" as="h2" family="serif" className="">
          Recently Added
        </Text>
      </header>
      <div className="flex flex-col gap-5 gap-y-10 md:gap-y-5">
        {recentlyAdded.map((post) => (
          <RecentlyAddedPostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
};
