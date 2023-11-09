import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

interface ScrollableModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const ScrollableModal: React.FC<ScrollableModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      fullWidth
      maxWidth="md"
    >
      <DialogTitle id="scroll-dialog-title">{title}</DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleClose} sx={{ mr: 2 }}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ScrollableModal;
