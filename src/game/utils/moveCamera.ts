interface MoveCameraProps {
    camera: Phaser.Cameras.Scene2D.Camera;
    input: Phaser.Input.InputPlugin;
}

export default function moveCamera({ camera, input }: MoveCameraProps) {
    // SCROLL: mouse wheel up and down
    const movementSpeed = 50;
    const cameraYChange =
        input.activePointer.deltaY > 0 ? movementSpeed : -movementSpeed;
    camera.scrollY += cameraYChange;
}
