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
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const EditCourse: React.FC = () => {
  const { id } = useParams();
  const { data } = useCourseDetails(id);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState<'success' | 'error'>('success');
  const [selectedStep, setSelectedStep] = useState<number>(1);
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
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
      setSnackbarSeverity('success');
      setSnackbarMessage(response.data.message);
      setSnackbarOpen(true);

      console.log('API Response:', response.data);
    } catch (error:any) {
      setSnackbarSeverity('error');
      setSnackbarMessage(error.response.data.message || 'An error occurred');
      setSnackbarOpen(true);
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
              <Grid item xs={6}></Grid>

              <Grid item md={6}>
                {selectedStep === 1 && <StepOne />}
                {selectedStep === 2 && <StepTwo />}
              </Grid>
              <Grid item md={6}>
                <StepThree />
              </Grid>
              <Grid
                item
                xs={12}
                style={{ textAlign: 'right' }}
                alignItems="center"
                justifyContent="center"
                display="flex"
              >
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  size="large"
                  sx={{ width: 250, textAlign: 'center' }}
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
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default EditCourse;
