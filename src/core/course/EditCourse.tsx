import React, { useEffect, useRef, useState } from 'react';
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
import DyanamicForm from 'views/course/chapter/CreateChapter';
import { useLocation, useParams } from 'react-router-dom';
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
  const ref = useRef<HTMLDivElement>(null);
  const { state } = useLocation();
  const { t } = useTranslation();
  const { id } = useParams();
  const { data } = useCourseDetails(id);
  const [selectedStep, setSelectedStep] = useState<number>(1);
  const [isNew, setIsNew] = useState<boolean>(false);
  const { showSnackbar } = useSnackbar();
  const validationSchema = Yup.object({
    code: Yup.string().required('Course code is required'),
    name_bn: Yup.string().required('Bangla course name is required'),
    // short_desc_bn: Yup.string().required(
    //   'Bangla short description is required',
    // ),
  });
  useEffect(() => {
    if (state && state?.isScroll === true) {
      ref.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
      setIsNew(true);
    } else {
      setIsNew(false);
    }
  }, [])
  const handleSubmit = async (values: any) => {
    if (typeof values.supporting_doc === 'string') {
      delete values.supporting_doc;
    }
    if (typeof values.icon === 'string') {
      delete values.icon;
    }
    if (typeof values.featured_image === 'string') {
      delete values.featured_image;
    }

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
      ref.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
      window.scrollTo(0, 720);
      console.log("should down", ref.current?.scrollIntoView);
      
      setIsNew(true);
    } catch (error: any) {
      showSnackbar(error.response.data.message, 'error');
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ pb: 30 }}>
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
            {t('updateCourse')}
          </Typography>
        </Breadcrumbs>
      </Grid>
      <Formik
        enableReinitialize
        initialValues={{
          code: data?.data?.code,
          name_en: data?.data?.name_en || '',
          name_bn: data?.data?.name_bn || '',
          short_desc_en: data?.data?.short_desc_en || '',
          short_desc_bn: data?.data?.short_desc_bn || '',
          long_desc_en: data?.data?.long_desc_en || '',
          long_desc_bn: data?.data?.long_desc_bn || '',
          icon: data?.data?.icon || '',
          featured_image: data?.data?.featured_image || '',
          supporting_doc: data?.data?.supporting_doc || '',
          course_type: data?.data?.course_type || '',
          course_modules: data?.data?.course_modules,
          quiz_types: data?.data?.quiz_types,
          remarks: data?.data?.remarks || '',
          created_by: data?.data?.created_by,
          status: parseInt(data?.data?.status),
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, isValid }) => (
          <Form>
            <Box
              sx={{ p: 3, mt: 2, border: '1px dashed grey', borderRadius: 2 }}
            >
              <Grid container spacing={3}>
                <Grid item md={8} sm={12} xs={12}>
                  <MainCard
                    title={t('createCourse')}
                    titleRightIcon={true}
                    rightButton={
                      <ButtonGroup sx={{ borderRadius: 0 }}>
                        <Button
                          sx={{
                            borderRadius: 0,
                            width: 120,
                            height:'35px',
                            borderColor: 'transparent',
                            backgroundColor:
                              selectedStep === 1 ? 'primary.main' : 'white',
                            '&:hover': { borderColor: 'transparent' },
                          }}
                          endIcon={selectedStep === 1 ? <SouthOutlinedIcon
                            sx={{
                              width: '14px',
                              height: '20px',
                              marginLeft: '8px',
                            }}
                          /> : null}
                          variant={
                            selectedStep === 1 ? 'contained' : 'outlined'
                          }
                          color="primary"
                          onClick={() => setSelectedStep(1)}
                        >
                          <span style={{}}>বাংলা</span>

                        </Button>
                        <Button
                          sx={{
                            width: 120,
                            borderRadius: 0,
                            height:'35px',
                            borderTopRightRadius: '8px',
                            borderColor: 'transparent',
                            backgroundColor:
                              selectedStep === 2 ? 'primary.main' : 'white',
                            '&:hover': { borderColor: 'transparent' },
                            textTransform: 'none'
                          }}
                          endIcon={selectedStep === 2 ? <SouthOutlinedIcon
                            sx={{
                              width: '14px',
                              height: '20px',
                              marginLeft: '8px',
                            }}
                          /> : null}
                          variant={
                            selectedStep === 2 ? 'contained' : 'outlined'
                          }
                          color="primary"
                          onClick={() => setSelectedStep(2)}
                        >
                          <span style={{}}>English</span>

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
                    {t('update')}
                  </Button>
                </Grid>
              </Grid>
            </Box>
            <Grid
              container
              sx={{
                pb: 2,
                mt: 2,
                borderRadius: 2,
              }}
            >
              <Grid item md={8} sm={12} xs={12}>
                <DyanamicForm modules={data?.data?.course_modules} highlight={isNew ? 'highlight': ''} />
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
      <div style={{ position: 'fixed', bottom: 0 }} ref={ref}></div>
    </Container>
  );
};

export default EditCourse;
