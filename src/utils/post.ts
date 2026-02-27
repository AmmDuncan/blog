export function getPostDescription(raw: string) {
  const text = raw
    .replace(/^---[\s\S]*?---/, '') // Remove frontmatter
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]*`/g, '') // Remove inline code
    .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
    .replace(/\[([^\]]*)\]\(.*?\)/g, '$1') // Keep link text
    .replace(/#{1,6}\s/g, '') // Remove heading markers
    .replace(/[*_~>{}\[\]]/g, '') // Remove markdown syntax
    .replace(/<[^>]+>/g, '') // Remove HTML tags
    .replace(/\n+/g, ' ') // Collapse newlines
    .trim();

  return text.slice(0, 150) + (text.length > 150 ? '...' : '');
}
