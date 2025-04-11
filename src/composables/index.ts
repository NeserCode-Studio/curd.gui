export * from "@/composables/useTheme";
export * from "@/composables/useI18n";

export const nextTick = (fn: () => void) => {
  setTimeout(fn, 0);
};
