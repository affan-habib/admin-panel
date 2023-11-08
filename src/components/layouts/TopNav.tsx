import React, {useCallback} from 'react';
import {Box, IconButton, Stack, SvgIcon, Tooltip} from '@mui/material';
import {alpha} from '@mui/material/styles';
import ArrowLeftOnRectangleIcon from '@heroicons/react/24/solid/ArrowLeftOnRectangleIcon';
import {logout} from '../../features/auth/authSlice';
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;


export const TopNav = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSignOut = useCallback(() => {
        dispatch(logout());
        localStorage.removeItem('token');
        navigate('/login');
    }, [dispatch, navigate]);


    return (
        <>
            <Box
                component="header"
                sx={{
                    backdropFilter: 'blur(6px)',
                    backgroundColor: (theme) => alpha(theme.palette.background.default, 0.8),
                    position: 'sticky',
                    left: {
                        lg: `${SIDE_NAV_WIDTH}px`
                    },
                    top: 0,
                    width: {
                        lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`
                    },
                    zIndex: (theme) => theme.zIndex.appBar
                }}
            >
                <Stack
                    alignItems="center"
                    direction="row"
                    justifyContent="space-between"
                    spacing={2}
                    sx={{
                        minHeight: TOP_NAV_HEIGHT,
                        px: 2
                    }}
                >
                    <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                    >
                        <Tooltip title="Logout">
                            <IconButton
                                onClick={handleSignOut}
                            >
                                <SvgIcon fontSize="small">
                                    <ArrowLeftOnRectangleIcon/>
                                </SvgIcon>
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </Stack>
            </Box>
        </>
    );
};
