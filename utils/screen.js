import { getDeviceInfo } from "@zos/device";
import { px } from "@zos/utils";
import * as hmUI from "@zos/ui";
import { setScrollMode, SCROLL_MODE_SWIPER_HORIZONTAL } from "@zos/page";
export class Screen {
    device_width;
    #device_height;
    #cursor_x;
    #cursor_y;
    #horizontal_screens;
    constructor(top_bar_visible) {
        const { width, height } = getDeviceInfo();
        this.device_width = width;
        this.#device_height = height;
        this.#cursor_x = 0;
        this.#cursor_y = 0;
        hmUI.setStatusBarVisible(top_bar_visible);
        if (top_bar_visible) {
            // add the size of the top bar
            // this value has been eyeballed for the `bip max`
            this.#cursor_y += px(80);
        }
        this.#horizontal_screens = 1;
    }
    /**
     * @returns {{ x: number, y: number, h: number}}
     **/
    consume_remaining_screen_space() {
        const x = this.#cursor_x;
        const y = this.#cursor_y;
        const h = this.#device_height - this.#cursor_y;
        this.#cursor_y = this.#device_height;
        return { x, y, h };
    }
    next_horizontal_screen() {
        this.#cursor_x += this.device_width;
        this.#cursor_y = 0;
        this.#horizontal_screens += 1;
    }
    finish_screen_setup() {
        setScrollMode({
            mode: SCROLL_MODE_SWIPER_HORIZONTAL,
            options: {
                width: this.device_width,
                count: this.#horizontal_screens,
            },
        });
    }
    ////////////////////////////////////////////////////////////// print
    print_text(text, size_px, color) {
        size_px = px(size_px);
        const width = this.device_width;
        const { height } = hmUI.getTextLayout(text, {
            text_size: size_px,
            text_width: width,
        });
        hmUI.createWidget(hmUI.widget.TEXT, {
            text: text,
            x: this.#cursor_x,
            y: this.#cursor_y,
            w: width,
            h: height,
            color: color,
            text_size: size_px,
            align_h: hmUI.align.CENTER_H,
            align_v: hmUI.align.CENTER_V,
        });
        this.#cursor_y += height;
    }
    // the printed image takes up the rest of the screen
    /**
     * @param {string} src
     */
    print_image(src) {
        const { y, h } = this.consume_remaining_screen_space();
        hmUI.createWidget(hmUI.widget.IMG, {
            x: this.#cursor_x,
            y: y,
            w: this.device_width,
            h: h,
            src: src,
            // @ts-expect-error -- incompetent devs fucked the typescript
            auto_scale: true, // resize the image so that it fits `w` and `h`
        });
    }
}
