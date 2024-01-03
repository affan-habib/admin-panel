import React, { useRef, useEffect } from 'react';
import Chart, { ChartConfiguration, ChartType } from 'chart.js/auto';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import line from 'assets/line.svg';

const PieChartDesign: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const generateLabels = () => {
      return [
        t('green'),
        t('red'),
        t('purple'),
      ];
    };

    if (chartRef && chartRef.current) {
      const data = {
        labels: generateLabels(),
        datasets: [
          {
            label: t('myFirstDataset'),
            data: [300, 50, 100],
            backgroundColor: ['rgba(21, 83, 19, 1)', 'rgba(238, 106, 118, 1)', 'rgb(227, 195, 251)'],
            hoverOffset: 4,
          },
        ],
      };

      const config: ChartConfiguration<ChartType> = {
        type: 'pie',
        data: data,
        options: {
          plugins: {
            legend: {
              position: 'right',
              align: 'center',
              labels: {
                boxWidth: 22,
                boxHeight: 8,
                padding: 65
              },
            },
          }
        },
      };

      const myChart = new Chart(chartRef.current, config);

      return () => {
        if (myChart) {
          myChart.destroy();
        }
      };
    }
  }, [t, i18n.language]);

  return (
    <Box
      sx={{
        backgroundColor: 'rgba(237, 244, 242, 1)',
        borderRadius: '8px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 390,
      }}
    >
      <Box sx={{ marginBottom: '8px' }}>
        <Typography style={{ color: 'rgba(21, 83, 19, 1)', fontWeight: '500' }}>{t('pieChart')}</Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: 'rgba(254, 254, 254, 1)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '90%',
          borderRadius: '8px',
          border: '1px solid rgba(250, 250, 250, 1)',
          // position: 'relative',
        }}
      >
        <Box sx={{position:'relative'}}>
        <canvas ref={chartRef} style={{ borderRadius: '8px' }} />
        <Box sx={{
            position: 'absolute', 
            zIndex: 2,
            height: 'auto', 
            top: '50%', 
            transform: 'translateY(-50%)', 
            left: '60%',
          }}>
        <img
          src={line}
          alt="Your Line Image"
        />
        </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PieChartDesign;