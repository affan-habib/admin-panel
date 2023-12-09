import React, { useRef, useEffect } from 'react';
import Chart, { ChartConfiguration, ChartType } from 'chart.js/auto';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const PieChartDesign: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const {t} = useTranslation();

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const data = {
        labels: [
          'Red', 
          'Blue', 
          'Yellow'],
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

  return (
    <Box
      
      sx={{
        backgroundColor: 'rgba(237, 244, 242, 1)',
        borderRadius: '8px',
        padding:'20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height:390
        // height:450
      }}
    >
      <Box sx={{marginBottom:'8px'  }}>
        <Typography style={{ color: 'rgba(21, 83, 19, 1)',fontWeight:"500" }}>{t('pieChart')}</Typography>
      </Box>
      <Box
        
        sx={{
          backgroundColor: 'rgba(254, 254, 254, 1)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width:'100%',
          height:'90%',
          borderRadius:'8px',
          border: '1px solid rgba(250, 250, 250, 1)'
        }}
      >
        <canvas ref={chartRef} style={{borderRadius:'8px'}} />
      </Box>
    </Box>
  );
};

export default PieChartDesign;
