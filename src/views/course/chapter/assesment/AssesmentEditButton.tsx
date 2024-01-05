import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import EditQuizForm from './quiz/EditQuizForm';
import EditMatchingForm from './matching/EditMatchingForm';
import EditFillInTheGapForm from './fill-in-the-gap/EditFillInTheGapForm';
import EditTrueFalseForm from './true-false/EditTrueFalseForm';
import EditOneWordAnswerForm from './one-word-answer/EditOneWordAnswerForm';
import EditDescriptiveAnswerForm from './descriptive-answer/EditDescriptiveAnswerForm';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { HighlightOff } from '@mui/icons-material';
const options: any = [
  {
    type_id: 2,
    title_en: 'Quiz',
    title_bn: 'কুইজ',
    formComponent: EditQuizForm,
  },
  {
    type_id: 3,
    title_en: 'Matching',
    title_bn: 'ম্যাচিং',
    formComponent: EditMatchingForm,
  },
  {
    type_id: 4,
    title_en: 'Fill in the Gap',
    title_bn: 'ফিল ইন দি গ্যাপ',
    formComponent: EditFillInTheGapForm,
  },
  {
    type_id: 5,
    title_en: 'True/False',
    title_bn: 'সত্য / মিথ্যা',
    formComponent: EditTrueFalseForm,
  },
  {
    type_id: 6,
    title_en: 'One-word Answer',
    title_bn: 'এক কথায় উত্তর',
    formComponent: EditOneWordAnswerForm,
  },
  {
    type_id: 7,
    title_en: 'Descriptive Question',
    title_bn: 'বর্ণনামূলক প্রশ্নপত্র',
    formComponent: EditDescriptiveAnswerForm,
  },
];

const AssesmentEditButton: React.FC<any> = ({ data, maxMark }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const selectedOption = options.find(
    (option: any) => option.type_id === data.type_id,
  );

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <IconButton
        onClick={handleOpenDialog}
        sx={{ bgcolor: '#f1ebcc', borderRadius: 2, color: 'primary.main' }}
      >
        <BorderColorIcon />
      </IconButton>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            border: 'none',
          }}
        >
          {selectedOption?.title_en}
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            color="error"
          >
            <HighlightOff />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedOption?.formComponent && (
            <selectedOption.formComponent
              data={data}
              maxMark={maxMark}
              handleCloseDialog={handleCloseDialog}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AssesmentEditButton;
