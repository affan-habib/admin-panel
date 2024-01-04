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
  ArrowOutward,
  InvertColors,
  InsertLink,
} from '@mui/icons-material';
import AccessibilityIcon from '@mui/icons-material/Accessibility';


interface ButtonItem {
  key: string;
  text: string;
  icon: React.ReactNode;
}

const buttons: ButtonItem[] = [
  { key: 'increaseText', text: 'Increase Text', icon: <TextIncrease sx={{ color: 'white' }} /> },
  { key: 'formatText', text: 'Format Text', icon: <TextFormat sx={{ color: 'white' }} /> },
  { key: 'decreaseText', text: 'Decrease Text', icon: <TextDecrease sx={{ color: 'white' }} /> },
  { key: 'monochrome', text: 'monochrome', icon: <MonochromePhotos sx={{ color: 'white' }} /> },
  { key: 'big-cursor', text: 'Big Cursor', icon: <ArrowOutward sx={{ color: 'white' }} /> },
  { key: 'invert-color', text: 'Invert Color', icon: <InvertColors sx={{ color: 'white' }} /> },
  { key: 'highlight-link', text: 'Heightlight Links', icon: <InsertLink sx={{ color: 'white' }} /> },
  { key: 'Show-Headings', text: 'Show Headings', icon: <h3 style={{ color: "white" }}>H</h3> },
  { key: 'reset', text: 'Reset', icon: <Restore sx={{ color: 'white' }} /> },
  // Add more buttons as needed
];

const Accessibility: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const selectedButton = localStorage.getItem('selectedButton')

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleListItemClick = (buttonName: string) => {
    localStorage.setItem("selectedButton", buttonName)
    setAnchorEl(null);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const applyFilter = (filterType: any) => {
    switch (filterType) {
      case 'invert-color':
        document.documentElement.style.filter = 'invert(100%)';
        break;
      case 'monochrome':
        document.documentElement.style.filter = 'grayscale(100%)';
        break;
      default:
        document.documentElement.style.filter = 'none';
    }
  };

  const highlightLinks = () => {
    const links = document.querySelectorAll('a');
    links.forEach((link) => {
      (link as HTMLElement).style.color = 'tomato'; // Assert type to HTMLElement
    });
  };

  const showHeadings = () => {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach((heading) => {
      const hElement = heading as HTMLElement; // Assert type to HTMLElement
      hElement.style.backgroundColor = 'red';
      hElement.style.color = 'white';
    });
  };

  useEffect(() => {
    switch (selectedButton) {
      case 'invert-color':
      case 'monochrome':
        applyFilter(selectedButton);
        break;
      case 'highlight-link':
        highlightLinks();
        break;
      case 'Show-Headings':
        showHeadings();
        break;
      default:
        document.documentElement.style.filter = 'none';
    }
  }, [selectedButton]);


  return (
    <div>
      <Fab
        onClick={handleButtonClick}
        aria-label="add"
        size='small'
        sx={{
          background: '#222222',
          position: 'fixed',
          color: 'white',
          bottom: '60%',
          right: '0px',
          zIndex: '1000',
          border: '2px solid #B3E0DD',
          borderRadius: 0,
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
          '&:hover': {
            background: 'black',
            color: 'white',
          },
          width: 48,
          height: 48
        }}
      >
        <AccessibilityIcon />
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
                  mb: 1
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
