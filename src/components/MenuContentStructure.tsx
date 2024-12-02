import * as React from 'react';
import { styled } from '@mui/material/styles';

const drawerWidth = 240;

interface MenuContentStructureProps {
    open: boolean;
    children?: React.ReactNode;
}

const MenuContentStructure = ({ open, children }: MenuContentStructureProps) => {
    const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
        open?: boolean;
    }>(({ theme }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        variants: [
            {
                props: ({ open }) => open,
                style: {
                    transition: theme.transitions.create('margin', {
                        easing: theme.transitions.easing.easeOut,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                    marginLeft: 0,
                },
            },
        ],
    }));

    return (
        <Main open={open}>
            {children}
        </Main>
    );
};

export default MenuContentStructure;