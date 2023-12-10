import React, { useState, useEffect } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  ListItemIcon,
  useMediaQuery,
} from '@mui/material';
import { ExpandLess, ExpandMore, Logout } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import UseGetMenuItems from './menu-items';
import { useTranslation } from 'react-i18next';

interface MenuItem {
  title: string;
  icon: JSX.Element;
  path: string;
  subMenu?: MenuItem[];
}

interface SidebarProps {
  handleLogout: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  isSidebarOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ handleLogout, isSidebarOpen }) => {
  const [menuStates, setMenuStates] = useState<{ [key: string]: boolean }>({});
  const [selectedMenu, setSelectedMenu] = useState<string | null>('/dashboard');
  const [selectedSubMenu, setSelectedSubMenu] = useState<string | null>(null);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 750px)'); // Adjust the breakpoint as needed

  useEffect(() => {
    // Close the sidebar when it's closed in the header or on mobile
    if (!isSidebarOpen || isMobile) {
      setMenuStates({});
    }
  }, [isSidebarOpen, isMobile]);

  const handleToggle = (path: string) => {
    setMenuStates((prevStates) => ({
      ...prevStates,
      [path]: !prevStates[path],
    }));
  };

  const handleMenuClick = (item: MenuItem) => {
    if (item.subMenu) {
      setSelectedMenu((prev) => (prev === item.path ? null : item.path));
    } else {
      setSelectedMenu(item.path);
      setSelectedSubMenu(null);
      navigate(item.path);
    }
  };

  const handleSubMenuClick = (path: string) => {
    setSelectedSubMenu(path);
    navigate(path);
  };

  const menuItems = UseGetMenuItems();

  return (
    <List>
      {menuItems.map((item, index) => (
        <React.Fragment key={index}>
          <ListItem
            disableRipple
            divider
            button
            onClick={() => {
              handleToggle(item.path);
              handleMenuClick(item);
            }}
            sx={{
              backgroundColor:
                selectedMenu === item.path ? 'white' : 'primary.main',
              color: selectedMenu === item.path ? 'primary.main' : 'white',
              '&:hover': {
                backgroundColor: 'white',
                color: 'primary.main',
              },
            }}
          >
            {item.icon && (
              <ListItemIcon
                sx={{
                  color: selectedMenu === item.path ? 'primary.main' : 'white',
                  '&:hover': {
                    color: 'red',
                  },
                }}
              >
                {item.icon}
              </ListItemIcon>
            )}
            <ListItemText primary={item.title} />
            {item.subMenu &&
              (menuStates[item.path] ? (
                <ExpandLess sx={{ color: 'white' }} />
              ) : (
                <ExpandMore sx={{ color: 'white' }} />
              ))}
          </ListItem>

          {item.subMenu && (
            <Collapse in={menuStates[item.path]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {item.subMenu.map((subItem, subIndex) => (
                  <ListItem
                    key={subIndex}
                    onClick={() => handleSubMenuClick(subItem.path)}
                    selected={selectedSubMenu === subItem.path}
                    sx={{
                      backgroundColor:
                        selectedSubMenu === subItem.path
                          ? '#4caf50'
                          : '#023F12',
                      color:
                        selectedSubMenu === subItem.path ? 'yellow' : 'white',
                      '&:hover': {
                        backgroundColor: '#4caf50',
                        color: 'white',
                      },
                    }}
                  >
                    {subItem.icon && (
                      <ListItemIcon
                        sx={{
                          color:
                            selectedSubMenu === subItem.path
                              ? 'yellow'
                              : 'white',
                        }}
                      >
                        {subItem.icon}
                      </ListItemIcon>
                    )}
                    <ListItemText primary={subItem.title} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          )}
        </React.Fragment>
      ))}
      <ListItem
        disableRipple
        divider
        button
        sx={{ color: 'white' }}
        onClick={handleLogout}
      >
        <ListItemIcon sx={{ color: 'white' }}>
          <Logout />
        </ListItemIcon>
        <ListItemText primary={t('leave')} />
      </ListItem>
    </List>
  );
};

export default Sidebar;
