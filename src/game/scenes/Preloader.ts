import { Scene } from "phaser";

export class Preloader extends Scene {
    constructor() {
        super("Preloader");
    }

    init() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        //  A simple progress bar. This is the outline of the bar.
        this.add
            .rectangle(centerX, centerY, 468, 32)
            .setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(centerX - 234, centerY, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on("progress", (progress: number) => {
            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + 460 * progress;
        });
    }

    preload() {
        //  Load the assets for the game
        this.load.tilemapTiledJSON("map", "assets/tiles/map.json");
        this.load.image("tiles", "assets/tiles/128x96 Tiles.png");
        this.load.image("plants", "assets/tiles/128x256 Trees.png");
        this.load.image("highlight", "assets/tiles/tile-outline-blue.png");
        this.load.image("select", "assets/tiles/tile-outline-yellow.png");

        this.loadPlants();
    }

    create() {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the Game. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start("Game");
    }

    loadPlants() {
        this.load.image("plant_0", "assets/plants/pine_tree.png");
        this.load.image("plant_1", "assets/plants/palm_tree_1.png");
        this.load.image("plant_2", "assets/plants/palm_tree_2.png");
        this.load.image("plant_3", "assets/plants/4.png");
        this.load.image("plant_4", "assets/plants/5.png");
    }
}
