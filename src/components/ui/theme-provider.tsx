
"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export function useTheme() {
  if (typeof window === 'undefined') {
    return {
      theme: 'system',
      setTheme: (_theme: string) => {},
      toggleTheme: () => {},
      isDarkMode: false,
      isLightMode: true,
      isSystemTheme: true,
    };
  }

  const storedTheme = localStorage.getItem('digihub-theme') || 'system';
  
  const setTheme = (theme: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('digihub-theme', theme);
      document.documentElement.className = theme;
    }
  };

  return {
    theme: storedTheme,
    setTheme,
    toggleTheme: () => setTheme(storedTheme === "dark" ? "light" : "dark"),
    isDarkMode: storedTheme === "dark",
    isLightMode: storedTheme === "light",
    isSystemTheme: storedTheme === "system",
  };
}
