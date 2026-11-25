// import * as hmUI from "@zos/ui";
// import { getText } from "@zos/i18n";
import { getDeviceInfo } from "@zos/device";
import { px } from "@zos/utils";

export const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = getDeviceInfo();

// export const TEXT_STYLE = {
//   text: getText("appName"),
//   x: px(42),
//   y: px(200),
//   w: DEVICE_WIDTH - px(42) * 2,
//   h: px(100),
//   color: 0xffffff,
//   text_size: px(36),
//   align_h: hmUI.align.CENTER_H,
//   align_v: hmUI.align.CENTER_V,
//   text_style: hmUI.text_style.WRAP,
// };

const STATUS_BAR_HEIGHT = px(80);
// this is not documented, measured by hand on the "bip max"

export const IMG_STYLE = {
  x: 0,
  y: STATUS_BAR_HEIGHT,
  w: DEVICE_WIDTH,
  h: DEVICE_HEIGHT - STATUS_BAR_HEIGHT,
  src: "image/gooner.png",
  auto_scale: true, // resize the image so that it fits `w` and `h`
};
