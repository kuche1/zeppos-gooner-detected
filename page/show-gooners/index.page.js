import { log as Logger } from "@zos/utils";
import { Screen } from "../../utils/screen.js";
import { MusicPlayer } from "../../utils/music_player.js";
const logger = Logger.getLogger("show-gooners");
let music_player = null;
Page({
    onInit() {
        logger.debug("page onInit invoked");
    },
    build() {
        logger.debug("page build invoked");
        const screen = new Screen(false);
        screen.print_text('GOONER DETECTED', 40, 0xff0000);
        screen.print_text('犹太人 tracker 6000', 40, 0xffff00);
        screen.print_text('(feet_licker6000)', 40, 0xffff00);
        screen.print_image("image/gooner.png");
        screen.next_horizontal_screen();
        screen.print_text("Exibit A", 40, 0x00ff00);
        screen.print_image('image/proof0.png');
        screen.next_horizontal_screen();
        screen.print_text("Exibit B", 40, 0x00ff00);
        screen.print_image('image/proof1.png');
        // screen.next_horizontal_screen();
        // screen.print_text("Exibit C", 40, 0x00ff00);
        // screen.print_image('image/proof2.png');
        // screen.next_horizontal_screen();
        // screen.print_text("Exibit D", 40, 0x00ff00);
        // screen.print_image('image/proof3.png');
        screen.next_horizontal_screen();
        screen.print_text("Exibit C", 40, 0x00ff00);
        screen.print_image('image/proof4.png');
        screen.next_horizontal_screen();
        screen.print_text("Exibit D", 40, 0x00ff00);
        screen.print_image('image/proof5.png');
        screen.finish_screen_setup();
        music_player = new MusicPlayer("detected.mp3", () => { });
    },
    onDestroy() {
        logger.debug("page onDestroy invoked");
        music_player?.destroy();
    },
});
