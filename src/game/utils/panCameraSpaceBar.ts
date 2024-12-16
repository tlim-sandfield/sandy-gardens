 interface PanCameraProps {
    camera: Phaser.Cameras.Scene2D.Camera;
    input: Phaser.Input.InputPlugin;
    pointer: Phaser.Input.Pointer;
}

// PAN: SPACE + left-click mouse drag or scroll wheel drag.
// problem: pointerdown active after spacebar is tapped
export default function panCameraSpaceBar({
    camera,
    input,
    pointer,
}: PanCameraProps) {
    input.setDefaultCursor("grab");
    input.on("pointerdown", () => {
        if (pointer.leftButtonDown()) {
            input.setDefaultCursor("grabbing");
            let initialX = pointer.x;
            let initialY = pointer.y;
            console.log(initialX, initialY);

            input.on("pointermove", (pointer: { x: number; y: number }) => {
                const deltaX = pointer.x - initialX;
                const deltaY = pointer.y - initialY;

                camera.scrollX -= deltaX;
                camera.scrollY -= deltaY;

                initialX = pointer.x;
                initialY = pointer.y;
            });
        }
    });

    input.on("pointerup", () => {
        if (pointer.leftButtonReleased()) {
            input.setDefaultCursor("grab");
            input.off("pointermove");
        }
    });
}
