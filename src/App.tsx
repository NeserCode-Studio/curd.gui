import "./App.css";

import Titlebar from "@/components/framework/Titlebar";
import { Toaster } from "@/components/ui/sonner";
import { Routes, Route } from "react-router";

import Home from "@/views/Home";
import Settings from "@/views/Settings";

import { useNavigate } from "react-router";
import { useTheme } from "./composables";
import { createContext } from "react";
import { UseThemeFnReturn } from "./shared";

const ThemeContext = createContext<{
  theme: UseThemeFnReturn[0];
  setThemeMode: UseThemeFnReturn[1];
}>({
  theme: "light",
  setThemeMode: (_preference: string) => {},
});

function App() {
  const navigate = useNavigate();
  const [theme, setThemeMode] = useTheme({
    localStorageKey: "theme-mode",
  });
  return (
    <>
      <ThemeContext.Provider value={{ theme, setThemeMode }}>
        <main id="app-main">
          <Titlebar navigator={navigate} />

          <div id="container">
            <Routes>
              <Route path="/" index element={<Home />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </main>
        <Toaster richColors position="bottom-right" />
      </ThemeContext.Provider>
    </>
  );
}

export { App, ThemeContext };
