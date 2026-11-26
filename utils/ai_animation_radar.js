"use strict";
import * as hmUI from "@zos/ui";
import { px } from "@zos/utils";
export class AnimationRadar {
  #timer;
  constructor(screen) {
    const width = screen.device_width;
    const { x, y, h } = screen.consume_remaining_screen_space();
    const r = Math.floor(Math.min(width, h) / 2) - px(20);
    const cx = x + Math.floor(width / 2);
    const cy = y + Math.floor(h / 2);
    for (const ring of [r, r * 2 / 3, r / 3]) {
      hmUI.createWidget(hmUI.widget.ARC, {
        x: cx - ring,
        y: cy - ring,
        w: ring * 2,
        h: ring * 2,
        start_angle: 0,
        end_angle: 360,
        color: 43520,
        line_width: px(3)
      });
    }
    const sweep_style = {
      x: cx - r,
      y: cy - r,
      w: r * 2,
      h: r * 2,
      start_angle: 0,
      end_angle: 40,
      color: 65280,
      line_width: r
      // thick, so it looks like a wedge
    };
    const sweep = hmUI.createWidget(hmUI.widget.ARC, sweep_style);
    let angle = 0;
    this.#timer = setInterval(() => {
      angle = (angle + 10) % 360;
      sweep.setProperty(hmUI.prop.MORE, {
        ...sweep_style,
        start_angle: angle,
        end_angle: angle + 40
      });
    }, 50);
  }
  destroy() {
    if (this.#timer !== null) clearInterval(this.#timer);
    this.#timer = null;
  }
}
