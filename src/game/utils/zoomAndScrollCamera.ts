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
    const ZOOM_SPEED = 0.00025;
    const MOVEMENT_SPEED = 50 / camera.zoom;

    const keyCtrl = input?.keyboard?.addKey(
        Phaser.Input.Keyboard.KeyCodes.CTRL
    );

    if (keyCtrl?.isDown) {
        // ZOOM: mouse wheel up and down
        camera.zoom += pointer.deltaY * -ZOOM_SPEED;

        if (camera.zoom < 0.15) {
            camera.zoom = 0.15;
        } else if (camera.zoom > 1.5) {
            camera.zoom = 1.5;
        }
    } else {
        // SCROLL: mouse wheel up and down
        const cameraYChange =
            pointer.deltaY > 0 ? MOVEMENT_SPEED : -MOVEMENT_SPEED;
        camera.scrollY += cameraYChange;
    }
}
