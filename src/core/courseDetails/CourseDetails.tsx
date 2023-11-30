import { Container, Grid } from '@mui/material';
import React from 'react';
import LearningField from 'views/courseDetails/LearningField';
import TrainerDetails from 'views/courseDetails/TrainerDetails';

const CourseDetails = () => {
    return (
        <Container maxWidth='xl'>
            <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                    <LearningField />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TrainerDetails/>
                </Grid>
            </Grid>
        </Container>
    );
};

export default CourseDetails;