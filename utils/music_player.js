import { create, id } from "@zos/media";
import { log as Logger } from "@zos/utils";

const logger = Logger.getLogger("music_player");

export class MusicPlayer {
  #player;

  /**
   * @param {string} src
   */
  constructor(src) {
    this.#player = create(id.PLAYER);

    // TODO: it is questionable that we make it play right away
    // or is it?
    this.#player.addEventListener(
      this.#player.event.PREPARE,
      (ok) => {
        if (ok) this.#player.start();
        else logger.debug("could not load music");
      },
    );

    // i dont think this is needed
    this.#player.addEventListener(
      this.#player.event.COMPLETE,
      () => {
        this.#player.stop();
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
