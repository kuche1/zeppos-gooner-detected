import { replace } from "@zos/router";
import { Screen } from "../../utils/screen.js";

let timer = null;

Page({
  build() {
    const screen = new Screen(false);
    screen.print_text("scanning for gooners...", 40, 0xffffff);

    timer = setTimeout(() => {
      replace({ url: "page/show-gooners/index.page" });
    }, 3000);

    // TODO: add a scanning animation
  },

  onDestroy() {
    if (timer !== null) clearTimeout(timer);
  },
});
