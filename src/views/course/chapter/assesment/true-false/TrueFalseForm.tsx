import React from 'react';
import { Formik, Form } from 'formik';
import Button from '@mui/material/Button';
import RichTextInput from 'components/form/RichTextInput';
import InputRadio from 'components/form/InputRadio';
import { InputLabel, Box, Stack } from '@mui/material';
import MarkInput from 'components/form/MarkInput';
import { apiBaseUrl } from 'config';
import axios from 'axios';
import { useSnackbar } from 'context/SnackbarContext';
import { useQueryClient } from 'react-query';

const TrueFalseForm: React.FC<any> = ({ assessmentId = '7' }) => {
  const { showSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const onSubmit = async (values: any) => {
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
      queryClient.invalidateQueries('courseDetails');
      // onClose();
    } catch (error: any) {
      showSnackbar(error.response.data.message, 'error');
      console.error('Error submitting form:', error);
    }
  };

  const onCancel = () => {
    // Handle cancel logic here
  };

  return (
    <Formik
      initialValues={{
        mark: '',
        question: '',
        isTrue: true,
        correctAnswer: '',
      }}
      onSubmit={onSubmit}
    >
      {({ values }) => (
        <Form>
          <div>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <InputLabel sx={{ mb: 1 }}>সঠিক উত্তরটি নির্বাচন করুন</InputLabel>
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
            <Button type="submit" variant="contained" color="primary">
              সাবমিট
            </Button>
            <Button variant="outlined" onClick={onCancel} sx={{ ml: 2 }}>
              সেভ এবং অ্যাড
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default TrueFalseForm;
