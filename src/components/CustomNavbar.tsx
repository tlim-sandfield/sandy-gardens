"use client";

import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import { Box } from "@mui/material";
import me from "@/data/me";

interface CustomNavbarProps {
    setOpen: Function;
}

export default function CustomNavbar({ setOpen }: CustomNavbarProps) {
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    return (
        <MuiAppBar
            position="fixed"
            sx={{ backgroundColor: "--mui-palette-primary-main" }}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={[{ mr: 2 }]}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                    {me.name}
                </Typography>
                <Box sx={{ flexGrow: 2 }} />
                <Box>Level 23 &nbsp; | &nbsp; 🪙 52</Box>
            </Toolbar>
        </MuiAppBar>
    );
}
