import { TitleContext } from "@/App";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { useContext } from "react";
import { useI18n } from "@/composables";

import type {
  SettingInputItemProps,
  SettingSelectItemItem,
  SettingSelectItemProps,
} from "@/shared";

export function SettingInputItem({
  type,
  placeholder,
  onItemSubmit,
  submit,
  value,
}: SettingInputItemProps) {
  const { t } = useI18n();

  return (
    <form action={onItemSubmit} className="setting-input-item setting-item">
      <Input
        type={type}
        placeholder={
          placeholder ?? t("Settings.items.input.default.placeholder")
        }
        name="input"
        defaultValue={value}
      />
      <Button type="submit">
        {submit ?? t("Settings.items.input.default.submit")}
      </Button>
    </form>
  );
}

export function SettingSelectItem({
  placeholder,
  onItemSubmit,
  onItemChange,
  submit,
  label,
  items,
  value,
}: SettingSelectItemProps) {
  const { t } = useI18n();

  return (
    <form action={onItemSubmit} className="setting-select-item setting-item">
      <Select
        name="select"
        onValueChange={onItemChange}
        defaultValue={value?.value}
      >
        <SelectTrigger className="trigger">
          <SelectValue
            placeholder={
              placeholder ?? t("Settings.items.select.default.placeholder")
            }
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>
              {label ?? t("Settings.items.select.default.label")}
            </SelectLabel>
            {items?.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button type="submit">
        {submit ?? t("Settings.items.select.default.submit")}
      </Button>
    </form>
  );
}

export default function Settings() {
  const { t, setLang, lang } = useI18n();
  const { title, setTitle } = useContext(TitleContext);

  const titleAction = (data: FormData) => {
    if (!data || !data.get("input") || data.get("input") === title) return;
    setTitle(data.get("input") as string);
  };

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
    if (!data || !data.get("select") || data.get("select") === lang) return;
    console.log(data.get("select") as string, 1);

    setLang(data.get("select") as string);
  };
  return (
    <div className="view-settings">
      <SettingInputItem
        type="text"
        value={title ?? ""}
        onItemSubmit={titleAction}
      />
      <SettingSelectItem
        items={langItems}
        value={langItems.find((i) => i.value === lang)}
        label={t("Settings.items.lang.label")}
        onItemSubmit={langAction}
      />
    </div>
  );
}
