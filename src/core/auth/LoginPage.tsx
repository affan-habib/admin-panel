import React from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  CssBaseline,
  ButtonGroup,
} from '@mui/material';

import FooterContainer from '../../views/auth/FooterContainer';
import LoginFooter from '../../views/auth/LoginFooter';
import { useTranslation } from 'react-i18next';
import Image4 from '../../assets/sherebangla.svg';
import LoginForm from '../../views/auth/LoginForm';

const LoginPage: React.FC = () => {
  const { t } = useTranslation();

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
                <LoginForm />
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
