import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  CssBaseline,
} from '@mui/material';
import logo from 'assets/logo.svg';
import FooterContainer from 'views/auth/FooterContainer';
import LoginFooter from 'views/auth/LoginFooter';
import { useTranslation } from 'react-i18next';
import LoginForm from 'views/auth/LoginForm';
import CarouselComponent from 'views/auth/CarouselComponent';
import LanguageSelect from 'components/common/LanguageSelect';

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const [loginPageTitle, setLoginPageTitle] = useState(
    'learningManagementSystem',
  );

  const handleCardClick = (value: string) => {
    setLoginPageTitle(value);
  };
  return (
    <div style={{ backgroundColor: 'rgba(245, 245, 247, 1)' }}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ pt: 6, minHeight: '100vh' }}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            md={12}
            flexDirection="row"
            display="flex"
            justifyContent="space-between"
          >
            <img src={logo} alt="ss" />
            <LanguageSelect />
          </Grid>
          <Grid item xs={12} sm={7} style={{ textAlign: 'left' }}>
            <CarouselComponent />
          </Grid>
          <Grid item xs={12} sm={1}></Grid>
          <Grid item xs={12} sm={4} display="flex" direction="column">
            <Paper style={{ padding: 20, minHeight: 330 }}>
              <Typography variant="h6" color="primary.main" mb={2}>
                {t(`${loginPageTitle}LoginTitle`)}
              </Typography>
              <Box>
                <LoginForm />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <FooterContainer onCardClick={handleCardClick} />
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
