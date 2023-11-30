import React from 'react';
import {useLocation} from 'react-router-dom';
import {Box, Drawer, Theme, useMediaQuery} from '@mui/material';
import {SideNavItem} from './SideNavItem';
import {items} from 'menu-items';

interface SideNavProps {
    open: boolean;
    onClose: () => void;
}

export const SideNav: React.FC<SideNavProps> = ({
                                                    open,
                                                    onClose
                                                }) => {
    const {pathname} = useLocation();
    const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));

    const content = (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
            }}
        >
            <Box
                sx={{
                    flexGrow: 1,
                    px: 2,
                    py: 3
                }}
            >
                {items.map((item) => {
                    const active = item.path ? (pathname === item.path) : false;

                    return (
                        <SideNavItem
                            active={active}
                            icon={item.icon}
                            key={item.title}
                            path={item.path}
                            title={item.title}
                        />
                    );
                })}
            </Box>
        </Box>
    );

    if (lgUp) {
        return (
            <Drawer
                anchor="left"
                open
                variant="permanent"
                // width 280

            >
                {content}
            </Drawer>
        );
    }

    return (
        <Drawer
            anchor="left"
            onClose={onClose}
            open={open}
            variant="temporary"
        >
            {content}
        </Drawer>
    );
};
