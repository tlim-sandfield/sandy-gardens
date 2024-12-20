import { EventBus } from "../EventBus";
import { Scene } from "phaser";
import zoomAndScrollCamera from "../utils/zoomAndScrollCamera";
import panCameraMouseWheel from "../utils/panCameraMouseWheel";
import panCameraSpaceBar from "../utils/panCameraSpaceBar";
import { TILE_HEIGHT, TILE_WIDTH } from "../gameConstants";
import worldPointXYToTileXY from "../utils/worldPointXYToTileXY";

export class Game extends Scene {
    private tilemap: Phaser.Tilemaps.Tilemap;
    private tileLayer: Phaser.Tilemaps.TilemapLayer;
    private plantLayer: Phaser.Tilemaps.TilemapLayer;
    private highlightSprite: Phaser.GameObjects.Sprite;
    private selectedTileX: number;
    private selectedTileY: number;
    private hoverPlantSprite: Phaser.GameObjects.Sprite;
    private selectedShopItemID: number;
    private sellButton: Phaser.GameObjects.Sprite;

    private posText: Phaser.GameObjects.Text;

    constructor() {
        super("Game");
    }

    create() {
        this.cameraMovements();
        this.setUpMap();
        this.setUpPointer();

        this.cameras.main.setZoom(0.6);
        this.cameras.main.centerOn(0, 31 * TILE_HEIGHT);

        this.sellButton = this.add.sprite(0, 0, "star");
        this.sellButton.setInteractive();
        this.sellButton.on("pointerdown", () => {
            this.plantLayer.removeTileAt(
                this.selectedTileX,
                this.selectedTileY
            );
        });
        this.sellButton.setVisible(false);

        // this.posText = this.add
        //     .text(10, 10, "Cursors to move", {
        //         color: "#000000",
        //         fontSize: "80px",
        //     })
        //     .setScrollFactor(0, 0);

        EventBus.on("centre-game", () => {
            this.cameras.main.zoomTo(0.6, 500, "Linear", true);
            this.cameras.main.pan(0, 31 * TILE_HEIGHT, 500, "Linear", true);
        });

        EventBus.emit("current-scene-ready", this);
    }

    update() {
        this.input.on("pointermove", this.handlePointerMove, this);
        this.input.on("pointerdown", this.handlePointerSelect, this);

        EventBus.on("shop-item-selected", (itemID: number) => {
            this.selectedShopItemID = itemID;
            this.hoverPlantSprite.destroy();
            this.hoverPlantSprite = this.add.sprite(
                this.highlightSprite.x,
                this.highlightSprite.y - TILE_HEIGHT * 1.5,
                `plant_${itemID}`
            );
            this.hoverPlantSprite.setAlpha(0.5);

            if (itemID != undefined && this.highlightSprite.visible == true) {
                this.hoverPlantSprite.setVisible(true);
            } else {
                this.hoverPlantSprite.setVisible(false);
            }
        });

        // const worldPoint = this.input.activePointer.positionToCamera(
        //     this.cameras.main
        // ) as Phaser.Math.Vector2;

        // const tileX = worldPointXYToTileXY(worldPoint).x;
        // const tileY = worldPointXYToTileXY(worldPoint).y;

        // this.posText.setText([
        //     `screen x: ${this.input.x}`,
        //     `screen y: ${this.input.y}`,
        //     `worldPoint x: ${Math.round(worldPoint.x)}`,
        //     `worldPoint y: ${Math.round(worldPoint.y)}`,
        //     `tileX: ${tileX}`,
        //     `tileY: ${tileY}`,
        // ]);
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
        const plantset =
            this.tilemap.addTilesetImage("128x256 Trees", "plants") || "";
        this.tileLayer = this.tilemap.createLayer(
            "Tiles",
            tileset,
            -TILE_WIDTH / 2,
            TILE_HEIGHT / 2
        ) as Phaser.Tilemaps.TilemapLayer;
        this.plantLayer = this.tilemap.createLayer(
            "Plants",
            plantset,
            -TILE_WIDTH / 2,
            -TILE_HEIGHT * 3
        ) as Phaser.Tilemaps.TilemapLayer;
    }

    setUpPointer() {
        // Add a highlight sprite
        this.highlightSprite = this.add.sprite(0, 0, "highlight");
        this.highlightSprite.setAlpha(0.75);
        this.highlightSprite.setVisible(false);

        // Add a hover plant sprite
        this.hoverPlantSprite = this.add.sprite(0, 0, "plants");
        this.hoverPlantSprite.setAlpha(0.5);
        this.hoverPlantSprite.setVisible(false);
    }

    handlePointerMove(pointer: Phaser.Input.Pointer) {
        const worldPoint = pointer.positionToCamera(
            this.cameras.main
        ) as Phaser.Math.Vector2;
        const tileX = worldPointXYToTileXY(worldPoint).x;
        const tileY = worldPointXYToTileXY(worldPoint).y;

        if (this.tileLayer.hasTileAt(tileX, tileY)) {
            const tile = this.tileLayer.getTileAt(tileX, tileY);
            if (tile) {
                this.highlightSprite.setPosition(
                    tile.pixelX,
                    tile.pixelY + TILE_HEIGHT / 2
                );
                this.highlightSprite.setVisible(true);

                if (this.selectedShopItemID != undefined) {
                    this.hoverPlantSprite.setPosition(
                        tile.pixelX,
                        tile.pixelY - TILE_HEIGHT
                    );
                    this.hoverPlantSprite.setVisible(true);
                } else {
                    if (this.plantLayer.hasTileAt(tileX, tileY)) {
                        this.highlightSprite.setTintFill(0xffff00);
                    } else {
                        this.highlightSprite.clearTint();
                    }
                }
            }
        } else {
            this.highlightSprite.setVisible(false);
            this.hoverPlantSprite.setVisible(false);
        }
    }

    handlePointerSelect(pointer: Phaser.Input.Pointer) {
        if (pointer.leftButtonDown()) {
            const worldPoint = pointer.positionToCamera(
                this.cameras.main
            ) as Phaser.Math.Vector2;
            this.selectedTileX = worldPointXYToTileXY(worldPoint).x;
            this.selectedTileY = worldPointXYToTileXY(worldPoint).y;

            if (
                this.tileLayer.hasTileAt(this.selectedTileX, this.selectedTileY)
            ) {
                const tile = this.tileLayer.getTileAt(
                    this.selectedTileX,
                    this.selectedTileY
                );
                if (tile) {
                    if (this.selectedShopItemID != undefined) {
                        this.plantLayer.putTileAt(
                            this.selectedShopItemID,
                            this.selectedTileX,
                            this.selectedTileY
                        );
                    }
                }
            }

            if (
                this.selectedShopItemID == undefined &&
                this.plantLayer.hasTileAt(
                    this.selectedTileX,
                    this.selectedTileY
                )
            ) {
                const plantTile = this.plantLayer.getTileAt(
                    this.selectedTileX,
                    this.selectedTileY
                );
                if (plantTile) {
                    this.sellButton.setPosition(
                        plantTile.pixelX,
                        plantTile.pixelY + 10
                    );
                    this.sellButton.setVisible(true);
                }
            } else {
                this.sellButton.setVisible(false);
            }
        }
    }
}
