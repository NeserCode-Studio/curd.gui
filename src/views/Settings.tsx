import { TitleContext } from "@/App";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useContext } from "react";

import type { SettingInputItemProps } from "@/shared";

export function SettingInputItem({
  type,
  placeholder,
  onItemSubmit,
  submit,
  value,
}: SettingInputItemProps) {
  return (
    <form action={onItemSubmit} className="setting-input-item">
      <Input
        type={type}
        placeholder={placeholder ?? "Type something..."}
        name="input"
        defaultValue={value}
      />
      <Button type="submit">{submit ?? "提交"}</Button>
    </form>
  );
}

export default function Settings() {
  const { title, setTitle } = useContext(TitleContext);

  const titleAction = (data: FormData) => {
    if (!data || !data.get("input") || data.get("input") === title) return;
    setTitle(data.get("input") as string);
  };
  return (
    <div className="view-settings">
      <SettingInputItem
        type="text"
        value={title ?? ""}
        onItemSubmit={titleAction}
      />
    </div>
  );
}
