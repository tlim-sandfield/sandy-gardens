import * as React from "react";
import { useMotionValue, Reorder, useDragControls } from "framer-motion";
import { useRaisedShadow } from "@/util/use-raised-shadow";
import { ReorderIcon } from "../../public/ReorderIcon";
import { ListItemAvatar, Avatar, ListItemText } from "@mui/material";

interface Props {
    item: string;
}

export const Item = ({ item }: Props) => {
    const y = useMotionValue(0);
    const boxShadow = useRaisedShadow(y);
    const dragControls = useDragControls();

    return (
        <Reorder.Item
            value={item}
            id={item}
            style={{ boxShadow, y }}
            dragListener={false}
            dragControls={dragControls}
        >
            <ListItemAvatar>
                <Avatar
                    alt={`Avatar n°${item + 1}`}
                    src={`/static/images/avatar/${item + 1}.jpg`}
                />
            </ListItemAvatar>
            <ListItemText primary={item} />
            <ReorderIcon dragControls={dragControls} />
        </Reorder.Item>
    );
};
