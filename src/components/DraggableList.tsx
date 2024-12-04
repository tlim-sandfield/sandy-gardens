import * as React from "react";
import { useState } from "react";
import { Reorder } from "framer-motion";
import { Item } from "./Item";
import neighbourList from "@/data/neighboursList";
import getNames from "@/util/getNames";

export default function DraggableList() {
    const [items, setItems] = useState(getNames(neighbourList));

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
