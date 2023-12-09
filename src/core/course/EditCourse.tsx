import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import {
  Container,
  Grid,
  Button,
  Breadcrumbs,
  Typography,
  Link,
  ButtonGroup,
} from '@mui/material';
import StepOne from 'views/course/StepOne';
import StepTwo from 'views/course/StepTwo';
import StepThree from 'views/course/StepThree';
import DyanamicForm from 'views/course/CreateChapter';
import { useParams } from 'react-router-dom';
import useCourseDetails from 'hooks/useCourseDetails';
import { apiBaseUrl } from 'config';
import axios from 'axios';
import { useSnackbar } from 'context/SnackbarContext';
import MainCard from 'components/cards/MainCard';

const EditCourse: React.FC = () => {
  const { id } = useParams();
  const { data } = useCourseDetails(id);
  const [selectedStep, setSelectedStep] = useState<number>(1);
  const { showSnackbar } = useSnackbar();

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
      showSnackbar(response.data.message, 'success');
      console.log('API Response:', response.data);
    } catch (error: any) {
      showSnackbar(error.response.data.message, 'error');
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
            <Grid container spacing={3} sx={{ border: '1px dashed grey', pr: 2, pb: 2, mt: 2, borderRadius: 2 }}>
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
              <Grid item md={6}>
                <MainCard title="পাঠ্যক্রম তৈরি করুন" rightButton={<ButtonGroup>
                  <Button
                    variant={selectedStep === 1 ? 'contained' : 'outlined'}
                    color="primary"
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
                </ButtonGroup>}>
                  {selectedStep === 1 && <StepOne />}
                  {selectedStep === 2 && <StepTwo />}
                </MainCard>
              </Grid>
              <Grid item md={6}>
                <StepThree />
              </Grid>
              <Grid
                item
                xs={12}
                style={{ textAlign: 'right' }}
                alignItems="center"
                justifyContent="right"
                display="flex"
              >
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  size="large"
                  sx={{ width: 250 }}
                >
                  সাবমিট
                </Button>
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
