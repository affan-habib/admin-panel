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
import axios from 'axios';
import { apiBaseUrl } from 'config';

const CreateCourse: React.FC = () => {
  const initialValues = {
    code: '4444',
    name: 'Math',
    name_bn: 'গণিত',
    short_desc: 'this is sort des',
    short_desc_bn: 'এই সাজানোর des',
    long_desc: '<p>hhh</p>',
    long_desc_bn: 'এই দীর্ঘ বিবরণ',
    course_type_id: '1',
    remarks: 'none',
    created_by: '5',
    status: '1',
    icon: null,
    supporting_doc: null,
    featured_image: null,
  };

  const validationSchema = Yup.object({
    // englishField: Yup.string().required('English field is required'),
    // banglaField: Yup.string().required('Bangla field is required'),
    // Add more validations as needed
  });

  const [selectedStep, setSelectedStep] = useState<number>(1);
  const navigate = useNavigate();
  const handleSubmit = async (values: any) => {
    console.log(values);

    try {
      const formData = new FormData();

      // Append form data fields
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });

      // Make a POST request using Axios with multipart form data
      const response = await axios.post(`${apiBaseUrl}/course`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('API Response:', response.data);

      // Navigate or perform other actions after a successful request
      // navigate('/course/edit/35');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
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
