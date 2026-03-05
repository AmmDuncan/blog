// contentlayer.config.ts
import { defineDocumentType, makeSource } from "@contentlayer/source-files";
var Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.{md,mdx}`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    author: { type: "string", required: true },
    created_at: { type: "date", required: true },
    primary_tag: { type: "string", required: true },
    featured: { type: "boolean" },
    feature_image: { type: "string", required: true },
    feature_dark_mode_image: { type: "string", required: false },
    feature_image_position: { type: "string", required: false },
    image_attribution: { type: "string", required: false },
    tags: { type: "list", of: { type: "string" }, required: true },
    level: { type: "enum", options: ["Beginner", "Intermediate", "Advanced"], required: false }
  },
  computedFields: {
    // url: { type: 'string', resolve: (post) => `/change-logs/${post._raw.flattenedPath}` },
    slug: { type: "string", resolve: (post) => post._raw.flattenedPath },
    reading_time: {
      type: "number",
      resolve: (post) => calculateReadingTimeMarkdown(post.body.raw).estimatedTime
    }
  }
}));
function calculateReadingTimeMarkdown(markdownText, wpm = 225) {
  const text = markdownText.trim().replace(/```[\s\S]*?```/g, " ").replace(/`[^`]*`/g, " ").replace(/!\[.*?\]\(.*?\)/g, " ").replace(/\[([^\]]*)\]\(.*?\)/g, "$1").replace(/#{1,6}\s/g, " ").replace(/[*_~>{}\[\]]/g, " ").replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean);
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
//# sourceMappingURL=compiled-contentlayer-config-EU6UMFXX.mjs.map
