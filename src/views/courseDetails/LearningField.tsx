import { Box, Button, Grid, Typography } from '@mui/material';
import React from 'react';
import CurriculumTopics from './CurriculumTopics';

const LearningField = () => {
    return (
        <Box>
            <Typography my={2}>শিখন ক্ষেত্র ১ : শিক্ষা নীতি ও শিক্ষায় ব্যাবস্থাপনা (শিনী)</Typography>
            <Box sx={{ border: '1px solid rgba(208, 208, 208, 1)', borderRadius: '10px' }}>
                <Box display="flex" justifyContent="space-between" padding='15px'>
                    <Typography my={1}>পূর্ববর্তী অবস্থা থেকে শুরু করুন</Typography>
                    <Button variant="contained" color="primary">পূর্ববর্তী অবস্থা থেকে শুরু</Button>
                </Box>
            </Box>
            <Box
                border='1px solid rgba(208, 208, 208, 1)'
                borderRadius='10px'
                padding='20px'
                my={4}
            >
                <Typography variant='h5' my={1}>
                    পরিচিতি
                </Typography>
                <Typography my={1} mb={3}>
                    প্রযুক্তি বিশ্বজুড়ে মানুষের কাছে শিক্ষা দেওয়ার পদ্ধতিকে বদলে দিয়েছে আমরা এখন একটি আন্তঃসংযুক্ত বিশ্বে বাস করি যেখানে আনুষ্ঠানিক শিক্ষার ঐতিহ্যগত ধারণা,
                    একটি একক শারীরিক অবস্থানে সংঘটিত হওয়া | প্রযুক্তি বিশ্বজুড়ে মানুষের কাছে শিক্ষা দেওয়ার পদ্ধতিকে বদলে দিয়েছে আমরা এখন একটি আন্তঃসংযুক্ত বিশ্বে বাস
                    করি যেখানে আনুষ্ঠানিক শিক্ষার ঐতিহ্যগত ধারণা, একটি একক শারীরিক অবস্থানে সংঘটিত হওয়া...
                </Typography>
            </Box>
            <Box
                border='1px solid rgba(208, 208, 208, 1)'
                borderRadius='10px'
                padding='20px'
                my={4}
            >
                <Typography variant='h5' my={1}>
                পাঠ্যক্রমের বিষয়বস্তু
                </Typography>
                
                <CurriculumTopics/>
            </Box>
        </Box>

    );
};

export default LearningField;