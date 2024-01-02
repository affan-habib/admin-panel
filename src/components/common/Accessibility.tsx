import React, { useState, useEffect } from 'react';
import {
  Popover,
  List,
  Stack,
  Typography,
  Box,
  Fab,
} from '@mui/material';
import {
  TextIncrease,
  TextFormat,
  TextDecrease,
  MonochromePhotos,
  Restore,
} from '@mui/icons-material';
import AccessibleIcon from '@mui/icons-material/Accessible';

interface AccessibilityProps {
  selectedButton: string;
  onButtonSelect: (buttonName: string) => void;
}

interface ButtonItem {
  key: string;
  text: string;
  icon: React.ReactNode;
}

const buttons: ButtonItem[] = [
  { key: 'increaseText', text: 'Increase Text', icon: <TextIncrease sx={{ color: 'white' }} /> },
  { key: 'formatText', text: 'Format Text', icon: <TextFormat sx={{ color: 'white' }} /> },
  { key: 'decreaseText', text: 'Decrease Text', icon: <TextDecrease sx={{ color: 'white' }} /> },
  { key: 'monochrome', text: 'Monochrome', icon: <MonochromePhotos sx={{ color: 'white' }} /> },
  { key: 'big-cursor', text: 'Big Cursor', icon: <MonochromePhotos sx={{ color: 'white' }} /> },
  { key: 'reset', text: 'Reset', icon: <Restore sx={{ color: 'white' }} /> },
  // Add more buttons as needed
];

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
        onClick={handleButtonClick}
        aria-label="add"
        sx={{
          background: '#6B6A6A',
          position: 'fixed',
          color: 'white',
          bottom: '60%',
          right: '0px',
          zIndex: '1000',
          borderRadius: 4,
          '&:hover': {
            background: 'black',
            color: 'white',
          },
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
        <Box
          py={2}
          sx={{
            width: '250px',
            height: '51%',
            borderRadius: '5px',
            background: '#6B6A6A',
          }}
        >
          <Stack direction="row" ml={1} spacing={1} m={1}>
            {buttons.slice(0, 3).map((button) => (
              <Box key={button.key} p={1} className="customIcon" onClick={() => handleListItemClick(button.key)}>
                {button.icon}
              </Box>
            ))}
          </Stack>
          <List>
            {buttons.slice(3).map((button) => (
              <Stack
                key={button.key}
                direction="row"
                alignItems="center"
                sx={{
                  p: 0,
                  bgcolor: 'white',
                  borderTopLeftRadius: '10px',
                  borderBottomLeftRadius: '10px',
                  cursor: 'pointer',
                  ml: 1,
                  mb: 2
                }}
                onClick={() => handleListItemClick(button.key)}
              >
                <Box className="customIcon">{button.icon}</Box>
                <Typography fontWeight={600} ml={2}>
                  {button.text}
                </Typography>
              </Stack>
            ))}
          </List>
        </Box>
      </Popover>
    </div>
  );
};

export default Accessibility;
