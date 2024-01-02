import React from 'react';
import { Formik, Form, Field } from 'formik';
import Button from '@mui/material/Button';
import RichTextInput from 'components/form/RichTextInput';
import {
  InputLabel,
  Box,
  Stack,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { apiBaseUrl } from 'config';
import axios from 'axios';
import { useSnackbar } from 'context/SnackbarContext';
import { useQueryClient } from 'react-query';
import MarkInput from 'components/form/MarkInput';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

const OneWordAnswerForm: React.FC<any> = ({
  assessmentId,
  handleCloseDialog,
  maxMark,
}) => {
  const { showSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const onSubmit = async (values: any, buttonType: any = 'submit') => {
    try {
      const response = await axios.post(`${apiBaseUrl}/quizzes`, {
        course_assessment_id: assessmentId,
        question: values.question,
        supporting_notes_en: values.supporting_notes_en,
        mark: values.mark,
        question_type: 'text',
        type_id: 6,
        status: 1,
      });
      showSnackbar(response.data.message, 'success');
      queryClient.invalidateQueries('couse-quizzes');
      queryClient.invalidateQueries('courseDetails');
      buttonType !== 'saveAndAdd' && handleCloseDialog();
    } catch (error: any) {
      showSnackbar(error.response.data.message, 'error');
      console.error('Error submitting form:', error);
    }
  };

  const initialValues = {
    option: 'option1',
    question: '',
    mark: '',
    supporting_notes_en: '',
    type_id: 6,
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
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, isValid, dirty, resetForm }) => (
        <Form>
          <Box mb={2} display="flex" flexDirection="row" justifyContent="">
            <FormControlLabel
              value="option1"
              control={<Radio />}
              label={t('manualInput')}
              checked // Make the first option selected
            />
            <FormControlLabel
              value="option2"
              disabled // Make the first option disabled
              control={<Radio />}
              label={t('bulkUpload')}
            />
          </Box>
          <Box
            sx={{
              border: '1px dashed #D0D0D0',
              p: 2,
              borderRadius: 2,
              bgcolor: '#FAFAFA',
            }}
          >
            <div>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <InputLabel sx={{ mb: 1 }}>নতুন প্রশ্ন</InputLabel>
                <MarkInput name="mark" label="mark" />
              </Stack>
              <RichTextInput name="question" height="120px" />
              <InputLabel sx={{ mb: 1, mt: 2 }}>
                বিবরণ লিখুন (অপশনাল)
              </InputLabel>
              <RichTextInput name="supporting_notes_en" height="120px" />
            </div>
            <Box
              display="flex"
              justifyContent="flex-end"
              mt={2} // Adjust the margin top as needed
            >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!isValid || !dirty}
              >
                {t('submit')}
              </Button>
              <Button
                variant="outlined"
                sx={{ ml: 2 }}
                onClick={() => {
                  onSubmit(values, 'saveAndAdd');
                  resetForm();
                }}
                disabled={!isValid || !dirty}
              >
                {t('saveAndAdd')}
              </Button>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default OneWordAnswerForm;
