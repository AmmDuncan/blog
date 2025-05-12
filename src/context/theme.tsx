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

export const ThemeProvider = ({
  children,
  initialTheme,
}: {
  children: React.ReactNode;
  initialTheme: Theme;
}) => {
  const { theme, toggleMode } = useThemeState(initialTheme);
  return (
    <ThemeContext.Provider value={{ theme, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
export const useTheme = () => useContext(ThemeContext);

export type Theme = 'light' | 'dark';
export function useThemeState(initialTheme: Theme) {
  const [theme, setTheme] = useState<Theme>(() => initialTheme);

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
