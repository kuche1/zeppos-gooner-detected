import { create, id } from "@zos/media";
import { log as Logger } from "@zos/utils";
import { getDeviceInfo } from "@zos/device";

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

      setTimeout(
        () => {
          on_complete();
        },
        3000,
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
