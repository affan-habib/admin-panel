import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  Box,
  Stack,
} from '@mui/material';
import { styled } from '@mui/system';
import PersonIcon from '@mui/icons-material/Person';
import HttpsIcon from '@mui/icons-material/Https';
import image1 from '../../assets/logoOne.svg';
import image2 from '../../assets/logoTwo.svg';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import FooterContainer from '../../views/auth/FooterContainer';
import LoginFooter from '../../views/auth/LoginFooter';
import { useTranslation } from 'react-i18next';
import LanguageSelect from 'components/common/LanguageSelect';

const LoginButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'green',
  width: '100%', // Set the width to 100% to match the form fields
}));

const LoginPage: React.FC = () => {
  const { t } = useTranslation();

  const [showPassword, setShowPassword] = useState(false);

  // Handle form submission
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your login logic here
  };

  const [selectedButton, setSelectedButton] = useState('login');
  return (
    <Container maxWidth="lg" sx={{mt:6}}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={7} style={{ textAlign: 'left' }}>
          <img src={image1} alt="Image 1" />
          <img src={image2} alt="Image 2" />
        </Grid>

        <Grid item xs={12} sm={1}></Grid>

        {/* Right Section: Login Form */}
        <Grid item xs={12} sm={4} display="flex" direction='column'>
        <Box sx={{alignSelf: "flex-end", mb:2}}>
        <LanguageSelect/>
        </Box>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h6" color="#002F6C" mb={2}>
              {t('welcomeMessage')}
            </Typography>
            {/* <ToggleButtonGroup
              value={selectedButton}
              exclusive
              onChange={(e, newValue) => setSelectedButton(newValue)}
              aria-label="login or signup"
            >
              <ToggleButton value="login" fullWidth={true}>
                Login
              </ToggleButton>
              <ToggleButton value="signup" fullWidth={true}>
                Signup
              </ToggleButton>
            </ToggleButtonGroup> */}
            <form onSubmit={handleLogin}>
              <TextField
                placeholder={t('email')}
                fullWidth
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                placeholder={t('password')}
                type={showPassword ? 'text' : 'password'}
                fullWidth
                margin="normal"
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
                  control={<Checkbox color="primary" />}
                  label={
                    <Box component="div" fontSize={11}>
                      {t('remeberPassword')}
                    </Box>
                  }
                />
              </div>
              <LoginButton variant="contained" color="primary" type="submit">
                {t('login')}
              </LoginButton>
            </form>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <FooterContainer/>
        </Grid>

        <Grid item xs={12}>
          <LoginFooter/>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginPage;
