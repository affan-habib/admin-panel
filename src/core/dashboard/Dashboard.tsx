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
// import { Box, Container, Grid, useTheme } from '@mui/material';
// import TopCards from 'views/dashboard/TopCards';
// import InstituteList from 'views/dashboard/InstituteList';
// import StackChart from 'views/dashboard/StackChart';
// import PieChartDesign from 'views/dashboard/PieChartDesign';
// import VennDiagram from 'views/dashboard/VennDiagram';

// const Dashboard: React.FC = () => {
//   const theme = useTheme();

//   return (
//     <Container maxWidth="xl">
//       <TopCards />
//       <Grid container spacing={2}>
//         <Grid item xs={12} md={8}>
//           <InstituteList />
//         </Grid>
//         <Grid item xs={12} md={4} sx={{ [theme.breakpoints.up('md')]: { marginLeft: -3.5 } }}>
//           <VennDiagram />
//         </Grid>
//       </Grid>
//       <Grid container>
//         <Grid item xs={12} md={8} lg={8}>
//           <StackChart />
//         </Grid>
//         <Grid
//           item
//           xs={12}
//           md={4}
//           lg={4}
//           sx={{ [theme.breakpoints.up('lg')]: { marginLeft: -2.2 } }}
//         >
//           <PieChartDesign />
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default Dashboard;


// import React from 'react';
// import { Container, Grid, useTheme } from '@mui/material';
// import TopCards from 'views/dashboard/TopCards';
// import InstituteList from 'views/dashboard/InstituteList';
// import StackChart from 'views/dashboard/StackChart';
// import PieChartDesign from 'views/dashboard/PieChartDesign';
// import VennDiagram from 'views/dashboard/VennDiagram';

// const Dashboard: React.FC = () => {
//   const theme = useTheme();

//   const isMobile = theme.breakpoints.down('sm'); // Check if it's a mobile device

//   return (
//     <Container maxWidth="xl">
//       <TopCards />
//       <Grid container spacing={2}>
//         <Grid item xs={12} md={8}>
//           <InstituteList />
//         </Grid>
//         <Grid item xs={12} md={4} lg={4} sx={isMobile ? { marginLeft: -3.5 } : {}}>
//           <VennDiagram />
//         </Grid>
//       </Grid>
//       <Grid container>
//         <Grid item xs={12} md={8} lg={8}>
//           <StackChart />
//         </Grid>
//         <Grid item xs={isMobile ? 12 : 12} md={4} lg={4} sx={isMobile ? {} : { marginLeft: -2.2 }}>
//           <PieChartDesign />
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default Dashboard;






import React from 'react';
import { Container, Grid, useTheme } from '@mui/material';
import TopCards from 'views/dashboard/TopCards';
import InstituteList from 'views/dashboard/InstituteList';
import StackChart from 'views/dashboard/StackChart';
import PieChartDesign from 'views/dashboard/PieChartDesign';
import VennDiagram from 'views/dashboard/VennDiagram';

const Dashboard: React.FC = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="xl">
      <TopCards />
      <Grid container>
        <Grid item xs={12} md={8}>
          <InstituteList />
        </Grid>
        <Grid item xs={12} md={4} lg={4} sx={{ [theme.breakpoints.up('md')]: { marginLeft: -1.5 } }}>
          <VennDiagram />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} md={8} lg={8}>
          <StackChart />
        </Grid>
        <Grid
          item
          xs={12} // Change here to take full width on mobile
          md={4}
          lg={4}
          sx={{ [theme.breakpoints.up('lg')]: { marginLeft: -1.5 } }}
        >
          <PieChartDesign />
        </Grid>
      </Grid>
    </Container>

  //   <Container maxWidth="xl">
  //   <TopCards />
  //   <Grid container>
  //     <Grid item xs={12} md={8}>
  //       <InstituteList />
  //     </Grid>
  //     <Grid item xs={12} md={4} >
  //       <VennDiagram />
  //     </Grid>
  //   </Grid>
  //   <Grid container>
  //     <Grid item xs={12} md={8} lg={8}>
  //       <StackChart />
  //     </Grid>
  //     <Grid item xs={12} md={4} lg={4}>
  //       <PieChartDesign />
  //     </Grid>
  //   </Grid>
  // </Container>
  );
};

export default Dashboard;




