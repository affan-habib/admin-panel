import { Box } from '@mui/material';
import Accessibility from 'components/common/Accessibility';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from 'routes';

const App: React.FC = () => {
  const accessibility: any = localStorage.getItem('selectedButton');
  return (
    <Box
      sx={{
        filter:
          accessibility === 'monochrome' ? 'grayscale(100%)' : 'grayscale(0%)',
      }}
    >
      <Accessibility />
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Box>
  );
};

export default App;
