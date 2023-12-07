import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import {
  Container,
  Grid,
  Button,
  Breadcrumbs,
  Typography,
  Link,
} from '@mui/material';
import StepOne from 'views/course/StepOne';
import StepTwo from 'views/course/StepTwo';
import StepThree from 'views/course/StepThree';
import DyanamicForm from 'views/course/CreateChapter';
import { useParams } from 'react-router-dom';
import useCourseDetails from 'hooks/useCourseDetails';
import { apiBaseUrl } from 'config';
import axios from 'axios';

const EditCourse: React.FC = () => {
  const { id } = useParams();
  const { data } = useCourseDetails(id);

  const [selectedStep, setSelectedStep] = useState<number>(1);
  const handleSubmit = async (values: any) => {
    console.log(values);

    try {
      const formData = new FormData();
      formData.append('_method', 'PUT'); // Add "_method" key with value "PUT"

      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });

      const response = await axios.post(
        `${apiBaseUrl}/course/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      console.log('API Response:', response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  return (
    <Container maxWidth="xl" sx={{ pb: 30 }}>
      <Formik
        enableReinitialize
        initialValues={data?.data}
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
                    পাঠ্যক্রম আপডেট করুন
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
              <Grid item xs={6} style={{ textAlign: 'right' }}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ ml: 'auto' }}
                  type="submit"
                >
                  আপডেট
                </Button>
              </Grid>
              <Grid item md={7}>
                {selectedStep === 1 && <StepOne />}
                {selectedStep === 2 && <StepTwo />}
              </Grid>
              <Grid item md={5}>
                <StepThree />
              </Grid>
              <Grid item md={7}>
                <DyanamicForm modules={data?.data?.course_modules} />
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default EditCourse;
