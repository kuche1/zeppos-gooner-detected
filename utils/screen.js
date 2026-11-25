import { getDeviceInfo } from "@zos/device";
import { px } from "@zos/utils";
import * as hmUI from "@zos/ui";

export class Screen {
  constructor() {
    const { width, height } = getDeviceInfo();
    this.device_width = width;
    this.device_height = height;

    this.cursor_y = 0

    this.top_bar_visibility(false);
  }

  // TODO: this needs to be an argument to the constructor and the y needs
  // to be set according to this
  /** @param {boolean} state */
  top_bar_visibility(state) {
    hmUI.setStatusBarVisible(state);
  }

  /**
   * @param {string} text 
   * @param {number} size_px
   * @param {number} color
   */
  print_text(text, size_px, color) {
    size_px = px(size_px);

    const width = this.device_width;

    const { height } = hmUI.getTextLayout(
      text,
      {
        text_size: size_px,
        text_width: width,
      },
    );

    hmUI.createWidget(
      hmUI.widget.TEXT,
      {
        text: text,
        x: 0,
        y: this.cursor_y,
        w: width,
        h: height,
        color: color,
        text_size: size_px,
        align_h: hmUI.align.CENTER_H,
        align_v: hmUI.align.CENTER_V,
      },
    );

    this.cursor_y += height;
  }

  // the printed image takes up the rest of the screen
  /**
   * @param {string} src
   */
  print_image(src) {
    const height = this.device_height - this.cursor_y;

    hmUI.createWidget(
      hmUI.widget.IMG,
      {
        x: 0,
        y: this.cursor_y,
        w: this.device_width,
        h: height,
        src: src,
        auto_scale: true, // resize the image so that it fits `w` and `h`
      },
    );

    this.cursor_y = this.device_height;
  }
}
