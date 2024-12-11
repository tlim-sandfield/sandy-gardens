import { GameObjects, Scene } from "phaser";

import { EventBus } from "../EventBus";

export class MainMenu extends Scene {
    background: GameObjects.Image;
    logo: GameObjects.Image;
    title: GameObjects.Text;
    logoTween: Phaser.Tweens.Tween | null;

    constructor() {
        super("MainMenu");
    }

    create() {
        // this.background = this.add.image(0, 0, "background");
        // this.background.displayHeight = this.sys.game.config.height as number;
        // this.background.scaleX = this.background.scaleY;
        // this.background.y = (this.sys.game.config.height as number) / 2;
        // this.background.x = (this.sys.game.config.width as number) / 2;

        // this.logo = this.add.image(512, 300, "logo").setDepth(100);

        // this.title = this.add
        //     .text(512, 460, "Main Menu", {
        //         fontFamily: "Arial Black",
        //         fontSize: 38,
        //         color: "#ffffff",
        //         stroke: "#000000",
        //         strokeThickness: 8,
        //         align: "center",
        //     })
        //     .setOrigin(0.5)
        //     .setDepth(100);

        EventBus.emit("current-scene-ready", this);
    }
}
