export type SettingInputItemType = "text" | "email" | "password" | "number";

export interface SettingInputItemProps {
  type: SettingInputItemType;
  label?: string;
  submit?: string;
  title?: string;
  description?: string;
  placeholder?: string;
  value: string;
  onItemChange?: (value: string) => void;
  onItemSubmit?: (data: FormData) => void;
}
