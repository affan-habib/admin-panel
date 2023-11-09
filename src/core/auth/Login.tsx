import React, { useCallback, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useLoginMutation } from './useLoginMutation';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const loginMutation = useLoginMutation();

  const [method, setMethod] = useState<'email' | 'phoneNumber'>('email');

  const formik = useFormik({
    initialValues: {
      email: 'admin@siin.shop',
      password: '$iin*911',
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      password: Yup.string().max(255).required('Password is required'),
    }),
    onSubmit: async (values, helpers) => {
      try {
        await loginMutation.mutateAsync(values);
        navigate('/');
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: (err as Error).message });
        helpers.setSubmitting(false);
      }
    },
  });

  const handleMethodChange = useCallback(
    (event: React.ChangeEvent<{}>, value: 'email' | 'phoneNumber') => {
      setMethod(value);
    },
    [],
  );

  return (
    <>
      <Box
        sx={{
          backgroundColor: 'background.paper',
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: '100px',
            width: '100%',
          }}
        >
          <div>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="h4">Login</Typography>
            </Stack>
            {method === 'email' && (
              <form noValidate onSubmit={formik.handleSubmit}>
                <Stack spacing={3}>
                  <TextField
                    error={Boolean(formik.touched.email && formik.errors.email)}
                    fullWidth
                    helperText={formik.touched.email && formik.errors.email}
                    label="Email Address"
                    name="email"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="email"
                    value={formik.values.email}
                  />
                  <TextField
                    error={Boolean(
                      formik.touched.password && formik.errors.password,
                    )}
                    fullWidth
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                    label="Password"
                    name="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="password"
                    value={formik.values.password}
                  />
                </Stack>
                {formik.errors.submit && (
                  <Typography color="error" sx={{ mt: 3 }} variant="body2">
                    {formik.errors.submit}
                  </Typography>
                )}
                <Button
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  type="submit"
                  variant="contained"
                >
                  Continue
                </Button>
              </form>
            )}
            {method === 'phoneNumber' && (
              <div>
                <Typography sx={{ mb: 1 }} variant="h6">
                  Currently Not available
                </Typography>
                <Typography color="text.secondary">
                  This feature will be available in the future.
                </Typography>
              </div>
            )}
          </div>
        </Box>
      </Box>
    </>
  );
};

export default LoginPage;
