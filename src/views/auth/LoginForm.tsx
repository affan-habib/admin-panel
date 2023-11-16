import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  Box,
} from '@mui/material';
import { styled } from '@mui/system';
import PersonIcon from '@mui/icons-material/Person';
import HttpsIcon from '@mui/icons-material/Https';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { apiBaseUrl } from 'config';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const initialValues = {
    pdsid: '2016810150',
    password: 'password',
    rememberMe: false,
  };

  const validationSchema = Yup.object({
    pdsid: Yup.string().required('PDSID is required'),
    password: Yup.string().required('Password is required'),
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const onSubmit = async (values: any) => {
    try {
      const response = await axios.post(`${apiBaseUrl}/login`, {
        pdsid: values.pdsid,
        password: values.password,
        rememberMe: values.rememberMe,
      });

      const accessToken = response.data.access_token;
      localStorage.setItem('token', accessToken);
      navigate('/');

      console.log('Access Token:', accessToken);
    } catch (error) {}
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <>
      <Typography variant="h6" color="#002F6C" mb={2}>
        {/* Your welcome message */}
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          variant="outlined"
          size="small"
          name="pdsid"
          placeholder="Enter your PDSID"
          fullWidth
          margin="normal"
          value={formik.values.pdsid}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.pdsid && Boolean(formik.errors.pdsid)}
          helperText={formik.touched.pdsid && formik.errors.pdsid}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          variant="outlined"
          size="small"
          name="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter your Password"
          fullWidth
          margin="normal"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <HttpsIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                {showPassword ? (
                  <VisibilityOffIcon
                    onClick={() => setShowPassword(false)}
                    style={{ cursor: 'pointer' }}
                  />
                ) : (
                  <RemoveRedEyeIcon
                    onClick={() => setShowPassword(true)}
                    style={{ cursor: 'pointer' }}
                  />
                )}
              </InputAdornment>
            ),
          }}
        />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                name="rememberMe"
                checked={formik.values.rememberMe}
                onChange={formik.handleChange}
              />
            }
            label={
              <Box component="div" fontSize={14}>
                Remember me
              </Box>
            }
          />
        </div>
        <Button variant="contained" color="primary" type="submit">
          Login
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
