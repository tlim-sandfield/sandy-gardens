"use client"

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

const menu = [
    { label: '🧑‍🤝‍🧑 Neighbours', href: '/neighbours' },
    { label: '❓ Help', href: '/help' },
    { label: '⚙️ Settings', href: '/settings' },
];

export default function MenuNavbar() {
    return (
        <AppBar position="absolute" sx={{ backgroundColor: "white", color: "black" }}>
            <Toolbar>
                <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    sx={{
                        display: { md: 'flex' },
                        fontWeight: 700,
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    Main Menu
                </Typography>
                <Box sx={{ flexGrow: 2 }} />
                <Box>
                    <Button variant='contained' sx={{ backgroundColor: "lightgreen" }}>
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="/"
                            className='go-back'
                        >
                            ⬅ Go Back
                        </Typography>
                    </Button>
                </Box>
            </Toolbar>
        </AppBar >
    );
}
