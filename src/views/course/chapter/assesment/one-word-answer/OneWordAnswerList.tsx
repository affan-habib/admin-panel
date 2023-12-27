import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const OneWordAnswerList = ({ assesments, typeId }: any) => {
  const filteredData = assesments?.data?.filter(
    (item: any) => item.typeId === typeId,
  );

  return (
    <Stack
      maxHeight={150}
      sx={{ overflowY: 'scroll', overflowX: 'hidden' }}
      bgcolor="#F5F5F7"
      mb={2}
    >
      {filteredData?.map((item: any) => (
        <Box p={2} key={item.id}>
          <Typography variant="body1" display="inline-flex" alignItems="center">
            <CheckCircleOutlineIcon sx={{ marginRight: 1 }} />
            <strong>এক কথায় উত্তর :</strong>
            <div dangerouslySetInnerHTML={{ __html: item.question }} />
          </Typography>

          {item.supporting_notes_en && (
            <Box
              bgcolor="white"
              p={1.5}
              border="1px solid #D0D0D0"
              mt={1}
              borderRadius={2}
            >
              <div
                dangerouslySetInnerHTML={{ __html: item.supporting_notes_en }}
              />
            </Box>
          )}
        </Box>
      ))}
    </Stack>
  );
};

export default OneWordAnswerList;
