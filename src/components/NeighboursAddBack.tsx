import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Button } from "@mui/material";

export default function NeighboursAddBack() {
    return (
        <List dense sx={{ width: "100%" }}>
            {[0, 1, 2, 3].map((value) => {
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
                            <ListItemAvatar>
                                <Avatar
                                    alt={`Avatar n°${value + 1}`}
                                    src={`/static/images/avatar/${
                                        value + 1
                                    }.jpg`}
                                />
                            </ListItemAvatar>
                            <ListItemText
                                id={labelId}
                                primary={`Person ${value + 1} just added you as a neighbour!`}
                            />
                            <Button color="primary">Add back</Button>
                        </div>
                    </ListItem>
                );
            })}
        </List>
    );
}
