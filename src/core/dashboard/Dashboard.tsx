import React from 'react';
import { Box, Breadcrumbs, Container, Grid, Typography } from '@mui/material';
import TopCards from 'views/dashboard/TopCards';
import InstituteList from 'views/dashboard/InstituteList';
import StackChart from 'views/dashboard/StackChart';
import PieChartDesign from 'views/dashboard/PieChartDesign';
import VennDiagram from 'views/dashboard/VennDiagram';
import { useTranslation } from 'react-i18next';
import VennEnglish from 'views/dashboard/VennEnglish';
import { HomeOutlined } from '@mui/icons-material';
const Dashboard: React.FC = () => {

  const { t } = useTranslation();
  const languagestate = localStorage.getItem('language')
  console.log(languagestate)
  return (
    <Container maxWidth="xl">
      <Breadcrumbs
        aria-label="breadcrumb"
        separator="››"
        sx={{
          color: 'error',
          fontSize: '20px',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          marginBottom:'15px'
        }}
      >

        <HomeOutlined sx={{ marginTop: '8px', color: 'rgba(255, 74, 95, 1)' }} />
        <Typography
          color="primary"
          sx={{ fontSize: '16px', fontWeight: 500, marginTop: '2.5px', }}
        >
          {t('adminPanel')}
        </Typography>
      </Breadcrumbs>
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