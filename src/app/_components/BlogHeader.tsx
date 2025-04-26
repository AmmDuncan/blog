import React from 'react';

export const BlogHeader: React.FC = () => (
  <header className="container mx-auto py-20 text-center">
    <h1 className="mb-4 font-serif text-4xl text-[var(--color-text)] md:text-5xl">
      Hi there,
    </h1>
    <p className="mx-auto max-w-md font-sans text-xl text-[var(--color-text)]">
      Welcome to my space. An open look into insights from my journey.
    </p>
  </header>
);
