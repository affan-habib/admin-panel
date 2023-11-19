// AppBarComponent.tsx

import React from 'react';
import { Box, Avatar, Badge, Typography } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { styled } from '@mui/material/styles';
import notificationIcon from 'assets/Notification.svg';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Person } from '@mui/icons-material';
const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

interface HeaderProps {
  open: boolean;
  handleToggleDrawer: () => void;
  handleLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({
  open,
  handleToggleDrawer,
  handleLogout,
}) => {
  return (
    <AppBar position="fixed" open={open} sx={{ bgcolor: 'white' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            color="primary"
            aria-label="open drawer"
            onClick={handleToggleDrawer}
            edge="start"
            sx={{
              marginRight: 2,
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="black" sx={{ marginRight: 2 }}>
            HSEP লার্নিং ম্যানেজমেন্ট সিস্টেম - এ স্বাগতম
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Notification Icon */}
          <img
            src={notificationIcon}
            alt="Notification Icon"
            style={{ height: 25, width: 25, marginRight: 20 }}
          />

          {/* Avatar */}
          <Avatar alt="User Avatar" sx={{ height: 25, width: 25 }}>
            <Person />
          </Avatar>

          <IconButton
            color="primary"
            aria-label="logout"
            sx={{ ml: 1 }}
            onClick={handleLogout}
          >
            <ExpandMoreIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
