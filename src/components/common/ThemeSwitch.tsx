'use client';

import React, { useMemo } from 'react';
import { BsFillMoonStarsFill, BsSunFill } from 'react-icons/bs';
import { useTheme } from '@/context/theme';

export const ThemeSwitch: React.FC = () => {
  const { theme, toggleMode } = useTheme();

  const isNight = useMemo(() => theme === 'dark', [theme]);
  const isLight = useMemo(() => theme === 'light', [theme]);

  return (
    <button
      onClick={() => toggleMode(theme === 'light' ? 'dark' : 'light')}
      type="button"
      aria-label="Toggle theme"
      className={`fixed bottom-6 right-6 z-50 grid h-11 w-20 select-none items-center rounded-full border-none p-1.5 shadow-[0_1rem_2.4rem_rgba(0,0,0,0.1),0_1px_2px_rgba(0,0,0,0.1)_inset] outline-none transition-colors duration-300  ${isNight ? 'bg-[var(--switch-on-bg)]' : 'bg-[var(--switch-bg)]'}`}
    >
      <span
        className={`duration-250 grid h-8 w-8 place-content-center rounded-full bg-[var(--color-bg)] text-[var(--switch-fg)] transition-transform ${isNight ? 'translate-x-9 text-[var(--color-primary)]' : ''}`}
        style={{ transition: 'transform 250ms ease' }}
      >
        {isLight ? <BsSunFill size={18} /> : <BsFillMoonStarsFill size={18} />}
      </span>
    </button>
  );
};
