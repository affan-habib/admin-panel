import { Box } from '@mui/material';
import Accessibility from 'components/common/Accessibility';
import { SnackbarProvider } from 'context/SnackbarConext';
import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from 'routes';

const App: React.FC = () => {
  const [selectedButton, setSelectedButton] = useState<string>('');

  const handleButtonSelect = (buttonName: string) => {
    setSelectedButton(buttonName);
    localStorage.setItem('selectedButton', buttonName);
  };

  return (
    <SnackbarProvider>
      <Box
        sx={{
          filter:
            selectedButton === 'monochrome'
              ? 'grayscale(100%)'
              : 'grayscale(0%)',
        }}
      >
        <Accessibility
          selectedButton={selectedButton}
          onButtonSelect={handleButtonSelect}
        />
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Box>
    </SnackbarProvider>
  );
};

export default App;