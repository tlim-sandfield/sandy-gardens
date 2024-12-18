import { Game as MainGame } from "./scenes/Game";
import { AUTO, Game } from "phaser";
import { Preloader } from "./scenes/Preloader";

// Information about Game Config: https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig

const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: "game-container",
    backgroundColor: "#CBDCB4",
    scale: {
        mode: Phaser.Scale.RESIZE,
    },
    scene: [Preloader, MainGame],
};

export default function StartGame(parent: string) {
    return new Game({ ...config, parent });
}
