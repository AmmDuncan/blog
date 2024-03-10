'use client';

import React from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

type Props = {
  body: string;
};

export function PostBody({ body }: Props) {
  React.useLayoutEffect(() => {
    hljs.highlightAll();
  });

  return (
    <div
      className="post-body pb-16"
      dangerouslySetInnerHTML={{ __html: body }}
    />
  );
}
