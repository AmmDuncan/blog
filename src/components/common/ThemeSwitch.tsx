'use client';

import React, { useEffect, useState } from 'react';
import { BsFillMoonStarsFill, BsSunFill } from 'react-icons/bs';

// Helper to get system theme
const getSystemTheme = (): boolean => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  return false;
};

export const ThemeSwitch: React.FC = () => {
  const [night, setNight] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme-night');
      if (stored !== null) return stored === 'true';
      return getSystemTheme();
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem('theme-night', String(night));
    if (night) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [night]);

  const toggleMode = () => {
    setNight((prevValue) => !prevValue);
  };

  return (
    <button
      onClick={toggleMode}
      type="button"
      aria-label="Toggle theme"
      className={`fixed bottom-6 right-6 z-50 grid h-11 w-20 select-none items-center rounded-full border-none p-1.5 shadow-[0_1rem_2.4rem_rgba(0,0,0,0.1),0_1px_2px_rgba(0,0,0,0.1)_inset] outline-none transition-colors duration-300  ${night ? 'bg-[var(--switch-on-bg)]' : 'bg-[var(--switch-bg)]'}`}
    >
      <span
        className={`duration-250 grid h-8 w-8 place-content-center rounded-full bg-[var(--color-bg)] text-[var(--switch-fg)] transition-transform ${night ? 'translate-x-9 text-[var(--color-primary)]' : ''}`}
        style={{ transition: 'transform 250ms ease' }}
      >
        {night ? <BsSunFill size={18} /> : <BsFillMoonStarsFill size={18} />}
      </span>
    </button>
  );
};
