
import { EventBus } from "../EventBus";
import { Scene } from "phaser";

const NAVBAR_HEIGHT = 64;
const ZOOM = 0.3;
const WORLD_SIZE = { x: 4, y: 8 };
const TILE_WIDTH = 256;
const TILE_HEIGHT = 128;
const ORIGIN = { x: 5, y: 1 };

const RED = Phaser.Display.Color.RGBStringToColor("rgb(237, 28, 36)");
const GREEN = Phaser.Display.Color.RGBStringToColor("rgb(34, 177, 76)");
const ORANGE = Phaser.Display.Color.RGBStringToColor("rgb(255, 127, 39)");
const YELLOW = Phaser.Display.Color.RGBStringToColor("rgb(255, 242, 0)");

const P_WORLD = new Array(WORLD_SIZE.x * WORLD_SIZE.y).fill(0);

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    tileOutline: Phaser.GameObjects.Image;

    gameWidth: number;
    gameHeight: number;

    private tilemap: Phaser.Tilemaps.Tilemap;
    private layer: Phaser.Tilemaps.TilemapLayer;

    mousePosText: Phaser.GameObjects.Text;
    cellText: Phaser.GameObjects.Text;
    offsetText: Phaser.GameObjects.Text;
    colourText: Phaser.GameObjects.Text;
    rect: Phaser.GameObjects.Rectangle;

    constructor() {
        super("Game");
    }

    create() {
        this.camera = this.cameras.main;
        // this.gameWidth = this.game.config.width as number;
        // this.gameHeight = this.game.config.height as number;

        // this.camera.setOrigin(this.gameWidth / 2, this.gameHeight / 2);
        // this.camera.setZoom(ZOOM);

        this.drawTiles();
        this.tileOutline = this.add.image(0, 0, "tile-colour-corners");

        this.mousePosText = this.add.text(0, 100, "Mouse Position: ", {
            fontSize: "70px",
            color: "#000",
        });
        this.cellText = this.add.text(0, 200, "Cell: ", {
            fontSize: "70px",
            color: "#000",
        });
        this.offsetText = this.add.text(0, 300, "Offset: ", {
            fontSize: "70px",
            color: "#000",
        });
        this.colourText = this.add.text(0, 400, "Colour: ", {
            fontSize: "70px",
            color: "#000",
        });

        EventBus.emit("current-scene-ready", this);
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
        // let mousePos = new Phaser.Math.Vector2(this.input.x, this.input.y);
        // // Account for camera position
        // // let mousePos = new Phaser.Math.Vector2(this.input.x / ZOOM, this.input.y / ZOOM);

        // let cell = new Phaser.Math.Vector2(
        //     Math.round(mousePos.x / TILE_WIDTH),
        //     Math.round(mousePos.y / TILE_HEIGHT)
        // );

        // let offset = new Phaser.Math.Vector2(
        //     Math.round(mousePos.x % TILE_WIDTH),
        //     Math.round(mousePos.y % TILE_HEIGHT)
        // );

        // Get the color of the pixel at the calculated coordinates


        // this.mousePosText.setText(
        //     "Mouse Position: " +
        //         Math.round(mousePos.x) +
        //         ", " +
        //         Math.round(mousePos.y)
        // );
        // this.cellText.setText("Cell: " + cell.x + ", " + cell.y);
        // let colour = this.textures.getPixel(
        //     offset.x,
        //     offset.y,
        //     "tile-colour-corners"
        // );
        // this.offsetText.setText(String(RED === colour));
        // this.colourText.setText(
        //     String(colour?.red) +
        //         " " +
        //         String(colour?.green) +
        //         " " +
        //         String(colour?.blue)
        // );

        // if (this.rect) {
        //     this.rect.destroy();
        // }
        // // Origin should account for ZOOM factor
        // this.rect = this.add
        //     .rectangle(
        //         cell.x * TILE_WIDTH - TILE_WIDTH / 2,
        //         cell.y * TILE_HEIGHT - TILE_HEIGHT / 2,
        //         TILE_WIDTH,
        //         TILE_HEIGHT,
        //         0x000000,
        //         0.5
        //     )
        //     .setOrigin(0, 0);

        // this.tileOutline.x = cell.x * TILE_WIDTH;
        // this.tileOutline.y = cell.y * TILE_HEIGHT;

        // if (colour === RED) {
        //     this.tileOutline.x += -1 * TILE_WIDTH;
        //     this.tileOutline.y += +0 * TILE_HEIGHT;
        // } else if (colour === ORANGE) {
        //     this.tileOutline.x += +0 * TILE_WIDTH;
        //     this.tileOutline.y += -1 * TILE_HEIGHT;
        // } else if (colour === GREEN) {
        //     this.tileOutline.x += +0 * TILE_WIDTH;
        //     this.tileOutline.y += +1 * TILE_HEIGHT;
        // } else if (colour === YELLOW) {
        //     this.tileOutline.x += +1 * TILE_WIDTH;
        //     this.tileOutline.y += +0 * TILE_HEIGHT;
        // }
    }
}