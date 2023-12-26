import React from 'react';
import { Formik, Form, Field } from 'formik';
import Button from '@mui/material/Button';
import RichTextInput from 'components/form/RichTextInput';
import InputRadio from 'components/form/InputRadio';
import { InputLabel, Box, Stack, FormControl, FormControlLabel, RadioGroup, Radio } from '@mui/material';
import MarkInput from 'components/form/MarkInput';
import { useSnackbar } from 'context/SnackbarContext';
import { useQueryClient } from 'react-query';
import axios from 'axios';
import { apiBaseUrl } from 'config';
import ImageUploadBox from 'components/form/ImageUploadBox';
import { useTranslation } from 'react-i18next';

const DescriptiveAnswerForm: React.FC<any> = ({
  assessmentId,
  handleCloseDialog,
}) => {
  const { showSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const onSubmit = async (values: any) => {
    console.log(values);
    try {
      const response = await axios.post(`${apiBaseUrl}/quizzes`, {
        course_assessment_id: assessmentId,
        question: values.question,
        supporting_notes_en: values.supporting_notes_en,
        mark: values.mark,
        question_type: 'text',
        type_id: 7,
        status: 1,
      });
      showSnackbar(response.data.message, 'success');
      queryClient.invalidateQueries('courseDetails');
      handleCloseDialog();
    } catch (error: any) {
      showSnackbar(error.response.data.message, 'error');
      console.error('Error submitting form:', error);
    } // Handle form submission logic here
    console.log(values);
  };

  const onCancel = () => {
    // Handle cancel logic here
  };

  const initialValues = {
    mark: '',
    question: '',
    question_type: 'text',
    supporting_notes_en: '',
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ values }) => (
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
          <div>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-end"
            >
              <div>
                <InputLabel>কুইজের প্রশ্নের ধরন:</InputLabel>
                <InputRadio label="লিখিত" name="question_type" value="text" />
                <InputRadio
                  label="ছবি সম্পর্কিত"
                  name="question_type"
                  value="text_image"
                />
              </div>
              <MarkInput name="mark" label="mark" />
            </Stack>
            {values.question_type === 'text' ? (
              <>
                <InputLabel sx={{ mb: 1, mt: 2 }}>নতুন প্রশ্ন</InputLabel>
                <RichTextInput name="question" height="120px" />
              </>
            ) : (
              <ImageUploadBox
                name="question_img"
                label="প্রশ্ন সম্পর্কিত ছবিটি আপলোড করুন"
              />
            )}

            <InputLabel sx={{ mb: 1, mt: 2 }}>বিবরণ লিখুন (অপশনাল)</InputLabel>
            <RichTextInput name="supporting_notes_en" height="120px" />
          </div>

          <Box
            display="flex"
            justifyContent="flex-end"
            mt={2} // Adjust the margin top as needed
          >
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

export default DescriptiveAnswerForm;
