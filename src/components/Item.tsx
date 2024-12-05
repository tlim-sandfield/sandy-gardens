import * as React from "react";
import { useMotionValue, Reorder, useDragControls } from "framer-motion";
import { useRaisedShadow } from "@/util/use-raised-shadow";
import { ReorderIcon } from "../../public/ReorderIcon";
import ClearIcon from "@mui/icons-material/Clear";
import { ListItemText, Button } from "@mui/material";
import nameToID from "@/util/nameToID";
import { useNeighboursDispatch } from "../contexts/NeighboursContext";

interface Props {
    item: string;
}

export const Item = ({ item }: Props) => {
    const y = useMotionValue(0);
    const boxShadow = useRaisedShadow(y);
    const dragControls = useDragControls();
    const dispatch = useNeighboursDispatch();

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
            <Button
                className="clear-btn"
                onClick={() => {
                    if (dispatch) {
                        dispatch({
                            type: "deleted",
                            id: nameToID(item) as number,
                        });
                    }
                }}
            >
                <ClearIcon />
            </Button>
        </Reorder.Item>
    );
};
