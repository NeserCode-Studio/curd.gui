import {
  getAllWindows,
  getCurrentWindow,
  Window,
} from "@tauri-apps/api/window";

export class WindowUtils {
  private $window: Window | undefined;
  private $current: Window;
  constructor(label: string) {
    this.$current = getCurrentWindow();
    getAllWindows()
      .then((windows) => {
        this.$window = windows.find((w) => w.label === label);
      })
      .catch((reason) => {
        console.log(`[Window:Error] Get Windows but ${reason}`);
      });
  }

  renderFocus() {
    const focusShow = async (w: Window) => {
      // await w.setAlwaysOnTop(true);
      await w.show();
      await w.setFocus();
      // await w.setAlwaysOnTop(false);
    };

    if (this.$window !== undefined) focusShow(this.$window);
    else focusShow(this.$current);
  }
}
