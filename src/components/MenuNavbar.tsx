"use client"

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
import ProfilePicture from '../../public/assets/bg.png';

const menu = [
    { label: '🧑‍🤝‍🧑 Neighbours', href: '/neighbours' },
    { label: '❓ Help', href: '/help' },
    { label: '⚙️ Settings', href: '/settings' },
];

export default function MenuNavbar() {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

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
                    John Doe
                </Typography>
                <Box sx={{ flexGrow: 2, ml: 3 }}>
                    Level 23
                </Box>
                <Box sx={{ flexGrow: 0, mr: 5, }}>
                    🪙 52
                </Box>
                <Box>
                    <Tooltip title="Open menu">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt="Remy Sharp" src={ProfilePicture.src} />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        {menu.map(({ label, href }) => (
                            <Link
                                href={href}
                                className='nav-link'>
                                <MenuItem
                                    key={label}
                                    onClick={handleCloseUserMenu}>
                                    <Typography sx={{ textAlign: 'center' }}>{label}</Typography>
                                </MenuItem>
                            </Link>
                        ))}
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
