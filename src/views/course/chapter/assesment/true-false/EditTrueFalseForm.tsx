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

const EditTrueFalseForm: React.FC<any> = ({
  data,
  handleCloseDialog,
  maxMark,
}) => {
  console.log(data);
  const { showSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const onSubmit = async (values: any) => {
    try {
      const response = await axios.patch(`${apiBaseUrl}/quizzes/${data.id}`, {
        course_assessment_id: data.course_assessment_id,
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
      queryClient.invalidateQueries('couse-quizzes');
      queryClient.invalidateQueries('courseDetails');
      handleCloseDialog();
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
      .max(maxMark, 'should not be more than total marks')
      .positive('Mark must be a positive number'),
  });

  return (
    <Formik
      initialValues={{
        option: 'option1',
        mark: data.mark,
        question: data.question,
        isTrue: data.options[0].is_correct,
        correctAnswer: data.supporting_notes_en,
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, isValid, dirty }) => (
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
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default EditTrueFalseForm;
