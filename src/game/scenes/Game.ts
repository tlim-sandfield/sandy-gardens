import { EventBus } from "../EventBus";
import { Scene } from "phaser";
import zoomAndScrollCamera from "../utils/zoomAndScrollCamera";
import panCameraMouseWheel from "../utils/panCameraMouseWheel";
import panCameraSpaceBar from "../utils/panCameraSpaceBar";

const NAVBAR_HEIGHT = 64;
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

    private tilemap: Phaser.Tilemaps.Tilemap;
    private layer: Phaser.Tilemaps.TilemapLayer;
    private highlightSprite: Phaser.GameObjects.Sprite;

    constructor() {
        super("Game");
    }

    create() {
        this.cameraMovements();
        this.setUpMap();

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

    setUpMap() {
        this.tilemap = this.make.tilemap({ key: "map" });
        const tileset = this.tilemap.addTilesetImage("256x192 Tiles", "tiles");
        if (tileset) {
            this.layer = this.tilemap.createLayer(
                "Tile Layer 1",
                tileset,
                0,
                0
            ) as Phaser.Tilemaps.TilemapLayer;
        }

        // Add a highlight sprite
        this.highlightSprite = this.add.sprite(0, 0, "highlight");
        this.highlightSprite.setAlpha(0.5);
        this.highlightSprite.setVisible(false);
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
        this.posText.setText([
            `screen x: ${Math.round(this.input.x)}`,
            `screen y: ${Math.round(this.input.y)}`,
            `world x: ${Math.round(this.input.mousePointer.worldX)}`,
            `world y: ${Math.round(this.input.mousePointer.worldY)}`,
        ]);

        // Set up mouse move listener
        this.input.on("pointermove", this.handlePointerMove, this);
    }

    handlePointerMove(pointer: Phaser.Input.Pointer) {
        const worldPoint = pointer.positionToCamera(
            this.cameras.main
        ) as Phaser.Math.Vector2;

        // Convert world coordinates to isometric tile coordinates
        const tileX = Math.floor(
            worldPoint.y / TILE_HEIGHT + worldPoint.x / (TILE_WIDTH / 2)
        );
        const tileY =
            Math.floor(
                worldPoint.x / TILE_WIDTH / 2 - worldPoint.y / TILE_HEIGHT
            ) * -1;

        if (this.tilemap.hasTileAt(tileX, tileY)) {
            const tile = this.tilemap.getTileAt(tileX, tileY);
            if (tile) {
                const tileWorldX = tile.pixelX + TILE_WIDTH / 2; // Center of the tile
                const tileWorldY = tile.pixelY;

                // Update highlight sprite position
                this.highlightSprite.setPosition(tileWorldX, tileWorldY);
                this.highlightSprite.setVisible(true);
            }
        } else {
            this.highlightSprite.setVisible(false);
        }
    }
}
