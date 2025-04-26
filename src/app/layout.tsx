import type { Metadata } from 'next';
import { DM_Serif_Text, Inter, Crimson_Text } from 'next/font/google';
import './globals.css';

import { Navbar } from '@/components';
import { ThemeSwitch } from '@/components/common/ThemeSwitch';
import clsx from 'clsx';
import { Footer } from '@/components';
import { NuqsAdapter } from 'nuqs/adapters/next';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const dmSerif = DM_Serif_Text({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-dm-serif',
});

const crimson = Crimson_Text({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-crimson',
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
      className={clsx(
        inter.className,
        dmSerif.variable,
        inter.variable,
        crimson.variable
      )}
    >
      <body className="min-h-[120vh]">
        <NuqsAdapter>
          <div className="fixed bottom-4 right-4 z-50">
            <ThemeSwitch />
          </div>
          <Navbar />
          {children}
          <Footer />
        </NuqsAdapter>
      </body>
    </html>
  );
}
