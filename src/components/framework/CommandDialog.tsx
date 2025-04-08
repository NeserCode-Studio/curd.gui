"use client";

import * as React from "react";
import { Calendar, Flashlight, Home, Settings, Zap } from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useThrottleFn } from "ahooks";

import { NavigatorContext } from "@/App";

export default function CommandMenu() {
  const [open, setOpen] = React.useState(false);
  const { navigator } = React.useContext(NavigatorContext);

  const down = useThrottleFn(
    (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    },
    { wait: 1000 }
  );
  React.useEffect(() => {
    document.addEventListener("keydown", down.run);
    return () => document.removeEventListener("keydown", down.run);
  }, []);

  function handleCommandSelect(command: string) {
    const [symbol, value] = command.split("::");

    if (symbol === "navigate") navigator(value);
    if (symbol === "reload") {
      navigator("/");
      window.location.reload();
    }

    /* Dialog close */
    setOpen(false);
  }

  return (
    <>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem
              value="reload"
              onSelect={handleCommandSelect}
              keywords={["reload", "refresh", "重新加载", "刷新"]}
            >
              <Zap />
              <span>重新加载本应用</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="转到">
            <CommandItem
              value="navigate::/"
              onSelect={handleCommandSelect}
              keywords={["home", "index", "首页", "主页"]}
            >
              <Home />
              <span>首页</span>
              <CommandShortcut>⌘H</CommandShortcut>
            </CommandItem>
            <CommandItem
              value="navigate::/settings"
              onSelect={handleCommandSelect}
              keywords={["settings", "设置", "配置", "选项", "preferences"]}
            >
              <Settings />
              <span>设置</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
