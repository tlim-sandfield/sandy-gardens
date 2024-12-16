interface PanCameraProps {
    camera: Phaser.Cameras.Scene2D.Camera;
    input: Phaser.Input.InputPlugin;
    pointer: Phaser.Input.Pointer;
}

// PAN: SPACE + left-click mouse drag or scroll wheel drag
export default function panCameraMouseWheel({
    camera,
    input,
    pointer,
}: PanCameraProps) {
    if (pointer.middleButtonDown()) {
        input.setDefaultCursor("grabbing");
        let initialX = pointer.x;
        let initialY = pointer.y;

        input.on("pointermove", (pointer: { x: number; y: number }) => {
            const deltaX = pointer.x - initialX;
            const deltaY = pointer.y - initialY;

            camera.scrollX -= deltaX;
            camera.scrollY -= deltaY;

            initialX = pointer.x;
            initialY = pointer.y;
        });
    }

    input.on("pointerup", () => {
        if (pointer.middleButtonReleased()) {
            input.setDefaultCursor("default");
            input.off("pointermove");
        }
    });
}
