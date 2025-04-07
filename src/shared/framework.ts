export type ThemeType = "light" | "dark";
export type UseThemeFnReturn = [ThemeType, (theme: ThemeType) => void];
export type UseThemeFn = (options: {
  localStorageKey?: string;
}) => UseThemeFnReturn;

export interface TitlebarProps {
  navigator: (path: `/${string}`) => void;
}

export type TitlebarOperationType =
  | "minimize"
  | "close"
  | "theme"
  | "always-on-top";
