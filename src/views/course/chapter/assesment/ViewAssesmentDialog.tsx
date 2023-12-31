import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Button,
  Stack,
  FormControlLabel,
  Checkbox,
  Divider,
  Box,
} from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import axiosInstance from 'server/axiosInstance';
import parse from 'html-react-parser';
import { useTranslation } from 'react-i18next';
import { assetBaseUrl } from 'config';
import { toBanglaNumber } from 'utils/numberUtils';
import AssesmentEditButton from './AssesmentEditButton';

interface ViewAssessmentDialogProps {
  open: boolean;
  initialData: any;
  onClose: () => void;
}

const DotElement = () => (
  <span style={{ margin: '0 8px' }}>
    <svg height="10" width="10">
      <circle
        cx="4"
        cy="4"
        r="2"
        stroke="black"
        stroke-width="1"
        fill="#646464"
      />
    </svg>
  </span>
);

const MatchingElement = ({ title, fSize = 16 }: any) => {
  return (
    <Typography
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
    >
      {title}
    </Typography>
  );
};

const BlankElement = () => {
  return (
    <span
      style={{
        border: '1px dashed green',
        width: '100px',
        display: 'inline-block',
        backgroundColor: '#F9FEFD',
      }}
    >
      {' '}
      &nbsp;{' '}
    </span>
  );
};
const BlankOption = ({ title }: any) => (
  <Typography
    variant="body1"
    bgcolor="#DEEEC6"
    color="#1D1D1F"
    px={2}
    py="2px"
    fontSize={16}
    fontWeight={400}
    border="1px dashed #006A4E"
    borderRadius={1}
  >
    {title}
  </Typography>
);

const flatMap = (array: any, fn: (n: any) => void) => {
  let result: any = [];
  for (let i = 0; i < array.length; i++) {
    const mapping = fn(array[i]);
    result = result.concat(mapping);
  }
  result.pop();
  return result;
};

const ViewAssessmentDialog: React.FC<ViewAssessmentDialogProps> = ({
  open,
  initialData,
  onClose,
}) => {
  const [data, setData] = useState([]);

  const { t } = useTranslation();

  useEffect(() => {
    axiosInstance
      .get('quizzes', { course_assessment_id: initialData.id })
      .then((res: any) => {
        setData(res.data.data);
      })
      .catch((e: any) => console.log(e));
  }, [initialData.id]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ fontSize: '12px' }}>
          <Typography
            color="primary"
            variant="h6"
            sx={{ marginBottom: '8px', fontSize: '24px', fontWeight: 600 }}
          >
            {localStorage.getItem('language') === 'en'
              ? initialData.assessment_title_en
              : initialData.assessment_title_en}
          </Typography>
          <Stack direction="row" spacing={2}>
            <Typography variant="body1" color="#646464">
              {t('descriptiveQuestionPaper')}
            </Typography>
            <svg
              width="9"
              height="20"
              viewBox="0 0 9 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect y="3" width="1" height="14" fill="#646464" />
              <rect x="4" width="1" height="20" fill="#646464" />
              <rect x="8" y="3" width="1" height="14" fill="#646464" />
            </svg>

            <Typography variant="body1" color="#646464" alignItems="center">
              {t('time')} <DotElement />
              {toBanglaNumber(initialData.total_time)} {t('minutes')}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Typography variant="body1" color="#646464">
              {t('totalMarks')} <DotElement />{' '}
              {toBanglaNumber(initialData.total_mark)}
            </Typography>
            <svg
              width="9"
              height="20"
              viewBox="0 0 9 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect y="3" width="1" height="14" fill="#646464" />
              <rect x="4" width="1" height="20" fill="#646464" />
              <rect x="8" y="3" width="1" height="14" fill="#646464" />
            </svg>

            <Typography variant="body1" color="#646464">
              {t('passMark')} <DotElement />{' '}
              {toBanglaNumber(initialData.pass_mark)}
            </Typography>
          </Stack>
        </div>
        <IconButton aria-label="close" onClick={onClose} color="error">
          <HighlightOffIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box mt={4}>
          {data.length > 0 &&
            data.map((item: any, index: number) => (
              <Stack key={index} direction="row" alignItems="flex-start">
                <Typography
                  variant="h6"
                  mb={2}
                  sx={{
                    display: 'flex',
                    lineHeight: '19px',
                    marginBottom: '0',
                    fontSize: '16px',
                    fontWeight: 500,
                  }}
                >
                  <strong
                    style={{
                      marginRight: '6px',
                      fontSize: '16px',
                      fontWeight: 600,
                    }}
                  >
                    {t('question')}{' '}
                    {localStorage.getItem('language') === 'en'
                      ? index + 1
                      : toBanglaNumber(index + 1)}
                    :
                  </strong>
                </Typography>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  flexGrow={1}
                >
                  <div style={{ marginBottom: '12px' }}>
                    <Typography
                      variant="h6"
                      sx={{
                        marginTop: '0',
                        paddingTop: '0',
                        lineHeight: '19px',
                        fontWeight: 500,
                        marginBottom: '4px',
                      }}
                    >
                      {item.type_id === 4
                        ? flatMap(item.question.split('#'), (part) => {
                            return [parse(part), <BlankElement />];
                          })
                        : parse(item.question)}
                      {item.question_img && (
                        <div style={{ marginTop: '8px' }}>
                          <img
                            src={`${assetBaseUrl}/${item.question_img}`}
                            style={{ height: '140px', width: '140px' }}
                          />
                        </div>
                      )}
                    </Typography>
                    <div style={{ marginLeft: '0' }}>
                      {/* Quiz / TRUE-FALSE */}
                      {(item.type_id === 2 || item.type_id === 5) &&
                        item.options.length > 0 &&
                        item.options.map((option: any, secondIndex: number) => (
                          <FormControlLabel
                            key={index * 100 + secondIndex}
                            control={
                              option.is_correct === false ? (
                                <Checkbox
                                  size="small"
                                  sx={{ color: '#646464' }}
                                  checked
                                />
                              ) : (
                                <Checkbox size="small" />
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

                      {/* Matching */}
                      {item.type_id === 3 && item.options.length > 0 && (
                        <Stack direction="row" spacing={4}>
                          <div>
                            {item.options.map(
                              (option: any, thirdKeyIndex: number) => (
                                <Stack
                                  spacing={1}
                                  mb={1}
                                  pt={0}
                                  key={index * 100 + thirdKeyIndex}
                                >
                                  <MatchingElement title={option.option_key} />
                                  <MatchingElement
                                    title={t('dragAndDropCorrectAnswer')}
                                    fSize={12}
                                  />
                                </Stack>
                              ),
                            )}
                          </div>
                          <div>
                            {item.options.map(
                              (option: any, thirdValueIndex: number) => (
                                <Stack
                                  spacing={1}
                                  mb={1}
                                  key={index * 100 + thirdValueIndex}
                                >
                                  <MatchingElement
                                    title={option.option_value}
                                  />
                                  {option.wrong_answer.length > 0 && (
                                    <MatchingElement
                                      title={option.wrong_answer}
                                    />
                                  )}
                                </Stack>
                              ),
                            )}
                          </div>
                        </Stack>
                      )}

                      {/* Fill in the GAP */}
                      {item.type_id === 4 && item.options.length > 0 && (
                        <Stack direction="row" spacing={2} mb={2}>
                          {item.options.map((option: any, gapIndex: number) => (
                            <BlankOption
                              title={option.option_value}
                              key={index * 100 + gapIndex}
                            />
                          ))}
                        </Stack>
                      )}

                      {item.supporting_notes_en.length > 0 && (
                        <Typography
                          variant="body1"
                          bgcolor="#FAFAFA"
                          p={2}
                          border="2px solid #D0D0D0"
                          borderRadius={2}
                          maxWidth={500}
                        >
                          {parse(item.supporting_notes_en)}
                        </Typography>
                      )}
                    </div>
                  </div>

                  <Button variant="contained" sx={{ bgcolor: '#1D1D1F' }}>
                    {item.mark} point
                  </Button>
                  <AssesmentEditButton data={item} />
                </Stack>
              </Stack>
            ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ViewAssessmentDialog;
