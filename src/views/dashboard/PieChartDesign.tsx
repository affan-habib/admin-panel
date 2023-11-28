// import React, { useRef, useEffect } from 'react';
// import Chart, { ChartConfiguration, ChartType } from 'chart.js/auto';
// import { Box, Typography } from '@mui/material';

// const PieChartDesign: React.FC = () => {
//   const chartRef = useRef<HTMLCanvasElement | null>(null);

//   useEffect(() => {
//     if (chartRef && chartRef.current) {
//       const data = {
//         labels: ['Red', 'Blue', 'Yellow'],
//         datasets: [
//           {
//             label: 'My First Dataset',
//             data: [300, 50, 100],
//             backgroundColor: ['rgba(21, 83, 19, 1)', 'rgba(238, 106, 118, 1)', 'rgb(227, 195, 251)'],
//             hoverOffset: 4,
//           },
//         ],
//       };

//       const config: ChartConfiguration<ChartType> = {
//         type: 'pie',
//         data: data,
//       };

//       const myChart = new Chart(chartRef.current, config);

//       return () => {
//         if (myChart) {
//           myChart.destroy();
//         }
//       };
//     }
//   }, []);

//   return (
//     <Box
//       height={390}
//       width={490}
//       sx={{
//         backgroundColor: 'rgba(237, 244, 242, 1)',
//         borderRadius: '10px',
//         mt: 1,
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'center',
//         alignItems: 'center',
//       }}
//     >
//       <Box sx={{ mb: 2 }}>
//         <Typography style={{ color: 'rgba(21, 83, 19, 1)' }}>উচ্চ মাধ্যমিক শিক্ষক প্রশিক্ষণ ইনস্টিটিউটের পাই চার্ট</Typography>
//       </Box>
//       <Box
//         width={400}
//         height={280}
//         sx={{
//           backgroundColor: 'rgba(254, 254, 254, 1)',
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}
//       >
//         <canvas ref={chartRef} style={{padding:'10px'}} />
//       </Box>
//     </Box>
//   );
// };

// export default PieChartDesign;


import React, { useRef, useEffect } from 'react';
import Chart, { ChartConfiguration, ChartType } from 'chart.js/auto';
import { Box, Typography, useTheme } from '@mui/material';

const PieChartDesign: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const theme = useTheme();

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const data = {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [
          {
            label: 'My First Dataset',
            data: [300, 50, 100],
            backgroundColor: ['rgba(21, 83, 19, 1)', 'rgba(238, 106, 118, 1)', 'rgb(227, 195, 251)'],
            hoverOffset: 4,
          },
        ],
      };

      const config: ChartConfiguration<ChartType> = {
        type: 'pie',
        data: data,
      };

      const myChart = new Chart(chartRef.current, config);

      return () => {
        if (myChart) {
          myChart.destroy();
        }
      };
    }
  }, []);

  const isMobile = theme.breakpoints.down('sm');

  return (
    <Box
      height={390}
      width={isMobile ? '100%' : 490}
      sx={{
        backgroundColor: 'rgba(237, 244, 242, 1)',
        borderRadius: '10px',
        mt: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box sx={{ mb: 2 }}>
        <Typography style={{ color: 'rgba(21, 83, 19, 1)' }}>উচ্চ মাধ্যমিক শিক্ষক প্রশিক্ষণ ইনস্টিটিউটের পাই চার্ট</Typography>
      </Box>
      <Box
        width={isMobile ? '80%' : 400}
        height={280}
        sx={{
          backgroundColor: 'rgba(254, 254, 254, 1)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <canvas ref={chartRef} style={{ padding: '10px', width: '100%' }} />
      </Box>
    </Box>
  );
};

export default PieChartDesign;
