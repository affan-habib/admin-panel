import React from 'react';
import { Box, Checkbox, Typography } from '@mui/material';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import { useTranslation } from 'react-i18next';
import { assetBaseUrl } from 'config';

const QuizList = ({ assesments, type_id }: any) => {
  const filteredData = assesments?.data?.filter(
    (item: any) => item.type_id == type_id,
  );

  const { t } = useTranslation();

  console.log(filteredData);

  return (
    <div>
      {!!filteredData.length && (
        <Box
          maxHeight={150}
          sx={{
            overflowY: 'scroll',
            overflowX: 'hidden',
            border: '1px dashed rgba(70, 83, 96, 1)',
            borderRadius: 2,
            marginLeft: '15px'
          }}
          mb={2}
        >
          <Box bgcolor="#F5F5F7" borderRadius={2} m={1} p={2}>
            {filteredData?.map((item: any, index: number) => (
              <Box key={item.id}>
                <Box sx={{ display: 'flex' }}>
                  <Box>
                    <QuizOutlinedIcon sx={{ marginRight: 1 }} />
                  </Box>
                  <Box>

                    <Box>
                      <Typography
                        variant="body1"
                        display="inline-flex"
                        alignItems="center"
                      >
                        <strong style={{ marginRight: '10px' }}>{t('question')} {index + 1}: </strong>
                        <div dangerouslySetInnerHTML={{ __html: item.question }} />
                      </Typography>
                    </Box>
                    {item.question_img && (
                      <img
                        src={`${assetBaseUrl}/${item.question_img}`}
                        style={{ height: '140px', width: '140px' }}
                      />
                    )}
                    <Box display="flex" flexDirection="row" flexWrap="wrap">
                      {item.options.map((option: any, index: number) => (
                        // <Box key={option.id} width="25%" p={1}>
                        <Box key={option.id} p={1}>
                          <Typography><span style={{ color: 'green' }}>{option.is_correct === true ? <Checkbox size="small"
                            checked disabled sx={{ color: '#646464' }} />
                            : <Checkbox size="small" disabled />} </span> {option.option_value}
                            {option.option_img && (
                              <img
                                src={`${assetBaseUrl}/${option.option_img}`}
                                style={{ height: '140px', width: '140px' }}
                              />
                            )}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
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
