import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Button, Dialog, DialogTitle, DialogActions } from '@mui/material';

import { useTranslation } from 'react-i18next';
interface DeleteModalContextProps {
    children: ReactNode;
}

interface DeleteModalContextType {
    isOpen: boolean;
    openModal: (callback: () => void) => void;
    closeModal: () => void;
}

const DeleteModalContext = createContext<DeleteModalContextType | undefined>(undefined);

export const DeleteModalProvider: React.FC<DeleteModalContextProps> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [callback, setCallback] = useState<() => void>(() => { });

    const openModal = (callback: () => void) => {
        setCallback(() => callback);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleConfirm = () => {
        // Execute the callback function and close the modal
        callback();
        closeModal();
    };
    const { t } = useTranslation();
    return (
        <DeleteModalContext.Provider value={{ isOpen, openModal, closeModal }}>
            {children}

            <Dialog open={isOpen} onClose={closeModal}>
                <DialogTitle>{t('message')}</DialogTitle>
                <span style={{ margin: ' 20px', marginLeft: '20px' }}>{t('confirmation')}</span>
                <DialogActions>
                    <Button onClick={closeModal} variant='contained' color='secondary' sx={{ ml: 2 }}>{t('cancel')}</Button>
                    <Button variant='contained' color="error" onClick={handleConfirm}>{t('remove')}</Button>
                </DialogActions>
            </Dialog>
        </DeleteModalContext.Provider>
    );
};

export const useDeleteModal = (): DeleteModalContextType => {
    const context = useContext(DeleteModalContext);

    if (!context) {
        throw new Error('useDeleteModal must be used within a DeleteModalProvider');
    }

    return context;
};
