import * as hmUI from "@zos/ui";
import { log as Logger } from "@zos/utils";
import { setScrollLock } from "@zos/page";
import { TEXT_STYLE, IMG_STYLE } from "zosLoader:./index.page.[pf].layout.js";

const logger = Logger.getLogger("helloworld");
Page({
  onInit() {
    logger.debug("page onInit invoked");
  },

  build() {
    logger.debug("page build invoked");

    hmUI.createWidget(hmUI.widget.TEXT, TEXT_STYLE);
    hmUI.createWidget(hmUI.widget.IMG, IMG_STYLE);

    // disable swipes
    setScrollLock({ lock: true });
  },

  onDestroy() {
    logger.debug("page onDestroy invoked");
  },
});
