import React, { useState } from 'react';
import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import AddQuizForm from 'views/course/chapter/assesment/quiz/AddQuizForm';
import AddMatchingForm from './matching/AddMatchingForm';
import FillInTheGapForm from './fill-in-the-gap/FillInTheGapForm';
import TrueFalseForm from './true-false/TrueFalseForm';
import OneWordAnswerForm from './one-word-answer/OneWordAnswerForm';
import DescriptiveAnswerForm from './descriptive-answer/DescriptiveAnswerForm';

interface Option {
  type_id: number;
  title_en: string;
  title_bn: string;
  formComponent: React.ComponentType<any>; // Use React.ComponentType for dynamic components
}

const options: any = [
  {
    type_id: 2,
    title_en: 'Quiz',
    title_bn: 'কুইজ',
    formComponent: <AddQuizForm />,
  },
  {
    type_id: 3,
    title_en: 'Matching',
    title_bn: 'ম্যাচিং',
    formComponent: <AddMatchingForm />,
  },
  {
    type_id: 4,
    title_en: 'Fill in the Gap',
    title_bn: 'ফিল ইন দি গ্যাপ',
    formComponent: <FillInTheGapForm />,
  },
  {
    type_id: 5,
    title_en: 'True/False',
    title_bn: 'সত্য / মিথ্যা',
    formComponent: <TrueFalseForm />,
  },
  {
    type_id: 6,
    title_en: 'One-word Answer',
    title_bn: 'এক কথায় উত্তর',
    formComponent: <OneWordAnswerForm />,
  },
  {
    type_id: 7,
    title_en: 'Descriptive Question',
    title_bn: 'বর্ণনামূলক প্রশ্নপত্র',
    formComponent: <DescriptiveAnswerForm />,
  },
];

const AssesmentEditButton: React.FC<any> = ({ data }) => {
  // console.log(data);
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
      <Button onClick={handleOpenDialog}>Click</Button>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>{selectedOption?.title_en}</DialogTitle>
        <DialogContent>{selectedOption?.formComponent}</DialogContent>
      </Dialog>
    </>
  );
};

export default AssesmentEditButton;
