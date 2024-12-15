interface PanCameraProps {
    camera: Phaser.Cameras.Scene2D.Camera;
    input: Phaser.Input.InputPlugin;
    pointer: Phaser.Input.Pointer;
}
3;

export default function panCamera({ camera, input, pointer }: PanCameraProps) {
    const keySpace = input?.keyboard?.addKey(
        Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    // PAN: SPACE + left-click mouse drag or middle mouse button drag
    if (pointer.middleButtonDown()) {
        input.setDefaultCursor("grabbing");

        let initialX = pointer.x;
        let initialY = pointer.y;

        input.on("pointermove", (pointer: { x: number; y: number }) => {
            const deltaX = pointer.x - initialX;
            const deltaY = pointer.y - initialY;

            camera.scrollX -= deltaX;
            camera.scrollY -= deltaY;

            // Update initial position for the next frame
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
