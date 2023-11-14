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
import { menuItems } from 'components/layouts/menu-items';

interface MenuItem {
  title: string;
  icon: JSX.Element;
  path: string;
  subMenu?: MenuItem[];
}

const Sidebar: React.FC = () => {
  const [menuStates, setMenuStates] = useState<{ [key: string]: boolean }>({});
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
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

  return (
    <List>
      {menuItems.map((item, index) => (
        <React.Fragment key={index}>
          <ListItem
            button
            onClick={() => {
              handleToggle(item.path);
              handleMenuClick(item);
            }}
            selected={selectedMenu === item.path}
            style={{ color: 'white' }} // Set text color to white
          >
            {item.icon && (
              <ListItemIcon style={{ color: 'white' }}>{item.icon}</ListItemIcon>
            )}
            <ListItemText primary={item.title} />
            {item.subMenu &&
              (menuStates[item.path] ? <ExpandLess style={{ color: 'white' }} /> : <ExpandMore style={{ color: 'white' }} />)}
          </ListItem>

          {item.subMenu && (
            <Collapse in={menuStates[item.path]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding style={{ marginLeft: 16 }}>
                {item.subMenu.map((subItem, subIndex) => (
                  <ListItem
                    button
                    key={subIndex}
                    onClick={() => handleSubMenuClick(subItem.path)}
                    selected={selectedSubMenu === subItem.path}
                    style={{ color: 'white' }} // Set text color to white
                  >
                    {subItem.icon && (
                      <ListItemIcon style={{ color: 'white' }}>{subItem.icon}</ListItemIcon>
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
