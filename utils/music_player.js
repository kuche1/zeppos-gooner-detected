import { create, id } from "@zos/media";
import { log as Logger } from "@zos/utils";
import { getDeviceInfo } from "@zos/device";
import { running_in_simulator } from "./running_in_simulator";

const logger = Logger.getLogger("music_player");

export class MusicPlayer {
  #player;

  /**
   * @param {string} src
   * @param {() => void} on_complete
   */
  constructor(src, on_complete) {
    if (!getDeviceInfo().hasSpeaker) {
      logger.debug("device has no speaker");
      // the event listener for `this.#player.event.PREPARE` below
      // will not work

      let timeout_ms = 3000;
      if (running_in_simulator()) {
        timeout_ms = 0;
      }

      setTimeout(
        () => {
          on_complete();
        },
        timeout_ms,
      );

      return;
    }

    this.#player = create(id.PLAYER);

    // TODO: it is questionable that we make it play right away
    // or is it?
    this.#player.addEventListener(
      this.#player.event.PREPARE,
      (ok) => {
        if (ok) {
          this.#player.start();
        } else {
          logger.debug("could not load music");
          on_complete();
        }
      },
    );

    this.#player.addEventListener(
      this.#player.event.COMPLETE,
      () => {
        this.#player.stop(); // i dont know if this really is needed
        on_complete();
      },
    );

    this.#player.setSource(this.#player.source.FILE, { file: src });

    this.#player.prepare();
  }

  destroy() {
    // i dont know if this is actually needed,
    // i'll keep it just in case
    this.#player.stop();
  }
}
