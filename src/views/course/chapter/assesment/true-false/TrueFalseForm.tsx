import React from 'react';
import { Formik, Field, Form } from 'formik';
import Button from '@mui/material/Button';
import RichTextInput from 'components/form/RichTextInput';
import InputRadio from 'components/form/InputRadio';
import { InputLabel, Box } from '@mui/material';

const TrueFalseForm: React.FC<any> = ({ assessmentId }) => {
  const onSubmit = (values: any) => {
    // Handle form submission logic here
    console.log(values);
  };

  const onCancel = () => {
    // Handle cancel logic here
  };

  return (
    <Formik
      initialValues={{
        question: '',
        isTrue: true,
        correctAnswer: '',
      }}
      onSubmit={onSubmit}
    >
      <Form>
        <div>
          <InputLabel sx={{ mb: 1 }}>সঠিক উত্তরটি নির্বাচন করুন</InputLabel>
          <RichTextInput name="question" height="120px" />
          <InputLabel>সঠিক উত্তরটি নির্বাচন করুন</InputLabel>
          <InputRadio label="সঠিক" name="isTrue" value={true} />
          <InputRadio label="ভুল" name="isTrue" value={false} />
          <InputLabel sx={{ mb: 1, mt: 2 }}>সঠিক উত্তরটি লিখুন</InputLabel>
          <RichTextInput name="correctAnswer" height="120px" />
        </div>

        <Box
          display="flex"
          justifyContent="flex-end"
          mt={2} // Adjust the margin top as needed
        >
          <Button type="submit" variant="contained" color="primary">
            সাবমিট
          </Button>
          <Button
            variant="outlined"
            onClick={onCancel}
            sx={{ ml: 2 }}
          >
            সেভ এবং অ্যাড
          </Button>
        </Box>
      </Form>
    </Formik>
  );
};

export default TrueFalseForm;
