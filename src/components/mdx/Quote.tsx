export function Quote({
  children,
  author,
}: {
  children: React.ReactNode;
  author?: string;
}) {
  return (
    <figure className="post-quote">
      <blockquote>{children}</blockquote>
      {author && <figcaption>&mdash; {author}</figcaption>}
    </figure>
  );
}
