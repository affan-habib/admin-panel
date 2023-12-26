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
import FillInTheGapForm from './fill-in-the-gap/FillInTheGapForm';
import AddMatchingForm from './matching/AddMatchingForm';
import AddQuizForm from './quiz/AddQuizForm';
import { IconButton, Stack } from '@mui/material';
import { HighlightOff } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
// import useAssesmentTypes from 'hooks/useAssesmentTypes';

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
const AssesmentCreateButtons: React.FC<any> = ({ module, assessmentId }) => {

  
  // const { data: assesmentTypes } = useAssesmentTypes();
  const { t } = useTranslation();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const language = localStorage.getItem('language');
  const moduleName =
    language === 'en' ? module.module_name_en : module.module_name_bn;
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
      {options.map((option: any) => (
        <Button
          key={option.id}
          size="small"
          sx={{ margin: '7px', color: 'black' }}
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog(option.id)}
        >
          {language === 'en' ? option.name_en : option.name_bn}
        </Button>
      ))}
      <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        maxWidth="xl"
        fullWidth
      >
        <DialogTitle>
          <Stack direction="row" justifyContent="space-between">
            {selectedId === 1 && `${t('addBlendedQuestion')} (${moduleName})`}
            {selectedId === 2 && `${t('addMcqWithPicture')} (${moduleName})`}
            {selectedId === 3 && `${t('addMatchingQuestion')} (${moduleName})`}
            {selectedId === 4 && `${t('addFillInTheGap')} (${moduleName})`}
            {selectedId === 5 && `${t('addTrueFalse')} (${moduleName})`}
            {selectedId === 6 && `${t('addSingleWordAnswer')} (${moduleName})`}
            {selectedId === 7 &&
              `${t('addDescriptiveQuestions')} (${moduleName})`}
            <IconButton onClick={handleCloseDialog} color="warning">
              <HighlightOff />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          {selectedId === 1 && (
            <IntegratedQuestionButton
              assessmentId={assessmentId}
              handleCloseDialog={handleCloseDialog}
            />
          )}
          {selectedId === 2 && (
            <AddQuizForm
              assessmentId={assessmentId}
              handleCloseDialog={handleCloseDialog}
            />
          )}
          {selectedId === 3 && (
            <AddMatchingForm
              assessmentId={assessmentId}
              handleCloseDialog={handleCloseDialog}
            />
          )}
          {selectedId === 5 && (
            <TrueFalseForm
              assessmentId={assessmentId}
              handleCloseDialog={handleCloseDialog}
            />
          )}
          {selectedId === 4 && (
            <FillInTheGapForm
              assessmentId={assessmentId}
              handleCloseDialog={handleCloseDialog}
            />
          )}
          {selectedId === 6 && (
            <OneWordAnswerForm
              assessmentId={assessmentId}
              handleCloseDialog={handleCloseDialog}
            />
          )}
          {selectedId === 7 && (
            <DescriptiveAnswerForm
              assessmentId={assessmentId}
              handleCloseDialog={handleCloseDialog}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AssesmentCreateButtons;
