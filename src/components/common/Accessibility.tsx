import React, { useState, useEffect } from 'react';
import {
  Popover,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Fab,
} from '@mui/material';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

const Accessibility = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedButton, setSelectedButton] = useState('');

  useEffect(() => {
    const storedButton = localStorage.getItem('selectedButton');
    if (storedButton !== null) {
      setSelectedButton(storedButton);
    }
  }, []);

  // Save selected button state to local storage whenever it changes
  useEffect(() => {
    selectedButton && localStorage.setItem('selectedButton', selectedButton);
    // window.location.reload();
  }, [selectedButton]);

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleListItemClick = (buttonName: string) => {
    setSelectedButton(buttonName);
    setAnchorEl(null);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <Fab
        color="primary"
        onClick={handleButtonClick}
        aria-label="add"
        sx={{
          position: 'fixed',
          bottom: '60%',
          right: '10px',
          zIndex: '1000',
          borderRadius: '50%',
        }}
      >
        <AccessibilityNewIcon />
      </Fab>

      <Popover
        id="accessibility-menu"
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <div
          style={{
            width: '300px',
            height: '51%',
            borderRadius: '5px',
          }}
        >
          <List>
            <ListItem
              button
              key="monochrome"
              selected={selectedButton === 'monochrome'}
              onClick={() => handleListItemClick('monochrome')}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Monochrome" />
            </ListItem>
            <ListItem
              button
              key="invertcolor"
              selected={selectedButton === 'button1'}
              onClick={() => handleListItemClick('button1')}
            >
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary="Normal" />
            </ListItem>
          </List>
        </div>
      </Popover>
    </div>
  );
};

export default Accessibility;
