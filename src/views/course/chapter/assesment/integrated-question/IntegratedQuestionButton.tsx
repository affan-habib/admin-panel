import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import CustomButton from './CustomButton';
import QuizIcon from '@mui/icons-material/Quiz';
const IntegratedQuestionButton: React.FC<any> = ({ assessmentId }) => {
  const [open, setOpen] = useState(true);
  const [selectedButton, setSelectedButton] = useState(1);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="outlined"
        sx={{ mr: 2 }}
        startIcon={<AddCircleOutlineIcon />}
        onClick={handleClickOpen}
      >
        সম্মিলিত প্রশ্নপত্র
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography color="primary" variant="h6">
            সম্মিলিত প্রশ্নপত্র যোগ করুন (অধ্যায়ের নাম)
          </Typography>
          <IconButton aria-label="close" onClick={handleClose} color="error">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{
            display: 'flex',
            height: 800,
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              width: '100%', // Adjusted width
              mr: 2,
              padding: 2,
              paddingRight: 4,
              backgroundColor: '#f0f0f0',
              borderRadius: 2,
            }}
          >
            <Typography variant="body1">
              selected Form {selectedButton}
            </Typography>
          </Box>
          <Stack
            pt={2}
            direction="column"
            alignItems="center"
            width={150}
            bgcolor="#465360"
            borderRadius={2}
          >
            <CustomButton
              icon={<QuizIcon />}
              title="কুইজ "
              selected={selectedButton === 1}
              onClick={() => setSelectedButton(1)}
            />
            <CustomButton
              icon={<CloseIcon />}
              title="ম্যাচিং"
              selected={selectedButton === 2}
              onClick={() => setSelectedButton(2)}
            />
            <CustomButton
              icon={<CloseIcon />}
              title="ফিল ইন দি ব্ল্যান্ক"
              selected={selectedButton === 3}
              onClick={() => setSelectedButton(3)}
            />
            <CustomButton
              icon={<CloseIcon />}
              title="সত্য / মিথ্যা"
              selected={selectedButton === 4}
              onClick={() => setSelectedButton(4)}
            />
            <CustomButton
              icon={<CloseIcon />}
              title="এক কথায় উত্তর"
              selected={selectedButton === 5}
              onClick={() => setSelectedButton(5)}
            />
          </Stack>
        </DialogContent>
        <DialogActions>{/* Actions, if needed */}</DialogActions>
      </Dialog>
    </>
  );
};

export default IntegratedQuestionButton;
