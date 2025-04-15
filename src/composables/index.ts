export * from "@/composables/useTheme";
export * from "@/composables/useI18n";
export * from "@/composables/useToast";

export const nextTick = (fn: () => void, delay?: number) => {
  setTimeout(fn, delay ?? 0);
};
