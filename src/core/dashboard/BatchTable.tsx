import { Grid } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import BatchData from 'views/batchData/BatchData';

const BatchTable = () => {
    return (
        <Container maxWidth="xl">
            <Grid columns={12}>
                <BatchData />
            </Grid>
        </Container>
    );
};

export default BatchTable;