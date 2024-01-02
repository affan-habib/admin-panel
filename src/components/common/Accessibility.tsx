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
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

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
            background: '#6B6A6A'

          }}
        >
          <Stack direction='row' ml={1} spacing={1} mt={1}>
            <Box p={1} className='customIcon'>
              <Restore sx={{ color: "white" }} />
            </Box>
            <Box p={1} className='customIcon'>
              <Restore sx={{ color: "white" }} />
            </Box>
            <Box p={1} className='customIcon'>
              <Restore sx={{ color: "white" }} />
            </Box>
          </Stack>
          <List>
            <Stack
              direction='row'
              alignItems='center'
              sx={{ p: 0, bgcolor: 'white', borderTopLeftRadius: "10px", borderBottomLeftRadius: '10px', cursor: 'pointer', ml: 1 }}
              // button
              onClick={() => handleListItemClick('monochrome')}
            >
              <Box className='customIcon'>
                <MonochromePhotos sx={{ color: "white" }} />
              </Box>
              <Typography fontWeight={600} ml={2} >Monochrome</Typography>
            </Stack>
            <Stack
              mt={1}
              direction='row'
              alignItems='center'
              sx={{ p: 0, bgcolor: 'white', borderTopLeftRadius: "10px", borderBottomLeftRadius: '10px', cursor: 'pointer', ml: 1 }}
              onClick={() => handleListItemClick('normal')}
            >
              <Box p={1} className='customIcon'>
                <Restore sx={{ color: "white" }} />
              </Box>
              <Typography ml={2} fontWeight={600}>Reset</Typography>
            </Stack>
          </List>
        </Box>
      </Popover>
    </div>
  );
};

export default Accessibility;
