'use client';

import React from 'react';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { slugify } from '@/utils/slugify';
import { Quote } from '@/components/mdx/Quote';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

function createHeadingComponent(Tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6') {
  return function Heading({ children }: { children?: React.ReactNode }) {
    const text = typeof children === 'string' ? children : '';
    const id = slugify(text);
    return React.createElement(Tag, { id }, children);
  };
}

const mdxComponents = {
  h1: createHeadingComponent('h1'),
  h2: createHeadingComponent('h2'),
  h3: createHeadingComponent('h3'),
  h4: createHeadingComponent('h4'),
  h5: createHeadingComponent('h5'),
  h6: createHeadingComponent('h6'),
  Quote,
};

type Props = {
  code: string;
};

export function PostBody({ code }: Props) {
  const MDXContent = useMDXComponent(code);

  React.useLayoutEffect(() => {
    hljs.highlightAll();
  });

  return (
    <div className="post-body pb-16">
      <MDXContent components={mdxComponents} />
    </div>
  );
}
