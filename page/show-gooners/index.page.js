import { log as Logger } from "@zos/utils";
import { setScrollLock } from "@zos/page";
import { create, id } from "@zos/media";
import { Screen } from "../../utils/screen.js";

const logger = Logger.getLogger("helloworld");

let music_player = null;

Page({
  onInit() {
    logger.debug("page onInit invoked");
  },

  build() {
    logger.debug("page build invoked");

    const screen = new Screen(false);

    screen.print_text('GOONER DETECTED', 40, 0xff0000);
    screen.print_text('犹太人 tracker 6000', 40, 0xffff00);
    screen.print_text('(feet_licker6000)', 40, 0xffff00);
    screen.print_image("image/gooner.png");

    // disable swipes
    setScrollLock({ lock: true });

    music_player = create(id.PLAYER);

    music_player.addEventListener(music_player.event.PREPARE, (ok) => {
      if (ok) music_player.start();
      else logger.debug("could not load music");
    });

    // i dont think this is needed
    music_player.addEventListener(music_player.event.COMPLETE, () => {
      music_player.stop();
    });

    music_player.setSource(music_player.source.FILE, { file: "detected.mp3" });
    music_player.prepare();

    // TODO: allow for scrolling to the right and show some other pics
  },

  onDestroy() {
    logger.debug("page onDestroy invoked");

    // i dont know if this is actually needed,
    // i'll keep it just in case
    if (music_player) music_player.stop();
  },
});
