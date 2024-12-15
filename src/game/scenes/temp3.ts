import { EventBus } from "../EventBus";
import { Scene } from "phaser";

const NAVBAR_HEIGHT = 64;
const WORLD_SIZE = { x: 20, y: 20 };
const ORIGIN = { x: 0, y: 0 };
const TILE_WIDTH = 256;
const TILE_HEIGHT = 128;
const P_WORLD = Array.from({ length: WORLD_SIZE.x * WORLD_SIZE.y }, () => 0);

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    tileOutline: Phaser.GameObjects.Image;

    gameWidth: number;
    gameHeight: number;

    mousePosText: Phaser.GameObjects.Text;
    cellText: Phaser.GameObjects.Text;
    rect: Phaser.GameObjects.Rectangle;

    constructor() {
        super("Game");
    }

    create() {
        this.camera = this.cameras.main;
        this.camera.setOrigin(this.gameWidth, this.gameHeight);
        this.camera.setZoom(0.3);
        // this.camera.centerOn(10, 10);

        this.gameWidth = this.game.config.width as number;
        this.gameHeight = this.game.config.height as number;

        this.drawTiles();
        // this.tileOutline = this.add.image(0, 0, "tile-outline");

        this.mousePosText = this.add.text(0, 0, "Mouse Position: ", {
            fontSize: "70px",
            color: "#000",
        });
        this.cellText = this.add.text(0, 100, "Cell: ", {
            fontSize: "70px",
            color: "#000",
        });

        EventBus.emit("current-scene-ready", this);
    }

    toScreen(isoX: number, isoY: number): Phaser.Math.Vector2 {
        return new Phaser.Math.Vector2(
            ORIGIN.x * TILE_WIDTH + (isoX - isoY) * (TILE_WIDTH / 2),
            ORIGIN.y * TILE_HEIGHT + (isoX + isoY) * (TILE_HEIGHT / 2)
        );
    }

    drawTiles() {
        const xStartPoint = 0;
        const yStartPoint = 0;

        // this.add.image(0, 0, "base_tiles").setOrigin(0, 0);

        for (let y = 0; y < WORLD_SIZE.x; y++) {
            for (let x = 0; x < WORLD_SIZE.y; x++) {
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
        // TILE HIGHLIGHT
        const worldPoint = this.cameras.main.getWorldPoint(
            this.input.x,
            this.input.y
        );

        let mousePos = new Phaser.Math.Vector2(
            this.input.x,
            this.input.y - NAVBAR_HEIGHT
        );

        let cell = new Phaser.Math.Vector2(
            Math.round(mousePos.x / TILE_WIDTH),
            Math.round(mousePos.y / TILE_HEIGHT)
        );

        let offset = new Phaser.Math.Vector2(
            mousePos.x % TILE_WIDTH,
            mousePos.y % TILE_HEIGHT
        );

        this.mousePosText.setText(
            "Mouse Position: " +
                Math.round(mousePos.x) +
                ", " +
                Math.round(mousePos.y)
        );
        this.cellText.setText("Cell: " + cell.x + ", " + cell.y);

        // if (this.rect) {
        //     this.rect.destroy();
        // }
        // this.rect = this.add.rectangle(
        //     cell.x * TILE_WIDTH,
        //     cell.y * TILE_HEIGHT,
        //     TILE_WIDTH,
        //     TILE_HEIGHT,
        //     0x000000,
        //     0.5
        // );
    }
}

// CAMERA CONTROLS
// const scrollDelta = this.input.activePointer.deltaY;
// this.camera.zoom += scrollDelta * -0.0001;
// this.camera.zoom = Phaser.Math.Clamp(this.camera.zoom, 0.25, 0.75);

// const sensitivity = 0.001; // Adjust sensitivity as needed

// this.input.on(
//     "wheel",
//     (
//         _pointer: any,
//         _gameObjects: any,
//         _deltaX: any,
//         deltaY: number,
//         _deltaZ: any
//     ) => {
//         const zoomChange = Math.sign(deltaY) * sensitivity;
//         this.camera.zoom -= zoomChange;
//     }
// );

// // TODO: Limit to game canvas (not navbar)
// this.input.on(
//     "pointerdown",
//     (pointer: { isDown: any; x: any; y: any }) => {
//         if (pointer.isDown) {
//             let initialX = pointer.x;
//             let initialY = pointer.y;

//             this.input.on(
//                 "pointermove",
//                 (pointer: { x: number; y: number }) => {
//                     const deltaX = pointer.x - initialX;
//                     const deltaY = pointer.y - initialY;

//                     this.camera.scrollX -= deltaX * sensitivity;
//                     this.camera.scrollY -= deltaY * sensitivity;

//                     initialX = pointer.x;
//                     initialY = pointer.y; // Reset initial position for continuous panning
//                 }
//             );

//             this.input.on("pointerup", () => {
//                 this.input.off("pointermove");
//             });
//         }
//     }
// );

// this.tileOutline.x = Phaser.Math.Snap.To(
//     worldPoint.x,
//     TILE_WIDTH - TILE_HEIGHT
// );
// this.tileOutline.y = Phaser.Math.Snap.To(
//     worldPoint.y,
//     (TILE_WIDTH + TILE_HEIGHT) / 2
// );

// 2d vector of mouse position
