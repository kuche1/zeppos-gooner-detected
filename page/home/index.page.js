import { replace } from "@zos/router";
import { getDeviceInfo } from "@zos/device";

Page({
  build() {
    // const info = getDeviceInfo();
    // for (const [key, value] of Object.entries(info)) {
    //   console.log(`${key}: ${JSON.stringify(value)}`);
    // }

    replace({ url: "page/scan-for-gooners/index.page" });
  },
});
