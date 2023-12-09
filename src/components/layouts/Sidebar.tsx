import React, { useState, useEffect } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  ListItemIcon,
} from '@mui/material';
import { ExpandLess, ExpandMore, Logout } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
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
}

const Sidebar: React.FC<SidebarProps> = ({ handleLogout }) => {
  const [menuStates, setMenuStates] = useState<{ [key: string]: boolean }>({});
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
  const [selectedSubMenu, setSelectedSubMenu] = useState<string | null>(null);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  // Call the hook within the component body
  const menuItems = UseGetMenuItems();

  useEffect(() => {
    const currentPath = location.pathname;

    let matchingMenu: MenuItem | undefined;
    let matchingSubMenu: MenuItem | undefined;

    for (const item of menuItems) {
      if (currentPath === item.path) {
        matchingMenu = item;
        break;
      }

      if (item.subMenu) {
        matchingSubMenu = item.subMenu.find((subItem) => currentPath === subItem.path);

        if (matchingSubMenu) {
          matchingMenu = item;
          break;
        }
      }
    }

    if (matchingMenu) {
      setSelectedMenu(matchingMenu.path);
    } else {
      setSelectedMenu(null);
    }

    if (matchingSubMenu) {
      setSelectedSubMenu(matchingSubMenu.path);
    } else {
      setSelectedSubMenu(null);
    }
  }, [location.pathname, menuItems]);
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
                selectedMenu === item.path ? 'primary.main' : 'primary.main',
              color: selectedMenu === item.path ? 'yellow' : 'white',
              '&:hover': {
                backgroundColor: '#DEEEC6',
                color: 'primary.main',
              },
            }}
          >
            {item.icon && (
              <ListItemIcon
                sx={{
                  color: selectedMenu === item.path ? 'yellow' : 'white',

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
                    component='div'
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
                        backgroundColor: '#DEEEC6',
                        color: 'black',
                      },
                    }}
                  >
                    {subItem.icon && (
                      <ListItemIcon
                        sx={{
                          color:
                            selectedSubMenu === subItem.path
                              ? 'yellow'
                              : '#DEEEC6',
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
