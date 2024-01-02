import * as React from 'react';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useMediaQuery } from '@mui/material';
import { useEffect } from 'react';
import logo from '../../assets/logo.svg';
const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  backgroundColor: theme.palette.primary.main, // Set the background color to the primary color
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': {
      ...openedMixin(theme),
      backgroundColor: theme.palette.primary.main, // Set the background color to the primary color
    },
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': {
      ...closedMixin(theme),
      backgroundColor: theme.palette.primary.main, // Set the background color to the primary color
    },
  }),
}));

interface DashboardLayoutProps {
  children: React.ReactNode;
}
const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [open, setOpen] = React.useState(true);
  const [shouldSidebarBeOpen, setShouldSidebarBeOpen] = React.useState(true);
  const navigate = useNavigate();

  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  useEffect(() => {
    // Close the sidebar when the screen is small (mobile)
    if (isMobile) {
      setShouldSidebarBeOpen(false);
    } else {
      // Open the sidebar when the screen is larger
      setShouldSidebarBeOpen(true);
    }
  }, [isMobile]);

  const handleToggleDrawer = () => {
    setShouldSidebarBeOpen(!shouldSidebarBeOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header
        open={shouldSidebarBeOpen}
        handleToggleDrawer={handleToggleDrawer}
        handleLogout={handleLogout}
      />
      <Box minHeight={'100vh'}>
        <Drawer variant="permanent" open={shouldSidebarBeOpen}>
          <DrawerHeader sx={{ bgcolor: 'rgba(0, 106, 78, 1)', cursor: 'pointer' }} onClick={() => navigate('/')}><img
            src={logo}
            alt=""
            style={{
              width: '164px', // Set maximum width relative to its container
              height: 'auto'

            }} /></DrawerHeader>
          <Divider />
          <Sidebar handleLogout={handleLogout} isSidebarOpen={shouldSidebarBeOpen} />
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
