interface ShopItemProps {
    name: string;
    src: string;
    price: number;
}

export default function ShopItem({ name, src, price }: ShopItemProps) {
    return (
        <div className="shop-item">
            <img className="item-img" src={src} alt="Item" />
            <div className="shop-item-info">
                <h4>{name}</h4>
                <p>{price} 🪙</p>
            </div>
        </div>
    );
}
