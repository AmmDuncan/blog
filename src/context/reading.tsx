'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { getCookie, setCookie } from 'cookies-next/client';

export type FontFamily = 'sans' | 'merriweather' | 'accessible' | 'mono';
export type FontSize = 'small' | 'medium' | 'large' | 'xlarge';
export type ContentWidth = 'narrow' | 'default' | 'wide';
export type LineSpacing = 'compact' | 'default' | 'relaxed';

export type ReadingPreferences = {
  fontFamily: FontFamily;
  fontSize: FontSize;
  contentWidth: ContentWidth;
  lineSpacing: LineSpacing;
};

type ReadingContextType = {
  preferences: ReadingPreferences;
  setFontFamily: (f: FontFamily) => void;
  setFontSize: (s: FontSize) => void;
  setContentWidth: (w: ContentWidth) => void;
  setLineSpacing: (l: LineSpacing) => void;
};

const DEFAULTS: ReadingPreferences = {
  fontFamily: 'sans',
  fontSize: 'medium',
  contentWidth: 'default',
  lineSpacing: 'default',
};

const FONT_FAMILY_MAP: Record<FontFamily, string> = {
  sans: 'var(--font-inter), sans-serif',
  merriweather: 'var(--font-merriweather), serif',
  accessible: 'var(--font-atkinson), sans-serif',
  mono: 'ui-monospace, SFMono-Regular, Menlo, monospace',
};

const FONT_SIZE_MAP: Record<FontSize, string> = {
  small: '16px',
  medium: '18px',
  large: '20px',
  xlarge: '22px',
};

const CONTENT_WIDTH_MAP: Record<ContentWidth, string> = {
  narrow: '60ch',
  default: '68ch',
  wide: '76ch',
};

const LINE_SPACING_MAP: Record<LineSpacing, string> = {
  compact: '1.4',
  default: '1.6',
  relaxed: '1.85',
};

const COOKIE_KEY = 'reading-prefs';

const defaultContext: ReadingContextType = {
  preferences: DEFAULTS,
  setFontFamily: () => {},
  setFontSize: () => {},
  setContentWidth: () => {},
  setLineSpacing: () => {},
};

const ReadingContext = createContext<ReadingContextType>(defaultContext);

export const useReading = () => useContext(ReadingContext);

function parsePrefs(raw: string | undefined): ReadingPreferences {
  if (!raw) return DEFAULTS;
  try {
    const parsed = JSON.parse(raw);
    return {
      fontFamily: parsed.fontFamily ?? DEFAULTS.fontFamily,
      fontSize: parsed.fontSize ?? DEFAULTS.fontSize,
      contentWidth: parsed.contentWidth ?? DEFAULTS.contentWidth,
      lineSpacing: parsed.lineSpacing ?? DEFAULTS.lineSpacing,
    };
  } catch {
    return DEFAULTS;
  }
}

function applyReadingVars(prefs: ReadingPreferences) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.style.setProperty(
    '--reading-font-family',
    FONT_FAMILY_MAP[prefs.fontFamily]
  );
  root.style.setProperty('--reading-font-size', FONT_SIZE_MAP[prefs.fontSize]);
  root.style.setProperty(
    '--reading-content-width',
    CONTENT_WIDTH_MAP[prefs.contentWidth]
  );
  root.style.setProperty(
    '--reading-line-height',
    LINE_SPACING_MAP[prefs.lineSpacing]
  );
}

export function ReadingProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = useState<ReadingPreferences>(() => {
    const cookie = getCookie(COOKIE_KEY) as string | undefined;
    return parsePrefs(cookie);
  });

  useEffect(() => {
    applyReadingVars(preferences);
    setCookie(COOKIE_KEY, JSON.stringify(preferences), {
      maxAge: 60 * 60 * 24 * 365,
    });
  }, [preferences]);

  const setFontFamily = (fontFamily: FontFamily) =>
    setPreferences((prev) => ({ ...prev, fontFamily }));

  const setFontSize = (fontSize: FontSize) =>
    setPreferences((prev) => ({ ...prev, fontSize }));

  const setContentWidth = (contentWidth: ContentWidth) =>
    setPreferences((prev) => ({ ...prev, contentWidth }));

  const setLineSpacing = (lineSpacing: LineSpacing) =>
    setPreferences((prev) => ({ ...prev, lineSpacing }));

  return (
    <ReadingContext.Provider
      value={{
        preferences,
        setFontFamily,
        setFontSize,
        setContentWidth,
        setLineSpacing,
      }}
    >
      {children}
    </ReadingContext.Provider>
  );
}
