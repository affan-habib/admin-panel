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
  RadioGroup,
  Radio,
} from '@mui/material';
import MarkInput from 'components/form/MarkInput';
import { useSnackbar } from 'context/SnackbarContext';
import { useQueryClient } from 'react-query';
import axios from 'axios';
import { apiBaseUrl } from 'config';
import ImageUploadBox from 'components/form/ImageUploadBox';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

const EditDescriptiveAnswerForm: React.FC<any> = ({
  data,
  handleCloseDialog,
  maxMark,
}) => {
  const { showSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const onSubmit = async (values: any) => {
    try {
      const response = await axios.patch(
        `${apiBaseUrl}/quizzes/${data.id}`,
        values,
      );
      showSnackbar(response.data.message, 'success');
      queryClient.invalidateQueries('couse-quizzes');
      handleCloseDialog();
    } catch (error: any) {
      showSnackbar(error.response.data.message, 'error');
      console.error('Error submitting form:', error);
    } // Handle form submission logic here
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
      initialValues={data}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ values, isValid, dirty, resetForm }) => (
        <Form>
          <Box mb={2} display="flex" flexDirection="row">
            <FormControlLabel
              value="option1"
              control={<Radio />}
              label={t('manualInput')}
              disabled // Make the first option disabled
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
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default EditDescriptiveAnswerForm;
