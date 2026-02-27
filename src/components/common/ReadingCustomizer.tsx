'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  useReading,
  type FontFamily,
  type FontSize,
  type ContentWidth,
  type LineSpacing,
} from '@/context/reading';

const FONT_FAMILIES: { value: FontFamily; label: string }[] = [
  { value: 'sans', label: 'Sans' },
  { value: 'merriweather', label: 'Serif' },
  { value: 'accessible', label: 'Easy' },
  { value: 'mono', label: 'Mono' },
];

const FONT_SIZES: { value: FontSize; label: string }[] = [
  { value: 'small', label: 'S' },
  { value: 'medium', label: 'M' },
  { value: 'large', label: 'L' },
  { value: 'xlarge', label: 'XL' },
];

const CONTENT_WIDTHS: { value: ContentWidth; label: string }[] = [
  { value: 'narrow', label: 'Narrow' },
  { value: 'default', label: 'Default' },
  { value: 'wide', label: 'Wide' },
];

const LINE_SPACINGS: { value: LineSpacing; label: string }[] = [
  { value: 'compact', label: 'Compact' },
  { value: 'default', label: 'Default' },
  { value: 'relaxed', label: 'Relaxed' },
];

function OptionGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs font-medium uppercase tracking-wide opacity-60">
        {label}
      </span>
      <div className="flex overflow-hidden rounded-lg bg-grey-100/30 dark:bg-grey-100/10">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`flex-1 py-1.5 text-center text-sm transition-colors ${
              value === opt.value
                ? 'bg-[var(--color-primary)] text-white'
                : 'hover:bg-grey-100/40 dark:hover:bg-grey-100/15'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function DiscreteSlider<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  const activeIndex = options.findIndex((o) => o.value === value);
  const lastIndex = options.length - 1;
  const pct = (activeIndex / lastIndex) * 100;

  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium uppercase tracking-wide opacity-60">
        {label}
      </span>
      {/* Slider track area — dots are placed at percentage positions */}
      <div className="relative mx-2 h-8">
        {/* Track background: spans from first dot to last dot */}
        <div className="absolute left-0 right-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-grey-100/40 dark:bg-grey-100/20" />
        {/* Active fill */}
        <div
          className="absolute left-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-[var(--color-primary)] transition-all"
          style={{ width: `${pct}%` }}
        />
        {/* Dot buttons at evenly spaced percentage positions */}
        {options.map((opt, i) => {
          const isActive = i === activeIndex;
          const isFilled = i <= activeIndex;
          const pos = (i / lastIndex) * 100;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              aria-label={opt.label}
              className="group absolute top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center p-2"
              style={{ left: `${pos}%` }}
            >
              <span
                className={`block h-3 w-3 rounded-full border-2 transition-all ${
                  isActive
                    ? 'scale-[1.35] border-[var(--color-primary)] bg-[var(--color-primary)]'
                    : isFilled
                      ? 'border-[var(--color-primary)] bg-[var(--color-primary)]'
                      : 'border-grey-100/50 bg-[var(--color-bg)] group-hover:border-[var(--color-primary)] dark:border-grey-100/30'
                }`}
              />
            </button>
          );
        })}
      </div>
      {/* Labels row matching dot positions */}
      <div className="relative mx-2 h-3">
        {options.map((opt, i) => {
          const pos = (i / lastIndex) * 100;
          return (
            <span
              key={opt.value}
              className={`absolute whitespace-nowrap text-[10px] ${
                i === activeIndex ? 'font-medium opacity-70' : 'opacity-40'
              }`}
              style={{
                left: `${pos}%`,
                transform:
                  i === 0
                    ? 'none'
                    : i === lastIndex
                      ? 'translateX(-100%)'
                      : 'translateX(-50%)',
              }}
            >
              {opt.label}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export function ReadingCustomizer() {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const {
    preferences,
    setFontFamily,
    setFontSize,
    setContentWidth,
    setLineSpacing,
  } = useReading();

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

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-label="Reading preferences"
        onClick={() => setIsOpen((v) => !v)}
        className={`fixed bottom-[calc(24px+56px)] right-6 z-50 grid h-11 w-11 place-content-center rounded-full border border-transparent shadow-[0_1rem_2.4rem_rgba(0,0,0,0.1),0_1px_2px_rgba(0,0,0,0.1)_inset] transition-colors dark:border-grey-100/15 ${
          isOpen
            ? 'bg-[var(--color-primary)] text-white dark:border-transparent'
            : 'bg-[var(--color-bg)] text-[var(--color-text)]'
        }`}
      >
        <span className="text-base font-semibold leading-none">Aa</span>
      </button>

      {isOpen && (
        <div
          ref={panelRef}
          className="fixed bottom-[calc(24px+56px+52px)] right-6 z-[60] flex w-64 flex-col gap-4 rounded-xl border border-grey-100/30 bg-[var(--color-bg)] p-4 shadow-xl dark:border-grey-100/10"
        >
          <OptionGroup
            label="Font"
            options={FONT_FAMILIES}
            value={preferences.fontFamily}
            onChange={setFontFamily}
          />
          <OptionGroup
            label="Size"
            options={FONT_SIZES}
            value={preferences.fontSize}
            onChange={setFontSize}
          />
          <OptionGroup
            label="Spacing"
            options={LINE_SPACINGS}
            value={preferences.lineSpacing}
            onChange={setLineSpacing}
          />
          <OptionGroup
            label="Width"
            options={CONTENT_WIDTHS}
            value={preferences.contentWidth}
            onChange={setContentWidth}
          />
        </div>
      )}
    </>
  );
}
