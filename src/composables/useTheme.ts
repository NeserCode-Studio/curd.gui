import { useEffect, useState } from "react";
import { nextTick } from ".";

import type { ThemeType, UseThemeFn } from "@/shared";

export const useTheme: UseThemeFn = ({ localStorageKey = "theme" }) => {
  const localTheme = localStorage.getItem(localStorageKey) as ThemeType;
  const [themeState, setThemeState] = useState<ThemeType>(
    localTheme ?? "light"
  );

  /* Initial Theme */
  useEffect(() => {
    const localTheme = localStorage.getItem(localStorageKey);
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const theme = localTheme || (prefersDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, []);

  /* Queue Update */
  nextTick(() => {
    const html = document.querySelector("html");
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");

    /* Listener */
    const onThemeChange = (event: MediaQueryListEvent) => {
      const isDarkMode = event.matches;
      if (!localTheme) {
        html?.classList.toggle("dark", isDarkMode);
        setThemeState(isDarkMode ? "dark" : "light");
      }
    };

    matchMedia.addEventListener("change", onThemeChange);
    return () => {
      matchMedia.removeEventListener("change", onThemeChange);
    };
  });

  /* Setter */
  const setTheme = (theme: ThemeType) => {
    const html = document?.querySelector("html");

    html?.classList.toggle("dark");
    setThemeState(theme);
    localStorage.setItem(localStorageKey, theme);
  };

  return [themeState, setTheme];
};
