'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { HiOutlineListBullet } from 'react-icons/hi2';
import { HiArrowNarrowRight, HiArrowNarrowUp } from 'react-icons/hi';
import { extractTableOfContents } from './TableOfContents';

export function FloatingToc({ raw }: { raw: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const toc = useMemo(() => extractTableOfContents(raw), [raw]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsOpen(false);
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  if (toc.length === 0) return null;

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-label="Table of contents"
        onClick={() => setIsOpen((v) => !v)}
        className={`fixed bottom-[calc(24px+56px+52px)] right-6 z-50 grid h-11 w-11 place-content-center rounded-full border border-transparent shadow-[0_1rem_2.4rem_rgba(0,0,0,0.1),0_1px_2px_rgba(0,0,0,0.1)_inset] transition-colors dark:border-grey-100/15 ${
          isOpen
            ? 'bg-[var(--color-primary)] text-white dark:border-transparent'
            : 'bg-[var(--color-bg)] text-[var(--color-text)]'
        }`}
      >
        <HiOutlineListBullet size={18} />
      </button>

      {isOpen && (
        <div
          ref={panelRef}
          className="fixed bottom-[calc(24px+56px+52px+52px)] right-6 z-50 flex max-h-[60vh] w-72 flex-col overflow-hidden rounded-xl border border-grey-100/30 bg-[var(--color-bg)] shadow-xl dark:border-grey-100/10"
        >
          <div className="border-b border-grey-100/20 px-4 py-3 dark:border-grey-100/10">
            <span className="text-xs font-medium uppercase tracking-wide opacity-60">
              Table of Contents
            </span>
          </div>
          <nav className="overflow-y-auto px-2 py-2">
            {toc.map((item) => (
              <TocLink
                key={item.id}
                item={item}
                onNavigate={() => setIsOpen(false)}
              />
            ))}
            <div className="mt-1 border-t border-grey-100/15 pt-1">
              <button
                type="button"
                onClick={() => {
                  window.scrollTo({ top: 0 });
                  setIsOpen(false);
                }}
                className="group/toc-link flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs opacity-50 transition-colors hover:bg-purple-100/40 hover:opacity-80 dark:hover:bg-grey-100/10"
              >
                <HiArrowNarrowUp size={12} className="shrink-0" />
                <span>Back to top</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}

function TocLink({
  item,
  depth = 0,
  onNavigate,
}: {
  item: { text: string; id: string; children?: any[] };
  depth?: number;
  onNavigate: () => void;
}) {
  return (
    <>
      <a
        href={`#${item.id}`}
        onClick={onNavigate}
        className="group/toc-link flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition-colors hover:bg-purple-100/40 hover:text-purple-500 dark:hover:bg-grey-100/10 dark:hover:text-purple-300"
      >
        <HiArrowNarrowRight
          size={12}
          className="shrink-0 opacity-30 transition-all group-hover/toc-link:translate-x-1 group-hover/toc-link:opacity-100"
        />
        <span className="line-clamp-2">{item.text}</span>
      </a>
      {item.children && item.children.length > 0 && (
        <div className="ml-4 mt-0.5 border-l border-purple-100/60 pl-2 dark:border-grey-100/10">
          {item.children.map((child: any) => (
            <TocLink
              key={child.id}
              item={child}
              depth={depth + 1}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      )}
    </>
  );
}
