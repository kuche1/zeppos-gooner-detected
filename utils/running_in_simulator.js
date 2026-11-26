import { getDeviceInfo } from "@zos/device";

// TODO: create `DeviceInfo` instead
/** @returns {boolean} */
export function running_in_simulator() {
  //// there are 3 hints that we can use for this:
  // bleAddr: "00:00:00:00:00:00"
  // btAddr: "00:00:00:00:00:00"
  // wifiAddr: "00:00:00:00:00:00"
  //// and `bleAddr` is the most likely to not be 0s on a real device
  //// since it is used for communication with the zepp app on your
  //// phone

  return getDeviceInfo().bleAddr == "00:00:00:00:00:00"
}
