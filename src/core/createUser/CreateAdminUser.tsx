import React from 'react';
import { Container, Grid, Typography, InputLabel } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { apiBaseUrl } from '../../config';

const CreateAdminUser: React.FC = () => {
  const navigate = useNavigate()
  const handleSubmit = async (values: any) => {
    console.log(values);
    const token = localStorage.getItem('token');
    try {
      axios.post(`${apiBaseUrl}/admins`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(function (response) {
          navigate("/admin-user-list")
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  return (
    <div>


      <Container maxWidth="xl" style={{ marginTop: '20px' }}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ color: 'rgba(0, 106, 78, 1)' }}>
              ইউজার তৈরি করুন
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ border: '1px solid rgba(180, 180, 180, 1)', borderRadius: '8px', p: 2 }}>
            <Formik
              initialValues={{
                name: '',
                type: '',
                password: '',
                username: '',
                belongs_hstti: 1,
                hstti_code: "123",
                zone: "Dhaka",
              }}
              onSubmit={handleSubmit}
            >
              <Form
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12} md={3}>
                    <InputLabel htmlFor="textField">ব্যবহারকারীর সম্পূর্ন নাম</InputLabel>
                    <Field
                      name="name"
                      as={TextField}
                      fullWidth
                      size="small"
                    />
                  </Grid>

                  <Grid item xs={12} md={3}>
                    <InputLabel htmlFor="dropdown">পদবি</InputLabel>
                    <Field
                      name="type"
                      as={TextField}
                      select
                      fullWidth
                      size="small"
                      label="সিলেক্ট করুন"
                    // Set an empty default value
                    >

                      <MenuItem value="hsttiadmin">Hstti admin</MenuItem>
                    </Field>
                  </Grid>

                  <Grid item xs={12} md={3}>
                    <InputLabel htmlFor="name">ইউজার নেম</InputLabel>
                    <Field
                      name="username"
                      type="name"
                      as={TextField}
                      fullWidth
                      size="small"
                    />
                  </Grid>

                  <Grid item xs={12} md={3}>
                    <InputLabel htmlFor="email"> ইমেইল</InputLabel>
                    <Field
                      name="email"
                      as={TextField}
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <InputLabel htmlFor="number"> মোবাইল নাম্বার</InputLabel>
                    <Field
                      name="mobile_no"
                      as={TextField}
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <InputLabel htmlFor="dropdown">স্ট্যাটাস</InputLabel>
                    <Field
                      name="status"
                      as={TextField}
                      select
                      fullWidth
                      size="small"
                      label="সিলেক্ট করুন"
                    // Set an empty default value
                    >

                      <MenuItem value="1">Active</MenuItem>
                      <MenuItem value="2">Inactive</MenuItem>

                    </Field>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <InputLabel htmlFor="dropdown">ইউজার রোল নেম</InputLabel>
                    <Field
                      name="role"
                      as={TextField}
                      select
                      fullWidth
                      size="small"
                      label="সিলেক্ট করুন"
                    // Set an empty default value
                    >

                      <MenuItem value="admin">Admin</MenuItem>
                      <MenuItem value="trainer">Trainer</MenuItem>
                      <MenuItem value="trainee">trainee</MenuItem>
                    </Field>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <InputLabel htmlFor="password">পাসওয়ার্ড</InputLabel>
                    <Field
                      name="password"
                      type="password"
                      as={TextField}
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <InputLabel htmlFor="file">আপলোড ইমেজ</InputLabel>
                    <Field
                      name="file"
                      type="file"
                      as={TextField} // Use TextField for consistent styling
                      fullWidth
                      size="small"
                      InputLabelProps={{ shrink: true }} // Keep the label from floating to the top
                    />
                  </Grid>
                </Grid>

                <Button
                  type="submit"
                  aria-label="toggle-status"
                  size="small"
                  variant='contained'
                  style={{
                    backgroundColor: 'primary.main',
                    color: 'white',
                    width: '100px',
                    display: 'inline-flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  সাবমিট
                </Button>
              </Form>
            </Formik>
          </Grid>
        </Grid>
      </Container>
    </div>



  );

};

export default CreateAdminUser;