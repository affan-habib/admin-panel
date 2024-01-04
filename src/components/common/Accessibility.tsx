import React, { useState, useEffect, useRef } from 'react';
import { Button, Box, Paper, Stack, List, Typography, Fab } from '@mui/material';
import { styled } from '@mui/system';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
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

const Container = styled(Box)({
  position: 'fixed',
  top: '50%',
  right: '0',
  transform: 'translateY(-50%)',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  zIndex: 1000
});
const buttons: ButtonItem[] = [
  { key: 'increaseText', text: 'Increase Text', icon: <TextIncrease sx={{ color: 'white' }} /> },
  { key: 'formatText', text: 'Format Text', icon: <TextFormat sx={{ color: 'white' }} /> },
  { key: 'decreaseText', text: 'Decrease Text', icon: <TextDecrease sx={{ color: 'white' }} /> },
  { key: 'monochrome', text: 'Monochrome', icon: <MonochromePhotos sx={{ color: 'white' }} /> },
  { key: 'big-cursor', text: 'Big Cursor', icon: <ArrowOutward sx={{ color: 'white' }} /> },
  { key: 'invert-color', text: 'Invert Color', icon: <InvertColors sx={{ color: 'white' }} /> },
  { key: 'highlight-link', text: 'Highlight Links', icon: <InsertLink sx={{ color: 'white' }} /> },
  { key: 'Show-Headings', text: 'Show Headings', icon: <h3 style={{ color: "white" }}>H</h3> },
  { key: 'reset', text: 'Reset', icon: <Restore sx={{ color: 'white' }} /> },
];

interface ButtonItem {
  key: string;
  text: string;
  icon: React.ReactNode;
  action?: () => void;
}
const Accessibility: React.FC = () => {
  const [isDivVisible, setDivVisibility] = useState(false);
  const selectedButton = localStorage.getItem('selectedButton');

  const handleListItemClick = (buttonName: string, action?: () => void) => {
    localStorage.setItem("selectedButton", buttonName);
    setDivVisibility(false);

    if (action) {
      action();
    }
  };

  const applyFilter = (filterType: string) => {
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
      (link as HTMLElement).style.color = 'tomato';
    });
  };

  const showHeadings = () => {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach((heading) => {
      const hElement = heading as HTMLElement;
      hElement.style.backgroundColor = '#cde400';
    });
  };

  const actions: { [key: string]: () => void } = {
    'invert-color': () => applyFilter('invert-color'),
    'monochrome': () => applyFilter('monochrome'),
    'highlight-link': highlightLinks,
    'Show-Headings': showHeadings,
  };

  useEffect(() => {
    const selectedAction = actions[selectedButton || ''];
    if (selectedAction) {
      selectedAction();
    } else {
      document.documentElement.style.filter = 'none';
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      headings.forEach((heading) => {
        const hElement = heading as HTMLElement;
        hElement.style.backgroundColor = 'initial';
      });
    }
  }, [selectedButton, actions]);
  const handleButtonClick = () => {
    setDivVisibility(!isDivVisible);
  };

  const handleClickAway = (event: MouseEvent) => {
    if (
      isDivVisible &&
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setDivVisibility(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickAway);

    return () => {
      document.removeEventListener('click', handleClickAway);
    };
  }, [isDivVisible]);

  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Container ref={containerRef}>
        <Fab
          onClick={handleButtonClick}
          aria-label="add"
          size='small'
          sx={{
            background: '#222222',
            color: 'white',
            border: '2px solid #B3E0DD',
            borderRadius: 0,
            borderRight: 0,
            borderTopLeftRadius: 8,
            borderBottomLeftRadius: 8,
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
        {isDivVisible && <>
          <Box
            py={2}
            pl={2}
            sx={{
              width: '250px',
              borderRadius: 0,
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
              background: '#6B6A6A',
            }}
          >
            <Stack direction="row" ml={1} spacing={1} m={1}>
              {buttons.slice(0, 3).map((button) => (
                <Box key={button.key} p={1} className="customIcon" onClick={() => handleListItemClick(button.key, button.action)}>
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
                  onClick={() => handleListItemClick(button.key, button.action)}
                >
                  <Box className="customIcon">{button.icon}</Box>
                  <Typography fontWeight={600} ml={2}>
                    {button.text}
                  </Typography>
                </Stack>
              ))}
            </List>
          </Box>
        </>}
      </Container>
    </>
  );
};

export default Accessibility;
