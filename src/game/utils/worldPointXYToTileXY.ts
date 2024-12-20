import { TILE_WIDTH, TILE_HEIGHT } from "../gameConstants";

export default function worldPointXYToTileXY(
    worldPoint: Phaser.Math.Vector2,
): Phaser.Math.Vector2 {
    const cellX = worldPoint.x / TILE_WIDTH;
    const cellY = worldPoint.y / TILE_HEIGHT;

    const tileX = Math.floor(cellY + cellX);
    const tileY = Math.floor(cellY - cellX);

    return new Phaser.Math.Vector2(tileX, tileY);
}
