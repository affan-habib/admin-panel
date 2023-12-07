import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import {
  Container,
  Grid,
  Button,
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
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const CreateCourse: React.FC = () => {
  const initialValues = {
    code: '',
    name: '',
    name_bn: '',
    short_desc: '',
    short_desc_bn: '',
    long_desc: '',
    long_desc_bn: '',
    course_type_id: '1',
    remarks: '',
    created_by: '5',
    status: '1',
    icon: null,
    supporting_doc: null,
    featured_image: null,
  };
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState<'success' | 'error'>('success');
  const [selectedStep, setSelectedStep] = useState<number>(1);
  const navigate = useNavigate();
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  const handleSubmit = async (values: any) => {
    console.log(values);

    try {
      const formData = new FormData();

      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });

      const response = await axios.post(`${apiBaseUrl}/course`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSnackbarSeverity('success');
      setSnackbarMessage(response.data.message);
      setSnackbarOpen(true);

      console.log('API Response:', response.data);
      navigate(`/course/edit/${response.data.data.id}`);
    } catch (error:any) {
      setSnackbarSeverity('error');
      setSnackbarMessage(error.response.data.message || 'An error occurred');
      setSnackbarOpen(true);
      console.error('Error submitting form:', error);
    }
  };
  return (
    <Container maxWidth="xl" sx={{ pb: 20 }}>
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
              <Grid item xs={6}>
            
              </Grid>
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
              
            </Grid>
          </Form>
        )}
      </Formik>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CreateCourse;
