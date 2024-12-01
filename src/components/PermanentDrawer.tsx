"use client"

import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

const drawerWidth = 240;
const menu = [
  { label: '🧑‍🤝‍🧑 Neighbours', href: '/neighbours' },
  { label: '❓ Help', href: '/help' },
  { label: '⚙️ Settings', href: '/settings' },
];

export default function PermanentDrawer() {
  return (
    <Box sx={{ position: "absolute", zIndex: 0 }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
          zIndex: -1,
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <List>
          {menu.map(({ label, href }) => (
            <ListItem key={label} disablePadding>
              <ListItemButton href={href}>
                <ListItemText primary={label} sx={{ ml: 2 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
