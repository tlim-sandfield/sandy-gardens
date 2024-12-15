


import Phaser from "phaser";

export class Game extends Phaser.Scene {
    private tilemap: Phaser.Tilemaps.Tilemap;
    private layer: Phaser.Tilemaps.TilemapLayer;
    private highlightSprite: Phaser.GameObjects.Sprite;
    private tileWidth: number = 256; // Width of your isometric tile
    private tileHeight: number = 128; // Height of your isometric tile

    mousePosText: Phaser.GameObjects.Text;
    cellText: Phaser.GameObjects.Text;

    constructor() {
        super("Game");
    }

    preload() {
        this.load.image("tiles", "assets/tiles/256x192 Tiles.png");
        this.load.tilemapTiledJSON("map", "assets/tiles/20x20.json");
        this.load.image("highlight", "assets/tiles/tile-outline.png");
    }

    create() {
        // Create the tilemap
        this.tilemap = this.make.tilemap({ key: "map" });
        const tileset = this.tilemap.addTilesetImage("256x192 Tiles", "tiles");

        // Check if tileset is null
        if (tileset) {
            this.layer = this.tilemap.createLayer(
                "Tile Layer 1",
                tileset,
                0,
                0
            ) as Phaser.Tilemaps.TilemapLayer;
        }

        this.cameras.main.setZoom(0.3);
        this.mousePosText = this.add.text(0, 100, "Mouse Position: ", {
            fontSize: "70px",
            color: "#000",
        });
        this.cellText = this.add.text(0, 200, "Cell: ", {
            fontSize: "70px",
            color: "#000",
        });

        // Add a highlight sprite
        this.highlightSprite = this.add.sprite(0, 0, "highlight");
        this.highlightSprite.setAlpha(0.5);
        this.highlightSprite.setVisible(false);

        // Set up mouse move listener
        this.input.on("pointermove", this.handlePointerMove, this);
    }

    handlePointerMove(pointer: Phaser.Input.Pointer) {
        const worldPoint = pointer.positionToCamera(
            this.cameras.main
        ) as Phaser.Math.Vector2;

        // Convert world coordinates to isometric tile coordinates
        const tileX = Math.floor(
            worldPoint.y / this.tileHeight + worldPoint.x / (this.tileWidth / 2)
        );
        const tileY =
            Math.floor(
                worldPoint.x / this.tileWidth / 2 -
                    worldPoint.y / this.tileHeight
            ) * -1;

        if (this.tilemap.hasTileAt(tileX, tileY)) {
            const tile = this.tilemap.getTileAt(tileX, tileY);
            if (tile) {
                const tileWorldX = tile.pixelX + this.tileWidth / 2; // Center of the tile
                const tileWorldY = tile.pixelY;

                // Update highlight sprite position
                this.highlightSprite.setPosition(tileWorldX, tileWorldY);
                this.highlightSprite.setVisible(true);
            }
        } else {
            this.highlightSprite.setVisible(false);
        }
    }

    update() {
        const pointer: Phaser.Input.Pointer = this.input.activePointer;
        const worldPoint = pointer.positionToCamera(
            this.cameras.main
        ) as Phaser.Math.Vector2;

        // Convert world coordinates to isometric tile coordinates
        const tileX = Math.floor(
            worldPoint.y / this.tileHeight + worldPoint.x / (this.tileWidth / 2)
        );
        const tileY =
            Math.floor(
                worldPoint.x / this.tileWidth / 2 -
                    worldPoint.y / this.tileHeight
            ) * -1;

        this.mousePosText.setText(
            "World Point: " +
                Math.round(worldPoint.x) +
                ", " +
                Math.round(worldPoint.y)
        );
        this.cellText.setText("Tile X and Y: " + tileX + ", " + tileY);
    }
}

