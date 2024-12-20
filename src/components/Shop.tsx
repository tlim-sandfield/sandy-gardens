import { Button } from "@mui/material";
import tree from "../../public/assets/plants/pine_tree.png";
import ShopItemCard from "./ShopItemCard";
import shopItems from "@/data/shopItems";
import { Key, useState } from "react";
import { EventBus } from "@/game/EventBus";

export default function Shop() {
    const [selectedItemID, setSelectedItemID] = useState<number>();

    function handleSelectedItem(itemID: number) {
        if (selectedItemID === itemID) {
            setSelectedItemID(undefined);
            EventBus.emit("shop-item-selected", undefined);
            return;
        }
        setSelectedItemID(itemID);
        EventBus.emit("shop-item-selected", itemID);
    }

    return (
        <div className="shop-content">
            <div className="current-item-container">
                <h1>Shop</h1>
                {/* <h4>Currently:</h4>
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
                </div> */}
            </div>
            <div className="shop-item-grid">
                {shopItems.map((item) => (
                    <div
                        key={item.id}
                        className={`shop-item ${
                            selectedItemID === item.id ? "selected" : ""
                        }`}
                        onClick={() => handleSelectedItem(item.id)}
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
