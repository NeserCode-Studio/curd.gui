import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { HomeSidebar } from "@/components/framework/HomeSidebar";

import { useI18n } from "@/composables";
import { useLocalStorageState } from "ahooks";

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
          <h1 className="title">{t("Home.title")}</h1>
        </main>
      </SidebarProvider>
    </div>
  );
}
