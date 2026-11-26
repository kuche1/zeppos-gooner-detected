"use strict";
import { getDeviceInfo } from "@zos/device";
export class DeviceInfo {
  #device_info;
  // specifying the type here is not really mandatory
  constructor() {
    this.#device_info = getDeviceInfo();
  }
  running_on_simulator() {
    return this.#device_info.bleAddr == "00:00:00:00:00:00";
  }
  has_speaker() {
    return this.#device_info.hasSpeaker;
  }
}
