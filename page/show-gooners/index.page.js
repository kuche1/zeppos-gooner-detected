import * as hmUI from "@zos/ui";
import { log as Logger } from "@zos/utils";
import { setScrollLock } from "@zos/page";
import { TEXT_STYLE, IMG_STYLE } from "zosLoader:./index.page.[pf].layout.js";
import { getDeviceInfo } from "@zos/device";

const logger = Logger.getLogger("helloworld");

class Screen {
  constructor() {
    const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = getDeviceInfo();
    this.device_width = width;
    this.device_height = height;
  }

  /** @param {boolean} state */
  top_bar_visibility(state) {
    hmUI.setStatusBarVisible(state);
  }

  // TODO: make this print on screen
  print_text(msg) {
    logger.debug(msg);
  }
}

Page({
  onInit() {
    logger.debug("page onInit invoked");
  },

  build() {
    logger.debug("page build invoked");

    screen = new Screen();

    // TODO: need to update the other stuff because of this
    screen.top_bar_visibility(false);

    // TODO: make the 2nd line yellow, add the other name
    // TODO: hide the top bar
    hmUI.createWidget(hmUI.widget.TEXT, TEXT_STYLE);
    hmUI.createWidget(hmUI.widget.IMG, IMG_STYLE);

    // disable swipes
    setScrollLock({ lock: true });

    // TODO: allow for scrolling to the right and show some other pics
    // TODO: add cs1.6 music
  },

  onDestroy() {
    logger.debug("page onDestroy invoked");
  },
});
