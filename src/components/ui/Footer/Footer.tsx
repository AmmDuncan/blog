import React from 'react';
import Link from 'next/link';
import TwitterIcon from '@/assets/svgs/twitter.svg';
import LinkedInIcon from '@/assets/svgs/linkedin.svg';
import { Logo } from '../Navbar';

const styles = {};
export const Footer = () => {
  return (
    <footer className="min-h-[280px] bg-grey-100/10 bg-gradient-to-r py-16 text-[var(--color-text)] dark:bg-grey-300/10">
      <div className="container grid grid-rows-[150px_auto] gap-8 md:grid-cols-[240px_1fr] md:grid-rows-1">
        <div className="flex items-center gap-3 border-b border-purple-100/60 md:border-b-0 md:border-r">
          <Link href="/" passHref={true}>
            <Logo />
          </Link>
          <Link href="/">Ammiel Yawson</Link>
        </div>

        <section className="grid gap-4">
          <div className="max-w-[30ch] text-balance opacity-70">
            I write about Web Development, Web Design, Dev Lifestyle
          </div>

          <div className="flex items-center gap-2">
            Get in touch:
            <div className="flex gap-2 text-grey-300 dark:text-grey-200">
              <a
                href={`https://twitter.com/ammduncan`}
                target="_blank"
                rel="noreferrer"
                aria-label="See me on Twitter"
              >
                <TwitterIcon />
              </a>
              <a
                href={`https://www.linkedin.com/in/ammiel-yawson-098902124/`}
                aria-label="See me on LinkedIn"
                target="_blank"
                rel="noreferrer"
              >
                <LinkedInIcon />
              </a>
            </div>
          </div>
        </section>
      </div>
    </footer>
  );
};
