import { replace } from "@zos/router";
import { Screen } from "../../utils/screen.js";
import { AnimationRadar } from "../../utils/ai_animation_radar.js";
import { MusicPlayer } from "../../utils/music_player.js";

let radar_animation = null;
let music_player = null;

Page({
  build() {
    const screen = new Screen(false);
    screen.print_text("Scanning for Gooners...", 40, 0xffffff);

    radar_animation = new AnimationRadar(screen);

    // playing this file locally sound way too loud but it sounds ok
    // on the "bip max"
    music_player = new MusicPlayer(
      "scanning.mp3", 
      () => { replace({ url: "page/show-gooners/index.page" }) },
    );
  },

  onDestroy() {
    if (radar_animation !== null) radar_animation.destroy();
    if (music_player) music_player.destroy();
  },
});
