import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  CssBaseline,
  ButtonGroup,
  CircularProgress
} from '@mui/material';

import FooterContainer from 'views/auth/FooterContainer';
import LoginFooter from 'views/auth/LoginFooter';
import { useTranslation } from 'react-i18next';
import Image4 from 'assets/sherebangla.svg';
import rokeya from 'assets/rokeya.svg';
import LoginForm from 'views/auth/LoginForm';
import RegistrationForm from 'views/auth/RegistrationForm';
import CarouselComponent from 'views/auth/CarouselComponent';

import LanguageSelect from 'components/common/LanguageSelect';
import logo from 'assets/logo.svg';


const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const [selectedButton, setSelectedButton] = useState('login');
  const images = [Image4, rokeya];
  const handleButtonClick = (buttonType: string) => {
    setSelectedButton(buttonType);
  };

  return (
    <div>
      <CssBaseline />

      <Container maxWidth="lg" sx={{ mt: 6 }}>

        <Grid container spacing={2}>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <LanguageSelect></LanguageSelect>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={7} style={{ textAlign: 'left' }}>
            <img src={logo} style={{ position: 'absolute' }} alt="ss" />
            <CarouselComponent images={images} />
          </Grid>
          <Grid item xs={12} sm={1}></Grid>
          <Grid item xs={12} sm={4} display="flex" direction="column">
            <Paper style={{ padding: 20, minHeight: 400 }}>
              <Typography variant="h6" color="#002F6C" mb={2}>
                {t('welcomeMessage')}
              </Typography>
              <ButtonGroup sx={{ width: '100%' }}>
                <Button
                  variant={
                    selectedButton === 'login' ? 'contained' : 'outlined'
                  }
                  sx={{ flex: 1 }}
                  onClick={() => handleButtonClick('login')}
                >
                  {t('loginHere')}
                  {/* প্রবেশ করুন */}
                </Button>
                <Button
                  variant={
                    selectedButton === 'register' ? 'contained' : 'outlined'
                  }
                  sx={{ flex: 1 }}
                  onClick={() => handleButtonClick('register')}
                >
                  {t('registerHere')}
                  {/* নিবন্ধন করুন */}
                </Button>
              </ButtonGroup>
              <Box>
                {selectedButton === 'login' ? (
                  <LoginForm />
                ) : (
                  <RegistrationForm />
                )}
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
