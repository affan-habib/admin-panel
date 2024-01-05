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
  Grid,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import HttpsIcon from '@mui/icons-material/Https';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RefreshIcon from '@mui/icons-material/Refresh';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { apiBaseUrl } from 'config';
import { useNavigate } from 'react-router-dom';
import { saveAuthData } from 'utils/authUtils';
import { useDispatch } from 'react-redux';
import { login } from 'store/reducers/authSlice';
import { useSnackbar } from 'context/SnackbarContext';

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const initialValues = {
    username: 'superadmin',
    password: 'password',
    rememberMe: false,
  };

  const validationSchema = Yup.object({
    username: Yup.string().required(),
    password: Yup.string().required(),
  });
  const { showSnackbar } = useSnackbar();

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const onSubmit = async (values: any) => {
    try {
      setLoading(true);

      const response = await axios.post(`${apiBaseUrl}/login`, {
        username: values.username,
        password: values.password,
        rememberMe: values.rememberMe,
      });

      const data = response.data.data;
      saveAuthData(data);
      showSnackbar("Login Successful", 'success');
      dispatch(login(data.user));
      navigate('/');
    } catch (error: any) {
      // Keep existing error handling logic
      showSnackbar(error.response.data.message, 'error');
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
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
          name="username"
          placeholder={t('userName')}
          fullWidth
          margin="normal"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
          sx={{
            '& .MuiFormHelperText-root.Mui-error': {
              color: 'white',  // Set the error message color to red
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            ),
            style: { backgroundColor: 'white' }
          }}
        />
        <TextField
          variant="outlined"
          size="small"
          name="password"
          type={showPassword ? 'text' : 'password'}
          placeholder={t('password')}
          fullWidth
          margin="normal"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          sx={{
            '& .MuiFormHelperText-root.Mui-error': {
              color: 'white',  // Set the error message color to red
            },
          }}
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
            style: { backgroundColor: 'white' }
          }}
        />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0px 0px 0px 8px' }}>
          <FormControlLabel
            control={
              <Checkbox
                name="rememberMe"
                checked={formik.values.rememberMe}
                onChange={formik.handleChange}
                sx={{
                  padding: '2px',
                  color: 'white',
                  '&.Mui-checked': {
                    color: 'white',
                  },
                }}
              />
            }
            label={
              <Box component="div" fontSize={12} sx={{ fontWeight: 400, color: 'white' }}>
                {t('remeberPassword')}
              </Box>
            }
          />
          <Box><h6 style={{ fontSize: '12px', fontWeight: 400, color: 'rgba(205, 255, 126, 1)' }}>{t('forgotPassword')}</h6></Box>
        </div>
        <Grid item
          xs={12}
          style={{ textAlign: 'center' }}
          alignItems="center"
          justifyContent="center"
          display="flex">
          <Button
            variant="contained"
            type="submit"
            disabled={loading}
            startIcon={loading ? <RefreshIcon /> : null}
            sx={{
              marginTop: '25px',
              width: '200px',
              fontSize: '18px',
              fontWeight: 700,
              backgroundColor: 'white',
              color: '#f1ebcc',
              '&:hover': {
                backgroundColor: 'white',  // Set the same background color as the default
                color: '#f1ebcc',  // Set the same text color as the default
              },
            }}
          >
            {t('login')}
          </Button>
        </Grid>
      </form>
    </>
  );
};

export default LoginForm;
