import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';

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
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Warning</DialogTitle>
      <DialogContent>
        Are you sure you want to delete this user?
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={handleClose} 
          style={{ backgroundColor: 'red', color: 'white' }}
        >
          Cancel
        </Button>
        <Button onClick={onConfirm} style={{ backgroundColor: 'green', color: 'white' }} >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WarningModal;
