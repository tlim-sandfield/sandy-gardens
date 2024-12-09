import { useEffect, useState } from "react";
import { Reorder } from "framer-motion";
import { Item } from "./Item";
import { useNeighbours } from "../contexts/NeighboursContext";
import IDsToNames from "@/util/IDsToNames";
import me from "@/data/me";

interface DraggableListProps {
    items: string[];
    setItems: (newOrder: string[]) => void;
}

export default function DraggableList({ items, setItems }: DraggableListProps) {
    return (
        <div className="draggable-list">
            <Reorder.Group as="ol" axis="y" onReorder={setItems} values={items}>
                {items.map((item) => (
                    <Item
                        key={item}
                        item={item}
                        newOrder={items}
                        setItems={setItems}
                    />
                ))}
            </Reorder.Group>
        </div>
    );
}
