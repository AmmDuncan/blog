import type { Metadata } from 'next';
import { DM_Serif_Text, Inter, Crimson_Text, Pacifico } from 'next/font/google';
import './globals.css';

import { Navbar } from '@/components';
import { ThemeSwitch } from '@/components/common/ThemeSwitch';
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
        pacifico.variable,
        theme === 'dark' ? 'dark' : ''
      )}
    >
      <body className="min-h-[120vh]">
        <NuqsAdapter>
          <ThemeProvider>
            <div className="fixed bottom-4 right-4 z-50">
              <ThemeSwitch />
            </div>
            <Navbar />
            {children}
            <Footer />
          </ThemeProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
