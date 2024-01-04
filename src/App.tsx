import Accessibility from 'components/common/Accessibility';
import { DeleteModalProvider } from 'context/DeleteModalContext';
import { SnackbarProvider } from 'context/SnackbarContext';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from 'routes';

const App: React.FC = () => {


  return (
    <DeleteModalProvider>
      <SnackbarProvider>
        <Accessibility />
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </SnackbarProvider>
    </DeleteModalProvider>
  );
};

export default App;
