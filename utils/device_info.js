import { getDeviceInfo } from "@zos/device";

export class DeviceInfo {
  #device_info;

  constructor() {
    this.#device_info = getDeviceInfo();
  }

  /** @returns {boolean} */
  running_on_simulator() {
    //// there are 3 hints that we can use for this:
    // bleAddr: "00:00:00:00:00:00"
    // btAddr: "00:00:00:00:00:00"
    // wifiAddr: "00:00:00:00:00:00"
    //// and `bleAddr` is the most likely to not be 0s on a real device
    //// since it is used for communication with the zepp app on your
    //// phone
    return this.#device_info.bleAddr == "00:00:00:00:00:00"
  }

  /** @returns {boolean} */
  has_speaker() {
    return this.#device_info.hasSpeaker
  }
}
