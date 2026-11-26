import { replace } from "@zos/router";
import { Screen } from "../../utils/screen.js";
import { AnimationRadar } from "../../utils/ai_animation_radar.js";
import { MusicPlayer } from "../../utils/music_player.js";

let radar_animation: AnimationRadar | null = null;
let music_player: MusicPlayer | null = null;

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
    radar_animation?.destroy();
    music_player?.destroy();
  },
});
