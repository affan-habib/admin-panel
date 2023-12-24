import React, { useEffect, useState } from 'react';
import { Button, Box } from '@mui/material';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import AddQuizButton from './quiz/AddQuizButton';
import AddMatchingButton from './matching/AddMatchingButton';
import IntegratedQuestionButton from './integrated-question/IntegratedQuestionButton';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { apiBaseUrl } from 'config';

const AssesmentCreateButtons: React.FC<any> = ({ assessmentId }) => {
  const token = localStorage.getItem('token');
  const [data, setData] = useState([]);
  // const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/quiz-types`,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setData(response.data);
        setLoading(false);
      } catch (error) {
        // setError(error);
        setLoading(false);
      }
    };

    fetchData(); 
  }, []);

  // console.log(data);
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
