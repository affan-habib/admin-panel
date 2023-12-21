import React from 'react';
import { Button, Box } from '@mui/material';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import AddQuizButton from './quiz/AddQuizButton';
import AddMatchingButton from './matching/AddMatchingButton';
import IntegratedQuestionButton from './integrated-question/IntegratedQuestionButton';
import AddIcon from '@mui/icons-material/Add';

const AssesmentCreateButtons: React.FC<any> = ({ assessmentId }) => {
  //   console.log(assessmentId);
  return (
    <Box
      sx={{
        width: '100%',
        padding: '10px',
        boxSizing: 'border-box',
      }}
    >
      <IntegratedQuestionButton />
      <AddQuizButton assessmentId={assessmentId} />
      <Button
        sx={{ marginLeft: '7px',color:'black' }}
        variant="outlined"
        startIcon={<AddIcon />}
      >
        মাল্টিপল চয়েস
      </Button>
      
      <AddMatchingButton assessmentId={assessmentId} />
    </Box>
  );
};

export default AssesmentCreateButtons;
