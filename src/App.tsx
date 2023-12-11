import { Box } from '@mui/material';
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
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </SnackbarProvider>
    </DeleteModalProvider>
  );
};

export default App;