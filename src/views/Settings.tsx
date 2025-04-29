import { TitleContext } from "@/App";
import { useLocalStorageState } from "ahooks";
import { useContext } from "react";
import { useI18n, useTheme, useToast } from "@/composables";
import {
  SettingInputItem,
  SettingOptionalItem,
  SettingSelectItem,
  SettingItemGroup,
} from "@/components/SettingItems";

import type { SettingSelectItemItem } from "@/shared";

export default function Settings() {
  const { t, setLang, lang } = useI18n();
  const { title, setTitle } = useContext(TitleContext);
  const [theme, setTheme] = useTheme({ localStorageKey: "theme-mode" });
  const [autoComplete, setAutoComplete] = useLocalStorageState(
    "use-auto-complete",
    {
      defaultValue: true,
    }
  );
  const { success, error } = useToast({
    duration: 2000,
  });

  /* setting title item */
  const titleAction = (data: FormData) => {
    if (!data || !data.get("input") || data.get("input") === title)
      return error("Settings.items.title.error");
    setTitle(data.get("input") as string);
    success("Settings.items.title.success");
  };

  /* setting lang item */
  const langItems: SettingSelectItemItem[] = [
    {
      value: "en-US",
      label: "English(US)",
    },
    {
      value: "zh-CN",
      label: "简体中文",
    },
  ];
  const langAction = (data: FormData) => {
    if (!data || !data.get("select") || data.get("select") === lang)
      return error("Settings.items.lang.error");

    setLang(data.get("select") as string);
    success("Settings.items.lang.success");
  };

  /* setting auto-complete item */
  const autoCompleteAction = (checked: boolean) => {
    setAutoComplete(checked);
    success("Settings.items.auto-complete.success");
  };

  const themeAction = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
    success("Settings.items.theme.success", {});
  };

  return (
    <div className="view-settings">
      <SettingItemGroup
        title={t("Settings.groups.examples.title")}
        description={t("Settings.groups.examples.description")}
      >
        <SettingInputItem
          type="text"
          value={title ?? ""}
          placeholder="键入自定义标题"
          onItemSubmit={titleAction}
          title={t("Settings.items.title.title")}
          description={t("Settings.items.title.description")}
        />
        <SettingSelectItem
          items={langItems}
          value={langItems.find((i) => i.value === lang)}
          label={t("Settings.items.lang.label")}
          onItemSubmit={langAction}
          title={t("Settings.items.lang.title")}
          description={t("Settings.items.lang.description")}
        />
        <SettingOptionalItem
          label={t("Settings.items.auto-complete.label")}
          value={autoComplete}
          id="optional.auto-complete"
          onItemChange={autoCompleteAction}
          title={t("Settings.items.auto-complete.title")}
          description={t("Settings.items.auto-complete.description")}
        />
        <SettingOptionalItem
          label={t("Settings.items.theme.label")}
          value={theme === "dark"}
          id="optional.theme"
          onItemChange={themeAction}
          title={t("Settings.items.theme.title")}
          description={t("Settings.items.theme.description")}
        />
      </SettingItemGroup>
    </div>
  );
}
