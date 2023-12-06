import React from 'react';
import { Container, Grid,Typography, InputLabel } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

const CreateAdminUser: React.FC = () => {
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
                textField: '',
                dropdown: '',
                password: '',
                phone: '',
              }}
              onSubmit={(values) => {
                // Handle form submission logic
                console.log(values);
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
                      name="textField"
                      as={TextField}
                      fullWidth
                      size="small"
                    />
                  </Grid>

                  <Grid item xs={12} md={3}>
                    <InputLabel htmlFor="dropdown">পদবি</InputLabel>
                    <Field
                      name="dropdown"
                      as={TextField}
                      select
                      fullWidth
                      size="small"
                      label="সিলেক্ট করুন"
                       // Set an empty default value
                    >
                      
                      <MenuItem value="option1">Option 1</MenuItem>
                      <MenuItem value="option2">Option 2</MenuItem>
                      <MenuItem value="option3">Option 3</MenuItem>
                    </Field>
                  </Grid>

                  <Grid item xs={12} md={3}>
                    <InputLabel htmlFor="name">ইউজার নেম</InputLabel>
                    <Field
                      name="name"
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
                      name="dropdown"
                      as={TextField}
                      select
                      fullWidth
                      size="small"
                      label="সিলেক্ট করুন"
                       // Set an empty default value
                    >
                      
                      <MenuItem value="option1">Option 1</MenuItem>
                      <MenuItem value="option2">Option 2</MenuItem>
                      <MenuItem value="option3">Option 3</MenuItem>
                    </Field>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <InputLabel htmlFor="dropdown">ইউজার রোল নেম</InputLabel>
                    <Field
                      name="dropdown"
                      as={TextField}
                      select
                      fullWidth
                      size="small"
                      label="সিলেক্ট করুন"
                       // Set an empty default value
                    >
                      
                      <MenuItem value="option1">Option 1</MenuItem>
                      <MenuItem value="option2">Option 2</MenuItem>
                      <MenuItem value="option3">Option 3</MenuItem>
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
                    aria-label="toggle-status"
                    size="small"
                    variant='contained'
                    style={{
                        backgroundColor:'primary.main',
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