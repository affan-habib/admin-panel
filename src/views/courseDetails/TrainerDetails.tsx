import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const TrainerDetails = () => {
    const teachers = [
        {
            name: 'প্রশিক্ষক ১',
            description1: 'MSc (English), University of Oxford (UK)',
            description2: 'BA, MA (English), University of Dhaka',
        },
        {
            name: 'প্রশিক্ষক ১',
            description1: 'MSc (English), University of Oxford (UK)',
            description2: 'BA, MA (English), University of Dhaka',
        },
        {
            name: 'প্রশিক্ষক ১',
            description1: 'MSc (English), University of Oxford (UK)',
            description2: 'BA, MA (English), University of Dhaka',
        },
    ];

    return (
        <Box sx={{
            border: '1px solid rgba(208, 208, 208, 1)',
            borderRadius: '10px',
            padding: '10px',
        }}
        my={7}>
            {teachers.map((teacher, index) => (
                <Box
                    key={index}
                    sx={{
                        padding:'10px',
                        marginBottom: '10px',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ marginRight: '10px' }}>U</Avatar> {/* Replace 'U' with actual avatar */}
                    <Box>
                        <Typography variant="h6">{teacher.name}</Typography>
                        <Typography variant='subtitle2'>{teacher.description1}</Typography>
                        <Typography variant='subtitle2'>{teacher.description2}</Typography>
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

export default TrainerDetails;
