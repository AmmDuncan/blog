import { cn } from '@/libs';
import Logo from '@/assets/svgs/logo.svg';
import { Text } from '..';
import Link from 'next/link';

export function Navbar() {
  return (
    <div className="sticky top-0 z-10 flex h-16 items-center border-b border-b-purple-300/70 bg-purple-400 px-8 text-white shadow-[0_1rem_3.2rem_rgba(36,36,53,.05)]">
      <Link href="/" className="flex items-center gap-2">
        <Logo />
        <Text>Ammiel Yawson</Text>
      </Link>
    </div>
  );
}
