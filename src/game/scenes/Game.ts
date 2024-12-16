import { EventBus } from "../EventBus";
import { Scene } from "phaser";
import zoomAndScrollCamera from "../utils/zoomAndScrollCamera";
import panCameraMouseWheel from "../utils/panCameraMouseWheel";
import panCameraSpaceBar from "../utils/panCameraSpaceBar";

const NAVBAR_HEIGHT = 64;
const ZOOM = 0.3;
const WORLD_SIZE = { x: 4, y: 8 };
const TILE_WIDTH = 256;
const TILE_HEIGHT = 128;
const ORIGIN = { x: 5, y: 1 };

const P_WORLD = new Array(WORLD_SIZE.x * WORLD_SIZE.y).fill(0);

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    tileOutline: Phaser.GameObjects.Image;

    gameWidth: number;
    gameHeight: number;

    posText: Phaser.GameObjects.Text;
    cellText: Phaser.GameObjects.Text;
    offsetText: Phaser.GameObjects.Text;
    rect: Phaser.GameObjects.Rectangle;

    constructor() {
        super("Game");
    }

    create() {
        this.cameraMovements();

        this.drawTiles();
        this.tileOutline = this.add.image(0, 0, "tile-outline");
        this.posText = this.add
            .text(10, 10, "Cursors to move", {
                color: "#000000",
            })
            .setScrollFactor(0, 0);

        EventBus.emit("current-scene-ready", this);
    }

    cameraMovements() {
        const keySpace = this.input?.keyboard?.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
        );

        this.input.on("wheel", () =>
            zoomAndScrollCamera({
                camera: this.cameras.main,
                input: this.input,
                pointer: this.input.activePointer,
            })
        );
        this.input.on("pointerdown", () => {
            panCameraMouseWheel({
                camera: this.cameras.main,
                input: this.input,
                pointer: this.input.activePointer,
            });
            panCameraSpaceBar({
                camera: this.cameras.main,
                input: this.input,
                pointer: this.input.activePointer,
            });
        });
        keySpace?.on("down", () => {
            this.input.setDefaultCursor("grab");
        });
        keySpace?.on("up", () => {
            this.input.setDefaultCursor("default");
        });
    }

    toScreen(x: number, y: number) {
        return new Phaser.Math.Vector2(
            ORIGIN.x * TILE_WIDTH + (x - y) * (TILE_WIDTH / 2) + TILE_WIDTH / 2,
            ORIGIN.y * TILE_HEIGHT +
                (x + y) * (TILE_HEIGHT / 2) +
                TILE_HEIGHT * (3 / 4)
        );
    }

    drawTiles() {
        for (let y = 0; y < WORLD_SIZE.y; y++) {
            for (let x = 0; x < WORLD_SIZE.x; x++) {
                let vWorld = this.toScreen(x, y);

                switch (P_WORLD[y * WORLD_SIZE.x + x]) {
                    case 0:
                        this.add.image(vWorld.x, vWorld.y, "grass");
                        break;
                }
            }
        }
    }

    update() {
        let mousePos = new Phaser.Math.Vector2(this.input.x, this.input.y);
        // Account for camera position
        // let mousePos = new Phaser.Math.Vector2(this.input.x / ZOOM, this.input.y / ZOOM);
        let cell = new Phaser.Math.Vector2(
            Math.round(mousePos.x / TILE_WIDTH),
            Math.round(mousePos.y / TILE_HEIGHT)
        );

        this.posText.setText([
            `screen x: ${this.input.x}`,
            `screen y: ${this.input.y}`,
            `world x: ${this.input.mousePointer.worldX}`,
            `world y: ${this.input.mousePointer.worldY}`,
        ]);

        if (this.rect) {
            this.rect.destroy();
        }
        // Origin should account for ZOOM factor
        this.rect = this.add
            .rectangle(
                cell.x * TILE_WIDTH - TILE_WIDTH / 2,
                cell.y * TILE_HEIGHT - TILE_HEIGHT / 2,
                TILE_WIDTH,
                TILE_HEIGHT,
                0x000000,
                0.5
            )
            .setOrigin(0, 0);
        this.tileOutline.x = cell.x * TILE_WIDTH;
        this.tileOutline.y = cell.y * TILE_HEIGHT;
    }
}
