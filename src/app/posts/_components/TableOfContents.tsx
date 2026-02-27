import { HiArrowNarrowRight } from 'react-icons/hi';
import { Text } from '@/components';
import { Expandable } from '@/components/ui/Expandable';
import { BiChevronDown } from 'react-icons/bi';
import { cn } from '@/libs';
import { useToggle } from '@uidotdev/usehooks';
import { useMemo } from 'react';
import { slugify } from '@/utils/slugify';

type TocItem = {
  text: string;
  id: string;
  level: number;
  children?: TocItem[];
};

export function extractTableOfContents(raw: string) {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const toc: TocItem[] = [];
  const stack: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(raw)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = slugify(text);
    const item: TocItem = { text, id, level, children: [] };

    while (stack.length && stack[stack.length - 1].level >= level) {
      stack.pop();
    }

    if (stack.length === 0) {
      toc.push(item);
      stack.push(item);
    } else {
      stack[stack.length - 1].children!.push(item);
      stack.push(item);
    }
  }

  return toc;
}

// Recursive component to render nested TOC
function TocList({
  items,
  nested = false,
}: {
  items: { text: string; id: string; children?: any[] }[];
  nested?: boolean;
}) {
  if (!items || items.length === 0) return null;
  return (
    <ul
      className={cn('flex flex-col gap-1.5', {
        'ml-5 mt-1.5 border-l border-purple-100/60 pl-4 dark:border-grey-100/10':
          nested,
      })}
    >
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            className="group/list-item flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-purple-100/40 hover:text-purple-500 dark:hover:bg-grey-100/10 dark:hover:text-purple-300"
          >
            <HiArrowNarrowRight
              size={12}
              className="shrink-0 opacity-30 transition-all group-hover/list-item:translate-x-1 group-hover/list-item:opacity-100"
            />
            <span>{item.text}</span>
          </a>
          {item.children && item.children.length > 0 && (
            <TocList items={item.children} nested />
          )}
        </li>
      ))}
    </ul>
  );
}

export function TableOfContents({ raw }: { raw: string }) {
  const [isToggled, toggle] = useToggle(false);
  const tableOfContents = useMemo(() => extractTableOfContents(raw), [raw]);

  if (tableOfContents.length === 0) return null;

  return (
    <div
      className="container mt-6 overflow-hidden rounded-xl border border-purple-100/80 bg-white/60 dark:border-grey-100/10 dark:bg-grey-100/5"
      style={{ maxWidth: 'var(--reading-content-width)' }}
    >
      <button
        type="button"
        onClick={() => toggle()}
        className="flex w-full items-center justify-between px-6 py-4 transition-colors hover:bg-purple-100/20 dark:hover:bg-grey-100/5"
      >
        <div className="flex items-center gap-2.5">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-purple-300 text-xs font-semibold text-white">
            {tableOfContents.length}
          </span>
          <Text variant="span" weight="medium" className="text-sm">
            Table of Contents
          </Text>
        </div>
        <BiChevronDown
          size={20}
          className={cn([
            'opacity-40 transition-transform',
            { 'rotate-180': isToggled },
          ])}
        />
      </button>
      <Expandable expanded={isToggled}>
        <div className="border-t border-purple-100/60 px-4 py-4 dark:border-grey-100/10">
          <TocList items={tableOfContents} />
        </div>
      </Expandable>
    </div>
  );
}
