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
import LanguageSelect from 'components/common/LanguageSelect';
import backgroundLogin from '../../assets/backgroundLogin.svg';
import loginImage from '../../assets/login-asset.svg';
import image2 from '../../assets/eLibrary.svg';
import image3 from '../../assets/teachersGuide.svg';
const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const [loginPageTitle, setLoginPageTitle] = useState(
    'learningManagementSystem',
  );

  console.log(loginPageTitle);

  const handleCardClick = (value: string) => {
    setLoginPageTitle(value);
  };
  return (
    <div style={{
      backgroundColor: 'rgba(0, 106, 78, 1)',
      minHeight:'100vh'
    }}>
      <CssBaseline />
      <Grid container >
        <Grid xs={12} md={9} xl={9} p={5} px={20} style={{
          backgroundImage: `url(${backgroundLogin})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'relative',
          minHeight:'100vh'
        }}>
          <Grid
            item
            xs={12}
            md={12}
            flexDirection="row"
            display="flex"
            justifyContent="space-between"
          >
            <img src={logo} alt="ss" style={{ width: '164px', boxShadow: '0px 4px 8px 0px rgba(100, 100, 100, 0.15)', borderRadius: '15px', marginBottom: '15px' }} />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <FooterContainer
              onCardClick={handleCardClick}
              loginPageTitle={loginPageTitle}
            />
          </Grid>
          <Grid item xs={12} >
            <LoginFooter />
          </Grid>
        </Grid>
        <Grid xs={12} md={3} xl={3}>
          <Box m={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <LanguageSelect />
          </Box>
          <Grid item xs={12} display="flex" direction="column" px={5} mt={20}>
            <Box display="flex" justifyContent="center" mb={3}>
              {loginPageTitle  == 'learningManagementSystem' && <img src={image3} alt="ss" style={{ width: '153px', height: '119px' }} />}
              {loginPageTitle  == 'eLibrary' && <img src={image2} alt="ss" style={{ width: '153px', height: '119px' }} />}
              {loginPageTitle  == 'teachersGuide' && <img src={image3} alt="ss" style={{ width: '153px', height: '119px' }} />}
              {loginPageTitle  == 'formativeAssessmentSystem' && <img src={image2} alt="ss" style={{ width: '153px', height: '119px' }} />}
              {loginPageTitle  == 'socialLearningPlatform' && <img src={image3} alt="ss" style={{ width: '153px', height: '119px' }} />}
            </Box>
            <Box style={{ padding: 20, minHeight: 330, }} px={30}>
              <Typography variant="h6" color="white" mb={2}>
                {t(`${loginPageTitle}LoginTitle`)}
              </Typography>
              <Box >
                <LoginForm />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default LoginPage;
