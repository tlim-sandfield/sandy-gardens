export default function ShopItem({
    name,
    img,
    price,
}: {
    name: string;
    img: string;
    price: number;
}) {
    return (
        <div className="shop-item">
            <img className="item-img" src={img} alt="Item" />
            <div className="shop-item-info">
                <h4>{name}</h4>
                <p>{price} 🪙</p>
            </div>
        </div>
    );
}
