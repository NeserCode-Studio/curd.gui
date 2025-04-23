import { Tooltip } from "./Tooltip";

import {
  MinusIcon,
  XMarkIcon,
  SunIcon,
  MoonIcon,
  PaperClipIcon,
} from "@heroicons/react/16/solid";
import { ThemeContext } from "@/App";
import { Separator } from "../ui/separator";
import { useContext, useEffect } from "react";
import { useLocalStorageState } from "ahooks";
import { getCurrentWindow } from "@tauri-apps/api/window";

import type { TitlebarOperationType } from "@/shared";
import { useI18n } from "@/composables";
import { WindowUtils } from "@/lib/window.utils";

const currentWindow = getCurrentWindow();

export function ThemeIcon() {
  const { theme } = useContext(ThemeContext);

  if (theme === "dark") {
    return <SunIcon className="icon" />;
  } else {
    return <MoonIcon className="icon" />;
  }
}

async function handleOperation(
  operation: TitlebarOperationType,
  setter?: (a: any) => void,
  trigger?: boolean | string
) {
  switch (operation) {
    case "minimize":
      await currentWindow.minimize();
      break;
    case "close":
      await WindowUtils.windowsQuit();
      break;
    case "theme":
      if (setter) setter(trigger ?? "light");
      break;
    case "always-on-top":
      await currentWindow.setAlwaysOnTop((trigger as boolean) ?? false);
      if (setter) setter(trigger);
      break;
  }
}

export default function TitlebarOperations() {
  const { t } = useI18n();
  const { theme, setThemeMode } = useContext(ThemeContext);
  const [alwaysOnTop, setAlwaysOnTop] = useLocalStorageState(
    "app-always-on-top",
    {
      defaultValue: false,
    }
  );

  useEffect(() => {
    currentWindow.setAlwaysOnTop(alwaysOnTop ?? false);
  }, [alwaysOnTop]);

  return (
    <>
      <div className="title-bar-operations">
        <Separator orientation="vertical" className="separator" />
        <Tooltip content={t("Titlebar.operations.always-on-top.tooltip")}>
          <span
            className={[alwaysOnTop ? "pinned" : "", "operation"].join(" ")}
            onMouseUp={() => {
              handleOperation("always-on-top", setAlwaysOnTop, !alwaysOnTop);
            }}
          >
            <PaperClipIcon className="icon" />
          </span>
        </Tooltip>
        <Tooltip content={t("Titlebar.operations.theme.tooltip")}>
          <span
            className="operation"
            onMouseUp={() => {
              handleOperation(
                "theme",
                setThemeMode,
                theme === "dark" ? "light" : "dark"
              );
            }}
          >
            <ThemeIcon />
          </span>
        </Tooltip>
        <Tooltip content={t("Titlebar.operations.minimize.tooltip")}>
          <span
            className="operation"
            onMouseUp={() => {
              handleOperation("minimize");
            }}
          >
            <MinusIcon className="icon" />
          </span>
        </Tooltip>
        <Tooltip content={t("Titlebar.operations.close.tooltip")}>
          <span
            className="operation"
            onMouseUp={() => {
              handleOperation("close");
            }}
          >
            <XMarkIcon className="icon" />
          </span>
        </Tooltip>
      </div>
    </>
  );
}
