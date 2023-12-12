import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
interface WarningModalProps {
  open: boolean;
  handleClose: () => void;
  onConfirm: () => void;
}


const WarningModal: React.FC<WarningModalProps> = ({
  open,
  handleClose,
  onConfirm,
}) => {
  const { t } = useTranslation();
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{t('message')}</DialogTitle>
      <DialogContent>
        {t('confirmation')}
      </DialogContent>
      <DialogActions>
                    <Button variant='contained' onClick={onConfirm}>{t('remove')}</Button>
                    <Button onClick={handleClose} variant='outlined' color='error' sx={{ ml: 2 }}>{t('cancel')}</Button>
                </DialogActions>
    </Dialog>
  );
};

export default WarningModal;
