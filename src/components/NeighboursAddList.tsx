import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Button } from "@mui/material";
import nameToID from "@/util/nameToID";
import {
    useNeighbours,
    useNeighboursDispatch,
} from "../contexts/NeighboursContext";
import { useIncomingAddsDispatch } from "@/contexts/IncomingAddsContext";
import randomiseAndShortenList from "@/util/randomiseAndShortenList";
import salnetHoursWorkedList from "@/data/salnetHoursWorkedList";

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
    const neighbours = useNeighbours();

    function handleAdd(value: string) {
        // setSearchList(() => {
        //     searchList.filter((name) => name !== value);
        //     // searchList.push(
        //     //     randomiseAndShortenList(
        //     //         salnetHoursWorkedList.map((person) => person.name),
        //     //         1
        //     //     )[0]
        //     // );
        // });

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
                <p>No neighbours found!</p>
            )}
        </List>
    );
}
