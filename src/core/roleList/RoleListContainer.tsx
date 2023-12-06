import { Container } from '@mui/material';
import React from 'react';
import RoleList from 'views/roleList/RoleList';

const RoleListContainer = () => {
    return (
        <Container maxWidth='xl'>
            <RoleList/>
        </Container>
    );
};

export default RoleListContainer;