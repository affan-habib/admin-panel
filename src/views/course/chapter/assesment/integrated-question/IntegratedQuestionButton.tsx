import React, { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
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
import FillInTheGapForm from '../FillInTheBlankButton';
const IntegratedQuestionButton: React.FC<any> = ({
  assessmentId,
  handleCloseDialog,
}) => {
  const [selectedButton, setSelectedButton] = useState(1);

  return (
    <Box
      sx={{
        display: 'flex',
        height: 800,
        width: '100%',
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{
          border: '1px dashed #D0D0D0',
          width: '100%', // Adjusted width
          mr: 2,
          p: 2,
          borderRadius: 2,
        }}
      >
        {/* {selectedId === 1 && (
          <IntegratedQuestionButton
            assessmentId={assessmentId}
            handleCloseDialog={handleCloseDialog}
          />
        )} */}
        {selectedButton === 2 && <Typography>Coming soon</Typography>}
        {selectedButton === 3 && <Typography>Coming soon</Typography>}
        {selectedButton === 5 && (
          <TrueFalseForm
            assessmentId={assessmentId}
            handleCloseDialog={handleCloseDialog}
          />
        )}
        {selectedButton === 4 && (
          <FillInTheGapForm
            assessmentId={assessmentId}
            handleCloseDialog={handleCloseDialog}
          />
        )}
        {selectedButton === 6 && (
          <OneWordAnswerForm
            assessmentId={assessmentId}
            handleCloseDialog={handleCloseDialog}
          />
        )}
        {selectedButton === 7 && (
          <DescriptiveAnswerForm
            assessmentId={assessmentId}
            handleCloseDialog={handleCloseDialog}
          />
        )}
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
          icon={<SwapHorizIcon />}
          title="ম্যাচিং"
          selected={selectedButton === 2}
          onClick={() => setSelectedButton(2)}
        />
        <CustomButton
          icon={<HourglassEmptyIcon />}
          title="ফিল ইন দি ব্ল্যান্ক"
          selected={selectedButton === 4}
          onClick={() => setSelectedButton(4)}
        />
        <CustomButton
          icon={<ContrastIcon />}
          title="সত্য / মিথ্যা"
          selected={selectedButton === 5}
          onClick={() => setSelectedButton(5)}
        />
        <CustomButton
          icon={<FullscreenExitIcon />}
          title="এক কথায় উত্তর"
          selected={selectedButton === 6}
          onClick={() => setSelectedButton(6)}
        />
        <CustomButton
          icon={<DescriptionIcon />}
          title="বর্ণনামূলক প্রশ্নপত্র"
          selected={selectedButton === 7}
          onClick={() => setSelectedButton(7)}
        />
      </Stack>
    </Box>
  );
};

export default IntegratedQuestionButton;
