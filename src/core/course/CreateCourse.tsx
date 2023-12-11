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
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { apiBaseUrl } from 'config';
import { useSnackbar } from 'context/SnackbarContext';
import MainCard from 'components/cards/MainCard';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

const CreateCourse: React.FC = () => {
  const { t } = useTranslation();
  const initialValues = {
    code: null,
    name_en: '',
    name_bn: '',
    short_desc_en: '',
    short_desc_bn: '',
    long_desc_en: '',
    long_desc_bn: '',
    course_type_id: '1',
    remarks: '',
    created_by: '5',
    status: '1',
    icon: undefined,
    supporting_doc: undefined,
    featured_image: undefined,
  };

  const [selectedStep, setSelectedStep] = useState<number>(1);
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const validationSchema = Yup.object({
    code: Yup.string().required('Course code is required'),
    name_bn: Yup.string()
      .matches(/^[^$%^&:;()]*$/, 'Special characters ^$%^&:;() are not allowed')
      .required('Course name is required'),
    icon: Yup.mixed().test(
      'fileSize',
      'Icon image should be less than 100KB',
      (value) => {
        if (value && value instanceof File && value.size) {
          return value.size <= 100 * 1024; // 100KB
        }
        return true; // Allow null or undefined values
      },
    ),

    featured_image: Yup.mixed().test(
      'fileSize',
      'Featured image should be less than 200KB',
      (value) => {
        if (value && value instanceof File && value.size) {
          return value.size <= 200 * 1024; // 200KB
        }
        return true; // Allow null or undefined values
      },
    ),

    supporting_doc: Yup.mixed().test(
      'fileSize',
      'Supporting document should be less than 5MB',
      (value) => {
        if (value && value instanceof File && value.size) {
          return value.size <= 5 * 1024 * 1024; // 5MB
        }
        return true; // Allow null or undefined values
      },
    ),
  });

  const handleSubmit = async (values: any) => {
    console.log(values);

    try {
      const formData = new FormData();

      Object.keys(values).forEach((key) => {
        // Check if the value is not null before appending to formData
        if (values[key] !== undefined) {
          formData.append(key, values[key]);
        }
      });

      const response = await axios.post(`${apiBaseUrl}/course`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      showSnackbar(response.data.message, 'success');

      console.log('API Response:', response.data);
      navigate(`/course/edit/${response.data.data.id}`);
    } catch (error: any) {
      showSnackbar(error.response.data.message, 'error');
      console.error('Error submitting form:', error);
    }
  };
  return (
    <Container maxWidth="xl" sx={{ pb: 20 }}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, isValid }) => (
          <Form>
            <Grid
              container
              spacing={3}
              sx={{
                border: '1px dashed grey',
                pr: 2,
                pb: 2,
                mt: 2,
                borderRadius: 2,
              }}
            >
              <Grid item xs={12}>
                <Breadcrumbs aria-label="breadcrumb">
                  <Link color="inherit" href="/dashboard">
                    {t('adminPanel')}
                  </Link>
                  <Typography color="textPrimary">
                    {t('createCourse')}
                  </Typography>
                </Breadcrumbs>
              </Grid>
              <Grid item md={6}>
                <MainCard
                  title={t('createCourse')}
                  rightButton={
                    <ButtonGroup>
                      <Button
                        sx={{ width: 90 }}
                        variant={selectedStep === 1 ? 'contained' : 'outlined'}
                        color="primary"
                        onClick={() => setSelectedStep(1)}
                      >
                        বাংলা
                      </Button>
                      <Button
                        variant={selectedStep === 2 ? 'contained' : 'outlined'}
                        color="primary"
                        onClick={() => setSelectedStep(2)}
                      >
                        English
                      </Button>
                    </ButtonGroup>
                  }
                >
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
                  {t('submit')}
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default CreateCourse;
