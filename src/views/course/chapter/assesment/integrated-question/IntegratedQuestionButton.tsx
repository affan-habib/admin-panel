import React, { useState } from 'react';
import { Box, Stack } from '@mui/material';
import CustomButton from './CustomButton';
import QuizIcon from '@mui/icons-material/Quiz';
import TrueFalseForm from '../true-false/TrueFalseForm';
import OneWordAnswerForm from '../one-word-answer/OneWordAnswerForm';
import DescriptiveAnswerForm from '../descriptive-answer/DescriptiveAnswerForm';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import DescriptionIcon from '@mui/icons-material/Description';
import ContrastIcon from '@mui/icons-material/Contrast';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import FillInTheGapForm from '../fill-in-the-gap/FillInTheGapForm';
import AddQuizForm from '../quiz/AddQuizForm';
import AddMatchingForm from '../matching/AddMatchingForm';
import DescriptiveAnswerList from '../descriptive-answer/DescriptiveAnswerList';
import OneWordAnswerList from '../one-word-answer/OneWordAnswerList';
import TrueFalseList from '../true-false/TrueFalseList';
import QuizList from '../quiz/QuizList';
import MatchingList from '../matching/MatchingList';
import FillInTheGapList from '../fill-in-the-gap/FillInTheGapList';

const options = [
  {
    id: 2,
    icon: <QuizIcon />,
    title_en: 'Quiz',
    title_bn: 'কুইজ',
    formComponent: AddQuizForm,
    listComponent: QuizList,
  },
  {
    id: 3,
    icon: <SwapHorizIcon />,
    title_en: 'Matching',
    title_bn: 'ম্যাচিং',
    formComponent: AddMatchingForm,
    listComponent: MatchingList,
  },
  {
    id: 4,
    icon: <HourglassEmptyIcon />,
    title_en: 'Fill in the Gap',
    title_bn: 'ফিল ইন দি গ্যাপ',
    formComponent: FillInTheGapForm,
    listComponent: FillInTheGapList,
  },
  {
    id: 5,
    icon: <ContrastIcon />,
    title_en: 'True/False',
    title_bn: 'সত্য / মিথ্যা',
    formComponent: TrueFalseForm,
    listComponent: TrueFalseList,
  },
  {
    id: 6,
    icon: <FullscreenExitIcon />,
    title_en: 'One-word Answer',
    title_bn: 'এক কথায় উত্তর',
    formComponent: OneWordAnswerForm,
    listComponent: OneWordAnswerList,
  },
  {
    id: 7,
    icon: <DescriptionIcon />,
    title_en: 'Descriptive Question',
    title_bn: 'বর্ণনামূলক প্রশ্নপত্র',
    formComponent: DescriptiveAnswerForm,
    listComponent: DescriptiveAnswerList,
  },
];

const IntegratedQuestionButton: React.FC<any> = ({
  assessmentId,
  handleCloseDialog,
  assesments,
}) => {
  const [selectedButton, setSelectedButton] = useState(2);
  const language = localStorage.getItem('language');
  return (
    <>
      {options.map(
        (option) =>
          selectedButton === option.id && (
            <>
              {option.listComponent && (
                <option.listComponent
                  assesments={assesments}
                  type_id={option.id}
                />
              )}
            </>
          ),
      )}
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            width: '100%',
          }}
        >
          {options.map(
            (option) =>
              selectedButton === option.id && (
                <>
                  <option.formComponent
                    key={option.id}
                    assessmentId={assessmentId}
                    handleCloseDialog={handleCloseDialog}
                  />
                </>
              ),
          )}
        </Box>
        <Stack
          py={2}
          mt={7}
          direction="column"
          alignItems="center"
          width={150}
          bgcolor="#465360"
          borderRadius={2}
        >
          {options.map((option) => (
            <CustomButton
              key={option.id}
              icon={option.icon}
              title={language === 'bn' ? option.title_bn : option.title_en}
              selected={selectedButton === option.id}
              onClick={() => setSelectedButton(option.id)}
            />
          ))}
        </Stack>
      </Box>
    </>
  );
};

export default IntegratedQuestionButton;
