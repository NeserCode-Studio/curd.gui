import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";

import TitlebarOperations, {
  ThemeIcon,
} from "@/components/framework/TitlebarOperations";
import { useContext } from "react";
import { ThemeContext, NavigatorContext } from "@/App";
import TitlebarTitle from "./TitlebarTitle";

export default function Titlebar() {
  const { theme, setThemeMode } = useContext(ThemeContext);
  const { navigator } = useContext(NavigatorContext);

  function toggleTheme() {
    if (theme === "dark") {
      setThemeMode("light");
    } else {
      setThemeMode("dark");
    }
  }

  return (
    <div className="title-bar-main" data-tauri-drag-region>
      <Menubar className="menu-bar-main">
        <MenubarMenu>
          <MenubarTrigger className="menu-bar-menu">转到</MenubarTrigger>
          <MenubarContent className="menu-bar-content">
            <MenubarItem
              className="menu-bar-item"
              onSelect={() => {
                navigator("/");
              }}
            >
              首页
            </MenubarItem>
            <MenubarItem
              className="menu-bar-item"
              onSelect={() => {
                navigator("/settings");
              }}
            >
              设置
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem className="menu-bar-item" onSelect={toggleTheme}>
              <span className="text">模式切换</span>
              <ThemeIcon />
            </MenubarItem>
            <MenubarItem className="menu-bar-item">退出</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="menu-bar-menu">关于</MenubarTrigger>
          <MenubarContent className="menu-bar-content">
            <MenubarItem className="menu-bar-item">软件</MenubarItem>
            <MenubarItem className="menu-bar-item">框架</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

      <TitlebarTitle data-tauri-drag-region />

      <TitlebarOperations />
    </div>
  );
}
