// SnackbarContext.tsx
import { Alert, Snackbar } from '@mui/material';
import React, { createContext, useContext, ReactNode, useState } from 'react';

interface SnackbarContextProps {
    children: ReactNode;
}

interface SnackbarState {
    open: boolean;
    message: string;
    severity: 'success' | 'error';
}

interface SnackbarContextType {
    showSnackbar: (message: string, severity: 'success' | 'error') => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const SnackbarProvider: React.FC<SnackbarContextProps> = ({ children }) => {
    const [snackbarState, setSnackbarState] = useState<SnackbarState>({
        open: false,
        message: '',
        severity: 'success',
    });

    const showSnackbar = async (message: string, severity: 'success' | 'error') => {
        await setSnackbarState({ open: true, message, severity });
    };

    const closeSnackbar = () => {
        setSnackbarState({ ...snackbarState, open: false });
    };

    return (
        <SnackbarContext.Provider value={{ showSnackbar }}>
            {children}

            {snackbarState.open && (
                <Snackbar
                    open={snackbarState.open}
                    autoHideDuration={6000}
                    onClose={closeSnackbar}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    style={{ marginTop: '50px' }}
                >
                    <Alert elevation={6} variant="filled" severity={snackbarState.severity}>
                        {snackbarState.message}
                    </Alert>
                </Snackbar>
            )}
        </SnackbarContext.Provider>
    );
};

export const useSnackbar = () => {
    const context = useContext(SnackbarContext);
    if (!context) {
        throw new Error('useSnackbar must be used within a SnackbarProvider');
    }
    return context;
};
