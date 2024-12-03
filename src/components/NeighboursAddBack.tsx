import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Button } from "@mui/material";
import people from "@/data/people"

export default function NeighboursAddBack() {
    return (
        <List dense sx={{ width: "100%" }}>
            {people.map((value) => {
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
