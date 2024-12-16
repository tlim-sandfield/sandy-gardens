import Button from "@mui/material/Button";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { EventBus } from "@/game/EventBus";

export default function HomeButton() {
    function openShop(): void {
        EventBus.emit("open-shop");
    }

    return (
        <Button
            variant="contained"
            color="primary"
            className="game-button shop-button"
            onClick={() => openShop()}
        >
            <ShoppingCartIcon />
        </Button>
    );
}
