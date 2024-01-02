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
  Box,
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
import SouthOutlinedIcon from '@mui/icons-material/SouthOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
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
    let user : any = localStorage.getItem('user');
    user = JSON.parse(user);

    try {
      const formData = new FormData();

      Object.keys(values).forEach((key) => {
        // Check if the value is not null before appending to formData
        if (values[key] !== undefined) {
          formData.append(key, values[key]);
        }
      });
      formData.append('created_by', user?.id);

      const response = await axios.post(`${apiBaseUrl}/course`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      showSnackbar(response.data.message, 'success');

      navigate(`/course/edit/${response.data.data.id}`, {state: { isScroll: true}});
    } catch (error: any) {
      showSnackbar(error.response.data.message, 'error');
      console.error('Error submitting form:', error);
    }
  };
  return (
    <Container maxWidth="xl" sx={{ pb: 20 }}>
      <Grid item xs={12}>
        <Breadcrumbs
          aria-label="breadcrumb"
          separator="››"
          sx={{
            color: 'rgba(28, 27, 31, 1)',
            fontSize: '20px',
            fontWeight: 600,
          }}
        >
          <Link
            href="/"
            sx={{
              color: 'rgba(255, 74, 95, 1)',
              fontSize: '16px',
              fontWeight: 500,
            }}
          >
            <HomeOutlinedIcon sx={{ marginTop: '8px' }} />
          </Link>
          <Typography
            color="primary"
            sx={{ fontSize: '16px', fontWeight: 500 }}
          >
            {t('createCourse')}
          </Typography>
        </Breadcrumbs>
      </Grid>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, isValid }) => (
          <Form>
            <Box
              sx={{ p: 3, mt: 2, border: '1px dashed grey', borderRadius: 2 }}
            >
              <Grid container spacing={3}>
                <Grid item md={8} sm={12}>
                  <MainCard
                    title={t('createCourse')}
                    rightButton={
                      <ButtonGroup sx={{ borderRadius: 0 }}>
                        <Button
                          sx={{
                            width: 90,
                            borderRadius: 0,
                            borderColor: 'transparent',
                            backgroundColor:
                              selectedStep === 1 ? 'primary.main' : 'white',
                            '&:hover': { borderColor: 'transparent' },
                          }}
                          variant={
                            selectedStep === 1 ? 'contained' : 'outlined'
                          }
                          color="primary"
                          onClick={() => setSelectedStep(1)}
                        >
                          বাংলা
                          {selectedStep === 1 && (
                            <SouthOutlinedIcon
                              sx={{
                                width: '14px',
                                height: '20px',
                                marginLeft: '8px',
                              }}
                            />
                          )}{' '}
                          {/* Conditionally render the icon */}
                        </Button>
                        <Button
                          sx={{
                            width: 90,
                            borderRadius: 0,
                            borderTopRightRadius: '8px',
                            borderColor: 'transparent',
                            backgroundColor:
                              selectedStep === 2 ? 'primary.main' : 'white',
                            '&:hover': { borderColor: 'transparent' },
                          }}
                          variant={
                            selectedStep === 2 ? 'contained' : 'outlined'
                          }
                          color="primary"
                          onClick={() => setSelectedStep(2)}
                        >
                          English
                          {selectedStep === 2 && (
                            <SouthOutlinedIcon
                              sx={{
                                width: '14px',
                                height: '20px',
                                marginLeft: '8px',
                              }}
                            />
                          )}{' '}
                          {/* Conditionally render the icon */}
                        </Button>
                      </ButtonGroup>
                    }
                  >
                    {selectedStep === 1 && <StepOne />}
                    {selectedStep === 2 && <StepTwo />}
                  </MainCard>
                </Grid>
                <Grid item md={4} sm={12}>
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
            </Box>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default CreateCourse;
