import { Result } from "@/types/result";
import { KeepAwake } from "@capacitor-community/keep-awake";
import { StatusBar } from "@capacitor/status-bar";
import { Haptics, VibrateOptions } from "@capacitor/haptics";

export default {
  // KeepAwake
  async keepAwake(): Promise<Result<void>> {
    try {
      await KeepAwake.keepAwake();
      return Result.Ok();
    } catch (error: any) {
      return Result.Error("[modules/system#keepAwake]", error);
    }
  },

  async allowSleep(): Promise<Result<void>> {
    try {
      await KeepAwake.allowSleep();
      return Result.Ok();
    } catch (error: any) {
      return Result.Error("[modules/system#allowSleep]", error);
    }
  },

  // StatusBar
  async overlayStatusBar(overlay: boolean): Promise<Result<void>> {
    try {
      await StatusBar.setOverlaysWebView({
        overlay,
      });

      if (overlay) {
        await StatusBar.hide();
      } else {
        await StatusBar.show();
      }
      return Result.Ok();
    } catch (error: any) {
      return Result.Error("[modules/system#overlayStatusBar]", error);
    }
  },

  // Haptics
  async vibrate(duration?: number): Promise<Result<void>> {
    try {
      const options: VibrateOptions = {
        duration: duration ?? 300,
      };
      await Haptics.vibrate(options);
      return Result.Ok();
    } catch (error: any) {
      return Result.Error("[modules/system#vibrate]", error);
    }
  },
};

