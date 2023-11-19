import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto'; // Import Chart.js

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
                        label: 'First Dataset',
                        data: [65, 59, 80, 81, 56, 55, 40, 70, 90, 100, 45, 60],
                        backgroundColor: 'rgba(7, 109, 171, 1)',
                        borderColor: 'rgb(255, 99, 132)',
                        borderWidth: 1,
                    },
                    {
                        label: 'Second Dataset',
                        data: [28, 48, 40, 19, 86, 27, 90, 60, 40, 75, 30, 50],
                        backgroundColor: 'rgba(96, 149, 19, 1)',
                        borderColor: 'rgb(54, 162, 235)',
                        borderWidth: 1,
                    },
                ],
            };

            const config = {
                type: 'bar' as const,
                data: data,
                options: {
                    maintainAspectRatio: false, // Allow chart to not maintain aspect ratio
                    aspectRatio: 2.2, // Customize the aspect ratio as needed (e.g., 1.5 for more height)
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                display: false, // Hide y-axis grid lines
                            },
                        },
                        x: {
                            grid: {
                                display: false, // Hides the x-axis grid lines
                            },
                        },
                    },
                },
            };

            const myChart = new Chart(chartRef.current, config);
            return () => myChart.destroy(); // Cleanup on unmount
        }
    }, []);

    return (
        <div style={{ width: '97%', backgroundColor: 'rgba(237, 244, 242, 1)', borderRadius: '10px', marginTop: '10px' }}>
            <canvas ref={chartRef} style={{ width: '100%' }} />
        </div>
    );
};

export default StackChart;
