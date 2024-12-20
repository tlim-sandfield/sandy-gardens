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
        this.load.image("star", "assets/star.png");

        this.loadPlants();
    }

    create() {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the Game. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start("Game");
    }

    loadPlants() {
        this.load.image("plant_91", "assets/plants/0.png");
        this.load.image("plant_92", "assets/plants/1.png");
        this.load.image("plant_93", "assets/plants/2.png");
        this.load.image("plant_94", "assets/plants/3.png");
        this.load.image("plant_95", "assets/plants/4.png");
        this.load.image("plant_96", "assets/plants/5.png");
        this.load.image("plant_97", "assets/plants/6.png");
        this.load.image("plant_98", "assets/plants/7.png");
        this.load.image("plant_99", "assets/plants/8.png");
        this.load.image("plant_100", "assets/plants/9.png");
        this.load.image("plant_101", "assets/plants/10.png");
        this.load.image("plant_102", "assets/plants/11.png");
    }
}
