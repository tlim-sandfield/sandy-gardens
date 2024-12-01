"use client"

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import Link from 'next/link';

const menu = [
    { label: '🧑‍🤝‍🧑 Neighbours', href: '/neighbours' },
    { label: '❓ Help', href: '/help' },
    { label: '⚙️ Settings', href: '/settings' },
];

export default function MenuNavbar() {
    return (
        <AppBar position="static" sx={{ backgroundColor: "white", color: "black" }}>
            <Toolbar sx={{ mx: 3 }}>
                <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    sx={{
                        mr: 2,
                        display: { md: 'flex' },
                        fontWeight: 700,
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    Main Menu
                </Typography>
                <Box sx={{ flexGrow: 2 }}>
                </Box>
                <Box>
                    <Link
                        href="/"
                        className='nav-link'>
                        <Button variant='contained'>
                            <Typography
                                variant="h5"
                                noWrap
                                component="a"
                                sx={{
                                    mr: 2,
                                    display: { md: 'flex' },
                                    textDecoration: 'none',
                                }}
                            >
                                ⬅ Go Back
                            </Typography>
                        </Button>
                    </Link>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
