import { create, id } from "@zos/media";
import { log as Logger } from "@zos/utils";

const logger = Logger.getLogger("music_player");

export class MusicPlayer {
  #player;

  /**
   * @param {string} src
   * @param {() => void} on_complete
   */
  constructor(src, on_complete) {
    logger.debug("creating player");

    this.#player = create(id.PLAYER);

    // TODO: it is questionable that we make it play right away
    // or is it?
    // TODO: this shit does not seem to work on the simulator
    this.#player.addEventListener(
      this.#player.event.PREPARE,
      (ok) => {
        logger.debug("PREPARE: " + ok);
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

    logger.debug("AAaaAAaa");
  }

  destroy() {
    // i dont know if this is actually needed,
    // i'll keep it just in case
    this.#player.stop();
  }
}
