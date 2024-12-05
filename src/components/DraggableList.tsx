import { useEffect, useState } from "react";
import { Reorder } from "framer-motion";
import { Item } from "./Item";
import getNames from "@/util/getNames";
import { useNeighbours } from "../contexts/NeighboursContext";

export default function DraggableList() {
    const neighbours = useNeighbours();
    const [items, setItems] = useState(getNames(neighbours ?? {}));

    useEffect(() => {
        const updateItems = () => {
            setItems(getNames(neighbours ?? {}));
            console.log(neighbours);
        };

        updateItems();
    }, [neighbours]);

    return (
        <div className="draggable-list">
            <Reorder.Group axis="y" onReorder={setItems} values={items}>
                {items && items.map((item) => <Item key={item} item={item} />)}
            </Reorder.Group>
        </div>
    );
}
