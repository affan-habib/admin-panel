import Box from '@mui/material/Box';
import Accessibility from 'components/common/Accessibility';
import { DeleteModalProvider } from 'context/DeleteModalContext';
import { SnackbarProvider } from 'context/SnackbarContext';
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
    <DeleteModalProvider>
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
    </DeleteModalProvider>
  );
};

export default App;