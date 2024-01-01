import React, { useEffect, useState } from 'react';
import {
  CircularProgress,
  Container,
  Grid,
  Typography,
  InputLabel,
  Breadcrumbs,
  Link,
} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { apiBaseUrl } from '../../config';

import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'context/SnackbarContext';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import * as Yup from 'yup';
const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  username: Yup.string()
    .matches(/^[a-zA-Z]+$/, 'Username must contain only letters')
    .required('Username is required'),
  email: Yup.string().email('Invalid email address'),
  // .required('Email is required'),
  mobile_no: Yup.string()
    .matches(
      /^[0-9+\-]+$/,
      'Mobile number must contain only numbers, +, and - signs',
    )
    .required('Mobile number is required'),
  // Add other validation rules for other fields as needed
});

const CreateAdminUser: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (values: any) => {
    setLoading(true);

    const token = localStorage.getItem('token');

    try {
      const response = await axios.post(`${apiBaseUrl}/admins`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      showSnackbar(response.data.message, 'success');
      navigate('/admin-user-list');
    } catch (error: any) {
      console.error('Error submitting form:', error);
      showSnackbar(
        error.response?.data?.message || 'An error occurred',
        'error',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Container maxWidth="xl" style={{ marginTop: '10px' }}>
        <Grid container>
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
                {t('createUser')}
              </Typography>
            </Breadcrumbs>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ color: 'rgba(0, 106, 78, 1)', marginTop: '20px' }}
            >
              {t('createUser')}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              border: '1px solid rgba(180, 180, 180, 1)',
              borderRadius: '8px',
              p: 2,
            }}
          >
            <Formik
              initialValues={{
                name: '',
                type: '',
                password: '',
                username: '',
                belongs_hstti: 1,
                hstti_code: '123',
                mobile_no: '',
                zone: 'Dhaka',
              }}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              {({ touched, errors }) => (
                <Form
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={3}>
                      <InputLabel
                        htmlFor="textField"
                        style={{ marginBottom: '7px' }}
                      >
                        {t('fullUserName')}
                        <span style={{ color: 'red' }}>*</span>
                      </InputLabel>
                      <Field
                        name="name"
                        as={TextField}
                        fullWidth
                        size="small"
                        error={touched.name && Boolean(errors.name)}
                        helperText={touched.name ? errors.name : ''}
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <InputLabel
                        htmlFor="dropdown"
                        style={{ marginBottom: '7px' }}
                      >
                        {t('designation')}{' '}
                        <span style={{ color: 'red' }}>*</span>
                      </InputLabel>
                      <Field
                        name="type"
                        as={TextField}
                        select
                        fullWidth
                        size="small"
                        //label="সিলেক্ট করুন"
                        //
                        // Set an empty default value
                      >
                        <MenuItem value="superadmin">Super admin</MenuItem>
                        <MenuItem value="reportadmin">Report admin</MenuItem>
                        <MenuItem value="dsheadmin">DSHE admin</MenuItem>
                        <MenuItem value="hsttiadmin">Hstti admin</MenuItem>
                        <MenuItem value="contentadmin">Content admin</MenuItem>
                        <MenuItem value="batchcoordinator">
                          Batch Coordinator
                        </MenuItem>
                      </Field>
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <InputLabel
                        htmlFor="name"
                        style={{ marginBottom: '7px' }}
                      >
                        {t('userName')}
                        <span style={{ color: 'red' }}>*</span>
                      </InputLabel>
                      <Field
                        name="username"
                        as={TextField}
                        fullWidth
                        size="small"
                        error={touched.username && Boolean(errors.username)}
                        helperText={touched.username ? errors.username : ''}
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <InputLabel
                        htmlFor="email"
                        style={{ marginBottom: '7px' }}
                      >
                        {t('email')} <span style={{ color: 'red' }}>*</span>
                      </InputLabel>
                      <Field
                        name="email"
                        as={TextField}
                        fullWidth
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <InputLabel
                        htmlFor="number"
                        style={{ marginBottom: '7px' }}
                      >
                        {t('mobileNo')}
                        <span style={{ color: 'red' }}>*</span>
                      </InputLabel>
                      <Field
                        name="mobile_no"
                        as={TextField}
                        fullWidth
                        size="small"
                        error={touched.mobile_no && Boolean(errors.mobile_no)}
                        helperText={touched.mobile_no ? errors.mobile_no : ''}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <InputLabel
                        htmlFor="dropdown"
                        style={{ marginBottom: '7px' }}
                      >
                        {t('status')} <span style={{ color: 'red' }}>*</span>
                      </InputLabel>
                      <Field
                        name="status"
                        as={TextField}
                        select
                        fullWidth
                        size="small"
                        //label="সিলেক্ট করুন"

                        // Set an empty default value
                      >
                        <MenuItem value="1">Active</MenuItem>
                        <MenuItem value="2">Inactive</MenuItem>
                      </Field>
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <InputLabel
                        htmlFor="dropdown"
                        style={{ marginBottom: '7px' }}
                      >
                        {t('userRoleName')}{' '}
                        <span style={{ color: 'red' }}>*</span>
                      </InputLabel>
                      <Field
                        name="role"
                        as={TextField}
                        select
                        fullWidth
                        size="small"
                        //label="সিলেক্ট করুন"

                        // Set an empty default value
                      >
                        <MenuItem value="super-admin">Super Admin</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                        <MenuItem value="trainer">Trainer</MenuItem>
                        <MenuItem value="trainee">Trainee</MenuItem>
                      </Field>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <InputLabel
                        htmlFor="password"
                        style={{ marginBottom: '7px' }}
                      >
                        {t('password')} <span style={{ color: 'red' }}>*</span>
                      </InputLabel>
                      <Field
                        name="password"
                        type="password"
                        as={TextField}
                        fullWidth
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <InputLabel
                        htmlFor="file"
                        style={{ marginBottom: '7px' }}
                      >
                        {t('uploadImage')} - {t('profileImageLimit')}
                      </InputLabel>
                      <Field
                        name="file"
                        type="file"
                        as={TextField} // Use TextField for consistent styling
                        fullWidth
                        size="small"
                        InputLabelProps={{ shrink: true }} // Keep the label from floating to the top
                      />
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      style={{ textAlign: 'right' }}
                      alignItems="center"
                      justifyContent="right"
                      display="flex"
                    >
                      {' '}
                      {loading ? (
                        // Show the loader if loading
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        <Button
                          type="submit"
                          aria-label="toggle-status"
                          size="small"
                          variant="contained"
                          style={{
                            backgroundColor: 'primary.main',
                            color: '#FAFAFA',
                            width: '249px',
                            height: '40px',
                            display: 'inline-flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: '16px',
                            fontWeight: '600',
                            fontFamily: 'Roboto',
                            marginTop: '14px',
                          }}
                        >
                          {t('submit')}
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default CreateAdminUser;
