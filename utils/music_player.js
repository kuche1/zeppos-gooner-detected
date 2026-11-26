import { create, id } from "@zos/media";
import { log as Logger } from "@zos/utils";
import { DeviceInfo } from "./device_info";
const logger = Logger.getLogger("music_player");
export class MusicPlayer {
  #player;
  constructor(src, on_complete) {
    this.#player = create(id.PLAYER);
    const device_info = new DeviceInfo();
    if (!device_info.has_speaker()) {
      logger.debug("device has no speaker");
      let timeout_ms = 3e3;
      if (device_info.running_on_simulator()) {
        timeout_ms = 0;
      }
      setTimeout(
        () => {
          on_complete();
        },
        timeout_ms
      );
      return;
    }
    this.#player.addEventListener(
      this.#player.event.PREPARE,
      (ok) => {
        if (ok) {
          this.#player.start();
        } else {
          logger.debug("could not load music");
          on_complete();
        }
      }
    );
    this.#player.addEventListener(
      this.#player.event.COMPLETE,
      () => {
        this.#player.stop();
        on_complete();
      }
    );
    this.#player.setSource(this.#player.source.FILE, { file: src });
    this.#player.prepare();
  }
  destroy() {
    this.#player?.stop();
  }
}
