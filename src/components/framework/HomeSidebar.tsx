import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { FileBox, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "../ui/button";
import { useI18n } from "@/composables";
import { useLocalStorageState } from "ahooks";

export function HomeSidebar() {
  const items = ["Person Model", "Product Model"];
  const [server, setServer] = useState("");
  const [edit, setEdit] = useState(false);
  const [activeModel, setActiveModel] = useState(items[0]);
  const [autoComplete] = useLocalStorageState("use-auto-complete", {
    defaultValue: true,
  });
  const { t } = useI18n();

  const serverSubmitAction = (data: FormData) => {
    setServer(data.get("server") as string);
    // TODO: add server submit action
    setEdit(false);
  };

  return (
    <Sidebar id="sidebar">
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupAction>
            <Plus />
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item}>
                  <SidebarMenuButton
                    isActive={activeModel === item}
                    onClick={() => setActiveModel(item)}
                  >
                    <FileBox />
                    <span>{item}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            {edit ? (
              <form action={serverSubmitAction} className="flex flex-col gap-2">
                <Input
                  value={server}
                  name="server"
                  onChange={(e) => setServer(e.target.value)}
                  placeholder={t("Input.default.placeholder")}
                  autoComplete={autoComplete ? "on" : "off"}
                />
                <Button type="submit">{t("Button.default.submit")}</Button>
              </form>
            ) : (
              <SidebarMenuButton
                onClick={() => {
                  setEdit(true);
                }}
              >
                <span>
                  {server.length > 0
                    ? server
                    : t("Sidebar.items.server.default")}
                </span>
              </SidebarMenuButton>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
