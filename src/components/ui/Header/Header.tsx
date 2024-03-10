import { Text } from '..';
import HeaderIllustration from '@/assets/svgs/header-illustration.svg';

export function Header() {
  return (
    <div className="bg-gradient-to-r from-purple-500 to-purple-400 text-white">
      <div className="container flex">
        <div className="py-12">
          <Text variant="h2" family="serif">
            Hello there,
          </Text>
          <Text
            className="max-w-[30ch] text-balance text-purple-100/80"
            weight="light"
          >
            Welcome to my space. An open look into insights from my journey.
          </Text>
        </div>

        <HeaderIllustration />
      </div>
    </div>
  );
}
