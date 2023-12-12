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
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SouthOutlinedIcon from '@mui/icons-material/SouthOutlined';

const EditCourse: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { data } = useCourseDetails(id);
  const [selectedStep, setSelectedStep] = useState<number>(1);
  const { showSnackbar } = useSnackbar();
  const validationSchema = Yup.object({
    code: Yup.string().required('Course code is required'),
    name_bn: Yup.string().required('Bangla course name is required'),
    short_desc_bn: Yup.string().required(
      'Bangla short description is required',
    ),
  });
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
      <Grid item xs={12}>
        <Breadcrumbs aria-label="breadcrumb" separator="››" sx={{ color: 'rgba(28, 27, 31, 1)', fontSize: '20px', fontWeight: 600 }}>
          <Link href="/" sx={{ color: 'rgba(255, 74, 95, 1)', fontSize: '16px', fontWeight: 500 }}>
            <HomeOutlinedIcon sx={{marginTop:"8px"}} />
          </Link>
          <Typography color="primary" sx={{ fontSize: '16px', fontWeight: 500 }}>
            {t('updateCourse')}
          </Typography>
        </Breadcrumbs>
      </Grid>
      <Formik
        enableReinitialize
        initialValues={data?.data}
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

              <Grid item md={6}>
                <MainCard
                  title={t('createCourse')}
                  rightButton={
                    <ButtonGroup sx={{ borderRadius: 0 }}>
                      <Button
                        sx={{
                          width: 90,
                          borderRadius: 0,
                          borderColor: 'transparent',
                          backgroundColor: selectedStep === 1 ? 'primary.main' : 'white',
                          '&:hover': { borderColor: 'transparent' },
                        }}
                        variant={selectedStep === 1 ? 'contained' : 'outlined'}
                        color="primary"
                        onClick={() => setSelectedStep(1)}
                      >
                        বাংলা
                        {selectedStep === 1 && <SouthOutlinedIcon sx={{width:'14px',height:"20px", marginLeft:'8px'}}/>} {/* Conditionally render the icon */}
                      </Button>
                      <Button
                        sx={{
                          width: 90,
                          borderRadius: 0,
                          borderTopRightRadius: '8px',
                          borderColor: 'transparent',
                          backgroundColor: selectedStep === 2 ? 'primary.main' : 'white',
                          '&:hover': { borderColor: 'transparent' },
                        }}
                        variant={selectedStep === 2 ? 'contained' : 'outlined'}
                        color="primary"
                        onClick={() => setSelectedStep(2)}
                      >
                        English
                        {selectedStep === 2 && <SouthOutlinedIcon sx={{width:'14px', height:"20px", marginLeft:'8px'}} />} {/* Conditionally render the icon */}
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
                  {t('update')}
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
