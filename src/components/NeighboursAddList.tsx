import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Button } from "@mui/material";
import nameToID from "@/util/nameToID";
import { useNeighboursDispatch } from "../contexts/NeighboursContext";
import { useIncomingAddsDispatch } from "@/contexts/IncomingAddsContext";

interface NeighboursAddListProps {
    searchList: string[];
    setSearchList: Function;
}

export default function NeighboursAddList({
    searchList,
    setSearchList,
}: NeighboursAddListProps) {
    const dispatchNeighbours = useNeighboursDispatch();
    const dispatchIncomingAdds = useIncomingAddsDispatch();

    function handleAdd(value: string) {
        setSearchList(() => {
            const filteredList = searchList.filter(
                (person) => person !== value,
            );
            return filteredList;
        });

        if (dispatchNeighbours) {
            dispatchNeighbours({
                type: "added",
                id: nameToID(value) as number,
            });
        }
        if (dispatchIncomingAdds) {
            dispatchIncomingAdds({
                type: "added",
                id: nameToID(value) as number,
            });
        }
    }

    return (
        <List dense sx={{ width: "100%" }}>
            {searchList.length > 0 ? (
                searchList.map((value: string) => {
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
                                <ListItemText id={labelId} primary={value} />
                                <Button
                                    color="primary"
                                    onClick={() => {
                                        handleAdd(value);
                                    }}
                                >
                                    Add
                                </Button>
                            </div>
                        </ListItem>
                    );
                })
            ) : (
                <div className="neighbours-list">
                    <ListItemText primary="No neighbours found!" />
                </div>
            )}
        </List>
    );
}
