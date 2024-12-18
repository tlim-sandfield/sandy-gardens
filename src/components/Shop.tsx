import { Button } from "@mui/material";
import selectedItem from "../../public/assets/tiles/tree.png";

export default function Shop() {
    return (
        <div className="shop-content">
            <h1>Shop</h1>
            <h4>Currently selected:</h4>
            <div className="shop-current-item">
                <img
                    className="current-item-img"
                    src={selectedItem.src}
                    alt="Selected item"
                />
                <div className="sell-section">
                    <Button variant="contained" onClick={() => {}}>
                        Sell
                    </Button>
                    <p>for 10 🪙</p>
                </div>
            </div>
        </div>
    );
}
