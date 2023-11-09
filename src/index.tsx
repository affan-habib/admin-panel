import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import store from './store';
import App from './App';
import './index.css';
import { createTheme } from './theme';
import { ThemeProvider } from '@mui/material';

const queryClient = new QueryClient();

const rootElement = document.getElementById('root');

const theme = createTheme();

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <App />
            {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
          </ThemeProvider>
        </QueryClientProvider>
      </Provider>
    </React.StrictMode>,
  );
} else {
  throw new Error('Could not find root element');
}
