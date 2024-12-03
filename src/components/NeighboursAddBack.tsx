import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Button } from "@mui/material";
import incomingAddBacksList from "@/data/incomingAddBacksList";
import salnetHoursWorkedList from "@/data/salnetHoursWorkedList";

export default function NeighboursAddBack() {
    const allNames = salnetHoursWorkedList
        .filter((person) => incomingAddBacksList.includes(person.resourceID))
        .map((person) => person.name);

    return (
        <List dense sx={{ width: "100%" }}>
            {allNames.map((value) => {
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
                            <Button color="primary">Add back</Button>
                        </div>
                    </ListItem>
                );
            })}
        </List>
    );
}
