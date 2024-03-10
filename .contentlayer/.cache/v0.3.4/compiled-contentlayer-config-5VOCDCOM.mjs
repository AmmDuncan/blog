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
    featured: {},
    feature_image: { type: "string", required: true },
    tags: { type: "list", of: { type: "string" }, required: true }
  },
  computedFields: {
    // url: { type: 'string', resolve: (post) => `/change-logs/${post._raw.flattenedPath}` },
    slug: { type: "string", resolve: (post) => post._raw.sourceFileName }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "posts",
  documentTypes: [Post]
});
export {
  Post,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-5VOCDCOM.mjs.map
