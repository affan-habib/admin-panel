import React, { useEffect, useState, useMemo } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  CssBaseline,
} from '@mui/material';

import FooterContainer from 'views/auth/FooterContainer';
import LoginFooter from 'views/auth/LoginFooter';
import { useTranslation } from 'react-i18next';
import LoginForm from 'views/auth/LoginForm';
import RegistrationForm from 'views/auth/RegistrationForm';
import CarouselComponent from 'views/auth/CarouselComponent';

import LanguageSelect from 'components/common/LanguageSelect';
import logo from 'assets/logo.svg';

const LoginPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [selectedButton, setSelectedButton] = useState('login');
  const [selectedCard, setSelectedCard] = useState<string | null>('CLMS');


  const handleButtonClick = (buttonType: string) => {
    setSelectedButton(buttonType);
  };

  const handleCardClick = (translationKey: string) => {
    setSelectedCard(translationKey);
  };

  const translatedCard = useMemo(() => t(selectedCard || ''), [selectedCard, t]);

  useEffect(() => {
    // Update selectedCard when language changes
    if (selectedCard !== null) {
      const translatedCard = t(selectedCard);
      
      // Ensure that the translation is not the same as the current selectedCard
      if (translatedCard !== selectedCard) {
        setSelectedCard(translatedCard);
      }
    }
  }, [i18n.language, selectedCard, t]);
  
  
  return (
    <div style={{ backgroundColor: 'rgba(245, 245, 247, 1)' }}>
      <CssBaseline />

      <Container maxWidth="lg" sx={{ mt: 6 }}>
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
            <Paper style={{ padding: 20, minHeight: 328 }}>
              <Typography variant="body1" sx={{ color: 'rgba(0, 106, 78, 1)', fontSize: '24px', fontWeight: '500' }}>
                {translatedCard || ''}
              </Typography>

              <Box>
                {selectedButton === 'login' ? (
                  <LoginForm />
                ) : (
                  <RegistrationForm />
                )}
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
