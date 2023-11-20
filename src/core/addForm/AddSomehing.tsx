// components/form/MyForm.tsx
import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Stepper, { Step } from 'components/common/Stepper';
import Step1 from './Step1';
import Step2 from './Step2';
import InputField from 'components/form/InputField';
import { Container } from '@mui/material';

const MyForm: React.FC = () => {
  const initialValues = {
    englishField: '',
    banglaField: '',
    globalSetting: 'jjjjj',
    file: null,
    // Add more fields as needed
  };

  const validationSchema = Yup.object({
    // englishField: Yup.string().required('English field is required'),
    banglaField: Yup.string().required('Bangla field is required'),
    // Add more validations as needed
  });

  const handleSubmit = (values: any, actions: any) => {
    console.log('Form submitted:', values);
    actions.setSubmitting(false);
  };

  return (
    <Container>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, isValid }) => (
          <Form>
            <Stepper submitDisabled={isSubmitting || !isValid}>
              <Step title="English Form">
                <Step1 />
              </Step>
              <Step title="Step 2: Bangla Form">
                <Step2 />
              </Step>
              <Step title="Step 3: Global Settings">
                <InputField name="globalSetting" label="Global Settings" />
              </Step>
            </Stepper>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default MyForm;
