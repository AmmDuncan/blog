import { defineDocumentType, makeSource } from '@contentlayer/source-files';

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.{md,mdx}`,
  fields: {
    title: { type: 'string', required: true },
    author: { type: 'string', required: true },
    created_at: { type: 'date', required: true },
    primary_tag: { type: 'string', required: true },
    featured: { type: 'boolean' },
    feature_image: { type: 'string', required: true },
    tags: { type: 'list', of: { type: 'string' }, required: true },
  },
  computedFields: {
    // url: { type: 'string', resolve: (post) => `/change-logs/${post._raw.flattenedPath}` },
    slug: { type: 'string', resolve: (post) => post._raw.flattenedPath },
    reading_time: {
      type: 'number',
      resolve: (post) =>
        calculateReadingTimeMarkdown(post.body.html).estimatedTime,
    },
  },
}));

function calculateReadingTimeMarkdown(markdownText: string, wpm = 225) {
  // 1. Preprocess the text (similar to JavaScript example)
  const text = markdownText
    .trim()
    .replace(/<[^>]+>/g, ' ') // Remove markdown formatting
    .split(/\s+/);

  // 2. Count words
  const wordCount = text.length;

  // 3. Calculate estimated time
  const estimatedTime = Math.ceil(wordCount / wpm);

  return { wordCount, estimatedTime };
}

export default makeSource({
  contentDirPath: 'posts',
  documentTypes: [Post],
});
