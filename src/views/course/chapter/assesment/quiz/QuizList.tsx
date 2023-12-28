import React from 'react';
import { Box, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const QuizList = ({ assesments, type_id }: any) => {
  const filteredData = assesments?.data?.filter(
    (item: any) => item.type_id == type_id,
  );

  return (
    <div>
      {!!filteredData.length && (
        <Box
          maxHeight={150}
          sx={{
            overflowY: 'scroll',
            overflowX: 'hidden',
            border: '1px dashed #D0D0D0',
            borderRadius: 2,
          }}
          mb={2}
        >
          <Box bgcolor="#F5F5F7" m={1} p={2}>
            {filteredData?.map((item: any) => (
              <Box key={item.id}>
                <Typography
                  variant="body1"
                  display="inline-flex"
                  alignItems="center"
                >
                  <CheckCircleOutlineIcon sx={{ marginRight: 1 }} />
                  <strong style={{ marginRight: '20px' }}>এক কথায় উত্তর :</strong>
                  <div dangerouslySetInnerHTML={{ __html: item.question }} />
                </Typography>

                {item.supporting_notes_en && (
                  <Box
                    bgcolor="white"
                    p={1.5}
                    border="1px solid #D0D0D0"
                    my={1}
                    borderRadius={2}
                  >
                    <div
                      dangerouslySetInnerHTML={{ __html: item.supporting_notes_en }}
                    />
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </div>
  );
};

export default QuizList;
