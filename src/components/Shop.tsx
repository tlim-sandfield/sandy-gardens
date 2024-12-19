import { Button } from "@mui/material";
import tree from "../../public/assets/tiles/tree.png";
import ShopItemCard from "./ShopItemCard";
import shopItems from "@/data/shopItems";
import { Key, useState } from "react";
import { EventBus } from "@/game/EventBus";
import ShopItem from "@/types/ShopItem";

export default function Shop() {
    const [selectedItem, setSelectedItem] = useState<ShopItem>();

    function handleSelectedItem(item: ShopItem) {
        if (selectedItem === item) {
            setSelectedItem(undefined);
            EventBus.emit("shop-item-selected", undefined);
            return;
        }
        setSelectedItem(item);
        EventBus.emit("shop-item-selected", item);
    }

    return (
        <div className="shop-content">
            <div className="current-item-container">
                <h1>Shop</h1>
                <h4>Currently:</h4>
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
                    <div
                        key={item.id}
                        className={`shop-item ${
                            selectedItem === item ? "selected" : ""
                        }`}
                        onClick={() => handleSelectedItem(item)}
                    >
                        <ShopItemCard
                            key={item.id as Key}
                            id={item.id}
                            name={item.name}
                            src={item.src}
                            price={item.price}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
