import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  Container,
  Grid,
  Button,
  Box,
  Breadcrumbs,
  Typography,
  Link,
} from '@mui/material';
import StepOne from 'views/batch/StepOne';
import StepTwo from 'views/batch/StepTwo';
import StepThree from 'views/batch/StepThree';
import DyanamicForm from 'views/batch/DyanamicForm';

const CreateBatch: React.FC = () => {
  const initialValues = {
    batchName: '',
    description: '',
    selectedOption: 'option1',
    // globalSetting: 'jjjjj',
    // file: null,
    // Add more fields as needed
  };

  const validationSchema = Yup.object({
    // englishField: Yup.string().required('English field is required'),
    // banglaField: Yup.string().required('Bangla field is required'),
    // Add more validations as needed
  });

  const [selectedStep, setSelectedStep] = useState<number>(1);

  const handleSubmit = (values: any, actions: any) => {
    console.log('Form submitted:', values);
    actions.setSubmitting(false);
  };

  return (
    <Container maxWidth="xl">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, isValid }) => (
          <Form>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Breadcrumbs aria-label="breadcrumb">
                  <Link color="inherit" href="/dashboard">
                    Admin
                  </Link>
                  <Typography color="textPrimary">Create Batch</Typography>
                </Breadcrumbs>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant={selectedStep === 1 ? 'contained' : 'outlined'}
                  color="primary"
                  sx={{ mr: 2 }}
                  onClick={() => setSelectedStep(1)}
                >
                  Step One
                </Button>
                <Button
                  variant={selectedStep === 2 ? 'contained' : 'outlined'}
                  color="primary"
                  onClick={() => setSelectedStep(2)}
                >
                  Step Two
                </Button>
              </Grid>
              <Grid item xs={6} style={{ textAlign: 'right' }}>
                <Button variant="contained" color="primary" sx={{ ml: 'auto' }}>
                  Create New
                </Button>
              </Grid>
              <Grid item md={7}>
                {selectedStep === 1 && (
                  <Box
                    sx={{
                      border: '1px solid #D0D0D0',
                      borderRadius: '8px',
                      p: 2,
                    }}
                  >
                    <StepOne />
                  </Box>
                )}
                {selectedStep === 2 && (
                  <Box
                    sx={{
                      border: '1px solid #D0D0D0',
                      borderRadius: '8px',
                      p: 2,
                    }}
                  >
                    <StepTwo />
                  </Box>
                )}
              </Grid>
              <Grid item md={5}>
                <Box
                  sx={{
                    border: '1px solid #D0D0D0',
                    borderRadius: '8px',
                    p: 2,
                  }}
                >
                  <StepThree />
                </Box>
              </Grid>
              <Grid item md={7}>
                <Box
                  sx={{
                    border: '1px solid #D0D0D0',
                    borderRadius: '8px',
                    p: 2,
                  }}
                >
                  <DyanamicForm />
                </Box>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default CreateBatch;
