import { Button } from "@mui/material";
import tree from "../../public/assets/tiles/tree.png";
import ShopItem from "./ShopItem";
import shopItems from "@/data/shopItems";
import { Key, useState } from "react";

export default function Shop() {
    const [selectedItem, setSelectedItem] = useState<typeof ShopItem>();

    return (
        <div className="shop-content">
            <div className="current-item-container">
                <h1>Shop</h1>
                <h4>Currently selected:</h4>
                <div className="shop-current-item">
                    <img
                        className="item-img"
                        src={tree.src}
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
            <div className="shop-item-grid">
                {shopItems.map((item) => (
                    <ShopItem
                        key={item.id as Key}
                        name={item.name}
                        src={item.src}
                        price={item.price}
                    />
                ))}
            </div>
        </div>
    );
}
