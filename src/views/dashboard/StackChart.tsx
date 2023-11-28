import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { Box, Typography } from '@mui/material';

const StackChart = () => {
    const chartRef = useRef(null);

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
        <Box height={390} style={{ width: '97%', backgroundColor: 'rgba(237, 244, 242, 1)', borderRadius: '10px', marginTop: '10px',padding:'20px'}}>
            <Typography style={{ color: 'rgba(21, 83, 19, 1)' }} mb={2}>উচ্চ মাধ্যমিক শিক্ষক প্রশিক্ষণ ইনস্টিটিউটের বার চার্ট</Typography>
            <Box height = {320}>
                <canvas ref={chartRef} style={{ width: '100%' }} />
            </Box>


        </Box>
    );
};

export default StackChart;

// import React, { useRef, useEffect } from 'react';
// import Chart from 'chart.js/auto';
// import { Box, Typography, useTheme } from '@mui/material';

// const StackChart = () => {
//     const chartRef = useRef(null);
//     const theme = useTheme();
//     const isMobile = theme.breakpoints.down('sm');

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
//         <Box
//             height={390}
//             style={{
//                 width: isMobile ? '100%' : '97%',
//                 backgroundColor: 'rgba(237, 244, 242, 1)',
//                 borderRadius: '10px',
//                 marginTop: '10px',
//                 padding: '20px',
//             }}
//         >
//             <Typography style={{ color: 'rgba(21, 83, 19, 1)' }} mb={2}>
//                 উচ্চ মাধ্যমিক শিক্ষক প্রশিক্ষণ ইনস্টিটিউটের বার চার্ট
//             </Typography>
//             <Box height={320}>
//                 <canvas ref={chartRef} style={{ width: '100%' }} />
//             </Box>
//         </Box>
//     );
// };

// export default StackChart;

