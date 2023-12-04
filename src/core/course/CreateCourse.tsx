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
  Stack,
} from '@mui/material';
import StepOne from 'views/course/StepOne';
import StepTwo from 'views/course/StepTwo';
import StepThree from 'views/course/StepThree';
import { useNavigate } from 'react-router-dom';
import { Add } from '@mui/icons-material';

const CreateCourse: React.FC = () => {
  const initialValues = {
    batchName: '',
    description: '',
    selectedOption: 'option1',
    // globalSetting: 'jjjjj',
    // file: null,
    // Add more fields as needed
  };
  const obj = {
    code: '2350',
    name: 'Math',
    name_bn: 'গণিত',
    short_desc: 'this is sort des',
    short_desc_bn: 'এই সাজানোর des',
    long_desc: 'this is long description',
    long_desc_bn: 'এই দীর্ঘ বিবরণ',
    course_type_id: '1',
    remarks: 'none',
    created_by: '5',
    status: '1',
  };
  const validationSchema = Yup.object({
    // englishField: Yup.string().required('English field is required'),
    // banglaField: Yup.string().required('Bangla field is required'),
    // Add more validations as needed
  });

  const [selectedStep, setSelectedStep] = useState<number>(1);
  const navigate = useNavigate();
  const handleSubmit = (values: any, actions: any) => {
    // console.log('Form submitted:', values);
    // actions.setSubmitting(false);
    navigate('/course/edit/35');
  };

  return (
    <Container maxWidth="xl">
      <Formik
        initialValues={initialValues}
        // validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, isValid }) => (
          <Form>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Breadcrumbs aria-label="breadcrumb">
                  <Link color="inherit" href="/dashboard">
                    অ্যাডমিন প্যানেল
                  </Link>
                  <Typography color="textPrimary">
                    পাঠ্যক্রম তৈরি করুন
                  </Typography>
                </Breadcrumbs>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant={selectedStep === 1 ? 'contained' : 'outlined'}
                  color="primary"
                  sx={{ mr: 2 }}
                  onClick={() => setSelectedStep(1)}
                >
                  Bangla
                </Button>
                <Button
                  variant={selectedStep === 2 ? 'contained' : 'outlined'}
                  color="primary"
                  onClick={() => setSelectedStep(2)}
                >
                  English
                </Button>
              </Grid>
              <Grid item md={7}>
                {selectedStep === 1 && <StepOne />}
                {selectedStep === 2 && <StepTwo />}
              </Grid>
              <Grid item md={5}>
                <StepThree />
              </Grid>
              <Grid item xs={7} style={{ textAlign: 'right' }}>
                <Button variant="contained" color="primary" type="submit">
                  সাবমিট
                </Button>
                <Stack
                  sx={{
                    p: 2,
                    border: '1px solid #D0D0D0',
                    borderRadius: '8px',
                    mt: 2,
                  }}
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h6" color="primary.main">
                    অধ্যায় যোগ করুন
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    type="submit"
                    startIcon={<Add />}
                    disabled
                  >
                    অধ্যায় যোগ করুন
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default CreateCourse;
