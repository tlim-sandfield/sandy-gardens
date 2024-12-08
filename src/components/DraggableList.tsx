import { useEffect, useState } from "react";
import { Reorder } from "framer-motion";
import { Item } from "./Item";
import getNames from "@/util/getNames";
import {
    useNeighbours,
    useNeighboursDispatch,
} from "../contexts/NeighboursContext";
import IntegerHashMap from "@/types/IntegerHashMap";
import nameToID from "@/util/nameToID";
import me from "@/data/me";

export default function DraggableList() {
    const neighbours = useNeighbours();
    // const dispatch = useNeighboursDispatch();
    const [items, setItems] = useState(getNames(neighbours as IntegerHashMap));

    useEffect(() => {
        const updateItems = () => {
            setItems(getNames(neighbours as IntegerHashMap));
        };
        updateItems();
    }, [neighbours]);

    function handleReorder(): void {}

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
