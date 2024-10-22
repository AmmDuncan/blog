import { Header } from '@/components';
import Image from 'next/image';
import { Featured } from './_components/Featured';

import React from 'react';
import { RecentlyAdded } from './_components/RecentlyAdded';

export default function Home() {
  return (
    <main className="">
      <Header />
      <Featured />
      <div className="container flex flex-col gap-8 pb-10 md:flex-row-reverse">
        <div className="w-4/12 md:max-w-[390px]">Categories</div>
        <div className="border-r border-r-gray-200"></div>
        <div className="md:flex-1">
          <RecentlyAdded />
        </div>
      </div>
    </main>
  );
}
