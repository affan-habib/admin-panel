import React from 'react';
import { Container, Typography, Paper, Divider, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

const UserProfile: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Container component="main" maxWidth="xl">
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          // alignItems: 'center',
        }}
      >
        <Typography variant="h5" gutterBottom>
          {t('userProfile')}
        </Typography>
        <Divider sx={{ width: '100%', marginBottom: 2 }} />
        <Box>
          <Typography variant="h6">{t('fullName')}:</Typography>
          <Typography>Md Sobhan Khan</Typography>
        </Box>
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="h6">{t('email')}:</Typography>
          <Typography>md.sobhan@gmail.com</Typography>
        </Box>
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="h6">{t('role')}:</Typography>
          <Typography>Teacher</Typography>
        </Box>
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="h6">{t('bio')}:</Typography>
          <Typography>
            Md Sobhan Khan is a veteran teacher with over 20 years of classroom experience. He holds a master's degree in education and is passionate about helping students.
          </Typography>
        </Box>
        {/* Add more information as needed */}
      </Paper>
    </Container>
  );
};

export default UserProfile;
