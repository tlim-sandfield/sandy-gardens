"use client";

import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import GroupsIcon from "@mui/icons-material/Groups";
import SettingsIcon from "@mui/icons-material/Settings";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useEffect, useState } from "react";

const drawerWidth = 240;

const menu = [
    { label: "Garden", icon: <LocalFloristIcon />, href: "/" },
    { label: "Neighbours", icon: <GroupsIcon />, href: "/neighbours" },
    { label: "Help", icon: <QuestionMarkIcon />, href: "/help" },
    { label: "Settings", icon: <SettingsIcon />, href: "/settings" },
];

interface PersistentDrawerLeftProps {
    open: boolean;
    setOpen: Function;
}

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft({
    open,
    setOpen,
}: PersistentDrawerLeftProps) {
    const theme = useTheme();
    const [currentPage, setCurrentPage] = useState("");

    // TODO: drawer-active not being added for 🏡 Garden due to conflicts with PhaserGame
    useEffect(() => {
        const storedPage = localStorage.getItem("currentPage");
        if (storedPage) {
            setCurrentPage(storedPage);
        }
    }, []);

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <CssBaseline />

            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === "ltr" ? (
                            <ChevronLeftIcon />
                        ) : (
                            <ChevronRightIcon />
                        )}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {menu.map(({ label, icon, href }) => (
                        <div className="drawer-items">
                            <ListItem key={label} disablePadding>
                                <ListItemButton
                                    href={href}
                                    className={
                                        currentPage === label
                                            ? "drawer-active"
                                            : ""
                                    }
                                    onClick={() =>
                                        localStorage.setItem(
                                            "currentPage",
                                            label
                                        )
                                    }
                                >
                                    {icon}
                                    &nbsp; &nbsp;
                                    <ListItemText primary={label} />
                                </ListItemButton>
                            </ListItem>
                        </div>
                    ))}
                </List>
            </Drawer>
        </div>
    );
}
