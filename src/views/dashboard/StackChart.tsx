import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const StackChart = () => {
    const chartRef = useRef(null);
    const {t} = useTranslation();

    useEffect(() => {
        if (chartRef && chartRef.current) {
            const labels = [
                'জানুয়ারি',
                'ফেব্রুয়ারি',
                'মার্চ',
                'এপ্রিল',
                'মে',
                'জুন',
                'জুলাই',
                'আগস্ট',
                'সেপ্টেম্বর',
                'অক্টোবর',
                'নভেম্বর',
                'ডিসেম্বর',
            ];

            const data = {
                labels: labels,
                datasets: [
                    {
                        label: 'কার্যধারা',
                        data: [65, 59, 80, 81, 56, 55, 40, 70, 90, 100, 45, 60],
                        backgroundColor: 'rgba(7, 109, 171, 1)',
                        borderWidth: 1,
                    },
                    {
                        label: 'অগ্রগতি',
                        data: [28, 48, 40, 19, 86, 27, 90, 60, 40, 75, 30, 50],
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
    }, []);

    return (
        <Box height={390} style={{ backgroundColor: 'rgba(237, 244, 242, 1)', borderRadius: '10px',padding:'20px'}}>
            <Typography style={{ color: 'rgba(21, 83, 19, 1)',fontWeight:'500',fontSize:'16px' }} mb={2}>{t('barDiagram')}</Typography>
            <Box height = {320}>
                <canvas ref={chartRef} style={{ width: '100%' }} />
            </Box>


        </Box>
    );
};

export default StackChart;


// import React, { useRef, useEffect } from 'react';
// import Chart from 'chart.js/auto';
// import { Box, Typography } from '@mui/material';
// import { useTranslation } from 'react-i18next';

// const StackChart = () => {
//     const chartRef = useRef(null);
//     const {t} = useTranslation();

//     useEffect(() => {
//         if (chartRef && chartRef.current) {
//             const labels = [
//                 'জানুয়ারি',
//                 'ফেব্রুয়ারি',
//                 'মার্চ',
//                 'এপ্রিল',
//                 'মে',
//                 'জুন',
//                 'জুলাই',
//                 'আগস্ট',
//                 'সেপ্টেম্বর',
//                 'অক্টোবর',
//                 'নভেম্বর',
//                 'ডিসেম্বর',
//             ];

//             const data = {
//                 labels: labels,
//                 datasets: [
//                     {
//                         label: 'কার্যধারা',
//                         data: [65, 59, 80, 81, 56, 55, 40, 70, 90, 100, 45, 60],
//                         backgroundColor: 'rgba(7, 109, 171, 1)',
//                         borderWidth: 1,
//                     },
//                     {
//                         label: 'অগ্রগতি',
//                         data: [28, 48, 40, 19, 86, 27, 90, 60, 40, 75, 30, 50],
//                         backgroundColor: 'rgba(96, 149, 19, 1)',
//                         borderWidth: 1,
//                     },
//                 ],
//             };

//             const config = {
//                 type: 'bar' as const,
//                 data: data,
//                 options: {
//                     maintainAspectRatio: false,
//                     aspectRatio: 2.3,
//                     scales: {
//                         y: {
//                             beginAtZero: true,
//                             grid: {
//                                 display: false,
//                             },
//                         },
//                         x: {
//                             grid: {
//                                 display: false,
//                             },
//                         },
//                     },
//                 },
//             };

//             const myChart = new Chart(chartRef.current, config);
//             return () => myChart.destroy();
//         }
//     }, []);

//     return (
//         <Box  style={{  backgroundColor: 'rgba(237, 244, 242, 1)', borderRadius: '8px',padding:'20px'}}>
//             <Typography style={{ color: 'rgba(21, 83, 19, 1)' , fontSize:'17px',fontWeight:"500" }} mb={2}>{t('barDiagram')}</Typography>
//             <Box >
//                 <canvas ref={chartRef} style={{ width: '100%' }} />
//             </Box>


//         </Box>
//     );
// };

// export default StackChart;