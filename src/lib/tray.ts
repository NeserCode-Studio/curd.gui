import { TrayIcon, TrayIconOptions as tio } from "@tauri-apps/api/tray";
import { defaultWindowIcon } from "@tauri-apps/api/app";

export interface TrayIconOptions {
  icon?: tio["icon"];
  tooltip?: string;
  action?: tio["action"];
}

export class AppTray {
  private tray: TrayIcon | null;
  public readonly options: TrayIconOptions | null;

  constructor(options?: TrayIconOptions) {
    this.options = Object.assign({}, options);
    this.tray = null;

    this.init();
  }

  async init() {
    this.tray = await TrayIcon.new({
      icon: this.options?.icon ?? (await defaultWindowIcon()) ?? undefined,
      tooltip: this.options?.tooltip,
      action: (event) => {
        switch (event.type) {
          case "Click":
            console.log(
              `mouse ${event.button} button pressed, state: ${event.buttonState}`
            );
            break;
          case "DoubleClick":
            console.log(`mouse ${event.button} button pressed`);
            break;
          case "Enter":
            console.log(
              `mouse hovered tray at ${event.rect.position.x}, ${event.rect.position.y}`
            );
            break;
          case "Move":
            console.log(
              `mouse moved on tray at ${event.rect.position.x}, ${event.rect.position.y}`
            );
            break;
          case "Leave":
            console.log(
              `mouse left tray at ${event.rect.position.x}, ${event.rect.position.y}`
            );
            break;
        }
      },
    });
  }

  async quit() {
    await this.tray?.close();
  }
}
