import { Box } from '@mui/material';
import Accessibility from 'components/common/Accessibility';
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
    <Box
      sx={{
        filter:
          selectedButton === 'monochrome'
            ? 'grayscale(100%)'
            : 'grayscale(0%)',
      }}
    >
      {/* <Accessibility
        selectedButton={selectedButton}
        onButtonSelect={handleButtonSelect}
      /> */}
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Box>
  );
};

export default App;