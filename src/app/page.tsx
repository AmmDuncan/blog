import { Header } from '@/components';
import Image from 'next/image';
import { Featured } from './_components/Featured';

import React from 'react';

export default function Home() {
  return (
    <main className="">
      <Header />
      <Featured />
    </main>
  );
}
