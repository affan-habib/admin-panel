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
import { MonochromePhotos, NoMeetingRoom, Restore } from '@mui/icons-material';
import AccessibleIcon from '@mui/icons-material/Accessible';

interface AccessibilityProps {
  selectedButton: string;
  onButtonSelect: (buttonName: string) => void;
}

const Accessibility: React.FC<AccessibilityProps> = ({
  selectedButton,
  onButtonSelect,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const storedButton = localStorage.getItem('selectedButton');
    if (storedButton !== null) {
      onButtonSelect(storedButton);
    }
  }, [onButtonSelect]);

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleListItemClick = (buttonName: string) => {
    onButtonSelect(buttonName);
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
        <AccessibleIcon />
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
                <MonochromePhotos />
              </ListItemIcon>
              <ListItemText primary="Monochrome" />
            </ListItem>
            <ListItem
              button
              key="reset"
              selected={selectedButton === 'normal'}
              onClick={() => handleListItemClick('normal')}
            >
              <ListItemIcon>
                <Restore />
              </ListItemIcon>
              <ListItemText primary="Reset" />
            </ListItem>
          </List>
        </div>
      </Popover>
    </div>
  );
};

export default Accessibility;
