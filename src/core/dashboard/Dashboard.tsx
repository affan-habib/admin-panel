import React from 'react';
import { Box, Container, Grid } from '@mui/material';
import TopCards from 'views/dashboard/TopCards';
import InstituteList from 'views/dashboard/InstituteList';
import StackChart from 'views/dashboard/StackChart';
import PieChartDesign from 'views/dashboard/PieChartDesign';
import VennDiagram from 'views/dashboard/VennDiagram';
import { useTranslation } from 'react-i18next';
import VennEnglish from 'views/dashboard/VennEnglish';
const Dashboard: React.FC = () => {

  const { t } = useTranslation();
  const languagestate = localStorage.getItem('language')
  console.log(languagestate)
  return (
    <Container maxWidth="xl">
      <p style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: 'rgba(244, 42, 65, 1)' }}>{t('adminPanel')}</p>
      <TopCards />
      <Grid container spacing={2}>
        <Grid item xs={12} md={8} lg={8}>
          <InstituteList />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          {languagestate == 'bn' && <VennDiagram />}
          {languagestate == 'en' && <VennEnglish />}
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ marginTop: '3px' }}>
        <Grid item xs={12} md={8} lg={8} sx={{}}>
          <StackChart />
        </Grid>
        <Grid item xs={12} md={4} lg={4} sx={{}}>
          <PieChartDesign />
        </Grid>
      </Grid>


    </Container>
  );
};

export default Dashboard;