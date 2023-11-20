import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  ListItemIcon,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import UseGetMenuItems from './menu-items';

interface MenuItem {
  title: string;
  icon: JSX.Element;
  path: string;
  subMenu?: MenuItem[];
}

const Sidebar: React.FC = () => {
  const [menuStates, setMenuStates] = useState<{ [key: string]: boolean }>({});
  const [selectedMenu, setSelectedMenu] = useState<string | null>('/dashboard');
  const [selectedSubMenu, setSelectedSubMenu] = useState<string | null>(null);

  const navigate = useNavigate();

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
                  color:
                    selectedMenu === item.path ? 'primary.main' : 'white',
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
                        selectedSubMenu === subItem.path ? '#4caf50' : '#023F12',
                      color: selectedSubMenu === subItem.path ? 'white' : 'white',
                      '&:hover': {
                        backgroundColor: '#4caf50',
                        color: 'white',
                      },
                    }}
                  >
                    {subItem.icon && (
                      <ListItemIcon sx={{ color: 'white' }}>
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
    </List>
  );
};

export default Sidebar;
