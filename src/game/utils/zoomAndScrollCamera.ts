interface MoveCameraProps {
    camera: Phaser.Cameras.Scene2D.Camera;
    input: Phaser.Input.InputPlugin;
    pointer: Phaser.Input.Pointer;
}

export default function zoomAndScrollCamera({
    camera,
    input,
    pointer,
}: MoveCameraProps) {
    const ZOOM_SPEED = 0.001;
    const MOVEMENT_SPEED = 50 / camera.zoom;

    const keyCtrl = input?.keyboard?.addKey(
        Phaser.Input.Keyboard.KeyCodes.CTRL
    );

    if (keyCtrl?.isDown) {
        // ZOOM: mouse wheel up and down
        const zoomChange = pointer.deltaY * -ZOOM_SPEED;
        camera.zoom += zoomChange;

        if (camera.zoom < 0.15) {
            camera.zoom = 0.15;
        } else if (camera.zoom > 1.5) {
            camera.zoom = 1.5;
        } else {
            const pointerX = pointer.x;
            const pointerY = pointer.y;
            const cameraX = camera.scrollX + camera.width / 2;
            const cameraY = camera.scrollY + camera.height / 2;
            const dx = pointerX - cameraX;
            const dy = pointerY - cameraY;

            camera.scrollX += dx * zoomChange;
            camera.scrollY += dy * zoomChange;
        }
    } else {
        // SCROLL: mouse wheel up and down
        const cameraYChange =
            pointer.deltaY > 0 ? MOVEMENT_SPEED : -MOVEMENT_SPEED;
        camera.scrollY += cameraYChange;
    }
}
