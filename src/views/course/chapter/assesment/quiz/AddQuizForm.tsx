import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  Typography,
  Checkbox,
  FormControl,
  RadioGroup,
  Radio,
  Stack,
} from '@mui/material';
import { Formik, Form, FieldArray, Field } from 'formik';
import React, {useState} from 'react';
import 'react-quill/dist/quill.snow.css';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useTranslation } from 'react-i18next';
import MarkInput from 'components/form/MarkInput';
import ImageUploadBox from 'components/form/ImageUploadBox';
import RichTextInput from 'components/form/RichTextInput';
import axios from 'axios';
import { apiBaseUrl } from 'config';
import { useSnackbar } from 'context/SnackbarContext';
import { useQueryClient } from 'react-query';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import * as Yup from 'yup';

const AddQuizForm: React.FC<any> = ({ assessmentId, handleCloseDialog,maxMark }) => {
  const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = useState('option1');
  const { showSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const [uploadOption, setUploadOption] = useState('manualUpload');

  const handleUploadOption = (event: any) => {
    setUploadOption(event.target.value);
  };

  const handleOptionChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  const handleFormSubmit = async (values: any, closeForm: boolean) => {
    console.log('Form Values:', values);
    console.log('Uploaded Image:', values.question_img);
    try {
      const response = await axios.post(`${apiBaseUrl}/quizzes`, {
        course_assessment_id: assessmentId,
        question: values.question,
        options: values.options,
        mark: values.mark,
        question_type: 'text',
        supporting_doc: values.quizDescription,
        question_img: values.question_img,
        is_correct: values.is_correct,
        type_id: 2,
        status: 1,
      });
      showSnackbar(response.data.message, 'success');
      queryClient.invalidateQueries('couse-quizzes');
      if (closeForm) {
        handleCloseDialog();
      }
    } catch (error: any) {
      showSnackbar(error.response.data.message, 'error');
      console.error('Error submitting form:', error);
    }
  }

  const handleSubmit = async (values: any,{ resetForm }: any) => {
    await handleFormSubmit(values, true);
    resetForm();
  };

  const handleSaveAndAdd = async (values: any,{ resetForm }: any) => {
    await handleFormSubmit(values, false);
    resetForm();
  };
  const [showEditor, setShowEditor] = useState(false);

  const handleToggleEditor = () => {
    setShowEditor(!showEditor);
  };

  const validationSchema = Yup.object().shape<any>({
    question: Yup.string().required('Question is required'),
    mark: Yup.number()
      .required('Mark is required')
      .max(maxMark, 'should not be more than total marks')
      .positive('Mark must be a positive number'),
  });

  return (
    <Formik
      initialValues={
        {
          options: [
            {
              option_value: '',
              is_correct: false
            },
            {
              option_value: '',
              is_correct: false
            },
            {
              option_value: '',
              is_correct: false
            },
            {
              option_value: '',
              is_correct: false
            },
          ]
        }
      }  validationSchema={validationSchema} onSubmit={handleSubmit} >
      {({ values, setFieldValue,resetForm, isValid, dirty }) => (
        <Form>
          <FormControl
            component="fieldset"
            style={{ marginLeft: '20px', marginTop: '10px' }}
          >
            <RadioGroup row>
              <FormControlLabel
                value="manualUpload"
                control={<Radio />}
                onChange={handleUploadOption}
                checked={uploadOption === 'manualUpload'}
                label={t('manualInput')}
              />
              <FormControlLabel
                value="bulkUpload"
                control={<Radio />}
                onChange={handleUploadOption}
                checked={uploadOption === 'bulkUpload'}
                label={t('bulkUpload')}
              />
            </RadioGroup>
          </FormControl>

          <Box
            mt={2}
            border="1px dashed rgba(208, 208, 208, 1)"
            bgcolor={'rgba(250, 250, 250, 1)'}
            borderRadius={2}
            p={2}
            mx={2}
          >
            <Box
              mb={2}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '20px',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <Typography>{t('quizType')}:</Typography>
                <FormControl component="fieldset">
                  <RadioGroup row>
                    <FormControlLabel
                      value="option1"
                      control={<Radio />}
                      checked={selectedOption === 'option1'}
                      onChange={handleOptionChange}
                      label={t('written')}
                    />
                    <FormControlLabel
                      value="option2"
                      control={<Radio />}
                      checked={selectedOption === 'option2'}
                      onChange={handleOptionChange}
                      label={t('photo')}
                    />
                  </RadioGroup>
                </FormControl>
              </Box>

              {/* <Box> */}
                <MarkInput name="mark" />
              {/* </Box> */}
            </Box>

            {selectedOption == 'option1' ? (
              <Box>
                <RichTextInput name="question" />
              </Box>
            ) : (
              <Box>
                <ImageUploadBox
                  name="question_img"
                  label={t('questionRelatedImage')}
                />
              </Box>
            )}

            <Grid
              spacing={2}
              mt={5}
              // style={{maxHeight:'60vh',overflowY:'auto'}}
            >
              <Grid>
                <FieldArray name="options">
                  {({ push }) => (
                    <>
                      <Typography fontWeight="bold" mb={1}>
                        {t('quizAlternative')}
                      </Typography>
                      <Grid container columns={10} spacing={2}>
                        {values.options.map((_: any, index: any) => (
                          <Grid item md={4} key={index}>
                            <Box
                              sx={{
                                border: '1px dashed rgba(208, 208, 208, 1)',
                              }}
                            >
                              <Box
                                sx={{ display: 'flex', alignItems: 'center' }}
                              >
                                <Grid container columns={10} spacing={2}>
                                  <Grid item md={6}>
                                    <Box sx={{ display: 'flex' }}>
                                      <Checkbox
                                        name={`options[${index}].is_correct`}
                                        checked={
                                          values.options[index].is_correct
                                        }
                                        onChange={(e: any) => {
                                          const newOptions = [
                                            ...values.options,
                                          ];
                                          newOptions[index].is_correct =
                                            e.target.checked;
                                          setFieldValue('options', newOptions);
                                        }}
                                      />

                                      <FormControl
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        sx={{
                                          padding: '10px',
                                          display: 'flex',
                                        }}
                                      >
                                        <Stack
                                          direction="row"
                                          alignItems="center"
                                          bgcolor="gray"
                                          justifyContent="space-between"
                                          // maxWidth={210}
                                          sx={{ width: '42px', borderTopLeftRadius: '4px', borderBottomLeftRadius: '4px' }}
                                        >
                                          <Typography
                                            align="center"
                                            sx={{
                                              color: 'white',
                                              px: 2,
                                              width: 55,
                                            }}
                                          >
                                            {index + 1}
                                          </Typography>
                                          <Field name={`options[${index}].option_value`} placeholder={t('alternative')}  
                                          style={{ padding: '10px', borderTopRightRadius: '4px', borderBottomRightRadius: '4px', border: '1px solid rgba(208, 208, 208, 1)' }} />
                                        </Stack>
                                      </FormControl>
                                    </Box>
                                  </Grid>
                                  <Grid
                                    item
                                    md={3}
                                    sx={{
                                      display: 'flex',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                    }}
                                  >
                                    <Box>
                                      <Typography>{t('or')}</Typography>
                                    </Box>
                                  </Grid>
                                  <Grid
                                    item
                                    md={1}
                                    sx={{
                                      display: 'flex',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        border:
                                          '1px solid rgba(208, 208, 208, 1)',
                                        borderRadius: '5px',
                                        padding: '5px',
                                        marginRight: '15px',
                                      }}
                                    >
                                      <FileUploadOutlinedIcon />
                                    </Box>
                                  </Grid>
                                </Grid>
                              </Box>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                      <Button
                        variant="contained"
                        onClick={() =>
                          push({ option_value: '', is_correct: false })
                        }
                        sx={{
                          marginTop: '12px',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                        startIcon={<AddCircleOutlineOutlinedIcon />}
                      >
                        {t('addMore')}
                      </Button>
                    </>
                  )}
                </FieldArray>
              </Grid>
            </Grid>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Button
                variant="contained"
                onClick={handleToggleEditor}
                sx={{ mt: 6 }}
              >
                {t('addInfo')}
              </Button>
              <Box
                sx={{
                  width: '100%',
                  height: showEditor ? 'auto' : '50px',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  marginTop: '-20px',
                  transition: 'height 0.3s ease-in-out',
                }}
              >
                {showEditor && (
                  <>
                    <Typography p={2}>{t('quizDescription')}</Typography>
                    <Box
                      sx={{
                        marginLeft: '15px',
                        marginRight: '15px',
                      }}
                    >
                      <RichTextInput name="description" height="100px" />
                    </Box>
                  </>
                )}
              </Box>
            </div>
            <Grid
              item
              sx={{
                display: 'flex',
                gap: 2,
                marginTop: '20px',
                justifyContent: 'flex-end',
              }}
            >
              <Button variant="contained" type="submit" disabled={!isValid || !dirty}>
                {t('submit')}
              </Button>
              <Button variant="outlined" disabled={!isValid || !dirty} onClick={() => handleSaveAndAdd(values,{resetForm})}>
                {t('saveAdd')}
              </Button>
            </Grid>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default AddQuizForm;
