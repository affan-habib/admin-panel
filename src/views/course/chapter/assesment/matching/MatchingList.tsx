import React from 'react';
import { Box, Grid, Stack, Typography } from '@mui/material';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import { useTranslation } from 'react-i18next';

const MatchingList = ({ assesments, type_id }: any) => {
  const filteredData = assesments?.data?.filter(
    (item: any) => item.type_id == type_id,
  );

  const { t } = useTranslation();
  const MatchingElement = ({ title, fSize = 16 }: any) => {
    return (<Typography
      align="center"
      variant="h6"
      bgcolor="#FAFAFA"
      p={1}
      fontSize={fSize}
      fontWeight={500}
      border="2px solid #D0D0D0"
      borderRadius={2}
      width={210}
      minHeight={40}
    >{title}</Typography>)
  }
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
          <Box bgcolor="#F5F5F7" m={1} p={2} borderRadius={2}>
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
                    <Grid display="flex" flexDirection="row" flexWrap="wrap" container  >
                    {item.type_id === 3 && item.options.length > 0 &&
                (
                  <Stack direction="row" spacing={4} >
                    <div>
                      {item.options.map((option:any, thirdKeyIndex:number) => (
                        <Stack spacing={1} mb={1} pt={0} key={(index*100) + thirdKeyIndex}>
                          <MatchingElement title={option.option_key} />
                        </Stack>
                      ))}
                    </div>
                    <div>
                      {item.options.map((option:any, thirdValueIndex:number) => (
                        <Stack spacing={1} mb={1} key={(index*100) + thirdValueIndex}>
                          <MatchingElement title={option.option_value} />
                          {option.wrong_answer.length > 0 && (
                            <MatchingElement title={option.wrong_answer} />
                          )}
                        </Stack>
                      ))}
                    </div>
                  </Stack>
                )}
                    </Grid>
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

export default MatchingList;
