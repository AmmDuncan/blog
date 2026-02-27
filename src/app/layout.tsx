import type { Metadata } from 'next';
import {
  Atkinson_Hyperlegible,
  DM_Serif_Text,
  Inter,
  Crimson_Text,
  Merriweather,
  Pacifico,
} from 'next/font/google';
import './globals.css';

import { Navbar } from '@/components';
import { ThemeSwitch } from '@/components/common/ThemeSwitch';

import { ReadingProvider } from '@/context/reading';
import clsx from 'clsx';
import { Footer } from '@/components';
import { NuqsAdapter } from 'nuqs/adapters/next';
import { Theme, ThemeProvider } from '@/context/theme';
import { cookies } from 'next/headers';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
// const dmSerif = DM_Serif_Text({
//   subsets: ['latin'],
//   weight: ['400'],
//   variable: '--font-dm-serif',
// });

const crimson = Crimson_Text({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-crimson',
});

const atkinson = Atkinson_Hyperlegible({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-atkinson',
});

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-merriweather',
});

const pacifico = Pacifico({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-pacifico',
});

export const metadata: Metadata = {
  title: "Insights from a web developer's journey | Ammiel Yawson",
  description:
    'Welcome to my space. An open look into insights from my journey.',
  openGraph: {
    images: [process.env.NEXT_PUBLIC_BASE_URL + '/assets/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    images: [process.env.NEXT_PUBLIC_BASE_URL + '/assets/og-image.png'],
  },
  verification: {
    google: 'zLFDDp--tT-JPAWvEmeuj09tnYMwXA-DneHE48flTuA',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = (await cookies()).get('theme')?.value as Theme;

  return (
    <html
      lang="en"
      className={clsx(
        inter.className,
        inter.variable,
        crimson.variable,
        atkinson.variable,
        merriweather.variable,
        pacifico.variable,
        theme === 'dark' ? 'dark' : ''
      )}
    >
      <body className="min-h-[120vh]">
        <NuqsAdapter>
          <ThemeProvider>
            <ReadingProvider>
              <ThemeSwitch />
              <Navbar />
              {children}
              <Footer />
            </ReadingProvider>
          </ThemeProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
