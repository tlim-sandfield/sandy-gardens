"use client";

import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, styled } from "@mui/material";
import me from "@/data/me";
import salnetHoursWorkedList from "@/data/salnetHoursWorkedList";

const drawerWidth = 240;

interface CustomNavbarProps {
    open: boolean;
    setOpen: Function;
}

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
    transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
        {
            props: ({ open }) => open,
            style: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: `${drawerWidth}px`,
                transition: theme.transitions.create(["margin", "width"], {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
    ],
}));

export default function CustomNavbar({ open, setOpen }: CustomNavbarProps) {
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    return (
        <AppBar
            position="fixed"
            open={open}
            sx={{ backgroundColor: "--mui-palette-primary-main" }}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={[{ mr: 2 }, open && { display: "none" }]}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                    {
                        salnetHoursWorkedList.filter(
                            (person) => person.resourceID === me
                        )[0].name
                    }
                </Typography>
                <Box sx={{ flexGrow: 2 }} />
                <Box>Level 23 &nbsp; | &nbsp; 🪙 52</Box>
            </Toolbar>
        </AppBar>
    );
}