export type SettingInputItemType = "text" | "email" | "password" | "number";

export interface SettingItemProps {
  label?: string;
  title?: string;
  description?: string;
  onItemChange?: (value: string) => void;
  onItemSubmit?: (data: FormData) => void;
}

export interface SettingInputItemProps extends SettingItemProps {
  type: SettingInputItemType;
  value: string;
  placeholder?: string;
  submit?: string;
}

export type SettingSelectItemItem = {
  value: string;
  label: string;
};
export interface SettingSelectItemProps extends SettingItemProps {
  items: SettingSelectItemItem[];
  value?: SettingSelectItemItem;
  placeholder?: string;
  submit?: string;
}
