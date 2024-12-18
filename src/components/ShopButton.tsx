import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

interface ShopButtonProps {
    open: boolean;
    setOpen: Function;
}

export default function ShopButton({ open, setOpen }: ShopButtonProps) {
    return (
        <Button
            variant="contained"
            color="primary"
            className="game-button shop-button"
            onClick={() => setOpen(!open)}
        >
            <ShoppingCartIcon />
        </Button>
    );
}
