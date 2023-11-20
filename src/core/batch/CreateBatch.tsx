// components/form/CreateBatch.tsx
import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Stepper, { Step } from 'components/common/Stepper';
import { Container } from '@mui/material';
import StepOne from 'views/batch/StepOne';
import StepTwo from 'views/batch/StepTwo';
import StepThree from 'views/batch/StepThree';

const CreateBatch: React.FC = () => {
  const initialValues = {
    batchName: '',
    description: '',
    // globalSetting: 'jjjjj',
    // file: null,
    // Add more fields as needed
  };

  const validationSchema = Yup.object({
    // englishField: Yup.string().required('English field is required'),
    // banglaField: Yup.string().required('Bangla field is required'),
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
              <Step title="Bengali">
                <StepOne />
              </Step>
              <Step title="English">
                <StepTwo />
              </Step>
              <Step title="Global Settings">
                <StepThree />
              </Step>
            </Stepper>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default CreateBatch;
