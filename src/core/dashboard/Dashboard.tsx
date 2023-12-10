// import React from 'react';
// import { Box, Container, Grid } from '@mui/material';
// import TopCards from 'views/dashboard/TopCards';
// import InstituteList from 'views/dashboard/InstituteList';
// import StackChart from 'views/dashboard/StackChart';
// import PieChartDesign from 'views/dashboard/PieChartDesign';
// import VennDiagram from 'views/dashboard/VennDiagram';

// const Dashboard: React.FC = () => {
//   return (
//     <Container maxWidth="xl">
//       <TopCards />
//       <Grid container spacing={2}>
//         <Grid item xs={12} md={8}>
//           <InstituteList />
//         </Grid>
//         <Grid item xs={12} md={4} marginLeft={-3.5}>
//           <VennDiagram />
//         </Grid>
//       </Grid>
//       <Grid container>
//         <Grid item xs={12} md={8} lg={8}>
//           <StackChart />
//         </Grid>
//         <Grid item xs={12} md={4} lg={4} marginLeft={-2.2}>
//           <PieChartDesign />
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default Dashboard;


// import React from 'react';
// import { Box, Container, Grid } from '@mui/material';
// import TopCards from 'views/dashboard/TopCards';
// import InstituteList from 'views/dashboard/InstituteList';
// import StackChart from 'views/dashboard/StackChart';
// import PieChartDesign from 'views/dashboard/PieChartDesign';
// import VennDiagram from 'views/dashboard/VennDiagram';

// const Dashboard: React.FC = () => {
//   return (
//     <Container maxWidth="xl">
//       <TopCards />
//       <Grid container spacing={2}>
//         <Grid item xs={12} md={8} lg={8}>
//           <InstituteList />
//         </Grid>
//         <Grid item xs={12} md={4} lg={4}>
//           <VennDiagram />
//         </Grid>
//       </Grid>
//       <Grid container spacing={2} sx={{marginTop:'3px'}}>
//         <Grid item xs={12} md={8} lg={8}>
//           <StackChart />
//         </Grid>
//         <Grid item xs={12} md={4} lg={4}>
//           <PieChartDesign />
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default Dashboard;


import React from 'react';
import { Box, Container, Grid } from '@mui/material';
import TopCards from 'views/dashboard/TopCards';
import InstituteList from 'views/dashboard/InstituteList';
import StackChart from 'views/dashboard/StackChart';
import PieChartDesign from 'views/dashboard/PieChartDesign';
import VennDiagram from 'views/dashboard/VennDiagram';
import { useTranslation } from 'react-i18next';
const Dashboard: React.FC = () => {
  
  const { t } = useTranslation();
  return (
    <Container maxWidth="xl">
      <p style={{fontSize:'14px',fontWeight:'500', marginBottom:'8px' ,color:'rgba(244, 42, 65, 1)'}}>{t('adminPanel')}</p>
      <TopCards />
      <Grid container spacing={2}>
        <Grid item xs={12} md={8} lg={8}>
          <InstituteList />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <VennDiagram />
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ marginTop: '3px' }}>
  <Grid item xs={12} md={8} lg={8} sx={{  }}>
    <StackChart />
  </Grid>
  <Grid item xs={12} md={4} lg={4} sx={{  }}>
    <PieChartDesign  />
  </Grid>
</Grid>


    </Container>
  );
};

export default Dashboard;