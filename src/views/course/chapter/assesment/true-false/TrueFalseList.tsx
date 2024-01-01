import React from 'react';
import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const TrueFalseList = ({ assesments, type_id }: any) => {
  // console.log(type_id);
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
                  <strong style={{ marginRight: '20px' }}>সত্য/মিথ্যা:</strong>
                  <div dangerouslySetInnerHTML={{ __html: item.question }} />
                </Typography>

                <Box ml={4}>
                  {item?.options?.map((option: any) => (
                    <FormControlLabel
                      // key={index * 100 + secondIndex}
                      control={
                        option.is_correct === true ? (
                          <Checkbox
                            size="small"
                            sx={{ color: '#646464' }}
                            checked
                            disabled
                          />
                        ) : (
                          <Checkbox size="small" disabled />
                        )
                      }
                      label={
                        <Typography
                          sx={{
                            fontSize: '16px',
                            marginRight: '12px',
                            fontWeight: 400,
                            color: '#646464',
                          }}
                        >
                          {option.option_value}
                        </Typography>
                      }
                    />
                  ))}
                </Box>
                {item.supporting_notes_en && (
                  <Box
                    bgcolor="white"
                    p={1.5}
                    border="1px solid #D0D0D0"
                    my={1}
                    borderRadius={2}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: item.supporting_notes_en,
                      }}
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

export default TrueFalseList;
