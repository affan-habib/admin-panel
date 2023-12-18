import React from 'react';
import { Formik, Form } from 'formik';
import Button from '@mui/material/Button';
import RichTextInput from 'components/form/RichTextInput';
import InputRadio from 'components/form/InputRadio';
import { InputLabel, Box } from '@mui/material';
import VideoUploadBox from 'components/form/VideoUploadBox';

const DescriptiveAnswerForm: React.FC<any> = ({ assessmentId }) => {
  const onSubmit = (values: any) => {
    // Handle form submission logic here
    console.log(values);
  };

  const onCancel = () => {
    // Handle cancel logic here
  };

  const initialValues = {
    question: '',
    isTrue: true,
    correctAnswer: '',
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ values }) => (
        <Form>
          <div>
            <InputLabel>প্রশ্নের ধরন:</InputLabel>
            <InputRadio label="লিখিত" name="isTrue" value={true} />
            <InputRadio label="ছবি সম্পর্কিত" name="isTrue" value={false} />
            {values.isTrue ? (
              <VideoUploadBox name="url" label="ভিডিও আপলোড করুন" />
            ) : (
              <>
                <InputLabel sx={{ mb: 1, mt: 2 }}>নতুন প্রশ্ন</InputLabel>
                <RichTextInput name="correctAnswer" height="120px" />
              </>
            )}

            <InputLabel sx={{ mb: 1, mt: 2 }}>বিবরণ লিখুন (অপশনাল)</InputLabel>
            <RichTextInput name="description" height="120px" />
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
