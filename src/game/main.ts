import { Boot } from "./scenes/Boot";
import { GameOver } from "./scenes/GameOver";
import { Game as MainGame } from "./scenes/Game";
import { MainMenu } from "./scenes/MainMenu";
import { AUTO, Game } from "phaser";
import { Preloader } from "./scenes/Preloader";

// Information about Game Config: https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig

const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: "100%",
    height: "100%",
    parent: "game-container",
    backgroundColor: "#028af8",
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: "game-container",
    },
    scene: [Boot, Preloader, MainMenu, MainGame, GameOver],
};

export default function StartGame(parent: string) {
    return new Game({ ...config, parent });
}
