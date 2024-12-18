import { EventBus } from "../EventBus";
import { Scene } from "phaser";
import zoomAndScrollCamera from "../utils/zoomAndScrollCamera";
import panCameraMouseWheel from "../utils/panCameraMouseWheel";
import panCameraSpaceBar from "../utils/panCameraSpaceBar";
import { TILE_HEIGHT, TILE_WIDTH } from "../gameConstants";
import worldPointXYToTileXY from "../utils/worldPointXYToTileXY";

export class Game extends Scene {
    private tilemap: Phaser.Tilemaps.Tilemap;
    private layer: Phaser.Tilemaps.TilemapLayer;
    private highlightSprite: Phaser.GameObjects.Sprite;
    private selectSprite: Phaser.GameObjects.Sprite;

    private posText: Phaser.GameObjects.Text;

    constructor() {
        super("Game");
    }

    create() {
        this.cameraMovements();
        this.setUpMap();
        this.setUpPointer();

        this.cameras.main.setZoom(0.3);
        this.cameras.main.centerOn(0, 9 * TILE_HEIGHT);

        this.posText = this.add
            .text(10, 10, "Cursors to move", {
                color: "#000000",
                fontSize: "80px",
            })
            .setScrollFactor(0, 0);

        EventBus.on("centre-game", () => {
            this.cameras.main.zoomTo(0.3, 500, "Linear", true);
            this.cameras.main.pan(0, 9 * TILE_HEIGHT, 500, "Linear", true);
        });

        EventBus.emit("current-scene-ready", this);
    }

    update() {
        this.input.on("pointermove", this.handlePointerMove, this);
        this.input.on("pointerdown", this.handlePointerSelect, this);

        const worldPoint = this.input.activePointer.positionToCamera(
            this.cameras.main
        ) as Phaser.Math.Vector2;

        const tileX = worldPointXYToTileXY(worldPoint).x;
        const tileY = worldPointXYToTileXY(worldPoint).y;

        this.posText.setText([
            `screen x: ${this.input.x}`,
            `screen y: ${this.input.y}`,
            `worldPoint x: ${Math.round(worldPoint.x)}`,
            `worldPoint y: ${Math.round(worldPoint.y)}`,
            `tileX: ${tileX}`,
            `tileY: ${tileY}`,
        ]);
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
        const tileset =
            this.tilemap.addTilesetImage("128x96 Tiles", "tiles") || "";
        this.layer = this.tilemap.createLayer(
            "Tile Layer 1",
            tileset,
            -TILE_WIDTH / 2,
            0
        ) as Phaser.Tilemaps.TilemapLayer;
    }

    setUpPointer() {
        // Add a highlight sprite
        this.highlightSprite = this.add.sprite(0, 0, "highlight");
        this.highlightSprite.setAlpha(0.75);
        this.highlightSprite.setVisible(false);

        // Add a select sprite
        this.selectSprite = this.add.sprite(0, 0, "select");
        this.selectSprite.setAlpha(1);
        this.selectSprite.setVisible(false);
    }

    handlePointerMove(pointer: Phaser.Input.Pointer) {
        const worldPoint = pointer.positionToCamera(
            this.cameras.main
        ) as Phaser.Math.Vector2;
        const tileX = worldPointXYToTileXY(worldPoint).x;
        const tileY = worldPointXYToTileXY(worldPoint).y;

        if (this.tilemap.hasTileAt(tileX, tileY)) {
            const tile = this.tilemap.getTileAt(tileX, tileY);
            if (tile) {
                this.highlightSprite.setPosition(
                    tile.pixelX,
                    tile.pixelY + TILE_HEIGHT / 2
                );
                this.highlightSprite.setVisible(true);
            }
        } else {
            this.highlightSprite.setVisible(false);
        }
    }

    handlePointerSelect(pointer: Phaser.Input.Pointer) {
        if (pointer.leftButtonDown()) {
            const worldPoint = pointer.positionToCamera(
                this.cameras.main
            ) as Phaser.Math.Vector2;
            const tileX = worldPointXYToTileXY(worldPoint).x;
            const tileY = worldPointXYToTileXY(worldPoint).y;

            if (this.tilemap.hasTileAt(tileX, tileY)) {
                const tile = this.tilemap.getTileAt(tileX, tileY);
                if (tile) {
                    this.selectSprite.setPosition(
                        tile.pixelX,
                        tile.pixelY + TILE_HEIGHT / 2
                    );
                    this.selectSprite.setVisible(true);
                    EventBus.emit("tile-selected", tile);
                }
            }
        }
    }
}
