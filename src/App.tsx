import "./App.css";

import Titlebar from "@/components/framework/Titlebar";
import CommandDialog from "@/components/framework/CommandDialog";
import { Toaster } from "@/components/ui/sonner";
import { Routes, Route } from "react-router";

import Home from "@/views/Home";
import Settings from "@/views/Settings";

import { useNavigate } from "react-router";
import { useTheme } from "./composables";
import { createContext } from "react";
import { UseThemeFnReturn } from "./shared";
import { ScrollArea } from "./components/ui/scroll-area";
import { useLocalStorageState } from "ahooks";

/* Context Provide */
const ThemeContext = createContext<{
  theme: UseThemeFnReturn[0];
  setThemeMode: UseThemeFnReturn[1];
}>({
  theme: "light",
  setThemeMode: () => {},
});
const NavigatorContext = createContext<{
  navigator: (path: string) => void;
}>({
  navigator: (_path: string) => {},
});
const TitleContext = createContext<{
  title?: string;
  setTitle: (newTitle: string) => void;
}>({
  title: "App template",
  setTitle: () => {},
});

function App() {
  const navigate = useNavigate();
  const [theme, setThemeMode] = useTheme({
    localStorageKey: "theme-mode",
  });
  const [title, setTitle] = useLocalStorageState("app-title", {
    defaultValue: "App Template",
  });
  return (
    <>
      <ThemeContext.Provider value={{ theme, setThemeMode }}>
        <TitleContext.Provider value={{ title, setTitle }}>
          <NavigatorContext.Provider value={{ navigator: navigate }}>
            <main id="app-main">
              <Titlebar />
              <CommandDialog />

              <div id="container">
                <ScrollArea className="container-scroller">
                  <Routes>
                    <Route path="/" index element={<Home />} />
                    <Route path="/settings" element={<Settings />} />
                  </Routes>
                </ScrollArea>
              </div>
            </main>
            <Toaster richColors position="bottom-right" />
          </NavigatorContext.Provider>
        </TitleContext.Provider>
      </ThemeContext.Provider>
    </>
  );
}

export { App, ThemeContext, TitleContext, NavigatorContext };
