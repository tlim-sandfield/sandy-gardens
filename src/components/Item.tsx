import * as React from "react";
import { useMotionValue, Reorder, useDragControls } from "framer-motion";
import { useRaisedShadow } from "@/util/use-raised-shadow";
import { ReorderIcon } from "../../public/ReorderIcon";
import ClearIcon from "@mui/icons-material/Clear";
import {
    ListItemAvatar,
    Avatar,
    ListItemText,
    Button,
    IconButton,
} from "@mui/material";

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
            <ReorderIcon dragControls={dragControls} />
            <ListItemText primary={item} sx={{ ml: 2 }} />
            <Button className="clear-btn">
                <ClearIcon />
            </Button>
        </Reorder.Item>
    );
};
