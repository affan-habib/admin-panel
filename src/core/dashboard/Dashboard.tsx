import React from 'react';
import { Container } from '@mui/material';
import TopCards from 'views/dashboard/TopCards';
import InstituteList from 'views/dashboard/InstituteList';

const Dashboard: React.FC = () => {
  return (
    <Container maxWidth="xl">
      <TopCards />
      <InstituteList />
    </Container>
  );
};

export default Dashboard;
