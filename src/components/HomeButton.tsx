import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import { EventBus } from "@/game/EventBus";

export default function HomeButton() {
    function centreGame(): void {
        EventBus.emit("centre-game");
    }

    return (
        <Button
            variant="contained"
            color="primary"
            className="home-button"
            onClick={() => centreGame()}
        >
            <HomeIcon />
        </Button>
    );
}
