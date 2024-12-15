interface MoveCameraProps {
    camera: Phaser.Cameras.Scene2D.Camera;
    input: Phaser.Input.InputPlugin;
}

export default function moveCamera({ camera, input }: MoveCameraProps) {
    const ZOOM_SPEED = 0.001;
    const MOVEMENT_SPEED = 50;

    const keyCtrl = input?.keyboard?.addKey(
        Phaser.Input.Keyboard.KeyCodes.CTRL
    );

    if (keyCtrl?.isDown) {
        // ZOOM: CTRL + mouse wheel up and down
        const zoomChange = input.activePointer.deltaY * -ZOOM_SPEED;
        camera.zoom += zoomChange;
    } else {
        // SCROLL: mouse wheel up and down
        const cameraYChange =
            input.activePointer.deltaY > 0 ? MOVEMENT_SPEED : -MOVEMENT_SPEED;
        camera.scrollY += cameraYChange;
    }
}
