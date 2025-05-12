'use client';
import { createContext, useContext, useState } from 'react';
import { getCookie, setCookie } from 'cookies-next/client';

export const ThemeContext = createContext<{
  theme: 'light' | 'dark';
  toggleMode: (mode: 'light' | 'dark') => void;
}>({
  theme: 'light',
  toggleMode: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme, toggleMode } = useThemeState();
  return (
    <ThemeContext.Provider value={{ theme, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
export const useTheme = () => useContext(ThemeContext);

export type Theme = 'light' | 'dark';
export function useThemeState() {
  const [theme, setTheme] = useState<Theme>(() => getCookie('theme') as Theme);

  const toggleMode = (mode: Theme) => {
    setTheme(mode);
    setCookie('theme', mode);
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return { theme, toggleMode };
}
