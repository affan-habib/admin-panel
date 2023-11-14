// AppBarComponent.tsx

import React from 'react';
import { Box } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { styled } from '@mui/material/styles';


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
              marginRight: 5,
            }}
          >
            <MenuIcon />
          </IconButton>
        </Box>

        <IconButton color="primary" aria-label="logout" onClick={handleLogout}>
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
