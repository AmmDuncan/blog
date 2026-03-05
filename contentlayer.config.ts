import { defineDocumentType, makeSource } from '@contentlayer/source-files';

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.{md,mdx}`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    author: { type: 'string', required: true },
    created_at: { type: 'date', required: true },
    primary_tag: { type: 'string', required: true },
    featured: { type: 'boolean' },
    feature_image: { type: 'string', required: true },
    feature_dark_mode_image: { type: 'string', required: false },
    feature_image_position: { type: 'string', required: false },
    image_attribution: { type: 'string', required: false },
    tags: { type: 'list', of: { type: 'string' }, required: true },
    level: { type: 'enum', options: ['Beginner', 'Intermediate', 'Advanced'], required: false },
  },
  computedFields: {
    // url: { type: 'string', resolve: (post) => `/change-logs/${post._raw.flattenedPath}` },
    slug: { type: 'string', resolve: (post) => post._raw.flattenedPath },
    reading_time: {
      type: 'number',
      resolve: (post) =>
        calculateReadingTimeMarkdown(post.body.raw).estimatedTime,
    },
  },
}));

function calculateReadingTimeMarkdown(markdownText: string, wpm = 225) {
  // 1. Preprocess the text
  const text = markdownText
    .trim()
    .replace(/```[\s\S]*?```/g, ' ') // Remove code blocks
    .replace(/`[^`]*`/g, ' ') // Remove inline code
    .replace(/!\[.*?\]\(.*?\)/g, ' ') // Remove images
    .replace(/\[([^\]]*)\]\(.*?\)/g, '$1') // Keep link text
    .replace(/#{1,6}\s/g, ' ') // Remove heading markers
    .replace(/[*_~>{}\[\]]/g, ' ') // Remove markdown syntax
    .replace(/<[^>]+>/g, ' ') // Remove any HTML tags
    .split(/\s+/)
    .filter(Boolean);

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
