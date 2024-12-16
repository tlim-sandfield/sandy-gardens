"use client";

import { useRef } from "react";
import { IRefPhaserGame, PhaserGame } from "./game/PhaserGame";
import HomeButton from "./components/HomeButton";

export default function App() {
    const phaserRef = useRef<IRefPhaserGame | null>(null);

    return (
        <div id="game">
            <PhaserGame ref={phaserRef} />
            <HomeButton />
        </div>
    );
}
