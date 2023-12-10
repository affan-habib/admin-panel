import React, { useRef, useEffect, useMemo } from 'react';
import Chart from 'chart.js/auto';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const StackChart = () => {
  const chartRef = useRef(null);
  const { t, i18n } = useTranslation();

  const generateLabels = useMemo(() => {
    return [
      { id: 1, month: t('january') },
      { id: 2, month: t('february') },
      { id: 3, month: t('march') },
      { id: 4, month: t('april') },
      { id: 5, month: t('may') },
      { id: 6, month: t('june') },
      { id: 7, month: t('july') },
      { id: 8, month: t('august') },
      { id: 9, month: t('september') },
      { id: 10, month: t('october') },
      { id: 11, month: t('november') },
      { id: 12, month: t('december') },
    ];
  }, [t]);

  const generateNumbers = useMemo(() => {
    return [
      { id: 0, label: t('number0') },
      { id: 10, label: t('number10') },
      { id: 20, label: t('number20') },
      { id: 30, label: t('number30') },
      { id: 40, label: t('number40') },
      { id: 50, label: t('number50') },
      { id: 60, label: t('number60') },
      { id: 70, label: t('number70') },
      { id: 80, label: t('number80') },
      { id: 90, label: t('number90') },
      { id: 100, label: t('number100') },
    ];
  }, [t]);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const data = {
        labels: generateLabels.map((label) => label.month),
        datasets: [
          {
            label: t('proceedings'),
            data: generateNumbers.map((number) => number.id),
            backgroundColor: 'rgba(7, 109, 171, 1)',
            borderWidth: 1,
          },
          {
            label: t('progresses'),
            data: generateNumbers.map((number) => number.id),
            backgroundColor: 'rgba(96, 149, 19, 1)',
            borderWidth: 1,
          },
        ],
      };

      const config = {
        type: 'bar' as const,
        data: data,
        options: {
          maintainAspectRatio: false,
          aspectRatio: 2.3,
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                display: false,
              },
              ticks: {
                callback: (value:any) => {
                  const matchedNumber = generateNumbers.find((num) => num.id === value);
                  return matchedNumber ? matchedNumber.label : value;
                },
              },
            },
            x: {
              grid: {
                display: false,
              },
            },
          },
        },
      };

      const myChart = new Chart(chartRef.current, config);
      return () => myChart.destroy();
    }
  }, [generateLabels, generateNumbers, i18n, t]);

  useEffect(() => {
    // Handle language change, if needed
  }, [i18n.language]);

  return (
    <Box height={390} style={{ backgroundColor: 'rgba(237, 244, 242, 1)', borderRadius: '8px', padding: '20px' }}>
      <Typography style={{ color: 'rgba(21, 83, 19, 1)', fontSize: '17px', fontWeight: '500' }} mb={2}>
        {t('barDiagram')}
      </Typography>
      <Box height={320}>
        <canvas ref={chartRef} style={{ width: '100%' }} />
      </Box>
    </Box>
  );
};

export default StackChart;
