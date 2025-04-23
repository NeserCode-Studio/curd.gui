import { TrayIcon, TrayIconOptions as tio } from "@tauri-apps/api/tray";
import { defaultWindowIcon } from "@tauri-apps/api/app";
import { nextTick } from "@/composables";

export interface TrayIconOptions {
  icon?: tio["icon"];
  tooltip?: string;
  action?: tio["action"];
}

export class LocalTrayIds {
  public readonly ids = new Set<string>();
  private readonly key: string = "app-tray-ids";

  // 构造函数，接受一个可选的参数id，可以是字符串或字符串数组
  constructor(id?: string | string[], key?: string) {
    if (key) this.key = key;

    const ids = localStorage.getItem(this.key);
    if (ids) this.ids = new Set(JSON.parse(ids));
    if (id && !Array.isArray(id)) this.ids.add(id);
  }

  add(id: string) {
    this.ids.add(id);
    localStorage.setItem(this.key, JSON.stringify([...this.ids]));
  }

  remove(id: string) {
    this.ids.delete(id);
    localStorage.setItem(this.key, JSON.stringify([...this.ids]));
  }

  clear() {
    this.ids.clear();
    localStorage.removeItem(this.key);
  }

  get items() {
    return [...this.ids];
  }
}

export class AppTray {
  private tray: TrayIcon | null;
  private readonly trayIds = new LocalTrayIds();
  public readonly options: TrayIconOptions | null;

  constructor(options?: TrayIconOptions) {
    this.options = Object.assign({}, options);
    this.tray = null;

    this.clearTrays();

    console.log("[Tray::Main] Getting options", this.options);
  }

  clearTrays() {
    this.trayIds.items.forEach(async (id) => {
      try {
        this.trayIds.remove(id);
        await TrayIcon.removeById(id);
      } catch (e) {
        console.log("[Tray::Clear] Failed to remove tray", e);
      }
    });
  }

  async init() {
    this.clearTrays();
    console.log("[Tray::Init] Clear all trays", this.trayIds.items);

    if (this.trayIds.items.length > 0) return;
    this.tray = await TrayIcon.new({
      icon: this.options?.icon ?? (await defaultWindowIcon()) ?? undefined,
      tooltip: this.options?.tooltip,
      // action: (event) => {
      //   switch (event.type) {
      //     case "Click":
      //       console.log(
      //         `mouse ${event.button} button pressed, state: ${event.buttonState}`
      //       );
      //       break;
      //     case "DoubleClick":
      //       console.log(`mouse ${event.button} button pressed`);
      //       break;
      //     case "Enter":
      //       console.log(
      //         `mouse hovered tray at ${event.rect.position.x}, ${event.rect.position.y}`
      //       );
      //       break;
      //     case "Move":
      //       console.log(
      //         `mouse moved on tray at ${event.rect.position.x}, ${event.rect.position.y}`
      //       );
      //       break;
      //     case "Leave":
      //       console.log(
      //         `mouse left tray at ${event.rect.position.x}, ${event.rect.position.y}`
      //       );
      //       break;
      //   }
      // },
    });
    if (this.tray) this.trayIds.add(this.tray.id);
    else return;

    console.log("[Tray::Init] New tray", this.tray, this.trayIds.items);
  }

  async quit() {
    await this.tray?.close();
    return this.clearTrays();
  }
}
