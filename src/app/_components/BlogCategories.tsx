import React from 'react';
import Link from 'next/link';

interface BlogCategoriesProps {
  categories: Record<string, number>;
}

export const BlogCategories: React.FC<BlogCategoriesProps> = ({
  categories,
}) => (
  <div className="sticky top-24 rounded-lg bg-grey-100/20 p-8 dark:bg-grey-200/5">
    <h3 className="mb-4 border-b border-[var(--color-cta-br)] pb-3 text-2xl font-semibold">
      Categories
    </h3>
    <ul className="space-y-3">
      {Object.entries(categories).map(([tag, count]) => (
        <li key={tag}>
          <Link
            href={`/posts/?category=${encodeURIComponent(tag)}`}
            className="flex  items-start justify-between text-[var(--color-text)] transition-colors hover:text-[var(--color-primary)]"
          >
            {tag}{' '}
            <span className="ml-2 rounded-full bg-grey-200/20 px-3 py-1 text-xs text-gray-500 dark:bg-[var(--color-bg)]">
              {count}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);
