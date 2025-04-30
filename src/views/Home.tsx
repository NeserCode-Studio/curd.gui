import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { HomeSidebar } from "@/components/framework/HomeSidebar";

import { useI18n } from "@/composables";
import { useLocalStorageState } from "ahooks";
import { appLocalDataDir, join as joinPath } from "@tauri-apps/api/path";
import { DirEntry, readDir } from "@tauri-apps/plugin-fs";

interface T extends DirEntry {
  path: string;
  children?: T[]; // 添加 children 字段
}

const readAppLocalDataDir = async (dir: string | null = null): Promise<T[]> => {
  if (!dir) dir = await appLocalDataDir(); // 初始化根目录

  const files = await readDir(dir);
  const result: T[] = [];

  for (const file of files) {
    const fileWithPath: T = {
      ...file,
      path: await joinPath(dir, file.name),
    };

    if (file.isDirectory)
      fileWithPath.children = await readAppLocalDataDir(fileWithPath.path);

    result.push(fileWithPath);
  }

  return result;
};

console.time("readAppLocalDataDir");
(async () => {
  const allFiles = await readAppLocalDataDir();
  console.log(allFiles);
  console.timeEnd("readAppLocalDataDir");
})();

export default function Home() {
  const { t } = useI18n();
  const [sidebarCollapsed, setSidebarCollapsed] = useLocalStorageState(
    "sidebar-state",
    { defaultValue: false }
  );

  return (
    <div className="view-home">
      <SidebarProvider
        open={sidebarCollapsed}
        onOpenChange={setSidebarCollapsed}
      >
        <HomeSidebar />
        <main className="home-main">
          <SidebarTrigger className="sidebar-trigger" />
        </main>
      </SidebarProvider>
    </div>
  );
}
