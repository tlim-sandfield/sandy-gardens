import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Button } from "@mui/material";
import nameToID from "@/utils/nameToID";
import {
    useIncomingAdds,
    useIncomingAddsDispatch,
} from "@/contexts/IncomingAddsContext";
import { useNeighboursDispatch } from "@/contexts/NeighboursContext";
import getAllNames from "@/utils/getAllNames";
import IntegerHashMap from "@/types/IntegerHashMap";

export default function NeighboursAddBack() {
    const incomingAddsNames = getAllNames(useIncomingAdds() as IntegerHashMap);
    const neighboursDispatch = useNeighboursDispatch();
    const incomingAddsDispatch = useIncomingAddsDispatch();

    return (
        <List dense sx={{ width: "100%" }}>
            {incomingAddsNames.map((value) => {
                const labelId = `checkbox-list-secondary-label-${value}`;
                return (
                    <ListItem
                        key={value}
                        disablePadding
                        sx={{
                            "&:hover": {
                                backgroundColor: "transparent",
                                "& .MuiListItemButton-root:hover": {
                                    backgroundColor: "transparent",
                                },
                            },
                        }}
                    >
                        <div className="neighbours-list">
                            <ListItemText
                                id={labelId}
                                primary={`${value} just added you as a neighbour!`}
                            />
                            <Button
                                variant="contained"
                                onClick={() => {
                                    if (neighboursDispatch) {
                                        neighboursDispatch({
                                            type: "added",
                                            id: nameToID(value) as number,
                                        });
                                    }
                                    if (incomingAddsDispatch) {
                                        incomingAddsDispatch({
                                            type: "added",
                                            id: nameToID(value) as number,
                                        });
                                    }
                                }}
                            >
                                Add back
                            </Button>
                        </div>
                    </ListItem>
                );
            })}
        </List>
    );
}
