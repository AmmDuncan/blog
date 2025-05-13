'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { getCookie, setCookie } from 'cookies-next/client';

export type Theme = 'light' | 'dark';

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (mode: Theme) => void;
};

const defaultContext: ThemeContextType = {
  theme: 'light',
  toggleTheme: () => {},
  setTheme: () => {},
};

export const ThemeContext = createContext<ThemeContextType>(defaultContext);

export const useTheme = () => useContext(ThemeContext);

const getSystemTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

const applyTheme = (theme: Theme) => {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(theme);
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    const cookieTheme = getCookie('theme') as Theme | undefined;
    if (cookieTheme && (cookieTheme === 'light' || cookieTheme === 'dark')) {
      return cookieTheme;
    }
    return getSystemTheme();
  });

  // Apply theme when it changes
  useEffect(() => {
    applyTheme(theme);
    setCookie('theme', theme, { maxAge: 60 * 60 * 24 * 365 }); // 1 year expiry
  }, [theme]);

  const setTheme = (mode: Theme) => {
    setThemeState(mode);
  };

  const toggleTheme = () => {
    setThemeState((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
