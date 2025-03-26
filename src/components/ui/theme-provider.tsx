
"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export function useTheme() {
  const { theme, setTheme } = React.useContext(
    React.createContext({
      theme: "system",
      setTheme: (_theme: string) => {},
    })
  );

  return {
    theme,
    setTheme,
    toggleTheme: () => setTheme(theme === "dark" ? "light" : "dark"),
    isDarkMode: theme === "dark",
    isLightMode: theme === "light",
    isSystemTheme: theme === "system",
  };
}
