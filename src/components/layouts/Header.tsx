import React, { useState } from 'react';
import {
  Box,
  Avatar,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  Popover,
  Grid,
  styled,
} from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Person } from '@mui/icons-material';
import LanguageSelect from 'components/common/LanguageSelect';
import { useTranslation } from 'react-i18next';
import notificationIcon from 'assets/Notification.svg';
import { useNavigate } from 'react-router-dom';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import AllDashbordDialog from 'views/allDashbord/AllDashbordDialog';

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
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [gridAnchorEl, setGridAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleGridClick = (event: React.MouseEvent<HTMLElement>) => {
    setGridAnchorEl(event.currentTarget);
  };

  const handleGridClose = () => {
    setGridAnchorEl(null);
  };

  const navigate = useNavigate();

  return (
    <AppBar
      position="fixed"
      open={open}
      sx={{ bgcolor: 'rgb(0, 106, 65,0.8)' }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            color="primary"
            aria-label="open drawer"
            onClick={handleToggleDrawer}
            edge="start"
            sx={{
              color: 'white',
              marginRight: 2,
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            color="white"
            sx={{
              marginRight: 2,
              '@media (max-width: 600px)': {
                display: 'none',
              },
            }}
          >
            {t('welcomeToLms')}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ marginRight: '18px' }} onClick={handleGridClick}>
            <DashboardCustomizeOutlinedIcon
              sx={{ fontSize: 24, cursor: 'pointer' }}
            />
          </Box>
          <Popover
            open={Boolean(gridAnchorEl)}
            anchorEl={gridAnchorEl}
            onClose={handleGridClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            sx={{ marginTop: '23px'}}
          >
            <Grid width={400} sx={{ border: '1px solid rgba(221, 221, 221, 1)', borderRadius: '8px'}}>
                <Grid  p={2}>
                  <AllDashbordDialog />
                </Grid>
            </Grid>
          </Popover>

          <Box mr={2}>
            <LanguageSelect />
          </Box>
          <Box>
            <NotificationsActiveOutlinedIcon sx={{ fontSize: 25 }} />
          </Box>
          <IconButton
            color="primary"
            aria-label="user-options"
            onClick={handleClick}
            sx={{ ml: 1, mb: 1 }}
          >
            <Avatar alt="User Avatar" sx={{ height: 25, width: 25 }}>
              <Person />
            </Avatar>
            <ExpandMoreIcon style={{ color: '#FFF' }} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => navigate('profile')}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
