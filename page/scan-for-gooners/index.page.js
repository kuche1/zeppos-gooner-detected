import { replace } from "@zos/router";
import { Screen } from "../../utils/screen.js";
import { AnimationRadar } from "../../utils/ai_animation_radar.js";

let scene_timer = null;
let radar_animation = null;

Page({
  build() {
    const screen = new Screen(false);
    screen.print_text("Scanning for Gooners...", 40, 0xffffff);

    radar_animation = new AnimationRadar(screen);

    scene_timer = setTimeout(() => {
      replace({ url: "page/show-gooners/index.page" });
    }, 3000);
  },

  onDestroy() {
    if (scene_timer !== null) clearTimeout(scene_timer);
    if (radar_animation !== null) radar_animation.destroy();
  },
});
