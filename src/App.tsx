import Box from '@mui/material/Box';
import Accessibility from 'components/common/Accessibility';
import { DeleteModalProvider } from 'context/DeleteModalContext';
import { SnackbarProvider } from 'context/SnackbarContext';
import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from 'routes';

const App: React.FC = () => {
  const [selectedButton, setSelectedButton] = useState<string>('');

  const handleButtonSelect = (buttonName: string) => {
    setSelectedButton(buttonName);
    localStorage.setItem('selectedButton', buttonName);
  };
  useEffect(() => {
    document.documentElement.style.filter = selectedButton === 'monochrome' ? 'grayscale(100%)' : 'none';
    document.documentElement.style.filter = selectedButton === 'invert-color' ? 'invert(100%)' : 'none';
  }, [selectedButton]);

  return (
    <DeleteModalProvider>
      <SnackbarProvider>
        <Accessibility
          selectedButton={selectedButton}
          onButtonSelect={handleButtonSelect}
        />
        <BrowserRouter>
          <Box
            sx={{
              filter: selectedButton === 'monochrome' ? 'grayscale(100%)' : 'none',
            }}
          >
            <Routes />
          </Box>
        </BrowserRouter>
      </SnackbarProvider>
    </DeleteModalProvider>
  );
};

export default App;
