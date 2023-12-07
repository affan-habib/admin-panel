import React from 'react';
import {
  Container,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  Button,
} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { apiBaseUrl } from '../../config';


interface ApiErrorResponse {
  response: {
    data: Response; // Your actual response structure
    status: number;
    statusText: string;
    headers: Record<string, string>;
    config: Record<string, unknown>;
  };
  request?: unknown;
  message: string;
}

const CreateAdminUser: React.FC = () => {
  const token = localStorage.getItem('token');
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
                userName: '',
                email: '',
                number: '',
                status: '',
                role: '',
                password: '',
                hstti_code: '123',
                zone: 'dhaka',
                belongs_hstti: '1'
              }}
              onSubmit={async (values) => {
                try {
                  const response = await axios.post(
                    `${apiBaseUrl}/admins`,

                    JSON.stringify({
                      name: values.name,
                      type: values.type,
                      username: values.userName,
                      email: values.email,
                      mobile_no: values.number,
                      status: values.status,
                      role: values.role,
                      password: values.password,
                      hstti_code: '123',
                      zone: 'dhaka',
                      belongs_hstti: '1'
                      // Add other fields as needed
                    }),
                    {
                      headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );
                  console.log('API Response:', response);

                  console.log('API Response Data:', response.data);

                  // Handle success, e.g., show a success message or redirect
                }catch (error: unknown) {
                  console.error('Error submitting form:', error);
              
                  // if (axios.isAxiosError(error)) {
                  //   const axiosError = error as ApiErrorResponse;
                  //   console.error('Server Response:', axiosError.response.data);
                  // }
                }
              }}
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
                    >
                      <MenuItem value="hsttiadmin">hsttiadmin</MenuItem>
                      {/* Add other MenuItem elements as needed */}
                    </Field>
                  </Grid>

                  <Grid item xs={12} md={3}>
                    <InputLabel htmlFor="name">ইউজার নেম</InputLabel>
                    <Field
                      name="userName"
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
                      name="number"
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
                    >
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={0}>0</MenuItem>
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

                      <MenuItem value="reportadmin">reportadmin</MenuItem>

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

                  {/* <Grid item xs={12} md={3}>
                  <InputLabel htmlFor="file">আপলোড ইমেজ</InputLabel>
                  <Field
                    name="file"
                    type="file"
                    as={TextField} // Use TextField for consistent styling
                    fullWidth
                    size="small"
                    InputLabelProps={{ shrink: true }} // Keep the label from floating to the top
                  />
                </Grid> */}
                </Grid>

                <Button
                  type="submit"
                  aria-label="toggle-status"
                  size="small"
                  variant="contained"
                  style={{
                    backgroundColor: 'primary.main',
                    color: 'white',
                    width: '100px',
                    display: 'inline-flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '16px',
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