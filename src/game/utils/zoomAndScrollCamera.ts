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
    const ZOOM_SPEED = 0.0005;
    const MOVEMENT_SPEED = 50 / camera.zoom;

    const keyCtrl = input?.keyboard?.addKey(
        Phaser.Input.Keyboard.KeyCodes.CTRL,
    );

    if (keyCtrl?.isDown) {
        // ZOOM: mouse wheel up and down
        camera.zoom += pointer.deltaY * -ZOOM_SPEED;

        if (camera.zoom < 0.1) {
            camera.zoom = 0.1;
        } else if (camera.zoom > 1) {
            camera.zoom = 1;
        }
    } else {
        // SCROLL: mouse wheel up and down
        const cameraYChange =
            pointer.deltaY > 0 ? MOVEMENT_SPEED : -MOVEMENT_SPEED;
        camera.scrollY += cameraYChange;
    }
}
