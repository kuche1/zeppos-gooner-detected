import { create, id } from "@zos/media";
import { log as Logger } from "@zos/utils";
import { DeviceInfo } from "./device_info";

const logger = Logger.getLogger("music_player");

export class MusicPlayer {
  #player;

  /**
   * @param {string} src
   * @param {() => void} on_complete
   */
  constructor(src, on_complete) {
    const device_info = new DeviceInfo();

    if (!device_info.has_speaker()) {
      logger.debug("device has no speaker");
      // the event listener for `this.#player.event.PREPARE` below
      // will not work

      let timeout_ms = 3000;
      if (device_info.running_on_simulator()) {
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
    // `this.#player.getDuration()` returns 0 in the simulator

    // In the future we might want to add `.play` instead of automatically
    // starting playback during the construction
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
