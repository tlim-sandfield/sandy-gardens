import { useEffect, useState } from "react";
import { Reorder } from "framer-motion";
import { Item } from "./Item";
import neighboursHashMap from "@/data/neighboursHashMap";
import getNames from "@/util/getNames";

export default function DraggableList() {
    const [items, setItems] = useState(getNames(neighboursHashMap));

    useEffect(() => {
        const updateItems = () => {
            setItems(getNames(neighboursHashMap));
        };

        updateItems();
    }, [neighboursHashMap]);

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
