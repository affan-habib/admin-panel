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
      dispatch(login(data.user));
      navigate('/');
    } catch (error) {
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
          size="small"
          name="username"
          placeholder={t('email')}
          fullWidth
          margin="normal"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent:'space-between' }}>
          <FormControlLabel
            control={
              <Checkbox
                name="rememberMe"
                checked={formik.values.rememberMe}
                onChange={formik.handleChange}
                sx={{color:'white'}}
              />
            }
            label={
              <Box component="div" fontSize={12} sx={{fontWeight:400, color:'white'}}>
                {t('remeberPassword')}
              </Box>
            }
          />
          <Box><h6 style={{fontSize:'12px', fontWeight:400, color:'rgba(205, 255, 126, 1)'}}>{t('forgotPassword')}</h6></Box>
        </div>
        <Box sx={{
              display: 'flex', justifyContent: 'center', 
            }}>
          <Button
            variant="contained"
            type="submit"
            
            disabled={loading}
            startIcon={loading ? <RefreshIcon /> : null}
            sx={{
              marginTop:'20px',
              height:'40px',
              width:'200px',
              fontSize:'18px',
              fontWeight:700,
              backgroundColor:'white',
              color:'rgba(0, 106, 78, 1)'
            }}
          >
            {t('login')}
          </Button>
        </Box>

      </form>
    </>
  );
};

export default LoginForm;
