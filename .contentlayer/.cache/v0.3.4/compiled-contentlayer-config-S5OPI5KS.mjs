// contentlayer.config.ts
import { defineDocumentType, makeSource } from "@contentlayer/source-files";
var Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.{md,mdx}`,
  fields: {
    title: { type: "string", required: true },
    author: { type: "string", required: true },
    created_at: { type: "date", required: true },
    primary_tag: { type: "string", required: true },
    featured: { type: "boolean" },
    feature_image: { type: "string", required: true },
    tags: { type: "list", of: { type: "string" }, required: true }
  },
  computedFields: {
    // url: { type: 'string', resolve: (post) => `/change-logs/${post._raw.flattenedPath}` },
    slug: { type: "string", resolve: (post) => post._raw.flattenedPath },
    reading_time: {
      type: "number",
      resolve: (post) => calculateReadingTimeMarkdown(post.body.html).estimatedTime
    }
  }
}));
function calculateReadingTimeMarkdown(markdownText, wpm = 225) {
  const text = markdownText.trim().replace(/<[^>]+>/g, " ").split(/\s+/);
  const wordCount = text.length;
  const estimatedTime = Math.ceil(wordCount / wpm);
  return { wordCount, estimatedTime };
}
var contentlayer_config_default = makeSource({
  contentDirPath: "posts",
  documentTypes: [Post]
});
export {
  Post,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-S5OPI5KS.mjs.map
