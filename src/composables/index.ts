export * from "@/composables/useTheme";

export const nextTick = (fn: () => void) => {
  setTimeout(fn, 0);
};
