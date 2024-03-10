import type { Metadata } from 'next';
import { DM_Serif_Text, Inter } from 'next/font/google';
import './globals.css';

import { Navbar } from '@/components';
import clsx from 'clsx';
import { Footer } from '@/components';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const dmSerif = DM_Serif_Text({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-dm-serif',
});

export const metadata: Metadata = {
  title: "Insights from a web developer's journey | Ammiel Yawson",
  description:
    'Welcome to my space. An open look into insights from my journey.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={clsx(inter.className, dmSerif.variable, inter.variable)}
    >
      <body className="min-h-[120vh]">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
