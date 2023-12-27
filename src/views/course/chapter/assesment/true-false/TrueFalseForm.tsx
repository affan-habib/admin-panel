import React from 'react';
import { Formik, Form, Field } from 'formik';
import Button from '@mui/material/Button';
import RichTextInput from 'components/form/RichTextInput';
import InputRadio from 'components/form/InputRadio';
import {
  InputLabel,
  Box,
  Stack,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import MarkInput from 'components/form/MarkInput';
import { apiBaseUrl } from 'config';
import axios from 'axios';
import { useSnackbar } from 'context/SnackbarContext';
import { useQueryClient } from 'react-query';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

const TrueFalseForm: React.FC<any> = ({ assessmentId, handleCloseDialog }) => {
  const { showSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const onSubmit = async (values: any, buttonType: any = 'submit') => {
    try {
      const response = await axios.post(`${apiBaseUrl}/quizzes`, {
        course_assessment_id: assessmentId,
        question: values.question,
        supporting_notes_en: values.correctAnswer,
        mark: values.mark,
        question_type: 'text',
        type_id: 5,
        status: 1,
        options: [
          {
            option_value: 'true',
            is_correct: values.isTrue,
          },
          {
            option_value: 'false',
            is_correct: !values.isTrue,
          },
        ],
      });
      showSnackbar(response.data.message, 'success');
      buttonType !== 'saveAndAdd' && handleCloseDialog();
      // onClose();
    } catch (error: any) {
      showSnackbar(error.response.data.message, 'error');
      console.error('Error submitting form:', error);
    }
  };

  const validationSchema = Yup.object().shape<any>({
    question: Yup.string().required('Question is required'),
    mark: Yup.number()
      .required('Mark is required')
      .positive('Mark must be a positive number'),
  });

  return (
    <Formik
      initialValues={{
        option: 'option1',
        mark: '',
        question: '',
        isTrue: true,
        correctAnswer: '',
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, isValid, dirty, resetForm }) => (
        <Form>
          <Box mb={2} display="flex" justifyContent="" gap={8}>
            <FormControl component="fieldset">
              <Field as={RadioGroup} row name="option">
                <FormControlLabel
                  value="option1"
                  control={<Radio />}
                  label={t('manualInput')}
                />
                <FormControlLabel
                  value="option2"
                  control={<Radio />}
                  label={t('bulkUpload')}
                />
              </Field>
            </FormControl>
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
                <InputLabel sx={{ mb: 1 }}>
                  সঠিক উত্তরটি নির্বাচন করুন
                </InputLabel>
                <MarkInput name="mark" label="mark" />
              </Stack>
              <RichTextInput name="question" height="120px" />
              <InputLabel>সঠিক উত্তরটি নির্বাচন করুন</InputLabel>
              <InputRadio label="সঠিক" name="isTrue" value={true} />
              <InputRadio label="ভুল" name="isTrue" value={false} />

              {/* Use the ConditionalRichTextInput component */}
              {values.isTrue === false && (
                <>
                  <InputLabel sx={{ mb: 1, mt: 2 }}>
                    সঠিক উত্তরটি লিখুন
                  </InputLabel>
                  <RichTextInput name="correctAnswer" height="120px" />
                </>
              )}
            </div>

            <Box display="flex" justifyContent="flex-end" mt={2}>
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

export default TrueFalseForm;
