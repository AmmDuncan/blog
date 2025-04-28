import * as cheerio from 'cheerio';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { Text } from '@/components';
import { Expandable } from '@/components/ui/Expandable';
import { BiChevronDown } from 'react-icons/bi';
import { cn } from '@/libs';
import { useToggle } from '@uidotdev/usehooks';
import { useMemo } from 'react';
import { slugify } from '@/utils/slugify';

// Utility: Add slugified id to all headings in HTML (for completeness, but not used here)
export function addIdsToHeadings(html: string): string {
  const $ = cheerio.load(html);
  $('h1, h2, h3, h4, h5, h6').each((_, el) => {
    const text = $(el).text();
    const id = slugify(text);
    $(el).attr('id', id);
  });
  return $.html();
}

export function extractTableOfContents(htmlString: string) {
  const $ = cheerio.load(htmlString);
  const headings = $('h1, h2, h3, h4, h5, h6');
  type TocItem = {
    text: string;
    id: string;
    level: number;
    children?: TocItem[];
  };
  const toc: TocItem[] = [];
  const stack: TocItem[] = [];

  // Iterate over each heading in order
  headings.each((_, el) => {
    const text = $(el).text();
    const id = $(el).attr('id') || '';
    const tag = el.tagName.toLowerCase();
    const level = parseInt(tag.replace('h', ''), 10); // Get heading level (e.g. 2 for h2)

    // Create a TOC item for this heading
    const item: TocItem = { text, id, level, children: [] };

    // Pop stack until we find a parent with a lower heading level
    while (stack.length && stack[stack.length - 1].level >= level) {
      stack.pop();
    }

    if (stack.length === 0) {
      // If stack is empty, this is a top-level heading
      toc.push(item);
      stack.push(item);
    } else {
      // Otherwise, nest this heading as a child of the last item in the stack
      stack[stack.length - 1].children!.push(item);
      stack.push(item);
    }
  });

  // The TOC is now a nested array of headings and subheadings
  return toc;
}

// Recursive component to render nested TOC
function TocList({
  items,
}: {
  items: { text: string; id: string; children?: any[] }[];
}) {
  if (!items || items.length === 0) return null;
  return (
    <ul className="flex flex-col gap-2">
      {items.map((item) => (
        <li key={item.id} className=" hover:text-purple-300">
          <div className="group/list-item flex items-center gap-3">
            <HiArrowNarrowRight
              size={14}
              className={cn(
                ' transition-transform group-hover/list-item:translate-x-1.5'
              )}
            />
            <a href={`#${item.id}`} className="">
              <Text variant="span" weight="normal">
                {item.text}
              </Text>
            </a>
          </div>
          {item.children && item.children.length > 0 && (
            <TocList items={item.children} />
          )}
        </li>
      ))}
    </ul>
  );
}

export function TableOfContents({ htmlWithIds }: { htmlWithIds: string }) {
  const [isToggled, toggle] = useToggle(false);
  const tableOfContents = useMemo(
    () => extractTableOfContents(htmlWithIds),
    [htmlWithIds]
  );
  return (
    <div className="container mt-6 !max-w-[68ch] rounded-lg bg-grey-100/40 dark:bg-grey-100/20">
      <button
        onClick={() => toggle()}
        className="flex w-full items-center justify-between p-6"
      >
        <Text variant="h5" weight="medium">
          Table of Contents
        </Text>
        <BiChevronDown
          size={24}
          className={cn(['transition-transform', { 'rotate-180': isToggled }])}
        />
      </button>
      <Expandable expanded={isToggled}>
        <div className="rounded-b-lg border-t border-t-grey-100/20  bg-white/30 px-6 py-6 dark:bg-grey-100/10">
          <TocList items={tableOfContents} />
        </div>
      </Expandable>
    </div>
  );
}
