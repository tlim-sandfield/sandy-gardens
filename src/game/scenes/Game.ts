import { EventBus } from "../EventBus";
import { Scene } from "phaser";

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameText: Phaser.GameObjects.Text;

    xTiles: 1;
    yTiles: 1;
    plotSize: 20;

    constructor() {
        super("Game");
    }

    create() {
        this.camera = this.cameras.main;

        this.drawTiles();
        this.add.image(128, 0, "tile-outline");
        EventBus.emit("current-scene-ready", this);
    }

    drawTiles() {
        const xStartPoint = 0;
        const yStartPoint = 0;

        this.add.image(0, 0, "base_tiles");

        for (let x = 0; x < this.xTiles; x++) {
            for (let y = 0; y < this.yTiles; y++) {
                // this.add.image(
                //     xStartPoint + this.plotSize,
                //     yStartPoint + this.plotSize,
                //     "base_tiles"
                // ).setOrigin(0, 0);
            }
        }
    }

    update() {
        const scrollDelta = this.input.activePointer.deltaY;
        this.camera.zoom += scrollDelta * -0.0001;
        // Clamp the zoom factor to prevent excessive zooming
        this.camera.zoom = Phaser.Math.Clamp(this.camera.zoom, 0.25, 0.75);

        if (this.input.activePointer.isDown) {
            this.camera.scrollX -= this.input.activePointer.velocity.x / 10;
            this.camera.scrollY -= this.input.activePointer.velocity.y / 10;
        }
    }
}
