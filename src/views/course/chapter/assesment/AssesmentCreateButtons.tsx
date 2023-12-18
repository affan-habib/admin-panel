import React from 'react';
import { Button, Box } from '@mui/material';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import AddQuizModal from './quiz/AddQuizModal';

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
      <AddQuizModal assessmentId={assessmentId} />
      <Button
        sx={{ marginLeft: '7px' }}
        variant="outlined"
        startIcon={<AssignmentOutlinedIcon />}
      >
        মাল্টিপল চয়েস
      </Button>
      <Button
        sx={{ marginLeft: '7px' }}
        variant="outlined"
        startIcon={<AssignmentOutlinedIcon />}
      >
        ম্যাচিং
      </Button>
    </Box>
  );
};

export default AssesmentCreateButtons;
