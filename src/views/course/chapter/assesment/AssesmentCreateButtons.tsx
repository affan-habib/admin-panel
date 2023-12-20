import React from 'react';
import { Button, Box } from '@mui/material';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import AddQuizButton from './quiz/AddQuizButton';
import AddMatchingButton from './matching/AddMatchingButton';

const AssesmentCreateButtons: React.FC<any> = ({ assessmentId }) => {
//   console.log(assessmentId);
  return (
    <Box
      sx={{
        width: '100%',
        border: '1px dashed #000',
        padding: '10px',
        boxSizing: 'border-box',
      }}
    >
      <AddQuizButton assessmentId={assessmentId} />
      <Button
        sx={{ marginLeft: '7px' }}
        variant="outlined"
        startIcon={<AssignmentOutlinedIcon />}
      >
        মাল্টিপল চয়েস
      </Button>
      
      <AddMatchingButton assessmentId={assessmentId} />
    </Box>
  );
};

export default AssesmentCreateButtons;
