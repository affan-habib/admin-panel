import React, { useState } from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TrueFalseForm from './true-false/TrueFalseForm';
import OneWordAnswerForm from './one-word-answer/OneWordAnswerForm';
import DescriptiveAnswerForm from './descriptive-answer/DescriptiveAnswerForm';
import IntegratedQuestionButton from './integrated-question/IntegratedQuestionButton';
import { Typography } from '@mui/material';

interface AssesmentCreateButtonsProps {
  moduleId: number;
  assessmentId: number;
}

const options = [
  {
    id: 1,
    name_en: 'Blended Questions',
    name_bn: 'সম্মিলিত প্রশ্নপত্র',
  },
  {
    id: 2,
    name_en: 'Quiz',
    name_bn: 'কুইজ',
  },
  {
    id: 3,
    name_en: 'Matching',
    name_bn: 'ম্যাচিং',
  },
  {
    id: 4,
    name_en: 'Fill in the gap',
    name_bn: 'ফিল ইন দি গ্যাপ',
  },
  {
    id: 5,
    name_en: 'True or False',
    name_bn: 'সত্য / মিথ্যা',
  },
  {
    id: 6,
    name_en: 'One-word answer',
    name_bn: 'এক কথায় উত্তর',
  },
  {
    id: 7,
    name_en: 'Descriptive Question',
    name_bn: 'বর্ণনামূলক প্রশ্নপত্র',
  },
];
const AssesmentCreateButtons: React.FC<AssesmentCreateButtonsProps> = ({
  moduleId,
  assessmentId,
}) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleOpenDialog = (id: number) => {
    setSelectedId(id);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedId(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
      {options.map((option) => (
        <Button
          key={option.id}
          size="small"
          sx={{ margin: '7px', color: 'black' }}
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog(option.id)}
        >
          {option.name_en}
        </Button>
      ))}
      <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{`Form for ID ${selectedId}`}</DialogTitle>
        <DialogContent>
          {selectedId === 1 && (
            <IntegratedQuestionButton
              assessmentId={assessmentId}
              mouduleId={moduleId}
              handleCloseDialog={handleCloseDialog}
            />
          )}
          {selectedId === 2 && <Typography>Coming soon</Typography>}
          {selectedId === 3 && <Typography>Coming soon</Typography>}
          {selectedId === 5 && (
            <TrueFalseForm
              assessmentId={assessmentId}
              mouduleId={moduleId}
              handleCloseDialog={handleCloseDialog}
            />
          )}
          {selectedId === 4 && (
            <TrueFalseForm
              assessmentId={assessmentId}
              mouduleId={moduleId}
              handleCloseDialog={handleCloseDialog}
            />
          )}
          {selectedId === 6 && (
            <OneWordAnswerForm
              assessmentId={assessmentId}
              mouduleId={moduleId}
              handleCloseDialog={handleCloseDialog}
            />
          )}
          {selectedId === 7 && (
            <DescriptiveAnswerForm
              assessmentId={assessmentId}
              mouduleId={moduleId}
              handleCloseDialog={handleCloseDialog}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AssesmentCreateButtons;
