import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const ThemeContext = createContext({ theme: 'light', toggleTheme: () => {} });

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
    // Prefer system
    const prefersDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const handler = (e) => {
      const sysDark = e.matches;
      const saved = localStorage.getItem('theme');
      if (!saved) setTheme(sysDark ? 'dark' : 'light');
    };
    if (window.matchMedia) {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      mq.addEventListener?.('change', handler);
      return () => mq.removeEventListener?.('change', handler);
    }
  }, []);

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  const value = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}

