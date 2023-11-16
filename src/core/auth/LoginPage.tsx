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
  ToggleButtonGroup,
  ToggleButton,
  CssBaseline,
  ButtonGroup,
} from '@mui/material';
import { styled } from '@mui/system';
import PersonIcon from '@mui/icons-material/Person';
import HttpsIcon from '@mui/icons-material/Https';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import FooterContainer from '../../views/auth/FooterContainer';
import LoginFooter from '../../views/auth/LoginFooter';
import { useTranslation } from 'react-i18next';
import Image4 from '../../assets/sherebangla.svg';
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
    <div>
      <CssBaseline />

      <Container maxWidth="lg" sx={{ mt: 6 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={7} style={{ textAlign: 'left' }}>
            <img src={Image4} alt="fff" />
          </Grid>
          <Grid item xs={12} sm={1}></Grid>
          <Grid item xs={12} sm={4} display="flex" direction="column">
            <Paper style={{ padding: '20px', paddingBottom: 100 }}>
              <Typography variant="h6" color="#002F6C" mb={2}>
                {t('welcomeMessage')}
              </Typography>
              <ButtonGroup
                // color="white"
                sx={{ width: '100%' }}
              >
                <Button variant="contained" sx={{ flex: 1 }}>
                  প্রবেশ করুন
                </Button>
                <Button sx={{ flex: 1 }}>নিবন্ধন করুন</Button>
              </ButtonGroup>
              <Box>
                <form onSubmit={handleLogin}>
                  <TextField
                    size="small"
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
                    size="small"
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
                        <Box component="div" fontSize={14}>
                          {t('remeberPassword')}
                        </Box>
                      }
                    />
                  </div>
                  <LoginButton
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    {t('login')}
                  </LoginButton>
                </form>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <FooterContainer />
          </Grid>

          <Grid item xs={12}>
            <LoginFooter />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default LoginPage;
