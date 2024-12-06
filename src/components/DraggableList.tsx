import { useEffect, useState } from "react";
import { Reorder } from "framer-motion";
import { Item } from "./Item";
import getNames from "@/util/getNames";
import { useNeighbours } from "../contexts/NeighboursContext";
import IntegerHashMap from "@/types/IntegerHashMap";

export default function DraggableList() {
    const neighbours = useNeighbours();
    const [items, setItems] = useState(getNames(neighbours as IntegerHashMap));

    useEffect(() => {
        const updateItems = () => {
            setItems(getNames(neighbours as IntegerHashMap));
        };
        updateItems();
    }, [neighbours]);

    return (
        <div className="draggable-list">
            <Reorder.Group axis="y" onReorder={setItems} values={items}>
                {items.map((item) => (
                    <Item key={item} item={item} />
                ))}
            </Reorder.Group>
        </div>
    );
}
