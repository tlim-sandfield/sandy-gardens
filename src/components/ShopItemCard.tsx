import ShopItem from "@/types/ShopItem";

export default function ShopItemCard({ name, src, price }: ShopItem) {
    return (
        <div>
            <img className="item-img" src={src} alt="Item" />
            <div className="shop-item-info">
                <h4>{name}</h4>
                <p>{price} 🪙</p>
            </div>
        </div>
    );
}
