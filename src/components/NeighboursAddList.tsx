import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Button } from "@mui/material";
import nameToID from "@/util/nameToID";
import me from "@/data/me";
import incomingAddsHashMap from "@/data/incomingAddsHashMap";
import neighboursHashMap from "@/data/neighboursHashMap";

interface NeighboursAddListProps {
    searchList: string[];
}

export default function NeighboursAddList({
    searchList,
}: NeighboursAddListProps) {
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
                                        neighboursHashMap[me].add(
                                            nameToID(value) as number
                                        );
                                        incomingAddsHashMap[
                                            nameToID(value) as number
                                        ].add(me);
                                    }}
                                >
                                    Add
                                </Button>
                            </div>
                        </ListItem>
                    );
                })
            ) : (
                <p>No neighbours found!</p>
            )}
        </List>
    );
}
