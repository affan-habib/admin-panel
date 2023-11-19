import React from 'react';
import { Box, Container, Grid } from '@mui/material';
import TopCards from 'views/dashboard/TopCards';
import InstituteList from 'views/dashboard/InstituteList';
import StackChart from 'views/dashboard/StackChart';
import PieChartDesign from 'views/dashboard/PieChartDesign';
import VennDiagram from 'views/dashboard/VennDiagram';

const Dashboard: React.FC = () => {
  return (
    <Container maxWidth="xl">
      <TopCards />
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <InstituteList />
        </Grid>
        <Grid item xs={12} md={4} marginLeft={-3.5}>
          <VennDiagram />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} md={8} lg={8}>
          <StackChart />
        </Grid>
        <Grid item xs={12} md={4} lg={4} marginLeft={-2.2}>
          <PieChartDesign />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
