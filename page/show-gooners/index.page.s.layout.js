import * as hmUI from "@zos/ui";
// import { getText } from "@zos/i18n";
import { getDeviceInfo } from "@zos/device";
import { px } from "@zos/utils";

export const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = getDeviceInfo();

const STATUS_BAR_HEIGHT = px(80);
// this is not documented, measured by hand on the "bip max"

const TEXT = "GOONER DETECTED\n犹太人 tracker 6000";
const TEXT_SIZE = px(40);

const { height: TEXT_HEIGHT } = hmUI.getTextLayout(TEXT, {
  text_size: TEXT_SIZE,
  text_width: DEVICE_WIDTH,
});

export const TEXT_STYLE = {
  text: TEXT,
  x: 0,
  y: STATUS_BAR_HEIGHT,
  w: DEVICE_WIDTH,
  h: TEXT_HEIGHT,
  color: 0xff0000,
  text_size: TEXT_SIZE,
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
};

// TODO: this looks squashed now
export const IMG_STYLE = {
  x: 0,
  y: STATUS_BAR_HEIGHT + TEXT_HEIGHT,
  w: DEVICE_WIDTH,
  h: DEVICE_HEIGHT - STATUS_BAR_HEIGHT - TEXT_HEIGHT,
  src: "image/gooner.png",
  auto_scale: true, // resize the image so that it fits `w` and `h`
};
